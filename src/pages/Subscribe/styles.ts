import styled, { css } from 'styled-components';
import { shade } from 'polished';

import { loadFromTransparent, bringFromLeft } from './animations';

import Button from '../../components/Button';
import Card from '../../components/Card';

import SubscribeBackground from '../../assets/img/subscribeForm.png';


interface Test {
  load?: boolean;
}

interface ImgProps {
  isRight?: boolean;
}

interface StyledButtonProps {
  countdownOver?: boolean;
}

export const PageGame = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const FormHeader = styled.div`
  padding-left: 3%;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  margin-bottom: 16px;
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
  height: 100vh;

  display: flex;
  justify-content: center;
  position: fixed;

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

  width: 1500px;
  height: 1500px;

  background-image: url(${SubscribeBackground});
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: center;
  background-position-y: center;
  text-align: center;
  margin-left: -190px;

  a {
    font-family: 'Poppins';
    text-decoration: none;
    color: #fff;

    transition: color 0.3s;

    &:hover {
      color: ${shade(0.4, '#fff')};
    }
  }

  .macroForm {
    display: flex;
    width: 100%;
    height: 90vh;
    margin-top: 32px;
    padding: 0px 140px;
    margin-bottom: 10%;
    justify-content: space-around;
    align-content: center;
    align-items: center;

    @media (max-height: 635px) {
      padding: 0px 314px;
    }
  }

  .leftForm {
    padding-bottom: 8%;
    margin-left: -65px;
    
    @media (max-height: 835px) {
      padding-bottom: 5%;
      margin-left: -5px;
    }
  }

  .rightForm {
    display: "flex";
    flex-direction: "column";

    @media (max-height: 835px) {
      margin-top: 25px;
    }
  }

  .select {
    width: 100%;
  }
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

export const StyledButton = styled(Button)<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  border-radius: 200px;

  width: 40%;
  height: 40px;

  background: #097D45;
  color: #fff;

  font-family: 'Poppins';
  font-size: 14px;

  &:hover {
    background: ${shade(0.4, '#097D45')};
  }
  
  @media (max-height: 835px) {
    height: 30px;
  }
`;

export const ImageContainer = styled.div<ImgProps>`
  position: relative;
  display: flex;

  flex-shrink: 0;
  margin-left: 165px;

  .main-profile-img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: solid 2px #dbdbdb;

    @media (max-height: 835px) {
      width: 40px;
      height: 40px;
    }
  }
  @media (max-height: 835px) {
    margin-left: 120px;
  
    ${(props) =>
      props.isRight
        && css`
        margin-left: 90px;
    `}
  }

  ${(props) =>
    props.isRight
      && css`
      margin-left: 120px;
  `}
`;

export const ImageComponents = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 22%;

  margin-bottom: 2%;

  .imageUploader {
    display: flex;
  }
`;

export const MainImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const LContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  align-itens: center;
  align: center;
  justify-content: left;

  margin-left: 22em;
  margin-top: 2em;
`;

export const SelectC = styled.div`
  background: #fff;
  border-radius: 10px;

  display: flex;
  align-items: center;

  padding: 16px;
  width: 111%;
  height: 56px;
  margin-left: 4px;

  border: 2px solid #232129;
  color: #666360;

  & + div {
    margin-top: 8px;
  }

  transition: border 0.3s;

  input {
    background: transparent;
    flex: 1;
    border: 0;

    color: #000;
    &::placeholder {
      color: #666360;
    }
  margin-right: 40px;

  }

  svg {
    margin-right: 16px;
  }

  @media (max-height: 835px) {
    height: 35px;
    width: 86%;
  }
`;

export const LogoContent = styled.div`
  width: 100%;
  height: 40px;
  z-index: 999;

  display: flex;
  align-items: left;
  justify-content: left;
`;

export const LogoOptions = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 999;


  margin-left: auto;

  a {
    text-decoration: none;
  }

  p {
    margin-right: 48px;

    transition: color 0.4s;

    font-family: 'Poppins';
    font-size: 18px;

    &:hover {
      cursor: pointer;
      color: ${shade(0.4, '#bdbdbd')};
    }
  }
`;

export const Logo = styled.img`
  height: 40px;
  z-index: 999;

  opacity: 1;
`;