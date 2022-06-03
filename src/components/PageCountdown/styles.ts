import styled, { keyframes, css } from 'styled-components';
import dayCount from '../../assets/img/dayCount.png';
import hourCount from '../../assets/img/hourCount.png';
import minuteCount from '../../assets/img/minuteCount.png';
import secondCount from '../../assets/img/secCount.png';


interface CountDownProps {
  background: boolean;
  from?: boolean;
}

interface ContainerProps {
  expired?: boolean;
}

interface NumberProps {
  count: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-family: 'Poppins';

  span {
    color: #fff;
    font-size: 24px;
  }

  ${(props) =>
    props.expired &&
    css`
      display: none;
    `}

  @media (max-width: 700px) {
  }
`;

export const TimerSection = styled.section<CountDownProps>`
  width: 720px;
  height: 180px;

  grid-template-columns: repeat(7, 1fr);

  ${(props) =>
    props.from &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;

      height: 80px;
      width: 50%;

      span {
        margin-top: 0px !important;
      }
    `}

  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;

  display: flex;

  span {
    margin-top: 38px;
  }

  @media (max-width: 700px) {
    width: 320px;
    height: 120px;
  }
`;

export const NumberSection = styled.section<NumberProps>`
  margin: -10px 12px;

  font-size: 24px;

  ${(props) =>
    props.count === 'day' &&
    css`
      background-image: url(${dayCount});
    `}

  ${(props) =>
    props.count === 'hour' &&
    css`
      background-image: url(${hourCount});
      background-position-y: center;
  `}

  ${(props) =>
    props.count === 'minute' &&
    css`
      background-image: url(${minuteCount});
      background-position-y: center;
  `}

  ${(props) =>
    props.count === 'second' &&
    css`
      background-image: url(${secondCount});
      background-position-y: center;
 `}
    
  background-size: 100%;
  background-repeat: no-repeat;

  border-radius: 8px;
  width: 150px;

  display: grid;
  text-align: center;

  small {
    color: #fff;

    text-shadow: 0 0 10px #fff;
  }

  @media (max-width: 700px) {
    font-size: 14px;
  }
`;

export const Divisor = styled.span``;

export const glow = keyframes`

  from{text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #072C58,
    0 0 40px #1266CB, 0 0 50px #1266CB, 0 0 60px #1266CB, 0 0 70px #072C58;}


  to{
    text-shadow: 0 0 20px #fff, 0 0 30px #072C58, 0 0 40px #072C58,
      0 0 50px #072C58, 0 0 60px #072C58, 0 0 70px #072C58, 0 0 80px #072C58;
  }
`;

export const Number = styled.p`
  font-family: 'Archivo';
  font-size: 38px;
  margin: -5px 0px 0px 40px;

  color: #fff;
  text-align: center;
  -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate;

  animation: ${glow} 2s infinite alternate;

  transition: text-shadow 0.5s;

  /* border: 1px solid #fff; */
  border-radius: 18px;
  height: 120px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
