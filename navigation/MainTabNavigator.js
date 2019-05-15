import { createStackNavigator } from "react-navigation";
import i18next from "i18next";

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

export default createStackNavigator(
  {
    Pay: MainScreen,
    Profile: ProfileScreen,
    Purchases: PurchasesScreen,
    PastOrder: PastOrderScreen,
    Rewards: RewardsScreen,
    Stores: StoresScreen,
    NewCreditCard: NewCreditCardScreen,
    SavedCreditCard: SavedCreditCardScreen,
    LanguageSettings: LanguageSettingsScreen
  },
  {
    initialRouteName: "NewCreditCard",
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
  }
);
