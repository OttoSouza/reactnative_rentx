import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
  runOnJS,
} from "react-native-reanimated";

import BrandSvg from "../../assets/brand.svg";
import LogoSvg from "../../assets/logo.svg";

import { Container } from "./styles";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const Splash: React.FC = () => {
  const splashAnimation = useSharedValue(0);
  const { navigate } = useNavigation();

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, 0.3, 1]),
      transform: [
        { translateX: interpolate(splashAnimation.value, [0, 50], [-50, 0]) },
      ],
    };
  });

  function startApp() {
    navigate("SignIn");
  }
  useEffect(() => {
    splashAnimation.value = withTiming(50, { duration: 1000 }, () => {
      "worklet"; // fatias de codigo.
      runOnJS(startApp)();
    });
  }, []);

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Animated.View style={[brandStyle, { position: "absolute" }]}>
        <BrandSvg width={90} height={50} />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: "absolute" }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
};
