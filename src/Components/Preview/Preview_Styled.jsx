import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FlexBoxRowEvenly = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;
export const PreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    font-size: 16px;
    color: white;
    width: 100%;
    margin-top: 90px;
`;

export const TitleContainer = styled.div`
    display: block;
    margin: 0 auto;
    max-width: 100%;
    width: max-content;
`;
export const Title = styled.header`
    font-size: clamp(1.4em, 1.8vw, 2.4em);
    opacity: ${props => props.toggle ? 1 : 0};
    transform: ${props => props.toggle ? 'translateY(0)' : 'translateY(140px)'};
    transition: all 0.7s ease-in;
`;
export const Author = styled.h3`
    font-size: clamp(1.1em, 1.2vw, 2.4em);
    opacity: ${props => props.toggle ? 1 : 0};
    transform: ${props => props.toggle ? 'translateY(0)' : 'translateY(140px)'};
    transition: all 0.6s ease-in;
`;
export const ContentContainer = styled(FlexBoxRowEvenly)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-width: 40vw;
    width: min-content;
    height: max-content;
    max-width: 85%;
`;
export const IllustrationContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: ${props => props.height};
    margin: 4px 5vw;
    h4{
        font-weight: 200;
        font-size: clamp(1.1em, 1.2vw, 2.4em);
        opacity: ${props => props.toggle ? 1 : 0};
        transform: ${props => props.toggle ? 'translateX(0)' : 'translateX(-360px)'};
        transition: all 0.5s ease-in;
    }
`

export const Illustration = styled.img`
    max-width: 90vw; 
    max-height: 80%;
    opacity: ${props => props.toggle ? 1 : 0};
    transform: ${props => props.toggle ? 'translateX(0)' : 'translateX(-360px)'};
    transition: all 0.4s ease-in;
`;
export const CharacterContainer = styled.div`
    height: max-content;
    width: max-content;
    max-width: 40vw;
    margin-right: 5vw;
    font-size: clamp(.9rem, 1.1vw, 1.8rem);
    p{
        opacity: ${props => props.toggle ? 1 : 0};
        transform: ${props => props.toggle ? 'translateX(0)' : 'translateX(360px)'};
        transition: all 0.4s ease-in;
    }
`;
export const CharacterList = styled.ul`
    li{
        cursor: pointer;
        list-style-type: circle;
        text-align: left;
        opacity: ${props => props.toggle ? 1 : 0};
        transform: ${props => props.toggle ? 'translateX(0)' : 'translateX(360px)'};
        transition: all 0.2s ease-in;
        font-size: clamp(0.9rem, 1vw, 1.8rem);
    }
    li:hover{
        text-decoration: underline;
    }

`;
export const ButtonContainer = styled(FlexBoxRowEvenly)`
    width: 50%; 
    max-width: 100%;   
    padding: 15px 5px;
    margin-top: 30px;
`;
export const Button = styled.button`
    font-weight: 700;
    margin: 0 15px;
    border-radius: 10px;
    border: 3px solid rgb(56,56,56);
    padding: 2px 15px;
    color: black;
    background-color: white;
    transition: all 300ms ease-in-out;
    cursor: pointer;
    font-size: clamp(0.9rem, 1.3vw, 2rem);
    &:hover{
        color: white;
        background-color: black;
        border: 3px solid #000;
    }
    opacity: ${props => props.toggle ? 1 : 0};
    transform: ${props => props.toggle ? 'translateY(0)' : 'translateY(140px)'};
    transition: all 0.3s ease-in;
    text-decoration: none;
`;
export const CustomNavLink = Button.withComponent(Link);