import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";

import { Container, Content, Title, Message, Footer } from "./styles";
import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";
import { ConfirmButton } from "../../components/ConfirmButton/index";
import { useNavigation, useRoute } from "@react-navigation/native";

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}

export const Confirmation: React.FC<Params> = () => {
  const { width } = useWindowDimensions();
  const { params } = useRoute();
  const { navigate } = useNavigation();

  const { title, message, nextScreenRoute } = params as Params;

  function handleConfirme() {
    navigate(nextScreenRoute);
  }
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="trnasparent"
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>

        <Message>{message}</Message>
      </Content>

      <Footer>
        <ConfirmButton title="Ok" onPress={handleConfirme} />
      </Footer>
    </Container>
  );
};
