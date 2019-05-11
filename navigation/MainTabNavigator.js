import { createStackNavigator } from "react-navigation";
import i18next from "i18next";

import LanguageSettingsScreen from "../screens/LanguageSettingsScreen";
import NewCreditCardScreen from "../screens/NewCreditCardScreen";
import SavedCreditCardScreen from "../screens/SavedCreditCardScreen";
import MainScreen from "../screens/MainScreen";
import ProfileScreen from "../screens/ProfileScreen";

const isRTL = () => (i18next.language || "").startsWith("he");

export default createStackNavigator(
  {
    Pay: MainScreen,
    Profile: ProfileScreen,
    NewCreditCard: NewCreditCardScreen,
    SavedCreditCard: SavedCreditCardScreen,
    LanguageSettings: LanguageSettingsScreen
  },
  {
    initialRouteName: "Pay",
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
