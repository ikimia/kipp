import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { View } from "react-native";
import i18next from "i18next";
import Icon from "react-native-vector-icons/Feather";

import LanguageSettingsScreen from "../screens/LanguageSettingsScreen";
import MainScreen from "../screens/MainScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ReceiptsScreen from "../screens/ReceiptsScreen";
import ExploreScreen from "../screens/ExploreScreen";
import FollowingScreen from "../screens/OffersScreen";
import PastOrderScreen from "../screens/PastOrderScreen";
import PaymentSettingsScreen from "../screens/PaymentSettingsScreen";
import ExploreListScreen from "../screens/ExploreListScreen";
import StoreScreen from "../screens/StoreScreen";

const isRTL = () => (i18next.language || "").startsWith("he");

const stack = (stacks, initialRouteName, icon) =>
  createStackNavigator(stacks, {
    initialRouteName,
    defaultNavigationOptions: () => ({
      gesturesEnabled: true,
      gestureDirection: isRTL() ? "inverted" : "default"
    }),
    headerMode: "none",
    navigationOptions: ({ navigation }) => ({
      gesturesEnabled: true,
      gestureDirection: isRTL() ? "inverted" : "default",
      tabBarIcon({ focused, tintColor }) {
        return (
          <View>
            <Icon
              style={{ marginEnd: 3 }}
              name={icon}
              size={20}
              color={focused ? tintColor : "#666"}
            />
            {navigation.getParam("showNotification") && (
              <View
                style={{
                  height: 10,
                  width: 10,
                  backgroundColor: "#10ac84",
                  position: "absolute",
                  right: 0,
                  borderRadius: 5
                }}
              />
            )}
          </View>
        );
      },
      tabBarVisible: !navigation.getParam("tabBarHidden")
    }),
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
    Offers: stack({ Offers: FollowingScreen }, "Offers", "gift"),
    Explore: stack(
      {
        Explore: ExploreScreen,
        ExploreList: ExploreListScreen,
        Store: StoreScreen
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
  {
    initialRouteName: "Pay",
    tabBarOptions: {
      style: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: "rgba(255,255,255,0.9)"
      }
    }
  }
);
