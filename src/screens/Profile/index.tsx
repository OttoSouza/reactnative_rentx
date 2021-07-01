import React, { useState } from "react";

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from "./styles";
import BackButton from "../../components/BackButton/index";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Input } from "../../components/Input";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import * as ImagePicker from "expo-image-picker";

import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import { PasswordInput } from "../../components/PasswordInput/index";
import { useAuth } from "../../hooks/auth";
import { Button } from "../../components/Button";

import * as Yup from "yup";
export const Profile: React.FC = () => {
  const { user, signOut, updateUser } = useAuth();
  const theme = useTheme();
  const { goBack } = useNavigation();
  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");
  const [avatar, setAvatar] = useState(user.avatar);
  const [driverLicense, SetDriverLicense] = useState(user.driver_license);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);

  function handleBack() {
    goBack();
  }

  function handleOptionChange(selectedOption: "dataEdit" | "passwordEdit") {
    setOption(selectedOption);
  }

  async function handleSelectAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (result.uri) {
      setAvatar(result.uri);
    }
  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required("CHN é obrigatória."),
        name: Yup.string().required("O nome é obrigatório."),
      });

      const data = { driverLicense, name };
      await schema.validate(data);

      await updateUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        driver_license: driverLicense,
        name,
        avatar,
        token: user.token,
      });

      Alert.alert("Perfil atualizado");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Opa", error.message);
      } else {
        Alert.alert("Nao foi possivel atualizar o perfil");
      }
    }
  }

  async function handleSignOut() {
    Alert.alert(
      "Tem certeza?",
      "Se voce sair, ira precisar de internet para conectar-se novamente",

      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },

        {
          text: "Sair",
          onPress: () => signOut(),
        },
      ]
    );
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleBack} />
              <HeaderTitle>Editar perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" color={theme.colors.shape} size={24} />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              {!!avatar && (
                <Photo
                  source={{
                    uri: avatar,
                  }}
                />
              )}

              <PhotoButton onPress={handleSelectAvatar}>
                <Feather name="camera" color={theme.colors.shape} size={24} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={option === "dataEdit"}
                onPress={() => handleOptionChange("dataEdit")}
              >
                <OptionTitle active={option === "dataEdit"}>Dados</OptionTitle>
              </Option>
              <Option
                active={option === "passwordEdit"}
                onPress={() => handleOptionChange("passwordEdit")}
              >
                <OptionTitle active={option === "passwordEdit"}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>

            {option === "dataEdit" ? (
              <Section>
                <Input
                  iconName="user"
                  placeholder="Name"
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                />
                <Input
                  iconName="mail"
                  autoCorrect={false}
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                  onChangeText={SetDriverLicense}
                />
              </Section>
            ) : (
              <Section>
                <PasswordInput iconName="lock" placeholder="Senha atual" />
                <PasswordInput iconName="lock" placeholder="Nova senha" />
                <PasswordInput iconName="lock" placeholder="Confirmar senha" />
              </Section>
            )}
            <Button title="Salvar alteraçoes" onPress={handleProfileUpdate} />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
