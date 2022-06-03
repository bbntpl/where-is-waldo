import React, { useRef, useState, useEffect, useContext } from 'react'

//IMPORTED STYLE COMPONENTS
import {
    PreviewContainer,
    TitleContainer,
    Title,
    Author,
    ContentContainer,
    IllustrationContainer,
    Illustration,
    CharacterContainer,
    CharacterList,
    ButtonContainer,
    Button,
    CustomNavLink
} from './Preview_Styled';

import { ImagesContext } from '../../App'; //EXTERNAL OBJECT TO PROVIDE VALUES TO BE USED

//IMPORTED ASSETS
import prv_load from '../../Assets/preview_load.gif';
const ww1 = require.context('../../Assets/ww1', false, /\.(png|jpe?g|svg|gif)$/);
const ww2 = require.context('../../Assets/ww2', false, /\.(png|jpe?g|svg|gif)$/);
const ww3 = require.context('../../Assets/ww3', false, /\.(png|jpe?g|svg|gif)$/);
const ww4 = require.context('../../Assets/ww4', false, /\.(png|jpe?g|svg|gif)$/);
const json = require.context('../../Assets', true, /^(?!.*concepts\/).*json$/);
const pos = require.context('../../Assets/concepts', true, /\.json$/);

function importAssets(r) {
    return r.keys().map(r);
}

