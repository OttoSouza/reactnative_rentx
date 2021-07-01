import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Confirmation } from "../screens/Confirmation/index";

import { Splash } from "../screens/Splash/index";
import { SignIn } from "../screens/SignIn/index";
import { FirstStep } from "../screens/SignUp/FirstStep/index";
import { SignUpSecondStep } from "../screens/SignUp/SecondStep/index";

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator headerMode="none" initialRouteName="Splash">
      <Screen name="Splash" component={Splash} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUpFirstStep" component={FirstStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
