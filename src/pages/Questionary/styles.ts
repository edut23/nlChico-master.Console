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

  @media (max-width: 1300px)  {
    margin-left: 7vw;
  }
  @media (max-width: 1250px) {
    margin-left: 11vw;
  }
  @media (max-width: 1200px) {
    margin-left: 18vw;
  }
  @media (max-width: 1150px) {
    position: absolute;
    width: 1220px;
    height: 500px;
  }

  @media (min-height: 615px) {
    margin-buttom: -8vh;
  }
  @media (min-height: 560px) {
    margin-buttom: -12vh;
  }
  @media (min-height: 520px) {
    margin-buttom: -18vh;
  }
  @media (min-height: 500px) {
    margin-buttom: -29vh;
  }
  @media (max-height: 400px) {
    position: absolute;
    width: 1400px;
    margin-buttom: -29vh;
  }
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
    margin-top: 3.6%;

    /*animation: ${loadFromTransparent} 1.2s;*/
    color: #000;

    font-family: 'Poppins';
    font-size: 14px;
    line-height: 1.3;

    text-align: left;

    @media (max-height: 600px) {
      overflow: scroll;
      height: 280%;
      margin-top: 0%;
    }

    @media (max-width: 1150px) {
      width: 100%;
      height: 200px;
      overflow: scroll;
    }

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
    font-size: 14px;
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
  margin-left: 38%;
  padding: 20px 33px;

  @media (min-height: 1000px) {
    margin-top: 1vh;
    margin-left: 23vw;
  }

  //transition: color 0.4s;

`;

export const ButtonsDiv = styled.div`
@media (max-height: 400px) {
  margin-right: -420px;
  margin-top: 100px;
  position: absolute;
}
@media (min-height: 401px) {
  margin-right: -24vw;
  margin-top: 21vh;
  position: absolute;
}
@media (min-height: 500px) {
  margin-right: -30vw;
  margin-top: 21vh;
  position: absolute;
}
@media (min-height: 600px) {
  margin-right: -35vw;
  margin-top: 21vh;
  position: absolute;
}
@media (min-height: 1000px) {
  margin-right: -40vw;
  margin-top: 21vh;
  position: absolute;
}
@media (min-height: 1100px) {
  margin-right: -42vw;
  margin-top: 21vh;
  position: absolute;
}
@media (min-width: 1500px) {
  margin-right: -52vw;
  margin-top: 21vh;
  position: absolute;
}
@media (min-width: 1650px) {
  margin-right: -49vw;
  margin-top: 21vh;
  position: absolute;
}
@media (min-width: 1800px) {
  margin-right: -46vw;
  margin-top: 21vh;
  position: absolute;
}
@media (min-width: 1950px) {
  margin-right: -43vw;
  margin-top: 21vh;
  position: absolute;
}
@media (min-width: 2100px) {
  margin-right: -41vw;
  margin-top: 21vh;
  position: absolute;
}
@media (min-width: 2250px) {
    margin-right: -39vw;
    margin-top: 21vh;
    position: absolute;
}
@media (min-width: 2380px) {
  margin-right: -37vw;
  margin-top: 21vh;
  position: absolute;
}
@media (min-width: 2550px) {
  margin-right: -35vw;
  margin-top: 21vh;
  position: absolute;
}
@media (min-width: 2650px) {
  margin-right: -33vw;
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

  /*@media (min-height: 1000px) {
    margin-left: -57%;
    margin-right: -15%;
  }
  @media (min-width: 1520px) {
    margin-left: -79%;
    margin-right: -45%;
  }
  @media (min-width: 1650px) {
    margin-left: -78%;
    margin-right: -38%;
  }
  @media (min-width: 1800px) {
    margin-left: -70%;
    margin-right: -30%;
  }
  @media (min-width: 1900px) {
    margin-left: -65%;
    margin-right: -20%;
  }
  @media (min-width: 2000px) {
    margin-left: -59%;
    margin-right: -15%;
  }
  @media (min-width: 2080px) {
    margin-left: -54%;
    margin-right: -15%;
  }
  @media (min-width: 2200px) {
    margin-left: -49%;
    margin-right: -15%;
  }
  @media (min-width: 2300px) {
    margin-left: -40%;
    margin-right: -15%;
  }
  @media (min-width: 2375px) {
    margin-left: -38%;
    margin-right: -10%;
  }
  @media (min-width: 2500px) {
    margin-left: -30%;
    margin-right: -10%;
  }*/
`;

export const SideContainer = styled.div`
  //align-items: left;
  flex-direction: column;
  z-index: 5;
  position: absolute;

  width: 60%;
  height: 65%;
  margin-left: 3vw;

  @media (max-width: 2500px) {
    margin-left: 2vw;
    padding-top: 2vh;
  }
  @media (max-width: 2400px) {
    margin-left: 2vw;
    padding-top: 6vh;
  }
  @media (max-width: 2300px) {
    margin-left: 1vw;
    padding-top: 6vh;
  }
  @media (max-width: 2200px) {
    margin-left: 0vw;
    padding-top: 10vh;
  }
  @media (max-width: 2050px) {
    margin-left: -1vw;
    padding-top: 14vh;
  }
  @media (max-width: 1850px) {
    margin-left: -4vw;
    padding-top: 17vh;
  }
  @media (max-width: 1600px) {
    margin-left: -6vw;
    padding-top: 20vh;
  }

  @media (max-height: 1100px) {
    margin-top: -1vh;
  }
  @media (max-height: 1000px) {
    padding-left: 5vw;
    padding-bottom: 2vh;
  }
  @media (max-height: 950px) {
    padding-left: 6vw;
    padding-bottom: 3vh;
  }
  @media (max-height: 900px) {
    padding-left: 8vw;
    padding-bottom: 5vh;
  }
  @media (max-height: 700px) {
    margin-left: 1vw;
    margin-top: -15vh;
  }
  @media (max-height: 650px) {
    margin-left: 1vw;
    margin-top: -21vh;
  }
  @media (max-height: 550px) {
    padding-left: 13vw;
    margin-top: -18vh;
  }
  @media (max-height: 500px) {
    padding-left: 16vw;
    margin-top: -20vh;
  }

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
