import * as React from "react";
import { RectButton } from "react-native-gesture-handler";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import StyledText from "./StyledText";

function getIcon(iconElement, icon, small) {
  if (!icon && !iconElement) {
    return <View style={{ width: 10 }} />;
  }
  return (
    <View style={{ width: small ? 15 : 20, margin: 10 }}>
      {iconElement ? iconElement : <Icon name={icon} size={small ? 14 : 18} />}
    </View>
  );
}

export default function ListItem({
  onPress,
  iconElement,
  icon,
  text,
  noCheveron,
  rightIcon,
  first,
  last,
  small
}) {
  return (
    <RectButton onPress={onPress} style={{ backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderColor: "#EEE",
          borderTopWidth: first ? 1 : undefined,
          borderBottomWidth: last ? 1 : undefined
        }}
      >
        {getIcon(iconElement, icon, small)}
        <View
          style={{
            flex: 1,
            padding: 10,
            paddingStart: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderColor: "#EEE",
            borderBottomWidth: last ? 0 : 1
          }}
        >
          <StyledText size={small ? 14 : 16}>{text}</StyledText>
          {rightIcon && <Icon name={rightIcon} />}
          {!noCheveron && <Icon name="chevron-right" />}
        </View>
      </View>
    </RectButton>
  );
}
