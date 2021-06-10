import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  padding: 0 24px;
  background-color: ${(propps) => propps.theme.colors.bg_primary};
`;

export const Header = styled.View`
  width: 100%;
  margin-top: ${getStatusBarHeight() + 116}px;
`;

export const Title = styled.Text`
  color: ${(propps) => propps.theme.colors.title};
  font-size: ${RFValue(40)}px;
  font-family: ${(props) => props.theme.fonts.archivo_semibold};
`;

export const Subtitle = styled.Text`
  color: ${(propps) => propps.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.inter_regular};
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(25)}px;
  margin-top: 16px;
`;
export const Form = styled.View `
  width: 100%;
  margin: 64px 0;

`;

export const Footer = styled.View ``;