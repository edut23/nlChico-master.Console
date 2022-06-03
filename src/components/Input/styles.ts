import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  hasValue: boolean;
  hasError: boolean;
  isSubscribe? : boolean; 
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 10px;

  display: flex;
  align-items: center;

  padding: 16px;
  width: 88%;
  height: 43px;
  margin-left: 4px;

  border: 2px solid rgb(219, 219, 219);
  color: rgb(102, 99, 96);

  & + div {
    margin-top: 8px;
  }

  transition: border 0.3s;

  ${(props) =>
    props.hasError &&
    css`
      border: 2px solid #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border: 2px solid #1266cb;
      color: #1266cb;
    `}

  ${(props) =>
    props.hasValue &&
    css`
      border: 2px solid #1266cb;
      color: #1266cb;
    `}

  input {
    background: transparent;
    flex: 1;
    border: 0;

    color: #000;
    &::placeholder {
      color: #666360;
    }

  /* border: solid 1px #000; */
  margin-right: 40px;

  }

  svg {
    margin-right: 16px;
  }
  ${(props) =>
    props.isSubscribe &&
    css`
      width: 110%;

      @media (max-height: 835px) {
        padding: 7px;
        width: 85%;
        height: 32px;
      }
  `}
`;

export const Error = styled(Tooltip)`
  height: 20px;
  /* margin-left: 16px; */
  /* border: solid 1px #000; */

  svg {
    margin-right: 0px;
  }

  span {
    color: #fff;
    background-color: #c53030;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
