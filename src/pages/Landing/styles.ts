import styled from 'styled-components';
import {
  glow,
  loadFromLeft,
  loadLogo,
  buttonBounce,
  smallButtonBounce,
} from './animations';

import Button from '../../components/Button';
import Header from '../../components/Header';

export const PageLanding = styled.div`
  width: 100vw;
  height: 100vh;

  /* display: flex;
  flex-direction: column; */
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;

  flex-direction: column;

  /* height: 90vh;
  width: 90vw; */

  @media (max-width: 700px) {
    padding: 0;
  }
`;

export const ChallengeText = styled.p`
  font-family: 'Rowdies';
  font-size: 36px;

  text-shadow: 0 0 10px #0031ff75;

  margin-bottom: 1em;

  strong {
    color: #fff;

    text-shadow: 0 0 10px #4c72a1;

    animation: ${glow} 2s infinite alternate;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 800px;

  margin-top: 6%;

  margin-left: 6%;

  animation: ${loadFromLeft} 1.5s;

  @media (max-width: 700px) {
    margin-right: 0;
    padding-top: 240px;
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

  @media (max-width: 700px) {
    padding: 0 32px;
  }
`;

export const ButtonSubscribe = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 240px;

  font-size: 24px;

  text-shadow: 0 0 10px;

  animation: ${buttonBounce} 1.2s;

  margin-left: 50px;
  margin-right: 50px;

  margin-bottom: 20px;

  small {
    font-size: 12px;
    margin-left: 8px;
  }

  a {
    text-decoration: none;
    color: #fff;
  }

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 700px) {
    width: 120px;

    font-size: 15px;

    animation: ${smallButtonBounce} 1.5s;
  }
`;

export const TopText = styled.p`
  color: #fff;
  text-shadow: 0 0 10px #fff;
  font-size: 18px;

  margin-right: auto;
  margin-bottom: 10px;
`;

export const HeaderA = styled(Header)`
  animation: ${loadLogo} 1.5s !important;
`;
