import styled from 'styled-components';

export const SideNav = styled.div`
    background-color: transparent;
    width: min-content;
    height: max-content;
    position: ${props => props.pos};
    top:  0;
    right: 0;
    transition: all .5s linear;
    z-index: 8;
`
export const RoundImg = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: 4px 7px;
    cursor: ${props => props.cursor};
    opacity: ${props => props.opacity};
    border: 3px solid ${props => props.borderColor};
    &:hover{
        border: 3px solid ${props => props.hoverBorder};
    }
    user-select: none;
`

export const ImageContainer = styled.div`
    position: relative;
`
export const IconOverlay = styled.div`
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    bottom: 0;
    visibility: ${props => props.visibility}
`