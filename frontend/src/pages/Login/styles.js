import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;

  section {
    width: 100%;
    max-width: 350px;
    margin-right: 30px;

    form {
      margin-top: 100px;

      h1 {
        font-size: 32px;
        margin-bottom: 32px;
      }

      button {
        background: #e02041;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 8px;
        font-size: 18px;
        transition: background 0.2s;
        height: 60px;
        width: 100%;
        padding: 0 25px;
        margin-top: 16px;
        display: inline-block;
        text-align: center;
        line-height: 60px;

        &:hover {
          background: ${darken(0.05, '#e02041')};
        }
      }

      a {
        display: flex;
        align-items: center;
        margin-top: 40px;
        color: #41414d;
        font-size: 18px;
        font-weight: 500;
        transition: opacity 0.2s;

        svg {
          margin-right: 8px;
        }

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
`;
