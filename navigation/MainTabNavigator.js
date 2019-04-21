import { createStackNavigator } from "react-navigation";

import PurchasesScreen from "../screens/PurchasesScreen";
import SettingsScreen from "../screens/SettingsScreen";
import PayScreen from "../screens/PayScreen";
import PayConfirmScreen from "../screens/PayConfirmScreen";
import ProcessTransactionScreen from "../screens/ProcessTransactionScreen";
import PastOrderScreen from "../screens/PastOrderScreen";
import LanguageSettingsScreen from "../screens/LanguageSettingsScreen";
import SocialProfileScreen from "../screens/SocialProfileScreen";
import i18next from "i18next";
import PaymentSettingsScreen from "../screens/PaymentSettingsScreen";
import NewCreditCardScreen from "../screens/NewCreditCardScreen";
import SavedCreditCardScreen from "../screens/SavedCreditCardScreen";
import MyAccountScreen from "../screens/MyAccountScreen";

const isRTL = () => (i18next.language || "").startsWith("he");

export default createStackNavigator(
  {
    Pay: PayScreen,
    ProcessTransactionScreen: ProcessTransactionScreen,
    Confirm: PayConfirmScreen,
    Purchases: PurchasesScreen,
    PastOrder: PastOrderScreen,
    Settings: SettingsScreen,
    LanguageSettings: LanguageSettingsScreen,
    SocialProfile: SocialProfileScreen,
    PaymentSettings: PaymentSettingsScreen,
    MyAccount: MyAccountScreen,
    NewCreditCard: NewCreditCardScreen,
    SavedCreditCard: SavedCreditCardScreen
  },
  {
    defaultNavigationOptions: () => ({
      gesturesEnabled: true,
      gestureDirection: isRTL() ? "inverted" : "default"
    }),
    headerMode: "none",
    initialRouteName: "Pay",
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
