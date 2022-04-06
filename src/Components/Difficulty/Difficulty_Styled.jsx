import styled from 'styled-components';

export const DifficultyContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 15px;
    height: max-content;
    width: max-content;
    max-width: 70vw;
`

export const DifficultyCircle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin: 7px 7px;
    opacity: 0.5;
    transition: opacity 0.9s ease;
    text-align: center;
    cursor: pointer;
`

export const DifficultyOuterCircle = styled(DifficultyCircle)`
    position: relative;
    height: 15vh;
    width: 15vh;
    background-image: -webkit-gradient(linear, left top, left bottom, from(#d7d7d7), to(#c7c7c7));
    background-image: -webkit-linear-gradient(top, #d7d7d7, #c7c7c7); 
    background-image: -moz-linear-gradient(top, #d7d7d7, #c7c7c7); 
    background-image: -ms-linear-gradient(top, #d7d7d7, #c7c7c7); 
    background-image: -o-linear-gradient(top, #d7d7d7, #c7c7c7); 
    box-shadow: 0px 3px 8px #aaa, inset 0px 2px 3px #fff;
    &:hover{
        opacity: 1;
        box-shadow: 0px 3px 8px #aaa, inset 2px 1px 3px ${props => props.bsinset};
        background-image: -webkit-gradient(linear, left top, left bottom, from(${props => props.bgoutertop}), to(${props => props.bgouterbottom}));
        background-image: -webkit-linear-gradient(top, ${props => props.bgoutertop}, ${props => props.bgouterbottom}); 
        background-image: -moz-linear-gradient(top, ${props => props.bgoutertop}, ${props => props.bgouterbottom}); 
        background-image: -ms-linear-gradient(top, ${props => props.bgoutertop}, ${props => props.bgouterbottom}); 
        background-image: -o-linear-gradient(top, ${props => props.bgoutertop}, ${props => props.bgouterbottom}); 
    }
`

export const DifficultyInnerCircle = styled(DifficultyCircle)`
    height: 8vh;
    width: 8vh;
    background-color: #B9B9B9;
    box-shadow: inset -3px -3px 2px 1px #f0f0f0;
    color: ${props => props.iconcolor};
    ${DifficultyOuterCircle}:nth-child(${prop => prop.index}):hover &{
        opacity: 1;
        color: white;
        box-shadow: inset -3px -3px 2px 1px ${props=>props.inneredge};
        background-image: -webkit-linear-gradient(135deg, ${props => props.innerlight} 0%, ${props => props.innerdark} 100%); 
        background-image: -moz-linear-gradient(135deg, ${props => props.innerlight} 0%, ${props => props.innerdark} 100%); 
        background-image: -ms-linear-gradient(135deg, ${props => props.innerlight} 0%, ${props => props.innerdark} 100%); 
        background-image: -o-linear-gradient(135deg, ${props => props.innerlight} 0%, ${props => props.innerdark} 100%); 
    }
`