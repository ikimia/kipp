import * as React from "react";
import { TouchableHighlight } from "react-native-gesture-handler";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function ListItem({ onPress, iconElement, icon, text }) {
  return (
    <TouchableHighlight onPress={onPress}>
      <View
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          padding: 10,
          alignItems: "center",
          borderBottomColor: "#EEE",
          borderBottomWidth: 1
        }}
      >
        <View style={{ width: 25 }}>
          {iconElement ? iconElement : <Icon name={icon} />}
        </View>
        <Text style={{ marginStart: 10 }}>{text}</Text>
        <View style={{ flex: 1 }} />
        <Icon name="chevron-right" />
      </View>
    </TouchableHighlight>
  );
}
