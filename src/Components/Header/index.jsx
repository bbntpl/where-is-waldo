import React, { useRef } from 'react';

//font awesome packages
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faTrophy, faUser } from '@fortawesome/free-solid-svg-icons';

//react route
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import {
    TopNav,
    LinkStyled,
    TopNavLogo,
    ProfileWrapper
} from './Header_Styled';

//components
import DifficultySelector from '../Start';
import Main from '../Main/Main'
import { Leaderboard } from '../Leaderboard/Leaderboard';

//assets 
import wwl from '../../Assets/topnav/wwl.svg';
import face from '../../Assets/topnav/faceQ.svg';

//reusable react functions
import useComponentVisible from '../useComponentVisible';

library.add(far, faUser, faTrophy);
//information about the waldo levels
const levelInfo = require.context('../../Assets/', true, /info\.*json$/);
const importAssets = (r) => r.keys().map(r);

export default function Nav({ isItBeforeThePuzzle, setIsItBeforeThePuzzle, user, setUser }) {
    const linkRef = useRef(null);
    const { elementRef, isComponentVisible, setIsComponentVisible } = useComponentVisible(false, linkRef);

    function handleToggleDisplay() {
        setIsComponentVisible(!isComponentVisible);
    }

    return (
        <Router>
            <>
                <TopNav>
                    {returnToStart(isItBeforeThePuzzle, setIsItBeforeThePuzzle)}
                    <div style={{ display: 'flex' }}>
                        <TopNavLogo src={wwl} width={'50%'} alt="logo" />
                        <TopNavLogo src={face} width={'20%'} alt="logo" />
                    </div>
                    <ProfileWrapper width={'200px'}>
                        <li ref={linkRef} onClick={() => handleToggleDisplay()}>
                            <FontAwesomeIcon icon='trophy' />
                        </li>
                        {!isItBeforeThePuzzle &&
                            <p style={{
                                display: 'flex',
                                alignItems: 'center',

                            }}>{user.name}</p>
                        }
                    </ProfileWrapper>
                </TopNav>
                <div ref={elementRef} >
                    {isComponentVisible ? <Leaderboard level={importAssets(levelInfo)} /> : null}
                </div>
                <Route path="/where-is-waldo" exact>
                    <DifficultySelector
                        user={user}
                        setUser={setUser}
                        setIsItBeforeThePuzzle={setIsItBeforeThePuzzle}
                    />
                </Route>
                <Route path="/where-is-waldo/main" exact>
                    <Main setIsItBeforeThePuzzle={setIsItBeforeThePuzzle} />
                </Route>
            </>
        </Router>
    )
}

function returnToStart(start, setStart) {
    if (!start) {
        return (
            <LinkStyled>
                <FontAwesomeIcon icon={['far', 'arrow-alt-circle-left']} />
                <Link to="/where-is-waldo/" onClick={() => setStart(true)}>Go back</Link>
            </LinkStyled>
        )
    }
}