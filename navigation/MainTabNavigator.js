import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import i18next from "i18next";
import Icon from "react-native-vector-icons/Feather";

import LanguageSettingsScreen from "../screens/LanguageSettingsScreen";
import MainScreen from "../screens/MainScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PurchasesScreen from "../screens/PurchasesScreen";
import RewardsScreen from "../screens/RewardsScreen";
import StoresScreen from "../screens/StoresScreen";
import PastOrderScreen from "../screens/PastOrderScreen";
import PaymentSettingsScreen from "../screens/PaymentSettingsScreen";
import PaymentScreen from "../screens/PaymentScreen";

const isRTL = () => (i18next.language || "").startsWith("he");

const stack = (stacks, initialRouteName, icon) =>
  createStackNavigator(stacks, {
    initialRouteName,
    defaultNavigationOptions: () => ({
      gesturesEnabled: true,
      gestureDirection: isRTL() ? "inverted" : "default"
    }),
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: true,
      gestureDirection: isRTL() ? "inverted" : "default",
      tabBarIcon({ focused, tintColor }) {
        return (
          <Icon name={icon} size={18} color={focused ? tintColor : "#666"} />
        );
      }
    },
    transitionConfig: () => ({
      screenInterpolator: ({
        layout: { initWidth: width },
        position,
        scene: { index }
      }) => {
        const [inputRange, outputRange] = isRTL()
          ? [[index, index + 1], [0, width]]
          : [[index - 1, index], [width, 0]];
        return {
          transform: [
            {
              translateX: position.interpolate({ inputRange, outputRange })
            }
          ]
        };
      }
    })
  });

export default createBottomTabNavigator(
  {
    Pay: stack(
      { Main: MainScreen, Payment: PaymentScreen },
      "Main",
      "credit-card"
    ),
    Receipts: stack(
      {
        Receipts: PurchasesScreen,
        PastOrder: PastOrderScreen
      },
      "Receipts",
      "tag"
    ),
    Rewards: stack({ Rewards: RewardsScreen }, "Rewards", "gift"),
    Explore: stack({ Explore: StoresScreen }, "Explore", "search"),
    Settings: stack(
      {
        Settings: ProfileScreen,
        PaymentSettings: PaymentSettingsScreen,
        LanguageSettings: LanguageSettingsScreen
      },
      "Settings",
      "settings"
    )
  },
  { initialRouteName: "Pay" }
);
