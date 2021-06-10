import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: 109px;
  height: 92px;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.colors.bg_primary};
  padding: 16px;
  margin-bottom: 8px;
`;

export const Name = styled.Text`
  font-family: ${(props) => props.theme.fonts.inter_medium};
  color: ${(props) => props.theme.colors.text};
  font-size: ${RFValue(13)}px;
`;
