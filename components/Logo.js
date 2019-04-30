import * as React from "react";
import { View, Text } from "react-native";
import Hedgehog from "./Hedgehog";

export default function Logo() {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={{ marginEnd: 10 }}>
        <Hedgehog color="#EEE" size={50} />
      </View>
      <Text style={{ fontWeight: "bold", fontSize: 30, color: "#EEE" }}>
        KEEPI
      </Text>
    </View>
  );
}
