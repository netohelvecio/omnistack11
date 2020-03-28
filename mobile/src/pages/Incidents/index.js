import React, { useEffect, useState } from 'react';
import { Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';
import { formatPrice } from '../../utils/formatValue';

import {
  Container,
  Header,
  HeaderText,
  HeaderTextBold,
  Title,
  Description,
  IncicedentsList,
  Incident,
  Property,
  Value,
  DetailsButton,
  DetailsButtonText,
} from './styles';

import Logo from '../../assets/logo.png';

export default function Incidents() {
  const navigation = useNavigation();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalIncidents, setTotalIncidents] = useState(0);

  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident });
  }

  async function handleIncidents() {
    try {
      if (loading) {
        return;
      }

      if (totalIncidents > 0 && incidents.length === totalIncidents) {
        return;
      }

      setLoading(true);

      api
        .get('/incidents', {
          params: {
            page,
          },
        })
        .then((response) => {
          setLoading(false);

          const data = response.data.data.map((d) => ({
            ...d,
            valueFormatted: formatPrice(d.value),
          }));

          setTotalIncidents(response.data.total);
          setIncidents([...incidents, ...data]);
          setPage(page + 1);
        })
        .catch(() => {
          setLoading(false);
          Alert.alert('Erro ao listar incidentes, tente novamente');
        });
    } catch (err) {
      Alert.alert('Erro ao listar incidentes, tente novamente');
    }
  }

  useEffect(() => {
    handleIncidents();
  }, []);

  return (
    <Container>
      <Header>
        <Image source={Logo} />
        <HeaderText>
          Total de <HeaderTextBold>{totalIncidents} casos</HeaderTextBold>
        </HeaderText>
      </Header>

      <Title>Bem-Vindo(a)</Title>
      <Description>Escolha um dos casos abaixo e salve o dia</Description>

      <IncicedentsList
        data={incidents}
        keyExtractor={(incident) => incident.id.toString()}
        onEndReached={handleIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item }) => (
          <Incident>
            <Property>ONG:</Property>
            <Value>{item.name}</Value>

            <Property>Caso:</Property>
            <Value>{item.description}</Value>

            <Property>Valor:</Property>
            <Value>{item.valueFormatted}</Value>

            <DetailsButton onPress={() => navigateToDetail(item)}>
              <DetailsButtonText>Ver mais detalhes</DetailsButtonText>
              <Feather name="arrow-right" size={20} color="#e02041" />
            </DetailsButton>
          </Incident>
        )}
      />
    </Container>
  );
}
