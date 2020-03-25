import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FiArrowLeft } from 'react-icons/fi';

import Input from '../../components/Input';

import { Wrapper, Container, ContainerInput } from './styles';

import logo from '../../assets/logo.svg';

export default function Register() {
  const formRef = useRef(null);

  return (
    <Wrapper>
      <Container>
        <section>
          <img src={logo} alt="Be The Hero" />

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontratem
            os casos da sua ONG.
          </p>

          <Link to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </section>

        <Form ref={formRef}>
          <Input name="name" placeholder="Digite o nome da ONG" />
          <Input name="email" placeholder="Digite seu e-mail" />
          <Input name="whatsapp" placeholder="Digite o seu whatasapp" />
          <Input name="cep" placeholder="Digite seu CEP" />

          <ContainerInput>
            <Input name="city" placeholder="Cidade" disabled />
            <Input name="uf" placeholder="UF" disabled style={{ width: 80 }} />
          </ContainerInput>

          <Input name="neighborhood" disabled placeholder="Bairro" />

          <button type="submit">Cadastrar</button>
        </Form>
      </Container>
    </Wrapper>
  );
}
