import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  input {
    background: #fff;
    border: 1px solid #dcdce6;
    border-radius: 8px;
    height: 60px;
    width: 100%;
    padding: 0 24px;
    font-size: 18px;

    &::placeholder {
      color: #888;
      font-size: 18px;
    }

    &:hover {
      border: 1px solid ${darken(0.15, '#dcdce6')};
    }

    &:focus {
      border: 2px solid #2684ff;
    }
  }
`;
