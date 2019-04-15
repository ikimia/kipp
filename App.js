import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import AppNavigator from "./navigation/AppNavigator";

// eslint-disable-next-line no-unused-vars
import i18n from "./i18n";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
