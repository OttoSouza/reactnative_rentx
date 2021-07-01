import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import {
  Container,
  Header,
  CarContainer,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  AccessoryContainer,
  About,
  Footer,
} from "./styles";
import BackButton from "../../components/BackButton/index";
import { ImageSlider } from "../../components/ImageSlider/index";
import { Accessory } from "../../components/Acessory/index";

import { Button } from "../../components/Button/index";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { StatusBar, StyleSheet } from "react-native";
import { useTheme } from "styled-components";

interface ParamsProps {
  car: CarDTO;
}

export const CarDetails: React.FC = () => {
  const { navigate, goBack } = useNavigation();
  const routes = useRoute();
  const { car } = routes.params as ParamsProps;
  const scrollY = useSharedValue(0);
  const theme = useTheme();
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    };
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  function handleGoToScheduling() {
    navigate("Scheduling", { car });
  }

  function handleGoBack() {
    goBack();
  }

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          { backgroundColor: theme.colors.bg_secondary },
        ]}
      >
        <Header>
          <BackButton onPress={handleGoBack} />
        </Header>
        <Animated.View style={sliderCarsStyleAnimation}>
          <CarContainer>
            <ImageSlider imagesUrl={car.photos} />
          </CarContainer>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
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
        <About>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </About>
      </Animated.ScrollView>
      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleGoToScheduling}
        />
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    overflow: "hidden",
    zIndex: 1,
  },
});
