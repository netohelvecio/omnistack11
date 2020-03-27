import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import Input from '../../components/Input';
import InputNoMask from '../../components/InputNoMask';
import TextArea from '../../components/TextArea';
import Loading from '../../components/Loading';

import { Wrapper, Container } from './styles';

import logo from '../../assets/logo.svg';

export default function NewIncident() {
  const formRef = useRef(null);
  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        title: Yup.string().required('Título é obrigatório'),
        description: Yup.string().required('Descrição é obrigatória'),
        value: Yup.string().required('Valor é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      setLoading(true);

      api
        .post('incidents', data, {
          headers: {
            authorization: ongId,
          },
        })
        .then(() => {
          setLoading(false);
          toast.success('Incidente cadastrado com sucesso!');
          history.push('/profile');
        })
        .catch((err) => {
          setLoading(false);
          toast.error(
            err.response.data.error ||
              'Erro ao cadastrar incidente, verifique seus dados!'
          );
        });
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
    }
  }

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

        <Form onSubmit={handleSubmit} ref={formRef}>
          <InputNoMask name="title" type="text" placeholder="Título do caso" />

          <TextArea name="description" type="text" placeholder="Descrição" />

          <Input name="value" mask="R$999,99" placeholder="Valor em reais" />

          <button type="submit">
            {loading ? <Loading size={22} color="#fff" /> : 'CADASTRAR'}
          </button>
        </Form>
      </Container>
    </Wrapper>
  );
}
