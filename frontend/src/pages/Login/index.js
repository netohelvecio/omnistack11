import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FiLogIn } from 'react-icons/fi';

import Input from '../../components/Input';

import { Container } from './styles';

import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';

export default function Login() {
  const formRef = useRef(null);

  return (
    <Container>
      <section>
        <img src={logo} alt="Be The Hero" />

        <Form ref={formRef}>
          <h1>Faça seu logon</h1>

          <Input name="id" type="text" placeholder="Sua ID" />

          <button type="submit">Entrar</button>

          <Link to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </Form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </Container>
  );
}
