import * as React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-navigation";

export default function Container({ children }) {
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      forceInset={{ top: "never", bottom: "always" }}
    >
      {children}
      <View style={{ height: 49 }} />
    </SafeAreaView>
  );
}
