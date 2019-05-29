import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import i18next from "i18next";
import Icon from "react-native-vector-icons/Feather";

import LanguageSettingsScreen from "../screens/LanguageSettingsScreen";
import MainScreen from "../screens/MainScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ReceiptsScreen from "../screens/ReceiptsScreen";
import MembershipsScreen from "../screens/MembershipsScreen";
import ExploreScreen from "../screens/ExploreScreen";
import PastOrderScreen from "../screens/PastOrderScreen";
import PaymentSettingsScreen from "../screens/PaymentSettingsScreen";
import ExploreListScreen from "../screens/ExploreListScreen";

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
        Receipts: ReceiptsScreen,
        PastOrder: PastOrderScreen
      },
      "Receipts",
      "tag"
    ),
    Memberships: stack(
      { Memberships: MembershipsScreen },
      "Memberships",
      "gift"
    ),
    Explore: stack(
      {
        Explore: ExploreScreen,
        ExploreList: ExploreListScreen
      },
      "Explore",
      "search"
    ),
    Settings: stack(
      {
        Settings: SettingsScreen,
        PaymentSettings: PaymentSettingsScreen,
        LanguageSettings: LanguageSettingsScreen
      },
      "Settings",
      "settings"
    )
  },
  { initialRouteName: "Pay" }
);
