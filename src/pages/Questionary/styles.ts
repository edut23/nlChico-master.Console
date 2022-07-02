import styled, { css } from 'styled-components';
import { shade } from 'polished';
import console from '../../assets/img/Console.png';
import ranking from '../../assets/img/Ranking.png';
import erro from '../../assets/img/erro.png';
import dica from '../../assets/img/DICA.png';
import pular from '../../assets/img/PULAR.png';

import { loadFromTransparent, loadFromDownAndTransparent } from './animations';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Tooltip from '../../components/Tooltip';

interface TooltipProps {
  type?: string;
}
interface ChatProps {
  enabled?: boolean;
}
interface QuestionHeaderProps {
  normal?: boolean;
}

export const PageContent = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  animation: ${loadFromDownAndTransparent} 1.2s;
`;

export const FirstRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px;

  width: 100vw;
  height: 88vh;
`;

export const LogoutButton = styled.p`
  display: flex;
  align-items: center;
  color: #fff !important;

  svg {
    margin-right: 8px;
    color: #fff;

    transition: color 0.3s;
  }

  &:hover {
    cursor: pointer;
    color: ${shade(0.4, '#fff')} !important;
    svg {
      color: ${shade(0.4, '#fff')} !important;
    }
  }
`;

export const QuestionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /*position: relative;
  float: left;*/

  background: url(${console});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50% 50%;

  width: 100%;
`;

export const QuestionOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  /* overflow: hidden; */

  width: 57%;
  height: 82%;


  padding: 0 10px;
`;

export const Question = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  

  /* overflow: hidden; */

  font-family: 'Poppins';
  font-size: 20px;
  color: #000;

  width: 70%;
  height: 70%;

  margin-bottom: auto;
`;

export const QuestionHeader = styled.div<QuestionHeaderProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;

  padding: 10px 16px;

  width: 25vw;
  //margin-bottom: auto;
  //margin-bottom: -180px;

  ${(props) =>
    props.normal &&
    css`
      height: 40%;
      p {
        margin-top: 2%;
      }
    `}

  p {
    width: 100%;

    /*animation: ${loadFromTransparent} 1.2s;*/
    color: #000;

    font-family: 'Poppins';
    font-size: 1vw;

    text-align: justify;

    margin-top: 3.6%;
  }

  h1 {
    text-align: justify;
    font-size: 14px;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 700px) {
    font-size: 20px;
    padding: 0 12px;

    p {
      text-align: justify;
      font-size: 16px;
    }
  }

  @media (max-height: 700px) {
    font-size: 20px;
  }
`;

export const NumberQuestion = styled.div`
  background-color: rgb(16, 61, 137);
  border-radius: 240px;
  color: rgb(255, 255, 255);
  width: 28px;
  height: 24px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  margin-top: 2vh;
  margin-right: 9px;
  font-size: medium;

  p1 {
    text-align: justify;
    font-size: 16px;
    align-items: center;
    justify-content: center;
  }
`

export const LoadingQuestion = styled.div`
  svg {
    margin-top: 24%;
  }
  p {
    margin-left: 18px;
  }
`;

export const HintButton = styled.div`
  margin-right: 4%;

  color: #ffe700;
  transition: color 0.4s;

  &:hover {
    color: #fffcdb;

    cursor: pointer;
  }
`;

export const PassButton = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 4%;

  color: #c53030;

  transition: color 0.4s;

  &:hover {
    color: #fddede;

    cursor: pointer;
  }
`;

export const QuestionContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 100%;

  padding: 0 6px;

  z-index: 10;


  @media (max-width: 700px) {
    overflow: hidden;
  }
`;

export const Answer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3.8vh;

  @media (min-height: 1000px) {
    margin-bottom: 8vh;
  }

  @media (max-width: 700px) {
    width: 100%;

    justify-content: space-between;

    font-size: 12px;
  }
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 28%;
  padding-right: 10%;
  z-index: 10;
  width: 85%;
  heigth: 65%;

  @media (max-width: 930px) {
    flex-direction: column;
  }
