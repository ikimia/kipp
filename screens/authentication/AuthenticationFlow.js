import * as React from "react";
import { StatusBar } from "react-native";
import { createSwitchNavigator } from "react-navigation";

import TourScreen from "./TourScreen";
import LoginScreen from "./LoginScreen";

export default createSwitchNavigator(
  {
    Tour: TourScreen,
    Login: LoginScreen
  },
  { initialRouteName: "Tour" }
);
