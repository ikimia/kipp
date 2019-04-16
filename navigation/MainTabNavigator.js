import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import PurchasesScreen from "../screens/PurchasesScreen";
import SettingsScreen from "../screens/SettingsScreen";
import PayScreen from "../screens/PayScreen";
import PayConfirmScreen from "../screens/PayConfirmScreen";
import ProcessTransactionScreen from "../screens/ProcessTransactionScreen";
import PastOrderScreen from "../screens/PastOrderScreen";
import LanguageSettingsScreen from "../screens/LanguageSettingsScreen";
import { Footer, FooterTab, Button, Text, Icon } from "native-base";
import { useTranslation } from "react-i18next";

const stack = (stacks, initialRouteName) =>
  createStackNavigator(stacks, { headerMode: "none", initialRouteName });

export default createBottomTabNavigator(
  {
    PayStack: stack(
      {
        Pay: PayScreen,
        ProcessTransactionScreen: ProcessTransactionScreen,
        Confirm: PayConfirmScreen
      },
      "Pay"
    ),
    PurchasesStack: stack(
      {
        Purchases: PurchasesScreen,
        PastOrder: PastOrderScreen
      },
      "Purchases"
    ),
    SettingsStack: stack(
      {
        Settings: SettingsScreen,
        LanguageSettings: LanguageSettingsScreen
      },
      "Settings"
    )
  },
  {
    tabBarComponent: function BottomTabsNavigator({ navigation }) {
      const { t } = useTranslation();
      return (
        <Footer>
          <FooterTab>
            {[
              ["PayStack", "wallet", "pay:pay"],
              ["PurchasesStack", "paper", "purchases:purchases"],
              ["SettingsStack", "options", "settings:settings"]
            ].map(([stack, icon, label], i) => (
              <Button
                key={stack}
                vertical
                active={navigation.state.index === i}
                onPress={() => navigation.navigate(stack)}
              >
                <Icon name={icon} />
                <Text>{t(label)}</Text>
              </Button>
            ))}
          </FooterTab>
        </Footer>
      );
    }
  }
);
