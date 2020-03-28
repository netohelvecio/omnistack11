import React from 'react';
import { Image, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
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
  const navigaton = useNavigation();
  const route = useRoute();

  const { incident } = route.params;

  const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar o caso "${incident.title}" com a valor ${incident.valueFormatted}`;

  function navigationBack() {
    navigaton.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    });
  }

  function sendWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=55${incident.whatsapp}&text=${message}`
    );
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
        <Value>
          {incident.name} de {incident.city}/{incident.uf}{' '}
        </Value>

        <Property>Caso:</Property>
        <Value>{incident.description}</Value>

        <Property>Valor:</Property>
        <Value>{incident.valueFormatted}</Value>
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
