import styled from 'styled-components';
export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: max-content;
`
export const TextInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.justifyContent};
    align-items: center;
    color: black;
    font-size: clamp(1.2em, 1.5vw, 2.4em);
    padding: 5px 2px;
    width: inherit;
`
export const MainTop = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #e7b7ff;
    box-shadow: inset 0 -2px 4px rgba(0,0,0,0.6);
    margin-top: 80px;
    width: 100%;
`
export const MainBottom = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    width: 100%;
    max-width: 100%;
    min-height: min-content;
    height: ${props => props.height};
    max-height: 5000px;
`
export const ImageAsCanvas = styled.canvas`
    height: ${props => props.height};
    flex: 1;
    cursor: crosshair;
    transition: width .3s ease-in-out, height .3s ease-in-out;
`