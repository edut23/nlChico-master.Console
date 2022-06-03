import styled from 'styled-components';
import { loadFromLeft } from './animations';
import Button from '../../components/Button';
import { shade } from 'polished';

import RulesBackground from '../../assets/img/rulesConsole.png';


interface StyledButtonProps {
  countdownOver?: boolean;
}

export const PageRegulamento = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const RulesContainer = styled.div`
  display: flex;
  align-items: center;

  flex-direction: column;

  height: 920px;
  width: 1315px;
  margin-top: -75px;

  background-image: url(${RulesBackground});
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: center;
  background-position-y: center;

  font-family: 'Poppins';

  @media (min-width: 1500px) {
    margin-left: 200px;
  }
`;

export const Rules = styled.div`
  display: flex;
  align-items: center;

  flex-direction: column;

  width: 60%;

  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 7px;
    height: 43px;
    z-index: 999;
  }

  ::-webkit-scrollbar-thumb {
    background: #1E70C3; 
    border-radius: 100px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 9px #D1DBE5;
    border-radius: 100px;
  }
`;

export const Card = styled.div`
  margin-top: 24px;
  width: 100%;

  animation: ${loadFromLeft} 1.5s;

  transition: background-color 0.4s;
`;

export const Title = styled.p`
  font-weight: bold;
  font-size: 28px;
`;

export const Content = styled.p`
  width: 100%;
  height: 368px;
  margin-top: 220px;

  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CardContent = styled.p`
  margin-top: 8px;

  font-weight: bold;
`;

export const SubContent = styled.div`
  margin-top: 12px;
`;

export const SubContentItem = styled.p`
  margin-top: 8px;

  font-weight: bold;

  & + p {
    margin-top: 20px;
  }
`;

export const StyledButton = styled(Button)<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;

  width: 100%;
  height: 35px;

  background: #097D45;
  color: #fff;

  font-family: 'Poppins';
  font-size: 14px;

  &:hover {
    background: ${shade(0.4, '#097D45')};
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    text-decoration: none;
  }
`;
