import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  width: 100%;
  padding: 30px 50px;
  background: #f0f0f5;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  section {
    width: 100%;
    max-width: 380px;

    h1 {
      margin: 64px 0 32px;
      font-size: 32px;
    }
    p {
      font-size: 18px;
      color: #737380;
      line-height: 32px;
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

  form {
    flex: 1;
    max-width: 500px;

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
  }
`;

export const ContainerInput = styled.div`
  display: flex;

  > div {
    & + div {
      margin-left: 8px;
    }
  }
`;

export const ContainerCep = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border: 1px solid #dcdce6;
  border-radius: 8px;
  height: 50px;
  width: ${(props) => (props.small ? '120px' : '100%')};
  padding: 0 24px;
  margin-top: 8px;

  &:hover {
    border: 1px solid #b6b6cb;
  }

  input {
    border: 0;
    border-radius: 0;
    height: 44px;
    width: 100%;
    padding: 0;
    margin-top: 0;

    &:hover {
      border: 0;
    }
  }
`;
