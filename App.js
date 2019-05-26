import React, { Suspense } from "react";
import { View } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import { useDirection } from "./hooks/direction";

function App() {
  const direction = useDirection();
  return (
    <View style={{ flex: 1, direction }}>
      <AppNavigator />
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