`;

export const ReportErrorButton = styled.div`
  display: flex;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  background-image: url(${erro});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;


  width: 10vw;
  height: 7vh;
  margin-right: 7%;
  margin-left: 43%;
  padding: 20px 33px;

  @media (min-height: 1000px) {
    margin-top: 1vh;
    margin-left: 23vw;
  }

  //transition: color 0.4s;

`;

export const ButtonsDiv = styled.div`
@media (min-height: 650px) {
  margin-right: -35vw;
  margin-top: 21vh;
  position: absolute;
}
@media (min-height: 1000px) {
  margin-right: -42vw;
  margin-top: 21vh;
  position: absolute;
}
`

export const TipButton = styled.div`
  z-index: 5;
  background-image: url(${dica});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;

  width: auto;
  height: 11vh;


  margin-right: 2%;
  margin-left: 2%;

  //transition: color 0.4s;

`;

export const SkipButton = styled.div`
  z-index: 5;
  //transition: color 0.4s ease 0s;
  background-image: url(${pular});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  height: 7vh;
  width: 9vw;
  margin-bottom: -9%;
  margin-left: 10%;

  //transition: color 0.4s;

`;

export const AnswerInput = styled(Input)`
  width: 50%;
`;

export const AnswerButton = styled(Button)`
  background: #05a746;
  display: flex;

  width: 60px;
  heigth: 47px;
  border-radius: 210px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;

  margin-left: 2%;
  margin-right: 3%;
  margin-bottom: 3%;

  /*&:hover {
    cursor: pointer;
    background: ${shade(0.4, '#05a746')} !important;
    svg {
      color: ${shade(0.4, '#fff')} !important;
    }
  }*/

  @media (max-width: 930px) {
    width: 60%;
    margin-left: 0px;
  }
`;

export const Hint = styled.p`
  margin-right: 1em;
  //margin-top: 8px;

  width: 330px;
  background: rgb(0, 0, 0);
  color: rgb(255, 255, 255);

  strong {
    color: #eb171e;
  }

  @media (max-width: 930px) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0;
    text-align: center;

    margin: 0;
  }
`;

export const RankContainer = styled.div`
  align-items: left;
  flex-direction: column;
  //z-index: 5;
  //position: absolute;

  font-family: 'Poppins';
  color: #fff;

  > p {
    margin-top: 33%;
    font-size: 22px;
  }

  background-image: url(${ranking});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;

  //width: 60%;
  //heigth: 65%;
  
  margin-left: -31%;
  margin-right: -3%;

  @media (min-height: 1000px) {
    margin-left: -57%;
    margin-right: -15%;
  }
`;

export const SideContainer = styled.div`
  //align-items: left;
  flex-direction: column;
  z-index: 5;
  position: absolute;

  width: 60%;
  heigth: 65%;
  //margin-left: -80px;

`;

export const SecondRowContainer = styled.div<ChatProps>`
  display: flex;
  flex-direction: row;
  padding: 16px;

  /* margin-top: 60px; */

  width: 100vw;
  height: 25vh;

  ${(props) =>
    props.enabled
      ? css`
          display: block;
        `
      : css`
          display: none;
        `}
`;

export const VideoCards = styled.div`
  display: flex;
  flex-direction: row;

  width: 73%;

  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  box-shadow: 0 0 10px #000;

  padding: 18px;
`;

export const VideoCard = styled.div`
  width: 20%;
  height: 98%;

  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  box-shadow: 0 0 10px #000;

  & + div {
    margin-left: 18px;
  }

  transition: transform 0.4s;

  &:hover {
    transform: scaleY(1.09);
  }
`;

export const ChatContainer = styled.div`
  width: 25%;

  margin-left: 3%;

  background: rgba(251, 124, 31, 0.9);
  border-radius: 6px;
  box-shadow: 0 0 10px #000;

  padding: 12px;
`;

export const StyledTooltip = styled(Tooltip) <TooltipProps>`
  display: flex;
  flex-direction: column;

  span {
    ${(props) =>
    props.type === 'hint' &&
    css`
        background: #0088ff;
        color: #fff;
      `}
  }

  @media (max-height: 640px) {
    flex-direction: row;
  }
`;
