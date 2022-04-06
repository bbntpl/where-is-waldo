/* eslint-disable no-labels */
import React, { useContext, useRef, useState, useEffect } from 'react';

//import js functions
import {
    checkIfUserExistsById,
    checkIfFirstGameEver
} from '../../js/firebase';
import { fetchUser } from '../../js/storage';

//styles
import {
    MainContainer,
    MainTop,
    MainBottom,
    TextInfo,
    ImageAsCanvas
} from './Main_Styled';

//Components
import { ImagesToFind } from '../Right_Nav/Right_Nav';
import { Score } from '../Score/Score';
import { ImagesContext } from '../../App'; //context

export default function Main({ setIsItBeforeThePuzzle }) {
    const level = useContext(ImagesContext);

    //timer
    const [stopwatch, setStopwatch] = useState({
        active: false,
        time: 0,
        start: 0
    });

    //used for resize event to maintain the size dimension of canvas
    const [screenDimensions, setScreenDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });

    //canvas stuff
    const [canvasHeight, setCanvasHeight] = useState();
    const [canvasMousePos, setCanvasMousePos] = useState(null);

    //mouse event stuff
    const [scrollPosY, setScrollPosY] = useState();

    //main assets as an object which is modified overtime during the game
    const [mainChars, setMainChars] = useState(level.mainImages.char);
    const [activeIndex, setActiveIndex] = useState(0); //sets the current character as active
    const [totalFailedAttempts, setTotalFailedAttempts] = useState(0);

    //score result to be passed on child component
    const [toggleDisplayResult, setToggleDisplayResult] = useState(false)
    const cvRef = useRef(null);
    const mainContainerRef = useRef(null);

    //the timer activates once the useEffect is mounted
    useEffect(() => {
        let interval = null;
        setStopwatch({
            active: true,
            time: stopwatch.time,
            start: Date.now() - stopwatch.time
        })
        if (stopwatch.active) {
            interval = setInterval(() => {
                setStopwatch({ ...stopwatch, time: Date.now() - stopwatch.start });
            }, 10);
        } else if (!stopwatch.active && stopwatch.time !== 0) {
            setStopwatch({ ...stopwatch, formattedResult: displayFormattedStopwatch(stopwatch.time) });
            clearInterval(interval);
        }
        function displayFormattedStopwatch(time) {
            let centiseconds = ("0" + (Math.floor(time / 10) % 100)).slice(-2);
            let seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
            let minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
            return (`${minutes}:${seconds}:${centiseconds}`);
        }
        return () => clearInterval(interval);
    }, [stopwatch.active]);

    //Changes the width/height state every screen resize
    useEffect(() => {
        function handleResize() {
            setScreenDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        }
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    })

    //Tracking scrolling event -> Indirectly useful to update a value passed to a children.
    useEffect(() => {
        function scrollTrackingEvent() {
            const currentPos = window.pageYOffset;
            setScrollPosY(currentPos);
        }
        window.addEventListener("scroll", scrollTrackingEvent);
        return () => window.removeEventListener("scroll", scrollTrackingEvent);
    }, [scrollPosY])

    //Track mouse position within the canvas
    useEffect(() => {
        const cvs = cvRef.current;
        function getMousePos(e) {
            let cvsRect = cvs.getBoundingClientRect();
            setCanvasMousePos({
                x: ((e.clientX - cvsRect.left) / cvs.width) * 100,
                y: ((e.clientY - cvsRect.top) / cvs.height) * 100
            });
        }
        cvs.addEventListener('click', getMousePos);
        return () => cvs.removeEventListener("click", getMousePos);
    }, [canvasMousePos])

    //canvas stuff
    useEffect(() => {
        //Canvas properties
        const cvs = cvRef.current;
        const ctx = cvs.getContext('2d');
        const src = level.mainImages.main;

        //Image properties
        const image = new Image();
        image.onload = imageLoader;
        image.src = src;
        function imageLoader() {
            ctx.imageSmoothingEnabled = false;
            ctx.webkitImageSmoothingEnabled = false;
            cvs.width = cvs.style.width;

            //Setting the pixel width equal to the style width of canvas
            cvs.width = cvs.getBoundingClientRect().width;

            //maintain aspect ratio
            const wrh = image.width / image.height;
            let newWidth = cvs.width;
            let newHeight = newWidth / wrh;
            resetCanvas(newHeight);
            ctx.drawImage(image, 0, 0, newWidth, newHeight);
        }
        function resetCanvas(newHeight) {
            ctx.clearRect(0, 0, cvs.width, cvs.height);
            setCanvasHeight(newHeight + 'px');
        }
    }, [screenDimensions.width]);

    //Switch to the next character when the user clicked the correct item
    useEffect(() => {
        //check the remaining items left
        const howMuchIncompleteCharacterLeft = mainChars.filter((c) => c.correctPos === false || c.correctPos === undefined);
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        let failedAttempts = mainChars.map(c => c.attempts);

        //calculating the total amount of failed attempts
        const totalFailedAttempts = failedAttempts.reduce(reducer); 

        function displayEndResult() {
            setToggleDisplayResult(true);
            setTotalFailedAttempts(totalFailedAttempts);
            setStopwatch({ ...stopwatch, active: false });
        }

        //display the result and store it remotely when there are no items left
        //otherwise, the logic for next item will continue
        if (!howMuchIncompleteCharacterLeft.length) {
            displayEndResult();
            return;
        };

        if (!mainChars[activeIndex].correctPos) return;
        let nextIndex = (mainChars.length - 1) === activeIndex ? 0 : activeIndex + 1;

        //the active index is automatically changes when the user
        //clicked the correct item
        for (const [i, v] of mainChars.entries()) {
            let firstIncompleteChar = null;
            if (!v.correctPos) {
                firstIncompleteChar = i;
            }
            toChangeIndex: {
                if (nextIndex === i && !v.correctPos) {
                    setActiveIndex(i);
                    break toChangeIndex;
                }
                if (firstIncompleteChar !== null) {
                    setActiveIndex(firstIncompleteChar);
                }
                continue;
            }
            break;
        }
    }, [mainChars]);


    useEffect(() => {   
        if (!toggleDisplayResult && !stopwatch.active && stopwatch.formattedResult === undefined) return;
        const userInfo = fetchUser();
        checkIfUserExistsById(userInfo.id, userInfo.name);
        checkIfFirstGameEver(level.mainImages.info.id, userInfo.id, userInfo.name, stopwatch.time, stopwatch.formattedResult);
    }, [toggleDisplayResult, stopwatch.formattedResult])

    //Change active status of character/material after click
    useEffect(() => {
        displayTitleWhenActive(mainChars, activeIndex);
        function displayTitleWhenActive(arr, index) {
            const updatedCharStatus = arr.map((c, i) => i === index && !c.completedPos ? {
                ...c,
                active: true
            } : {
                ...c,
                active: false
            });
            setMainChars(updatedCharStatus);
        }
    }, [activeIndex])
    function addCoordinatesByUser(arr, mousePos, activeIndex) {
        //validate whether the user is correct
        const isTheUserCorrect = isClickedCoordinatesCorrect(arr, mousePos, activeIndex);
        const updatedArray = arr.map((c, i) => activeIndex === i ? {
            ...c,
            userChoosePos: [mousePos.x, mousePos.y],
            correctPos: isTheUserCorrect,
            attempts: isTheUserCorrect ? c.attempts : c.attempts + 1,
            active: isTheUserCorrect ? false : true
        } : c)
        setMainChars(updatedArray);
    }
    function isClickedCoordinatesCorrect(arr, mousePos, activeIndex) {
        const { posX, posY } = arr[activeIndex];
        const len = arr.length;
        //Check if at least one of the coordinates from an item is clicked correctly
        if (Array.isArray(posX[0])) {
            for (let i = 0; i < len - 1; i++) {
                const isTheCoordinatesCorrect = (posX[0][i] < mousePos.x
                    && posX[1][i] > mousePos.x)
                    && (posY[0][i] < mousePos.y
                        && posY[1][i] > mousePos.y);
                if (len === i + 1 && !isTheCoordinatesCorrect) return isTheCoordinatesCorrect;
                if (!isTheCoordinatesCorrect) continue;
                return isTheCoordinatesCorrect;
            }

        } else {
            const isTheCoordinatesCorrect = (posX[0] < mousePos.x
                && posX[1] > mousePos.x)
                && (posY[0] < mousePos.y
                    && posY[1] > mousePos.y);
            return (isTheCoordinatesCorrect);
        }
    }
    return (
        <MainContainer>
            <MainTop>
                <TextInfo justifyContent={screenDimensions.width > 850 ? 'space-between' : 'space-evenly'}>
                    { //IF WIDTH IS LOWER than 850 THEN IT'LL NOT BE DISPLAYED
                        screenDimensions.width > 850 &&
                        <div style={{
                            width: 'max-content',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 15px'
                        }}>
                            <header style={{ paddingRight: '16px' }}>{level.mainImages.info.title}</header>
                            {level.mainImages.info.author && screenDimensions.width > 1200 ? <p>{'By: ' + level.mainImages.info.author}</p> : null}
                        </div>
                    }
                    <header>Find: {mainChars[activeIndex].title}</header>
                    {/* To force the middle child of this parent's element to be centered */}
                    <pre></pre>
                </TextInfo>
            </MainTop>
            <MainBottom ref={mainContainerRef} height={canvasHeight} >
                <ImageAsCanvas
                    ref={cvRef}
                    height={canvasHeight}
                    onClick={() => addCoordinatesByUser(mainChars, canvasMousePos, activeIndex)}
                ></ImageAsCanvas>
                <ImagesToFind
                    mainChars={mainChars}
                    mainPosY={mainContainerRef.current ? mainContainerRef.current.getBoundingClientRect().y : 1}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                />
            </MainBottom>
            {toggleDisplayResult ? 
                    <Score
                        timerResult={stopwatch.formattedResult}
                        totalAttempts={totalFailedAttempts}
                        toggleScoreResult={toggleDisplayResult}
                        setIsItBeforeThePuzzle={setIsItBeforeThePuzzle}
                        levels={level.mainImages.levels}
                    /> : null
        }

        </MainContainer>
    )
}