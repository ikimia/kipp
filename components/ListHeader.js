import * as React from "react";
import { View, Text } from "react-native";

export default function ListHeader({ text }) {
  return (
    <View
      style={{
        backgroundColor: "#EFEFEF",
        borderBottomColor: "#CCC",
        borderBottomWidth: 1,
        padding: 10
      }}
    >
      <Text style={{ fontSize: 14, color: "#111" }}>{text}</Text>
    </View>
  );
}
