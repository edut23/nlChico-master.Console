import styled, { css } from 'styled-components';
import { shade } from 'polished';

import { loadFromTransparent, bringFromLeft } from './animations';

import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import paymentConsole from '../../assets/img/paymentConsole.png';
import cardConsole from '../../assets/img/cardConsole.png';

interface Test {
  load?: boolean;
}

interface StyledButtonProps {
  countdownOver?: boolean;
}

interface CircleContainerProps {
  payment: string;
}

export const PageGame = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const TContainer = styled.div`
  width: 100vw;
  height: 87.9vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  

  padding: 18px;

  animation: ${loadFromTransparent} 1.4s;
`;

export const PageWrapper = styled.div`
  display: flex;
`;

export const CircleContent = styled(Card)<CircleContainerProps>`
  width: 500px;
  height: 500px;

  display: flex;
  justify-content: center;
  position: relative;
  ${(props) =>
    props.payment === 'card'
      && css`
          background-image: url(${cardConsole});
          width: 797px;
          height: 539px;
        `}

  ${(props) =>
    props.payment === 'pix'
      && css`
          background-image: url(${cardConsole});
          width: 797px;
          height: 539px;
        `}

  ${(props) =>
    props.payment !== 'card' && props.payment !== 'pix'
      && css`
        background-image: url(${paymentConsole});
        
        @media (min-width: 1500px) {
          margin-left: 500px;
        }
      `}
 
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: center;
  background-position-y: center;  
  padding: 0 38px;

  margin-left: 17em;
  animation: ${bringFromLeft} 1s;
`;

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: auto;
  margin-top: 12%;

  text-align: center;

  a {
    font-family: 'Poppins';
    text-decoration: none;

    transition: color 0.3s;

    &:hover {
      color: ${shade(0.4, '#fff')};
    }
  }
`;

export const Content = styled.p`
  width: 440px;

  text-align: center;
  margin-top: 2em;

  font-family: 'Poppins';
  font-size: 18px;

`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 50px;

  a {
    text-decoration: none;
  }

  @media (max-width: 700px) {
    padding: 0 32px;
  }
`;

export const BackButton = styled(Button)<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7%;

  background: #fb7c1f;
  color: #fff;

  &:hover {
    background: ${shade(0.4, '#fb7c1f')};
  }

  font-family: 'Poppins';
  font-size: 18px;

  ${(props) =>
    props.countdownOver &&
    css`
      width: 100%;
    `}
`;

export const StyledButton = styled(Button)<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 40px;
  border-radius: 220px;

  color: #fff;

  font-family: 'Poppins';
  font-size: 14px;
  

  ${(props) =>
    props.countdownOver ? 
    css`
    background: #09537D;
    &:hover {
      background: ${shade(0.4, '#09537D')};
    }
    ` :
    css`
    background: #097D45;
    &:hover {
      background: ${shade(0.4, '#097D45')};
    }
    `}
`;



export const StyledInput = styled(Input)`
  /* width: 300px; */
`;

export const Logo = styled.img`
  height: 40px;
  position: absolute;

  opacity: 1;
`;

export const LogoContent = styled.div`
  width: 100%;
  height: 40px;

  display: flex;
  align-items: left;
  justify-content: left;
`;

export const LogoOptions = styled.div`
  display: flex;
  flex-direction: row;

  margin-left: auto;

  a {
    text-decoration: none;
  }

  p {
    margin-right: -40px;
    margin-top: -55px;
    margin-left: -66px;

    transition: color 0.4s;

    font-family: 'Poppins';
    font-size: 14px;
  }

  .amount {
    width: 150%;
    text-align: center;
  }
`;
