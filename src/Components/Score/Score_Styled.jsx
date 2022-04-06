import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const UserScores = styled.div`
    width: 100%;
    height: max-content;
    margin-left: -20px;
    table {
      font-size: clamp(0.7rem, 0.8vw, 1.2rem);
        margin: 0 auto;
        border-spacing: 2px 10px;
        tr {
          :last-child {
            td {
              border-bottom: 0;
            }
          }
        }
    
        th,
        td {
          padding: 0.2rem;
          text-align: left;
          :last-child {
            border-right: 0;
          }
        }
      }
`
export const ModalContainer = styled.div`
    background-color: rgba(0,0,0,0.3);
    width: 100%;
    height: 100%;
    position: fixed;
    visibility: ${props => props.toggle ? 'visible' : 'hidden'};
    opacity: ${props => props.toggle ? 1 : 0};
    z-index: 20;
`

export const Modal = styled.div`
    display:flex;
    flex-direction: column;
    position: relative;
    min-width: 320px;
    min-height: 280px;
    width: 26vw;
    height: 20vw;
    max-width: 800px;
    max-height: 616px;
    left: 50%;
    top: 50%;
    color: aliceblue;
    visibility: ${props => props.toggle ? 'visible' : 'hidden'};
    transform: ${props => props.toggle ? 'translate(-50%, -30%) translateY(0)' : 'translateY(5000px)'};
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 18;
`

export const ModalTabContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: row;
    width: 100%;
    height: 25%;
`

export const ModalTab = styled.div`
    width: 50%;
    height: 120%;
    padding: 4px;
    border-radius: 15px;
    cursor: pointer;
    background-color: ${props => props.bgColor};
`

export const ModalMainDisplay = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    font-size: clamp(0.7rem, 1vw, 2rem);
    background-color: #B00AFF;
    height: 75%;
    margin-top: -2.4em;
    padding-left: 20px;
    border-radius: 15px;
`

export const RestartBtn = styled(Link)`
    margin: 0 auto;
    cursor: pointer;
    margin-bottom: .5rem;
    background-color: #9611CE;
    color: aliceblue;
    border: none;
    font-size: 16px;
    height: 40px;
    width: 100px;
    &:hover{
        transform: translateY(5px);
    }
    &:active{
        box-shadow: none;
        transform: scale(0.9);
    }
    box-shadow: 1px 2px 4px #810CB3;
    transition: all .2s ease;
    text-decoration: none;
    padding-top: .6em;
`