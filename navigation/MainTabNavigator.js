import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import i18next from "i18next";

import PurchasesScreen from "../screens/PurchasesScreen";
import SettingsScreen from "../screens/SettingsScreen";
import PastOrderScreen from "../screens/PastOrderScreen";
import LanguageSettingsScreen from "../screens/LanguageSettingsScreen";
import SocialProfileScreen from "../screens/SocialProfileScreen";
import PaymentSettingsScreen from "../screens/PaymentSettingsScreen";
import NewCreditCardScreen from "../screens/NewCreditCardScreen";
import SavedCreditCardScreen from "../screens/SavedCreditCardScreen";
import MyAccountScreen from "../screens/MyAccountScreen";
import MainScreen from "../screens/MainScreen";
import RewardsScreen from "../screens/RewardsScreen";
import { Icon } from "native-base";

const isRTL = () => (i18next.language || "").startsWith("he");

const stack = (screens, initialRouteName) =>
  createStackNavigator(screens, {
    initialRouteName,
    defaultNavigationOptions: () => ({
      gesturesEnabled: true,
      gestureDirection: isRTL() ? "inverted" : "default"
    }),
    headerMode: "none",
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

const payStack = stack({ Pay: MainScreen }, "Pay");
const rewardsStack = stack({ Rewards: RewardsScreen }, "Rewards");
const storesStack = stack({ Stores: RewardsScreen }, "Stores");
const purchasesStack = stack(
  { Purchases: PurchasesScreen, PastOrder: PastOrderScreen },
  "Purchases"
);
const settingsStack = stack(
  {
    Settings: SettingsScreen,
    LanguageSettings: LanguageSettingsScreen,
    SocialProfile: SocialProfileScreen,
    PaymentSettings: PaymentSettingsScreen,
    MyAccount: MyAccountScreen,
    NewCreditCard: NewCreditCardScreen,
    SavedCreditCard: SavedCreditCardScreen
  },
  "Settings"
);

export default createBottomTabNavigator(
  {
    Pay: payStack,
    Purchases: purchasesStack,
    Rewards: rewardsStack,
    Stores: storesStack,
    Me: settingsStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      // eslint-disable-next-line react/prop-types
      tabBarIcon: ({ tintColor: color }) => {
        const name = {
          Pay: "money",
          Purchases: "history",
          Rewards: "gift",
          Stores: "search",
          Me: "user"
        }[navigation.state.routeName];
        return (
          <Icon
            type="FontAwesome"
            name={name}
            style={{ fontSize: 25, color }}
          />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: "#1E1E24",
      inactiveBackgroundColor: "#d8d8d8",
      activeBackgroundColor: "#e8e8e8",
      style: { backgroundColor: "#d8d8d8" }
    }
  }
);
