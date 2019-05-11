import * as React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { TouchableHighlight } from "react-native-gesture-handler";

export default function ElevatedButton({
  value,
  title,
  icon,
  iconColor,
  onPress
}) {
  return (
    <View
      style={{
        borderRadius: 10,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 4
      }}
    >
      <TouchableHighlight onPress={onPress} style={{ borderRadius: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10
          }}
        >
          <Icon
            name={icon}
            style={{ fontSize: 24, marginEnd: 10, color: iconColor }}
          />
          <View>
            <Text style={{ fontSize: 18 }}>{value}</Text>
            <Text>{title}</Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
}
