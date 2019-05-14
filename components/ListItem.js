import * as React from "react";
import { RectButton } from "react-native-gesture-handler";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";

function getIcon(iconElement, icon) {
  if (!icon && !iconElement) {
    return null;
  }
  return (
    <View style={{ width: 20, marginEnd: 10 }}>
      {iconElement ? iconElement : <Icon name={icon} size={18} />}
    </View>
  );
}

export default function ListItem({
  onPress,
  iconElement,
  icon,
  text,
  noCheveron,
  rightIcon
}) {
  return (
    <RectButton
      onPress={onPress}
      style={{ backgroundColor: "white", padding: 10 }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {getIcon(iconElement, icon)}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Text style={{ fontSize: 16 }}>{text}</Text>
          {rightIcon && <Icon name={rightIcon} />}
          {!noCheveron && <Icon name="chevron-right" />}
        </View>
      </View>
    </RectButton>
  );
}
