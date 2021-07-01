import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  CarContainer,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  AccessoryContainer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  Footer,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from "./styles";
import BackButton from "../../components/BackButton/index";
import { ImageSlider } from "../../components/ImageSlider/index";

import { Button } from "../../components/Button/index";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Accessory } from "../../components/Acessory";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { format } from "date-fns";
import { api } from "../../services/api";
import { Alert } from "react-native";
interface ParamsProps {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export const SchedulingDetails: React.FC = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const { navigate, goBack } = useNavigation();
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const routes = useRoute();
  const { car, dates } = routes.params as ParamsProps;
  const rentTotal = Number(dates.length * car.price);

  async function handleGoToSchedulingComplete() {
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);
    const unavailable_dates = {
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    };

    await api.post(`/schedules_byuser`, {
      user_id: 1,
      car,
      startDate: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      endDate: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });

    api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      })
      .then(() => {
        navigate("Confirmation", {
          nextScreenRoute: "SignIn",
          title: "Carro alugado!",
          message: `Agora voce so precisa ir\nate a concessionaria da rentx\npegar o seu automovel`,
        });
      })
      .catch(() => {
        setLoading(false);
        Alert.alert("Não foi possivel confirmar o agendamento");
      });
  }

  function handleGoBack() {
    goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>
      <CarContainer>
        <ImageSlider imagesUrl={car.photos} />
      </CarContainer>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>
        <AccessoryContainer>
          {car.accessories.map((accessory) => (
            <Accessory
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
              key={accessory.type}
            />
          ))}
        </AccessoryContainer>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>

          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleGoToSchedulingComplete}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
};
