import React, { useState, useEffect } from 'react';

//Fontawesome packages
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    SideNav,
    RoundImg,
    ImageContainer,
    IconOverlay
} from './Right_Nav_Styled';

library.add(faCheckCircle);
export function ImagesToFind({ mainChars, mainPosY, activeIndex, setActiveIndex }) {
    //position of the element relative to the viewport
    const [y, setY] = useState(mainPosY);
    const iterateCharacterRoundImages = mainChars.map((img, i, arr) => {

        return (
            <ImageContainer>
                <RoundImg
                    key={i}
                    src={img.dir}
                    onClick={() => handleActiveIndex(arr, i)}
                    borderColor={() => conditionalBorderColor(arr, activeIndex, i)}
                    opacity={img.correctPos ? '.4' : '1'}
                    hoverBorder={img.correctPos ? 'green' : 'yellow'}
                    cursor={img.correctPos ? 'default' : 'pointer'}
                />
                <IconOverlay visibility={img.correctPos ? 'visible' : 'hidden'}>
                    <FontAwesomeIcon icon={'check-circle'} size='3x' />
                </IconOverlay>
            </ImageContainer>

        )
    })

    function conditionalBorderColor(arr, activeIndex, index) {
        if (arr[index].active && activeIndex === index) {
            return ('yellow');
        } else if (arr[index].correctPos) {
            return ('green');
        } else if (!arr[index].attempts || arr[index].correctPos === undefined) {
            return ('gray');
        } else if (arr[index].attempts > 0 && !arr[index].correctPos) {
            return ('red');
        }

    }

    //Switch active border after click
    function handleActiveIndex(arr, i) {
        if (arr.completedPos) return;
        setActiveIndex(i);
    }

    //Trigger to render every props update
    useEffect(() => {
        setY(mainPosY);
    }, [mainPosY]);

    return (
        <SideNav pos={y <= 0 ? 'fixed' : 'absolute'}>
            {iterateCharacterRoundImages}
        </SideNav>
    )
}