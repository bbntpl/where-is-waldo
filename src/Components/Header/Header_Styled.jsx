import styled from 'styled-components';

export const TopNav = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 0;
    padding: 0 20px;
    width: 100%;
    max-width: 100%;
    background-color: #B00AFF;
    height: 80px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.6);
    &{
      color: white;  
    }
    a,li{ cursor: pointer; }
`

export const LinkStyled = styled.div`
    a{
        display: block;
        color: #efe;
    }
`

export const TopNavLogo = styled.img`
    width: ${props=> props.width};
`

export const ProfileWrapper = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    width: ${props => props.width};
`