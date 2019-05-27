import * as React from "react";
import { useEffect, useContext } from "react";
import { View } from "react-native";
import { NavigationContext } from "react-navigation";
import { getCurrentUser } from "../Backend";

export default function AuthLoadingScreen() {
  const { navigate } = useContext(NavigationContext);
  useEffect(() => {
    navigate(getCurrentUser() ? "App" : "Auth");
  }, []);
  return <View />;
}
