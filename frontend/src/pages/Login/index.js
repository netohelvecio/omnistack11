import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import Input from '../../components/InputNoMask';
import Loading from '../../components/Loading';

import { Container } from './styles';

import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';

export default function Login() {
  const formRef = useRef(null);
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  async function handleLogin(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        id: Yup.string().required('ID é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      setLoading(true);

      api
        .post('sessions', data)
        .then((response) => {
          setLoading(false);
          localStorage.setItem('ongId', data.id);
          localStorage.setItem('ongName', response.data.name);

          history.push('/profile');
        })
        .catch((err) => {
          setLoading(false);
          toast.error(
            err.response.data.error ||
              'Erro ao fazer login, verifique seus dados!'
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
    <Container>
      <section>
        <img src={logo} alt="Be The Hero" />

        <Form onSubmit={handleLogin} ref={formRef}>
          <h1>Faça seu logon</h1>

          <Input
            name="id"
            type="text"
            placeholder="Sua ID"
            style={{ height: 60 }}
          />

          <button type="submit">
            {loading ? <Loading size={25} color="#fff" /> : 'ENTRAR'}
          </button>

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