export default function Preview({ diffLvl, setDiffPreview, setDiffLvl, setIsItBeforeThePuzzle, setToggleFormButtons }) {
    const { mainImages, setMainImages } = useContext(ImagesContext); //REACT CONTEXT
    const [assets, setAssets] = useState(); //THE ENTIRE ASSETS TO BE USED
    const [charNthChild, setCharNthChild] = useState(0); //USED AS AN INDEX WHEN HOVERING ITEM FROM A LIST
    const [toggleTransitionalEffect, setToggleTransitionalEffect] = useState(false); //CSS TRANSITIONS
    const info = importAssets(json); //FETCH INFO THAT ARE MEANT TO BE DISPLAYED
    const assetPos = importAssets(pos);
    const [characterAssets, setCharacterAssets] = useState(); //ALL ASSETS CATEGORIZED AS CHARACTERS 
    const timeoutRef = useRef(null);  //USED TO KEEP TRACK OF TIMEOUT

    const [screenDimensions, setScreenDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });
    //CHANGES THE WIDTH/HEIGHT STATE EVERY SCREEN RESIZE
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
    //SET THE STATE BASED ON THE DIFFICULTY LEVEL
    useEffect(() => {
        switch (diffLvl) {
            case 1:
                setAssets(importAssets(ww1));
                break;
            case 2:
                setAssets(importAssets(ww2));
                break;
            case 3:
                setAssets(importAssets(ww3));
                break;
            case 4:
                setAssets(importAssets(ww4));
                break;
            default:
                break;
        }
    }, [diffLvl])
    useEffect(() => {
        if (timeoutRef.current !== null) {       // IF THERE'S A RUNNING TIMEOUT
            clearTimeout(timeoutRef.current);    // THEN, CANCEL IT
        }

        timeoutRef.current = setTimeout(() => { // SET A TIMEOUT
            timeoutRef.current = null;           // RESET REF TO NULL WHEN IT RUNS
            return !toggleTransitionalEffect ? setToggleTransitionalEffect(true) : undefined;
        }, 100);                                //0.1 SECONDs
    }, [toggleTransitionalEffect])
    useEffect(() => {
        if (!assets) return;
        let temporaryHolderForCharAssets = [];
        const characterImages = mainIllustration(assets, false);
        for (const [i, v] of characterImages.entries()) {
            const posInfo = validateTitle(v, ...assetPos);
            temporaryHolderForCharAssets.push({
                dir: posInfo.dir,
                title: posInfo.title,
                posX: posInfo.x,
                posY: posInfo.y,
                userChoosePos: [],
                correctPos: undefined, //Subjective representation of un-attempted character find
                active: !i ? true : false,
                attempts: 0
            })
        }
        setCharNthChild(0);
        setCharacterAssets(temporaryHolderForCharAssets);
        //Validate which title matches the directory which is an image
        //and forming an object to be set as a context for another component
        function validateTitle(dir, charPos) {
            let temp = {
                dir: '',
                title: '',
                x: '',
                y: ''
            }
            for (const pos of charPos.pos) {
                const dirToTitle = directoryToTitle(dir.default);
                if (dirToTitle !== pos.title) {
                    continue;
                }
                temp.dir = dir.default;
                temp.title = dirToTitle;
                temp.x = pos.xRange;
                temp.y = pos.yRange;
                break;
            }
            return temp;
        }
    }, [assets])

    //TRANSITION TO DIFFICULTY SELECTOR COMPONENT
    function transitionFromPreviewToSelector(toggle = false) {
        //REVERT ALL STATES SINCE THE COMPONENT IS CONDITIONALLY DISPLAYED
        setDiffPreview({
            toggle: toggle
        })
        setDiffLvl(undefined);
        setToggleFormButtons(true);
    }

    //DETERMINE WHETHER IT IS THE PROPER CATEGORY THROUGH INTROSPECTION OF THE FILE TITLE BY SPLITTING THE CHARACTERS
    //USING (/ AND .) AS THE DELIMITERS 
    function determineIfItsWW(str, desiredOutput) {
        const newString = str.split(/[./]/);
        return newString.includes(desiredOutput);
    }

    //SEPARATE THE MAIN ILLUSTRATION FROM THE CHARACTER IMAGES
    function mainIllustration(arr, main = true) {
        const mainTitle = 'ww';
        const filteredImages = arr.filter(i => main ? determineIfItsWW(i.default, mainTitle) : !determineIfItsWW(i.default, mainTitle));
        return main ? filteredImages[0].default : filteredImages;
    }

    const directoryToTitle = (dirTitle) => {
        const separatedTitle = dirTitle.split(/[/.]/);
        const title = separatedTitle.filter(element => element.charAt(0) !== element.charAt(0).toLowerCase()).join('');
        return title.split('').includes('-') ? title.replace(/-/g, ' ') : title;
    }

    //SWITCH THE SCREEN TO THE MAIN FEATURE OF THE WEB APPLICATION
    function startWaldoGame(arr, charArr) {
        if (!arr && !charArr) return;
        setIsItBeforeThePuzzle(false);
        setMainImages({
            char: charArr,
            main: mainIllustration(arr),
            info: info[diffLvl - 1],
            levels: info
        });
        transitionFromPreviewToSelector();
    }

    function iterateCharacterList(arr) {
        const list = arr.map((img, i) => {
            return (
                <CharacterList key={i} toggle={toggleTransitionalEffect}>
                    <li
                        onMouseEnter={() => setCharNthChild(i + 1)}
                        onMouseLeave={() => setCharNthChild(0)}
                    >
                        {directoryToTitle(img.dir)}
                    </li>
                </CharacterList>
            )
        });
        return list;
    }

    return (
        <React.Fragment>
            <PreviewContainer>
                <TitleContainer>
                    <Title toggle={toggleTransitionalEffect} >
                        {info[diffLvl - 1].title}
                    </Title>
                    {info[diffLvl - 1].author &&
                        <Author toggle={toggleTransitionalEffect} >
                            {`by ${info[diffLvl - 1].author}`}
                        </Author>}
                </TitleContainer>
                <ContentContainer>
                    <IllustrationContainer toggle={toggleTransitionalEffect} height={screenDimensions.width <= 630 ? '25vh' : '35vh'} >
                        <h4> {`Difficulty: ${info[diffLvl - 1].difficulty}/5`}</h4>
                        <Illustration
                            toggle={toggleTransitionalEffect}
                            src={!assets ? prv_load
                                : charNthChild === undefined ?
                                    undefined : charNthChild === 0 ?
                                        mainIllustration(assets) : characterAssets[charNthChild - 1].dir}
                        />
                    </IllustrationContainer>
                    <CharacterContainer toggle={toggleTransitionalEffect}>
                        <p>List of characters to find:</p>
                        {characterAssets ? iterateCharacterList(characterAssets) : undefined}
                    </CharacterContainer>
                </ContentContainer>
                <ButtonContainer>
                    <CustomNavLink
                        to="/where-is-waldo/main"
                        toggle={toggleTransitionalEffect}
                        onClick={() => startWaldoGame(assets, characterAssets)}
                    >
                        {'Play'}
                    </CustomNavLink>
                    <Button
                        toggle={toggleTransitionalEffect}
                        onClick={() => transitionFromPreviewToSelector()}
                    > {'Return'}</Button>
                </ButtonContainer>
            </PreviewContainer>
        </React.Fragment>
    )
}