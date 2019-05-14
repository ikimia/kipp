import * as React from "react";
import { RectButton } from "react-native-gesture-handler";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function ListItem({ onPress, iconElement, icon, text }) {
  return (
    <RectButton
      onPress={onPress}
      style={{ backgroundColor: "white", padding: 10 }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ width: 20 }}>
          {iconElement ? iconElement : <Icon name={icon} size={18} />}
        </View>
        <View
          style={{
            marginStart: 10,
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Text style={{ fontSize: 16 }}>{text}</Text>
          <Icon name="chevron-right" />
        </View>
      </View>
    </RectButton>
  );
}
