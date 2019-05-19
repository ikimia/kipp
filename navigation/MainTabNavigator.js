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

const stack = (stacks, initialRouteName) =>
  createStackNavigator(stacks, {
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

export default createBottomTabNavigator(
  {
    Pay: stack({ Main: MainScreen }, "Main"),
    Purchases: stack(
      {
        Purchases: PurchasesScreen,
        PastOrder: PastOrderScreen
      },
      "Purchases"
    ),
    Rewards: stack({ Rewards: RewardsScreen }, "Rewards"),
    Explore: stack({ Stores: StoresScreen }, "Stores"),
    Me: stack(
      {
        Profile: ProfileScreen,
        NewCreditCard: NewCreditCardScreen,
        SavedCreditCard: SavedCreditCardScreen,
        LanguageSettings: LanguageSettingsScreen
      },
      "Profile"
    )
  },
  {
    initialRouteName: "Pay",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon({ focused, tintColor }) {
        const name = {
          Pay: "credit-card",
          Explore: "search",
          Purchases: "tag",
          Rewards: "gift",
          Me: "user"
        }[navigation.state.key];
        return (
          <Icon name={name} size={18} color={focused ? tintColor : "#666"} />
        );
      },
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
  }
);
