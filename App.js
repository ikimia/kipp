import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import { useDirection } from "./hooks/direction";

export default function App() {
  const direction = useDirection();
  return (
    <View style={[styles.container, { direction }]}>
      {Platform.OS === "ios" && <StatusBar barStyle="default" />}
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
