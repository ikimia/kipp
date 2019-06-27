import * as React from "react";
import { View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function SearchInput() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EEE",
        padding: 10,
        borderRadius: 10,
        marginTop: 5,
        marginHorizontal: 15
      }}
    >
      <Icon
        name="search"
        style={{ fontSize: 15, color: "#999", marginEnd: 5 }}
      />
      <TextInput style={{ flex: 1 }} placeholder="Search" />
    </View>
  );
}
