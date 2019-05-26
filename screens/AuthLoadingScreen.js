import * as React from "react";
import { useEffect, useContext } from "react";
import { View } from "react-native";
import { NavigationContext } from "react-navigation";
import firebase from "react-native-firebase";

export default function AuthLoadingScreen() {
  const { navigate } = useContext(NavigationContext);
  useEffect(() => {
    (async function() {
      const currentUser = await firebase.auth().currentUser;
      navigate(currentUser ? "App" : "Auth");
    })();
  }, []);
  return <View />;
}
