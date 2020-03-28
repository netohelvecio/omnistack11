import React from 'react';
import { Image, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import {
  Container,
  Header,
  BackButton,
  ContainerIncident,
  Property,
  Value,
  ContainerContact,
  HeroTitle,
  HeroDescription,
  Actions,
  ButtonAction,
  ButtonActionText,
} from './styles';

import Logo from '../../assets/logo.png';

export default function Detail() {
  const message = `Olá APAD, estou entrando em contato pois gostaria de ajudar o caso "Cadelinha Atropelada" com a valor R$ 120,000`;

  const navigaton = useNavigation();

  function navigationBack() {
    navigaton.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: 'Herói do caso: Cadelinha atropelada',
      recipients: ['helvecioneto77@gmail.com'],
      body: message,
    });
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=5571993791501&text=${message}`);
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={navigationBack}>
          <Feather name="arrow-left" size={20} color="#e02041" />
        </BackButton>

        <Image source={Logo} />
      </Header>

      <ContainerIncident>
        <Property style={{ marginTop: 0 }}>ONG:</Property>
        <Value>APAD</Value>

        <Property>Caso:</Property>
        <Value>Cachorro perdido</Value>

        <Property>Valor:</Property>
        <Value>R$ 120,00</Value>
      </ContainerIncident>

      <ContainerContact>
        <HeroTitle>Salve o dia!</HeroTitle>
        <HeroTitle>Seja o herói desse caso.</HeroTitle>

        <HeroDescription>Entre em contato:</HeroDescription>

        <Actions>
          <ButtonAction onPress={sendWhatsapp}>
            <ButtonActionText>Whatsapp</ButtonActionText>
          </ButtonAction>

          <ButtonAction onPress={sendMail}>
            <ButtonActionText>E-mail</ButtonActionText>
          </ButtonAction>
        </Actions>
      </ContainerContact>
    </Container>
  );
}
