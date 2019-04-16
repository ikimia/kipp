import React from "react";
import { useTranslation } from "react-i18next";

import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";

const Stack = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator
});

function WrappedStack(props) {
  const { t } = useTranslation("common");
  return <Stack screenProps={{ t }} {...props} />;
}
WrappedStack.router = Stack.router;

export default createAppContainer(WrappedStack);
