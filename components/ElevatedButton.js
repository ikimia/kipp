import * as React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function ElevatedButton({ value, title, icon, iconColor }) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: "white",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 4
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon
          name={icon}
          style={{ fontSize: 24, marginEnd: 10, color: iconColor }}
        />
        <View>
          <Text style={{ fontSize: 18 }}>{value}</Text>
          <Text>{title}</Text>
        </View>
      </View>
    </View>
  );
}
