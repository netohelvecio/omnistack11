import React from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

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

  function navigateToDetail() {
    navigation.navigate('Detail');
  }

  return (
    <Container>
      <Header>
        <Image source={Logo} />
        <HeaderText>
          Total de <HeaderTextBold>0 casos</HeaderTextBold>
        </HeaderText>
      </Header>

      <Title>Bem-Vindo(a)</Title>
      <Description>Escolha um dos casos abaixo e salve o dia</Description>

      <IncicedentsList
        data={[1, 2, 3]}
        keyExtractor={(incident) => incident.toString()}
        renderItem={() => (
          <Incident>
            <Property>ONG:</Property>
            <Value>APAD</Value>

            <Property>Caso:</Property>
            <Value>Cachorro perdido</Value>

            <Property>Valor:</Property>
            <Value>R$ 120,00</Value>

            <DetailsButton onPress={navigateToDetail}>
              <DetailsButtonText>Ver mais detalhes</DetailsButtonText>
              <Feather name="arrow-right" size={20} color="#e02041" />
            </DetailsButton>
          </Incident>
        )}
      />
    </Container>
  );
}
