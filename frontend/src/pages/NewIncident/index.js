import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FiArrowLeft } from 'react-icons/fi';

import Input from '../../components/Input';
import TextArea from '../../components/TextArea';

import { Wrapper, Container } from './styles';

import logo from '../../assets/logo.svg';

export default function NewIncident() {
  const formRef = useRef(null);

  return (
    <Wrapper>
      <Container>
        <section>
          <img src={logo} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <Form ref={formRef}>
          <Input name="title" type="text" placeholder="Título do caso" />
          <TextArea name="description" type="text" placeholder="Descrição" />
          <Input
            name="value"
            mask="R$999,99"
            maskPlaceholder={null}
            placeholder="Valor em reais"
          />

          <button type="submit">Cadastrar</button>
        </Form>
      </Container>
    </Wrapper>
  );
}
