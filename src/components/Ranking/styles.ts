import styled, { css } from 'styled-components';
import { EarnPoints } from './animations';
import iconranking from '../../assets/img/iconeranking.svg';

interface ItemProps {
  myTeam: boolean;
}

export const Container = styled.div`
  width: 100%;
  height: 33%;
  margin-left: -3%;

  color: #000;
  font-family: 'Poppins';

  padding: 8px;
  overflow: hidden;

  overflow: hidden-scroll;

  @media (max-width: 700px) {
    padding: 0px;
  }
`;

export const Content = styled.div`
  border-radius: 12px;
  margin-bottom: 25%;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  width: 25%;
  margin-top: 2%;
  margin-left: 11%;
  color: #E10051;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  border-radius: 12px;
`;

export const Icon = styled.div`
  background-image: url(${iconranking});
  display: flex;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  margin-right: 3%;

  width: 20px;
  height: 20px;
`

export const Title = styled.h1`
  font-family: 'Kumbh Sans';
  font-weight: 600;
  font-size: 20px;
  

  @media (max-width: 700px) {
    font-size: 12px;
  }
`;

export const Row = styled.div`
  flex-direction: row;
  display: flex;
`;

export const Body = styled.div`
  width: 20%;
  max-height: 30px;
  margin-right: -10%;

  display: flex;
  flex-direction: column;
  //border-radius: 12px;

  padding: 8px;

`;

export const Item = styled.div<ItemProps>`
  width: 100%;
  height: 12%;
  margin-left: 13%;
  margin-bottom: 1.3%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-right: auto;
  //padding: 8px;

  & + div {
    margin-top: 10px;
  }

  border-radius: 12px;


  img {
    width: 50px;
    height: 50px;
  }

  strong {
    color: #999999;
    font-size: 10px;
  }

  h3 {
    padding-left: 4px;
    font-size: 13px;
    color: #FFFFFF;
    background: rgb(225, 0, 81);
    border-radius: 210px;
    width: 20px !important;

    ${(props) =>
    props.myTeam &&
    css`
        width: 20px !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      `}
  }
  h4 {
    margin-right: auto;
    font-size: 13px;
    color: #FFFFFF;
    padding-left: 4px;
    display: contents;
    text-overflow: ellipsis;

    ${(props) =>
    props.myTeam &&
    css`
        width: 80% !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      `}
  }

  transition: transform 0.8s;

  ${(props) =>
    props.myTeam &&
    css`
      animation: ${EarnPoints} 1s;
    `};

  ${(props) =>
    !props.myTeam &&
    css`
      h3 {
        width: 98% !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `}

  &:hover {
    /* cursor: pointer; */
    transform: scaleY(1.09) scaleX(1.09);
  }

  p {
  }
  @media (max-width: 1100px) {
    height: 24%;
  }

  @media (max-width: 700px) {
    flex-direction: column;

    height: 20%;
  }
  @media (max-height: 640px) {
    height: 23%;
  }
`;

export const QuestionPoints = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  margin-left: 4%;
  justify-content: space-between;

  width: 80%;

  strong {
    font-size: 11px;
    width: 100%;
  }

  @media (max-width: 1100px) {
    h3 {
      font-size: 10px;

      width: 70%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    h3:hover {
      overflow: visible;
    }

    strong {
      font-size: 10px;
    }
  }
`;
