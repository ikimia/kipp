import React, { Suspense } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

import AppNavigator from "./navigation/AppNavigator";
import { useDirection } from "./hooks/direction";
import { StyleProvider, Text } from "native-base";
import getTheme from "./native-base-theme/components";
import AuthenticationFlow from "./screens/AuthenticationFlow";
function App() {
  const direction = useDirection();

  return (
    <StyleProvider style={getTheme()}>
      <View style={[styles.container, { direction }]}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        {
          <AuthenticationFlow
            loadingScreen={() => (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text>Loading...</Text>
              </View>
            )}
            App={AppNavigator}
          />
        }
      </View>
    </StyleProvider>
  );
}

export default function SuspendedApp() {
  return (
    <Suspense fallback={<View />}>
      <App />
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
