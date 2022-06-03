import styled, { css } from 'styled-components';
import { EarnPoints } from './animations';

interface ItemProps {
  myTeam: boolean;
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-left: -3%;

  color: #000;
  font-family: 'Poppins';

  padding: 8px;

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
  width: 100%;
  margin-top: 2%;
  margin-left: 13%;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 12px;
`;

export const Title = styled.h1`
  font-family: 'Kumbh Sans';
  font-weight: 600;

  @media (max-width: 700px) {
    font-size: 16px;
  }
`;

export const Body = styled.div`
  width: 20%;
  height: 100%;

  display: flex;
  flex-direction: column;
  border-radius: 12px;

  padding: 8px;
`;

export const Item = styled.div<ItemProps>`
  width: 100%;
  height: 12%;
  margin-left: 28%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-right: auto;
  padding: 8px;

  & + div {
    margin-top: 10px;
  }

  border-radius: 12px;

  img {
    width: 50px;
    height: 50px;
  }

  h3 {
    margin-right: auto;

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
    font-size: 14px;
    width: 100%;
  }

  @media (max-width: 1100px) {
    h3 {
      font-size: 14px;

      width: 70%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    h3:hover {
      overflow: visible;
    }

    strong {
      font-size: 12px;
    }
  }
`;
