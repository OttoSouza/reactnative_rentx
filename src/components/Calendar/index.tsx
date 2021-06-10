import React from "react";
import {
  Calendar as CustomCalendar,
  LocaleConfig,
  DateCallbackHandler,
} from "react-native-calendars";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { ptBr } from "./localConfig";
import { generationInterval } from './generateInterval';

LocaleConfig.locales["pt-br"] = ptBr;
LocaleConfig.defaultLocale = "pt-br";

interface MarkedDatesProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  };
}

interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

interface CalendarProps {
  markedDates: MarkedDatesProps;
  onDayPress: DateCallbackHandler;
}

const Calendar: React.FC<CalendarProps> = ({ markedDates, onDayPress }) => {
  const theme = useTheme();

  return (
    <CustomCalendar
      renderArrow={(diraction) => (
        <Feather
          size={24}
          color={theme.colors.text}
          name={diraction == "left" ? "chevron-left" : "chevron-right"}
        />
      )}
      headerStyle={{
        backgroundColor: theme.colors.bg_secondary,
        borderBottomWidth: 0.5,
        paddingBottom: 10,
        marginBottom: 10,

        borderBottomColor: theme.colors.text_detail,
      }}
      theme={{
        textDayFontFamily: theme.fonts.inter_regular,
        textDayHeaderFontFamily: theme.fonts.inter_medium,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        textMonthFontFamily: theme.fonts.archivo_semibold,
        textDayFontSize: 10,
        arrowStyle: { marginHorizontal: -15 },
      }}
      firstDay={1}
      minDate={new Date()}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
};

export { Calendar, MarkedDatesProps, DayProps , generationInterval};
