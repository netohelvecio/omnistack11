import React, { useRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import Input from '../../components/Input';
import InputNoMask from '../../components/InputNoMask';
import Loading from '../../components/Loading';

import { Wrapper, Container, ContainerInput, ContainerCep } from './styles';

import logo from '../../assets/logo.svg';

export default function Register() {
  const formRef = useRef(null);

  const history = useHistory();

  const [cep, setCep] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [loadingCep, setLoadingCep] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function handleCEP() {
      const cepFormatted = cep.replace(/[^\d]+/g, '');

      if (cepFormatted.length >= 8) {
        try {
          setLoadingCep(true);

          await axios
            .get(`https://viacep.com.br/ws/${cepFormatted}/json/`)
            .then((response) => {
              if (response.data.erro) {
                setLoadingCep(false);
                formRef.current.setFieldError('cep', 'CEP inválido');

                setCity('');
                setUf('');
                setNeighborhood('');
              } else {
                setLoadingCep(false);

                setCity(response.data.localidade);
                setUf(response.data.uf);
                setNeighborhood(response.data.bairro);
              }
            });
        } catch (err) {
          setLoadingCep(false);
          toast.error('CEP inválido');
        }
      }
    }

    handleCEP();
  }, [cep]);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().email().required('E-email é obrigatório'),
        whatsapp: Yup.string().required('Whatsapp é obrigatório'),
        cep: Yup.string()
          .min(9, 'CEP tem que ter no mínimo 8 digitos')
          .required('CEP é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      setLoading(true);

      api
        .post('ongs', data)
        .then((response) => {
          setLoading(false);
          toast.success(
            `ONG cadastrada com sucesso, seu ID de acesso: ${response.data.id}`,
            {
              autoClose: 8000,
            }
          );
          history.push('/');
        })
        .catch((err) => {
          setLoading(false);
          toast.error(
            err.response.data.error ||
              'Erro ao cadastrar ONG, verifique seus dados!'
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

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontratem
            os casos da sua ONG.
          </p>

          <Link to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para login
          </Link>
        </section>

        <Form onSubmit={handleSubmit} ref={formRef}>
          <InputNoMask name="name" placeholder="Digite o nome da ONG" />

          <InputNoMask name="email" placeholder="Digite seu e-mail" />

          <Input
            name="whatsapp"
            mask="(99) 99999-9999"
            placeholder="Digite o seu whatasapp"
          />

          <Input
            name="cep"
            mask="99999-999"
            placeholder="Digite seu CEP"
            onChange={(e) => setCep(e.target.value)}
            value={cep}
          />

          <ContainerInput>
            <ContainerCep>
              <Input name="city" placeholder="Cidade" value={city} disabled />

              {loadingCep ? <Loading size={20} color="#E02041" /> : <> </>}
            </ContainerCep>

            <ContainerCep small>
              <Input
                name="uf"
                placeholder="UF"
                style={{ width: 80 }}
                value={uf}
                disabled
              />

              {loadingCep ? <Loading size={20} color="#E02041" /> : <> </>}
            </ContainerCep>
          </ContainerInput>

          <ContainerCep>
            <Input
              name="neighborhood"
              placeholder="Bairro"
              value={neighborhood}
              disabled
            />
            {loadingCep ? <Loading size={20} color="#E02041" /> : <> </>}
          </ContainerCep>

          <button type="submit">
            {loading ? <Loading size={20} color="#fff" /> : 'CADASTRAR'}
          </button>
        </Form>
      </Container>
    </Wrapper>
  );
}
