import styled from "styled-components/native";
import {
  getStatusBarHeight,
  getBottomSpace,
} from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.colors.bg_secondary};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  position: absolute;
  margin-top: ${getStatusBarHeight() + 18}px;
  margin-left: 24px;
`;

export const CarContainer = styled.View`
  margin-top: ${getStatusBarHeight() + 32}px;
`;



export const Details = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 38px;
`;

export const Description = styled.View``;
export const Brand = styled.Text`
  font-family: ${(props) => props.theme.fonts.archivo_medium};
  color: ${(props) => props.theme.colors.text_detail};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
`;
export const Name = styled.Text`
  font-family: ${(props) => props.theme.fonts.archivo_medium};
  color: ${(props) => props.theme.colors.title};
  font-size: ${RFValue(25)}px;
`;
export const Rent = styled.View``;

export const Period = styled.Text`
  font-family: ${(props) => props.theme.fonts.archivo_medium};
  color: ${(props) => props.theme.colors.title};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
`;

export const Price = styled.Text`
  font-family: ${(props) => props.theme.fonts.archivo_medium};
  color: ${(props) => props.theme.colors.main};
  font-size: ${RFValue(25)}px;
`;

export const AccessoryContainer = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

export const About = styled.Text`
  font-family: ${(props) => props.theme.fonts.inter_regular};
  color: ${(props) => props.theme.colors.title};
  font-size: ${RFValue(15)}px;
  text-align: justify;
  margin-top: 24px;
  line-height: ${RFValue(25)}px;
`;

export const Footer = styled.View`
  width: 100%;
  background: ${(props) => props.theme.colors.bg_secondary};
  padding: 24px 24px ${getBottomSpace() + 24}px;
`;
