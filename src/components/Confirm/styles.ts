import styled, { keyframes, css } from 'styled-components';
import { shade } from 'polished';
import confirm from '../../assets/img/confirm.png';

import Button from '../Button';

interface AlertProps {
  show?: boolean;
}

interface CustomButtonProps {
  bg?: string;
}

const loadFromOpacity = keyframes`
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`;

export const Container = styled.div<AlertProps>`
  position: absolute;

  width: 100vw;
  height: 100vh;

  ${(props) =>
    props.show &&
    css`
      animation: ${loadFromOpacity} 0.6s;
    `}

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: rgba(0, 0, 0, 0.7);
  z-index: 100;


  font-family: 'Poppins';
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${confirm});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50% 50%;
  z-index: 10000;
  margin-top: 3%;

  height: 680px;
`;

export const AlertContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 600px;
  height: auto;

  padding: 32px;
  

  
  z-index: 100000;
`;

export const AlertHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 67%;
  margin-top: -25%;

  margin-bottom: auto;
`;

export const Title = styled.h1`
  font-size: 20px;
  color: #61393A;
  text-align: center;
`;

export const Description = styled.div`
  margin-top: auto;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 60%;
`;

export const StyledButton = styled(Button) <CustomButtonProps>`
  width: 120px;
  height: 40px;
  border-radius: 210px;

  ${(props) =>
    props.bg
      ? css`
          background: ${props.bg};
        `
      : css`
          background: #0094FF;
          &:hover {
            background: ${shade('0.4', '#0094FF')};
          }
        `}
`;

export const CloseButton = styled.div`
  margin-left: auto;
  margin-bottom: auto;

  svg {
    color: #c53030;
    transition: color 0.4s;
  }

  &:hover {
    cursor: pointer;
    svg {
      color: ${shade('0.4', '#c53030')};
    }
  }
`;
