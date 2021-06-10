import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { TextInput } from "react-native";
interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;
  margin-bottom: 8px;
  ${(props) =>
    props.isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${props.theme.colors.main};
    `}
`;

export const IconContainer = styled.View`
  height: 56px;
  width: 56px;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.colors.bg_secondary};
  margin-right: 2px;
`;

export const InputText = styled(TextInput)`
  flex: 1;
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.inter_regular};
  background: ${(props) => props.theme.colors.bg_secondary};
  font-size: ${RFValue(14)}px;
  padding: 0 24px;
`;
