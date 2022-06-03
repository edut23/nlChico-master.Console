import styled, { css } from 'styled-components';
import { shade } from 'polished';

import CountDown from '../PageCountdown';

interface HeaderProps {
  tab?: string;
}

export const Container = styled.header`
  z-index: 999;
  width: 59%;
  height: 6vh;

  box-sizing: border-box;
  margin-bottom: 35px;

  display: flex;
  align-items: flex-start;
`;

export const StyledCountDown = styled(CountDown)``;

export const LogoContent = styled.div`
  width: 100%;
  z-index: 999;
  display: flex;
  align-items: center;
`;
export const MainImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const LogoOptions = styled.div`
  background: #232323;
  transform: skew(20deg);
  justify-content: flex-end;
  align-items: center;

  width: 569px;
  height: 50px;

  margin-left: -10px;
  display: flex;
  flex-direction: row;

  a {
    text-decoration: none;
  }

  p {
    margin-right: 48px;
    color: #fff;

    transition: color 0.4s;

    font-family: 'Poppins';
    font-size: 12px;

    &:hover {
      cursor: pointer;
      color: ${shade(0.4, '#bdbdbd')};
    }
  }
`;

export const HomeOption = styled.p<HeaderProps>`
  ${(props) =>
    props.tab === 'home' &&
    css`
      border-bottom: 1px solid #fff;
    `}
`;

export const RegulationOption = styled.p<HeaderProps>`
transform: skew(-20deg);
  ${(props) =>
    props.tab === 'regulamento' &&
    css`
      border-bottom: 1px solid #fff;
    `}
`;

export const Logo = styled.img`
  height: 80px;

  opacity: 1;
`;

export const UserContainer = styled.div`
  transform: skew(-20deg);

  margin-left: 1.2%;
  width: 350px;
  height: 64px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .user-data-container {
    color: #e9eaed;
    width: 80%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h3 {
      font-size: 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p {
      font-size: 14px;
    }
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  display: flex;

  flex-shrink: 0;
  margin-right: 10px;

  .main-profile-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: 0.4s;
    border: solid 2px #dbdbdb;
  }
`;
