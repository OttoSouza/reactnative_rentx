import React, { useEffect, useState } from "react";

import {
  Container,
  Header,
  TotalCard,
  HeaderContent,
  CardList,
} from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar, StyleSheet, BackHandler } from "react-native";
import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { Car } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";
import { LoadAnimation } from "../../components/LoadAnimation";
import { useTheme } from "styled-components";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export const Home: React.FC = () => {
  // const theme = useTheme();
  const { navigate } = useNavigation();
  function handleGoToCarDetails(car: CarDTO) {
    navigate("CarDetails", { car });
  }
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  // function handleGoToMyCars() {
  //   navigate("MyCars");
  // }

  // const positionInY = useSharedValue(0);
  // const positionInX = useSharedValue(0);
  // const myCarsButtonStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         translateX: positionInX.value,
  //       },
  //       { translateY: positionInY.value },
  //     ],
  //   };
  // });

  // const onGestureHandler = useAnimatedGestureHandler({
  //   onStart(_, ctx: any) {
  //     ctx.positionX = positionInX.value;
  //     ctx.positionY = positionInY.value;
  //   },
  //   onActive(event, ctx: any) {
  //     positionInX.value = ctx.positionX + event.translationX;
  //     positionInY.value = ctx.positionY + event.translationY;
  //   },
  //   onEnd(event) {
  //     positionInX.value = withSpring(0);
  //     positionInY.value = withSpring(0);
  //   },
  // });

  useEffect(() => {
    let isMounted = true;
    async function loadCars() {
      try {
        const response = await api.get("/cars");
        if (isMounted) {
          setCars(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadCars();
    // forma de limpeza
    return () => {
      isMounted = false;
    };
  }, []);

  //impedir que o usuario volta para tela de splay
  // useEffect(() => {
  //   BackHandler.addEventListener("hardwareBackPress", () => {
  //     return true;
  //   });
  // }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && <TotalCard>Total de {cars.length} carros</TotalCard>}
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <CardList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleGoToCarDetails(item)} />
          )}
        />
      )}

      {/* <PanGestureHandler onGestureEvent={onGestureHandler}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: "absolute",
              bottom: 13,
              right: 12,
            },
          ]}
        >
          <ButtonAnimated
            onPress={handleGoToMyCars}
            style={[styles.button, { backgroundColor: theme.colors.main }]}
          >
            <Ionicons
              name="ios-car-sport"
              size={24}
              color={theme.colors.shape}
              style={{ textAlign: "center" }}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler> */}
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignContent: "center",
  },
});
