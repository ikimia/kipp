import React from "react";
import firebase from "react-native-firebase";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";
import PaymentScreen from "../screens/PaymentScreen";
import AuthenticationFlow from "../screens/AuthenticationFlow";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";

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
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthenticationFlow,
      App: MainTabNavigator,
      Payment: PaymentScreen
    },
    { initialRouteName: "AuthLoading" }
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
