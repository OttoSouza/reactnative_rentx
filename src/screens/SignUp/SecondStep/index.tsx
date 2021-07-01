import React, { useState } from "react";

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from "./styles";
import BackButton from "../../../components/BackButton/index";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { PasswordInput } from "../../../components/PasswordInput/index";
import { useTheme } from "styled-components";
import { api } from "../../../services/api";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export const SignUpSecondStep: React.FC = () => {
  const { goBack, navigate } = useNavigation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const route = useRoute();
  const { user } = route.params as Params;
  const theme = useTheme();
  function handleGoBack() {
    goBack();
  }

  async function handleRegister() {
    if (!password || !confirmPassword) {
      return Alert.alert("Informe a senha e a confirmação");
    }

    if (password != confirmPassword) {
      return Alert.alert("As senhas nao sao iguais");
    }

    await api
      .post("/users", {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password,
      })
      .then(() => {
        navigate("Confirmation", {
          nextScreenRoute: "SignIn",
          title: "Conta criada",
          message: `Agora é so fazer login\n e aproveitar`,
        });
      }).catch((error) => {
        console.log(error)
        Alert.alert("Opa,","Nao foi possivel cadastrar")
      });
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleGoBack} />
            <Steps>
              <Bullet active={true} />
              <Bullet active={false} />
            </Steps>
          </Header>

          <Title>Crie sua{"\n"}conta</Title>
          <Subtitle>Faça seu cadastro de{"\n"}forma facil</Subtitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
          </Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
