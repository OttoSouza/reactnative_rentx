import React, { useEffect, useState } from "react";
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import { Container, Header, Title, Subtitle, Form, Footer } from "./styles";
import { Button } from "../../components/Button";
import { useTheme } from "styled-components";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput/index";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";
import { database } from "../../database";
export const SignIn: React.FC = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { navigate } = useNavigation();

  const { signIn } = useAuth();

  function handleNewAccount() {
    navigate("SignUpFirstStep");
  }
  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatorio")
          .email("Digite um e-mail valido"),
        password: Yup.string().required("Senha obrigatoria"),
      });

      await schema.validate({ email, password });

      signIn({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Opa", error.message);
      } else {
        Alert.alert(
          "Error na autenticação",
          "Ocorreu um erro ao fazer login, verifique as credenciais"
        );
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            translucent
            backgroundColor="transparent"
          />
          <Header>
            <Title>Estamos{"\n"}quase lá.</Title>
            <Subtitle>
              Faça seu login para começar{"\n"}uma experiencia incrivel.
            </Subtitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />
            <Button
              title="Criar conta gratuita"
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
              color={theme.colors.bg_secondary}
              light
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
