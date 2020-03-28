import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

export const Container = styled.View`
  flex: 1;
  padding: 0 24px;
  padding-top: ${Constants.statusBarHeight + 20};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
`;

export const BackButton = styled.TouchableOpacity``;

export const ContainerIncident = styled.View`
  padding: 24px;
  border-radius: 8px;
  background: #fff;
  margin-bottom: 16px;
`;

export const Property = styled.Text`
  font-size: 14px;
  color: #41414d;
  font-weight: bold;
  margin-top: 15px;
`;

export const Value = styled.Text`
  margin-top: 8px;
  font-size: 15px;
  color: #737380;
`;

export const ContainerContact = styled.View`
  padding: 24px;
  border-radius: 8px;
  background: #fff;
`;

export const HeroTitle = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: #13131a;
  line-height: 30px;
`;

export const HeroDescription = styled.Text`
  font-size: 15px;
  color: #737380;
  margin-top: 16px;
`;

export const Actions = styled.View`
  margin-top: 16px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonAction = styled(RectButton)`
  background: #e02041;
  border-radius: 8px;
  height: 50px;
  width: 48%;

  justify-content: center;
  align-items: center;
`;

export const ButtonActionText = styled.Text`
  color: #fff;
  font-size: 15px;
  font-weight: bold;
`;
