import { AppRegistry, YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Require cycle:"]);

import App from "./App";
import { name as appName } from "./app.json";

import * as firebase from "firebase/app";
import "firebase/functions";

import "./i18n";

firebase.initializeApp({
  apiKey: "***REMOVED***",
  authDomain: "academic-works-241411.firebaseapp.com",
  databaseURL: "https://academic-works-241411.firebaseio.com",
  projectId: "academic-works-241411",
  storageBucket: "academic-works-241411.appspot.com",
  messagingSenderId: "415674172830",
  appId: "1:415674172830:web:09670deb38f323cc"
});
firebase.functions().useFunctionsEmulator("http://localhost:5000");

AppRegistry.registerComponent(appName, () => App);
