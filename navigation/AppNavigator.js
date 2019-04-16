import React from "react";
import { useTranslation } from "react-i18next";

import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";

const Stack = createSwitchNavigator({ MainTabNavigator });

function WrappedStack(props) {
  const { t } = useTranslation("common");
  return <Stack screenProps={{ t }} {...props} />;
}
WrappedStack.router = Stack.router;

export default createAppContainer(WrappedStack);
