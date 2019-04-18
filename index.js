import { AppRegistry } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import App from "./App";
import { name as appName } from "./app.json";
import i18n from "./i18n";

AsyncStorage.getItem("@StreetPay_language").then(code => {
  if (code) {
    i18n.changeLanguage(code);
  }
  AppRegistry.registerComponent(appName, () => App);
});
