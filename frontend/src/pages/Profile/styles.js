import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 1180px;
  padding: 0 30px;
  margin: 0 auto;
  padding: 32px 0;

  header {
    display: flex;
    align-items: center;

    span {
      font-size: 20px;
      margin-left: 24px;
    }

    img {
      height: 64px;
    }

    a {
      background: #e02041;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 8px;
      font-size: 18px;
      transition: background 0.2s;
      height: 50px;
      width: 260px;
      padding: 0 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: auto;

      &:hover {
        background: ${darken(0.05, '#e02041')};
      }
    }

    button {
      height: 50px;
      width: 50px;
      border-radius: 4px;
      border: 1px solid #dcdce6;
      background: transparent;
      margin-left: 16px;
      transition: border 0.2s;

      &:hover {
        border: 1px solid ${darken(0.07, '#dcdce6')};
      }
    }
  }

  h1 {
    margin-top: 80px;
    margin-bottom: 24px;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 24px;

    li {
      background: #fff;
      padding: 24px;
      border-radius: 8px;
      position: relative;

      button {
        position: absolute;
        right: 24px;
        top: 24px;
        border: 0;
        background: none;
        transition: opacity 0.2s;

        &:hover {
          opacity: 0.8;
        }
      }

      strong {
        display: block;
        margin-bottom: 16px;
        color: #41414d;
      }

      p {
        color: #737380;
        line-height: 21px;
        font-size: 16px;

        & + strong {
          margin-top: 28px;
        }
      }
    }
  }
`;

export const ContainerLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 80px;

  span {
    font-size: 28px;
    color: #e02041;
    font-weight: bold;
    margin-left: 25px;
  }
`;

export const Paginacao = styled.div`
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;

  span {
    color: #666;
    font-size: 16px;
  }

  button {
    border-radius: 4px;
    outline: 0;
    border: 0;
    background: #e02041;
    color: #fff;
    padding: 8px;

    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    &:hover {
      background: ${darken(0.05, '#e02041')};
    }
  }
`;
