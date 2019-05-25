import React from "react";
import firebase from "react-native-firebase";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";

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
  createSwitchNavigator({ MainTabNavigator })
);
export default function AppNavigator() {
  return (
    <AppContainer
      onNavigationStateChange={(prevState, currentState, action) => {
        const currentScreen = getActiveRouteName(currentState);
        const prevScreen = getActiveRouteName(prevState);
        if (prevScreen !== currentScreen) {
          firebase.analytics().setCurrentScreen(currentScreen);
        }
      }}
    />
  );
}
