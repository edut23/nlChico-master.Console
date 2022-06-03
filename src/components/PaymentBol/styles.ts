import styled, { css } from 'styled-components';
import { shade } from 'polished';

import { loadFromTransparent, bringFromLeft } from './animations';

import Button from '../Button';
import Card from '../Card';
import Input from '../Input';

interface Test {
  load?: boolean;
}

interface StyledButtonProps {
  countdownOver?: boolean;
}

export const PageGame = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const TContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 8em;
  position: relative;

  padding: 3px;

  animation: ${loadFromTransparent} 1.4s;

  .QRText {
    transition: color 0.4s;
    font-family: 'Poppins';
    font-size: 12px;
    text-align: center;
    margin: 0;
  }
`;


export const PageWrapper = styled.div`
  display: flex;
`;

export const CircleContent = styled(Card)<Test>`
  width: 400px;
  height: 438px;

  display: flex;
  justify-content: flex-start;
  position: relative;

  margin-left: -12em;

  ${(props) =>
    props.load
      ? css`
          animation: ${bringFromLeft} 1s;
        `
      : css`
          animation: ${bringFromLeft} 1s;
        `}

  .rccs__card > div {
    margin: 6px 0 0px 9px;
    height: 92%;
    width: 95%;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: auto;
  align-self: flex-start;
  margin-left: 70px;
  margin-top: 43px;

  text-align: center;

  a {
    font-family: 'Poppins';
    text-decoration: none;
    color: #fff;

    transition: color 0.3s;

    &:hover {
      color: ${shade(0.4, '#fff')};
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
  }
`;

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

  @media (max-width: 700px) {
    padding: 0 32px;
  }
`;

export const StyledButton = styled(Button)<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 4%; */
  width: 40%;

  background: #fb7c1f;
  color: #fff;

  font-family: 'Poppins';
  font-size: 24px;

  &:hover {
    background: ${shade(0.4, '#fb7c1f')};
  }

  ${(props) =>
    props.countdownOver &&
    css`
      width: 100%;
    `}
`;

export const StyledInput = styled(Input)`
  /* width: 300px; */
`;
