import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/Home/index";
import { CarDetails } from "../screens/CarDetails/index";
import { Confirmation } from "../screens/Confirmation/index";
import { SchedulingDetails } from "../screens/SchedulingDetails/index";
import { Scheduling } from "../screens/Scheduling/index";
import { MyCars } from "../screens/MyCars/index";
import {Splash} from '../screens/Splash/index';
import { SignIn } from '../screens/SignIn/index';
import { FirstStep } from '../screens/SignUp/FirstStep/index';
import { SignUpSecondStep } from '../screens/SignUp/SecondStep/index';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return (
    <Navigator headerMode="none" initialRouteName="SignIn">
      {/* <Screen name="Splash" component={Splash} /> */}
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUpFirstStep" component={FirstStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
      <Screen name="Home" component={Home} options={{
        gestureEnabled: false
      }}/>
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="MyCars" component={MyCars} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
