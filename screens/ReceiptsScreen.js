import * as React from "react";
import { View } from "react-native";
import Purchases from "../components/Purchases";
import AppHeader from "../components/AppHeader";

export default function ReceiptsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <AppHeader />
      <Purchases />
    </View>
  );
}
