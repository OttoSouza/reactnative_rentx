import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

interface DataValueProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.colors.bg_secondary};
`;
export const Header = styled.View`
  width: 100%;
  height: 325px;
  justify-content: center;
  padding: 24px;
  background: ${(props) => props.theme.colors.header};
  padding-top: ${getStatusBarHeight() + 30}px;
`;
export const Title = styled.Text`
  color: ${(props) => props.theme.colors.shape};
  font-family: ${(props) => props.theme.fonts.archivo_semibold};
  font-size: ${RFValue(34)}px;
  margin-top: 24px;
`;

export const RentalPeriod = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 32px 0;
`;
export const DateInfo = styled.View`
  width: 30%;
`;
export const DateTitle = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.archivo_medium};
  font-size: ${RFValue(10)}px;
`;
export const DateValue = styled.Text<DataValueProps>`
  color: ${(props) => props.theme.colors.shape};
  font-family: ${(props) => props.theme.fonts.inter_medium};
  font-size: ${RFValue(15)}px;

  ${({ selected, theme }) =>
    !selected &&
    css`
      border-bottom-width: 3px;
      border-bottom-color: ${theme.colors.text};
      padding-bottom: 5px;
    `}
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 24,
  },
  showsVerticalScrollIndicator: false,
})``;
export const Footer = styled.View`

  padding: 24px;
`;
