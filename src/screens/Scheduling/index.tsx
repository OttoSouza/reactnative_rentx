import React, { useState } from "react";

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";

import BackButton from "../../components/BackButton/index";
import { useTheme } from "styled-components";
import ArrowSvg from "../../assets/arrow.svg";
import { StatusBar } from "react-native";
import { Button } from "../../components/Button";
import {
  Calendar,
  DayProps,
  MarkedDatesProps,
} from "../../components/Calendar/index";
import { generationInterval } from "../../components/Calendar/generateInterval";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { format } from "date-fns";
import { CarDTO } from "../../dtos/CarDTO";

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface ParamsProps {
  car: CarDTO;
}

export const Scheduling: React.FC = () => {
  const theme = useTheme();
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );
  const [markedDates, setMakedDates] = useState<MarkedDatesProps>(
    {} as MarkedDatesProps
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const routes = useRoute();
  const { car } = routes.params as ParamsProps;
  const { navigate, goBack } = useNavigation();

  function handleGoToSchedulingDetails() {
    navigate("SchedulingDetails", {
      car,
      dates: Object.keys(markedDates),
    });
  }

  function handleGoBack() {
    goBack();
  }

  function handleChangeDate(date: DayProps) {
    // se o timestamp é vazio
    // pegue a data selecionada pelo usuario
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    // caso o usuario selecione uma data maior para uma menor nao de erro
    // no casso se o usuario selecionar o dia 20 ate 16.
    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);

    const interval = generationInterval(start, end);

    setMakedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(
        getPlatformDate(new Date(firstDate)),
        "dd/MM/yyyy"
      ),
      endFormatted: format(getPlatformDate(new Date(endDate)), "dd/MM/yyyy"),
    });
  }
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

        <RentalPeriod>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>
      <Footer>
        <Button
          title="Confirmar"
          onPress={handleGoToSchedulingDetails}
          enabled={!!rentalPeriod.startFormatted}
        />
      </Footer>
    </Container>
  );
};
