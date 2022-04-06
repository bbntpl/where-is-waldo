import React, { useState } from 'react';
import styled from 'styled-components';

import { Name } from './Name';
import Difficulty from './Difficulty/Difficulty';
import Preview from './Preview/Preview';

//only styled component
const Start = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${props => props.bgColor};
    color: ${props => props.color};
    align-items: center;
    text-align: center;
    min-height: 100vh;
    height: max-content;
    transition: all 0.8s ease;
`
export default function DifficultySelector({ user, setUser, setIsItBeforeThePuzzle }) {
    const [toggleEditMode, setToggleEditMode] = useState(true);
    const [toggleFormButtons, setToggleFormButtons] = useState();
    const [diffPreview, setDiffPreview] = useState({});
    const [diffLvl, setDiffLvl] = useState();

    return (

        <Start
            bgColor={!diffPreview.toggle ? '#e7b7ff' : '#000'}
            color={diffPreview.toggle ? 'white' : undefined}
        >
            {!diffPreview.toggle ?
                <>
                    <Name
                        user={user}
                        setUser={setUser}
                        toggleEditMode={toggleEditMode}
                        setToggleEditMode={setToggleEditMode}
                        toggleFormButtons={toggleFormButtons}
                        setToggleFormButtons={setToggleFormButtons}
                    />
                    {user.hasOwnProperty('name') && !toggleEditMode ? <Difficulty setDiffPreview={setDiffPreview} setDiffLvl={setDiffLvl} /> : null}
                </> :
                <>
                    <Preview
                        diffLvl={diffLvl}
                        setDiffPreview={setDiffPreview}
                        setDiffLvl={setDiffLvl}
                        setIsItBeforeThePuzzle={setIsItBeforeThePuzzle}
                        setToggleFormButtons={setToggleFormButtons}
                    />
                </>
            }
        </Start>
    )
}