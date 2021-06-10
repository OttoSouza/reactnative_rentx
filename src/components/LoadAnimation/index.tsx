import React from 'react';

import LottieView from "lottie-react-native"
import { Container } from './styles';
import loadCar from "../../assets/loadCar.json";
export const LoadAnimation: React.FC = () => {
  return <Container>
    <LottieView source={loadCar} style={{height: 200}} resizeMode="contain" autoPlay loop/>
  </Container>
}

