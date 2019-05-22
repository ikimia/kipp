import { AppRegistry, YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Require cycle:"]);

import App from "./App";
import { name as appName } from "./app.json";

import "./i18n";

AppRegistry.registerComponent(appName, () => App);
