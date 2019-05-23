import React, { Suspense } from "react";
import { StyleSheet, View } from "react-native";

import AppNavigator from "./navigation/AppNavigator";
import { useDirection } from "./hooks/direction";
import AuthenticationFlow from "./screens/AuthenticationFlow";
import StyledText from "./components/StyledText";

function App() {
  const direction = useDirection();

  return (
    <View style={[styles.container, { direction }]}>
      <AuthenticationFlow
        Loading={() => (
          <View style={styles.loading}>
            <StyledText>Loading...</StyledText>
          </View>
        )}
        App={AppNavigator}
      />
    </View>
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
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
