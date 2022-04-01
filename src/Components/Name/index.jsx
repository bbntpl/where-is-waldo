import React, { useState, useRef, useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faCheck, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uniqid from 'uniqid';
//styled components
import {
    FormContainer,
    IconInput,
    EnterName,
    LabelStyled,
    InputContainer,
    InputToEnterName,
    ClearAndEnterButtons,
    EnterOrCancelInput,
    InputBorderTransition,
    ErrorWarning
} from './Name_Styled';

//js functions
import { checkUser, createUser, fetchUser } from '../../js/storage';

library.add(faUser, faCheck, faTimes, faEdit);
export function Name({ user, setUser, toggleEditMode, setToggleEditMode, toggleFormButtons, setToggleFormButtons }) {
    //state for component toggle
    const [validationText, setValidationText] = useState();
    const NameInputRef = useRef(null)

    //Set the username if the local storage is currently existed.
    useEffect(()=>{
        const user = fetchUser();
        const isUserNew = !checkUser(user);
        if(!isUserNew){
            setUser({ name: user.name })
            setToggleEditMode(false);
        }
    }, [])

    function clearInputField(e) {
        e.preventDefault();
        NameInputRef.current.value = '';
        e.target.value = '';
        revealButtonsWhenTextIsNotEmpty(e);
    }

    function preventUniqidOverwrite(user) {
        if(user === null || user === undefined){
            return uniqid();
        }
        return user.id;
    }

    function submitUserName(e) {
        const val = NameInputRef.current.value;
        e.preventDefault();
        if (typeof inputValidationText(val) === 'boolean') {
            setUser({ name: val });
            setToggleEditMode(false);
            createUser(val, preventUniqidOverwrite(fetchUser()));
        }
        setValidationText(inputValidationText(val));
    }
 
    function inputValidationText(value) {
        if (value.match(/[^a-zA-Z]/i) && (value.length < 2 || value.length > 16)) {
            return (`* Only alpha characters are allowed.
* The length of username must be between 2 to 16.`);
        } else if (value.match(/[^a-zA-Z]/i)) {
            return '* Only alpha characters are allowed'
        } else if (value.length < 2 || value.length > 16) {
            return '* The length of username must be between 2 to 16';
        }
        return true;
    }

    function revealButtonsWhenTextIsNotEmpty(e) {
        setUser({ name: e.target.value });
        if (e.target.value !== '') {
            setToggleFormButtons(true);
        } else {
            setToggleFormButtons(false);
        }
    }

    function renderClearAndEnterButtons() {
        if (toggleFormButtons && toggleEditMode) {
            return (
                <ClearAndEnterButtons>
                    <EnterOrCancelInput
                        bgcolor={'-webkit-linear-gradient(45deg, #FFC107 0%, #ff8b5f 100%)' || 'linear-gradient(45deg, #FFC107 0%, #ff8b5f 100%)'}
                        onClick={submitUserName}
                        onEnter={submitUserName}
                    >
                        <FontAwesomeIcon icon='check' />
                    </EnterOrCancelInput>
                    <EnterOrCancelInput
                        bgcolor={'-webkit-linear-gradient(45deg, #dc4e4e 0%, #d0220e 100%)' || 'linear-gradient(45deg, #dc4e4e 0%, #d0220e 100%)'}
                        onClick={clearInputField}
                    >
                        <FontAwesomeIcon icon='times' />
                    </EnterOrCancelInput>
                </ClearAndEnterButtons>
            )
        }
    }
    function editButton() {
        function editMode(e) {
            e.preventDefault();
            setToggleEditMode(true);
            if(NameInputRef.current.value !== ''){
                setToggleFormButtons(true);
            }
        }
        if (user.hasOwnProperty('name') && !toggleEditMode)
            return (
                <EnterOrCancelInput
                    bgcolor={'-webkit-linear-gradient(45deg, #6CC0FF 0%, #0091FF 100%)' || 'linear-gradient(45deg, #6CC0FF 0%, #0091FF 100%)'}
                    onClick={editMode}
                >
                    <FontAwesomeIcon icon='edit' />
                </EnterOrCancelInput>
            )
    }

    return (
        <EnterName>
            <FormContainer>
                <div style={{ position: 'relative' }}>
                    <LabelStyled>What's your name?</LabelStyled>
                    <InputContainer>
                        <IconInput>
                            <FontAwesomeIcon icon='user' />
                        </IconInput>
                        <InputToEnterName
                            ref={NameInputRef}
                            value={user.name || ''}
                            onChange={revealButtonsWhenTextIsNotEmpty}
                            disabled={!toggleEditMode}
                        >
                        </InputToEnterName>
                        {editButton()}
                    </InputContainer>
                    <InputBorderTransition changeWidthAfterHover={toggleEditMode ? '92%' : '0%'}/>
                    <ErrorWarning>
                        {validationText}
                    </ErrorWarning>
                </div>
                {renderClearAndEnterButtons()}
            </FormContainer>
        </EnterName>
    )
}