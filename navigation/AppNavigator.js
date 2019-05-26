import React from "react";
import firebase from "react-native-firebase";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";
import PaymentScreen from "../screens/PaymentScreen";

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

const AppContainer = createAppContainer(
  createSwitchNavigator(
    { App: MainTabNavigator, Payment: PaymentScreen },
    { initialRouteName: "App" }
  )
);
export default function AppNavigator() {
  return (
    <AppContainer
      onNavigationStateChange={(prevState, currentState) => {
        const currentScreen = getActiveRouteName(currentState);
        const prevScreen = getActiveRouteName(prevState);
        if (prevScreen !== currentScreen) {
          firebase.analytics().setCurrentScreen(currentScreen);
        }
      }}
    />
  );
}
