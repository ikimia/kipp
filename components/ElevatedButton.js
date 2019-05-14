import * as React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { TouchableHighlight, RectButton } from "react-native-gesture-handler";

export default function ElevatedButton({ title, icon, iconColor, onPress }) {
  return (
    <RectButton
      onPress={onPress}
      style={{
        backgroundColor: "white"
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 10
        }}
      >
        <Icon
          name={icon}
          style={{ fontSize: 24, marginEnd: 10, color: iconColor }}
        />
        <View>
          <Text
            style={{
              fontSize: 16,
              color: iconColor,
              fontWeight: "bold",
              textTransform: "uppercase"
            }}
          >
            {title}
          </Text>
        </View>
      </View>
    </RectButton>
  );
}
