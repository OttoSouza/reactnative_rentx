import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  padding: 0 24px;
  background: ${(props) => props.theme.colors.bg_primary};
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${getStatusBarHeight() + 32}px;
`;

export const Steps = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(40)}px;
  font-family: ${(props) => props.theme.fonts.archivo_semibold};
  color: ${(props) => props.theme.colors.title};
  margin-top: 60px;
  margin-bottom: 16px;
`;
export const Subtitle = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${(props) => props.theme.fonts.inter_regular};
  color: ${(props) => props.theme.colors.text};
  line-height: ${RFValue(25)}px;
`;

export const Form = styled.View `
  width: 100%;
  margin-top: 64px;
  margin-bottom: 16px;
`
export const FormTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${(props) => props.theme.fonts.archivo_semibold};
  color: ${(props) => props.theme.colors.title};
  margin-bottom: 24px;
`;