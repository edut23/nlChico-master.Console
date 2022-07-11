import styled, { css } from 'styled-components';
import { shade } from 'polished';

import { loadFromTransparent, bringFromLeft } from './animations';
import FormBackground from '../../assets/img/imageForm.png';

import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';

interface Test {
  load?: boolean;
}

interface StyledButtonProps {
  countdownOver?: boolean;
  isGreen?: boolean;
}

export const PageGame = styled.div`
  width: 100vw;
  height: 100vh;

  .loading {
    margin-top: 25vh;
    margin-left: 25vw;
  }
`;

export const TContainer = styled.div`
  width: 90vw;
  height: 0vh;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 18px;

  animation: ${loadFromTransparent} 1.4s;
`;

export const PageWrapper = styled.div`
  display: flex;
`;

export const CircleContent = styled(Card) <Test>`
  width: 100vw;
  height: 80vh;

  display: flex;
  justify-content: center;
  position: fixed;
  margin-top: 50px;

  ${(props) =>
    props.load
      ? css`
          animation: ${bringFromLeft} 1s;
        `
      : css`
          animation: ${bringFromLeft} 1s;
        `}
`;

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 95%;

  background-image: url(${FormBackground});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50%, 50%;
  text-align: center;
  padding: 0px 55px;

  a {
    font-family: 'Poppins';
    text-decoration: none;
    color: #fff;

    transition: color 0.3s;

    &:hover {
      color: ${shade(0.4, '#fff')};
    }
  }
`;

export const Margin = styled.div`
  margin-left: 5%
`

export const Content = styled.p`
  width: 440px;

  text-align: center;
  margin-top: 2em;

  font-family: 'Poppins';
  font-size: 18px;

  color: #fff;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  a {
    text-decoration: none;
  }
`;

export const FormHeader = styled.div`
  width: 85%;
  padding-left: 3%;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  margin-bottom: 16px;
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
`;

export const StyledButton = styled(Button) <StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 200px;

  width: 40%;
  height: 40px;

  background: #006DBC;
  color: #fff;

  font-family: 'Poppins';
  font-size: 14px;

  &:hover {
    background: ${shade(0.4, '#fb7c1f')};
  }

  ${(props) =>
    !props.isGreen
      ? css`
        background: #006DBC;
        `
      : css`
        background: #097D45;
  `}
`;

export const StyledInput = styled(Input)`
  /* width: 300px; */
`;

export const Logo = styled.img`
  height: 40px;
  width: 40px;

  opacity: 1;
`;

export const LogoContent = styled.div`
  width: 10%;
  height: 370px;

  display: flex;
  align-items: left;
  justify-content: left;
  position: relative;
`;

export const LogoOptions = styled.div`
  display: flex;
  flex-direction: row;

  margin-left: auto;
`;

export const LContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  align-itens: center;
  align: center;
  justify-content: center;

  margin-left: 20vw;
  margin-top: 0vh;
`;

