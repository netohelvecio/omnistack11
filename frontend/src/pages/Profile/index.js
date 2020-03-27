import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

import api from '../../services/api';
import { formatPrice } from '../../utils/formatValue';

import Loading from '../../components/Loading';

import { Container, ContainerLoading, Paginacao } from './styles';

import logo from '../../assets/logo.svg';

export default function Profile() {
  const history = useHistory();

  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function handleIncidents() {
      setLoading(true);

      await api
        .get('profile', {
          headers: {
            authorization: ongId,
          },
          params: {
            page,
          },
        })
        .then((response) => {
          const data = response.data.data.map((d) => ({
            ...d,
            valueFormatted: formatPrice(d.value),
          }));

          setLastPage(response.data.last_page);
          setIncidents(data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data.error || 'Erro ao listar incidentes!');
        });
    }

    handleIncidents();
  }, [page, ongId]);

  function handleLogout() {
    localStorage.setItem('ongName', null);
    localStorage.setItem('ongId', null);

    history.push('/');
  }

  async function handleDelete(id) {
    await api
      .delete(`incidents/${id}`, {
        headers: {
          authorization: ongId,
        },
      })
      .then(() => {
        toast.success('Incidente delatado com sucesso!');

        setIncidents(incidents.filter((incident) => incident.id !== id));
      })
      .catch((err) => {
        toast.error(
          err.response.data.error ||
            'Erro ao deletar incidente, tente novamente!'
        );
      });
  }

  return (
    <Container>
      <header>
        <img src={logo} alt="Be The Hero" />
        <span>Bem vindo(a), {ongName}</span>

        <Link to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      {loading ? (
        <ContainerLoading>
          <Loading size={48} color="#e02041" /> <span>Carregando...</span>{' '}
        </ContainerLoading>
      ) : (
        <>
          <h1>Casos cadastrados</h1>

          <ul>
            {incidents.map((incident) => (
              <li key={incident.id}>
                <strong>CASO:</strong>
                <p>{incident.title}</p>

                <strong>DESCRIÇÃO:</strong>
                <p>{incident.description}</p>

                <strong>VALOR:</strong>
                <p>{incident.valueFormatted}</p>

                <button onClick={() => handleDelete(incident.id)} type="button">
                  <FiTrash2 size={20} color="#a8a8b3" />
                </button>
              </li>
            ))}
          </ul>

          <Paginacao>
            <button
              type="button"
              disabled={page < 2}
              onClick={() => setPage(page - 1)}
            >
              Anterior
            </button>

            <span>Página {page} </span>

            <button
              type="button"
              disabled={page === lastPage}
              onClick={() => setPage(page + 1)}
            >
              Próximo
            </button>
          </Paginacao>
        </>
      )}
    </Container>
  );
}
