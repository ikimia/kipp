import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import i18next from "i18next";
import Icon from "react-native-vector-icons/Feather";

import LanguageSettingsScreen from "../screens/LanguageSettingsScreen";
import NewCreditCardScreen from "../screens/NewCreditCardScreen";
import SavedCreditCardScreen from "../screens/SavedCreditCardScreen";
import MainScreen from "../screens/MainScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PurchasesScreen from "../screens/PurchasesScreen";
import RewardsScreen from "../screens/RewardsScreen";
import StoresScreen from "../screens/StoresScreen";
import PastOrderScreen from "../screens/PastOrderScreen";

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
    Pay: stack({ Main: MainScreen }, "Main", "credit-card"),
    Receipts: stack(
      {
        Purchases: PurchasesScreen,
        PastOrder: PastOrderScreen
      },
      "Purchases",
      "tag"
    ),
    Rewards: stack({ Rewards: RewardsScreen }, "Rewards", "gift"),
    Explore: stack({ Stores: StoresScreen }, "Stores", "search"),
    Settings: stack(
      {
        Settings: ProfileScreen,
        NewCreditCard: NewCreditCardScreen,
        SavedCreditCard: SavedCreditCardScreen,
        LanguageSettings: LanguageSettingsScreen
      },
      "Settings",
      "settings"
    )
  },
  { initialRouteName: "Settings" }
);
