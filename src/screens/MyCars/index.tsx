import React, { useCallback, useEffect, useState } from "react";

import {
  Container,
  Header,
  Title,
  Subtitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from "./styles";
import { CarDTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";
import { Alert, FlatList, StatusBar } from "react-native";
import BackButton from "../../components/BackButton";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { Car } from "../../components/Car";

import { AntDesign } from "@expo/vector-icons";
import { LoadAnimation } from "../../components/LoadAnimation";
interface MyCarsProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export const MyCars: React.FC = () => {
  const [cars, setCars] = useState<MyCarsProps[]>([]);
  const [loading, setLoadind] = useState(true);
  const theme = useTheme();

  const { goBack } = useNavigation();
  function handleGoBack() {
    goBack();
  }

  async function loadCars() {
    try {
      const response = await api.get("schedules_byuser?user_id=1");
      setCars(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro ao carregar os dados");
    } finally {
      setLoadind(false);
    }
  }

  useEffect(() => {
    loadCars();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton onPress={handleGoBack} color={theme.colors.shape} />

        <Title>
          Escolha uma {"\n"}
          data de início e {"\n"}
          fim do aluguel
        </Title>

        <Subtitle>Conforto, segurança e praticidade.</Subtitle>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Periodo</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 11 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
};
