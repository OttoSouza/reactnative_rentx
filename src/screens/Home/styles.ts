import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { FlatList } from "react-native";
import { CarDTO } from "../../dtos/CarDTO";
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 113px;
  background-color: ${(props) => props.theme.colors.header};
  justify-content: flex-end;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 32px 24px;
`;

export const TotalCard = styled.Text`
  font-family: ${(props) => props.theme.fonts.inter_regular};
  font-size: ${RFValue(15)}px;
  color: ${(props) => props.theme.colors.text};
`;

export const CardList = styled(FlatList as new () => FlatList<CarDTO>).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsVerticalScrollIndicator: false,
})``;

export const MyCarsButton = styled(RectButton) `
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: ${props => props.theme.colors.main};
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 13px;
  right: 22px;
  /* box-shadow: 0 0 ${RFPercentage(0.5)}px ${props => props.theme.colors.shape_dark}; */

`