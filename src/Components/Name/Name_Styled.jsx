import styled from 'styled-components';

export const EnterName = styled.div`
    display: flex;
    min-height: max-content;
`

export const FormContainer = styled.form`
    display: inline;
    width: max-content;
`

export const IconInput = styled.div`
    background-image: ${props => props.icon};
    margin-right: -15px;
`

export const InputContainer = styled.div`
    display: flex;
    align-items: center;
`
export const InputToEnterName = styled.input.attrs(props => ({
    maxlength: props.maxlength || 20,
    minlength: props.minlength || 1
}))`
    border: none;
    background-color: transparent;
    border-bottom: 3px solid #010101;
    text-align: center; 
    width: 240px;
    height: 50px;
    margin-right: 25px;
    font-size: 1.2rem;
    &:hover, &:active, &:focus{
        outline: none;
        border-bottom: 3px solid #010101;
    }
    transition: opacity .35s linear;
`
export const LabelStyled = styled.label`
    display: flex;
    align-self: left;
    color: red;
`

export const InputBorderTransition = styled.span`
    display: inline-block;
    width: 0px;
    height: 4px;
    background: #FEC938;
    position: absolute;
    bottom: 35%;
    margin-left: -1px;
    -webkit-transition: all ease-in-out .45s;
    -o-transition: all ease-in-out .45s;
    transition: all ease-in-out .45s;
    ${InputContainer}:focus-within ~ &, ${InputContainer}:hover ~ &, &:hover {
        width: ${props => props.changeWidthAfterHover};
    }
    z-index: 15;
`

export const ClearAndEnterButtons = styled.div`
    display: flex;
    position: relative;
    flex-direction: row;
    width: 50%;
    justify-content: center;
`
export const EnterOrCancelInput = styled.button`
    display: inline-block;
    padding: 0.5em 0.5em;
    text-decoration: none;
    color: #ffffff;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
    border-bottom: solid 3px #c58668;
    border-radius: 50%;
    border: none;
    margin: 0 auto;
    min-width: 40px;
    min-height: 40px;
    max-width: 60px;
    max-height: 60px;
    height: 50px;
    width: 50px;
    opacity: 1;
    background-image: ${props => props.bgcolor};
    cursor: pointer;
    &:active{
        -ms-transform: translateY(4px);
        -webkit-transform: translateY(4px);
        transform: translateY(4px);
        box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);
        border-bottom: none;
    }
    transition: opacity 0.145s ease-in-out;
`

export const ErrorWarning = styled.span`
    display: inline-block;
    color:red;
    text-shadow: 1px 1px #FF6565;
    font-size: 0.8rem;
    text-align: left;
    opacity: 1;
    height: 34px;
    width: 100%;
    white-space: pre-wrap; 
    transition: opacity 0.3 ease-in;
`