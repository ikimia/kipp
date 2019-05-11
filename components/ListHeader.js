import * as React from "react";
import { View, Text } from "react-native";

export default function ListHeader({ text }) {
  return (
    <View
      style={{
        backgroundColor: "#EFEFEF",
        borderBottomColor: "#CCC",
        borderBottomWidth: 1,
        padding: 10,
        fontSize: 16
      }}
    >
      <Text>{text}</Text>
    </View>
  );
}
