import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

// eslint-disable-next-line no-unused-vars
import i18n from "./i18n";

AppRegistry.registerComponent(appName, () => App);
