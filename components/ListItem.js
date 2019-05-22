import * as React from "react";
import { RectButton } from "react-native-gesture-handler";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import StyledText from "./StyledText";

function getIcon(iconElement, icon) {
  if (!icon && !iconElement) {
    return null;
  }
  return (
    <View style={{ width: 20, margin: 10 }}>
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
  rightIcon,
  first,
  last
}) {
  return (
    <RectButton onPress={onPress} style={{ backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          ...(first
            ? { borderTopColor: "#EEE", borderTopWidth: 1 }
            : undefined),
          ...(last
            ? { borderBottomColor: "#EEE", borderBottomWidth: 1 }
            : undefined)
        }}
      >
        {getIcon(iconElement, icon)}
        <View
          style={{
            flex: 1,
            padding: 10,
            paddingStart: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            ...(!last
              ? {
                  borderBottomColor: "#EEE",
                  borderBottomWidth: 1
                }
              : undefined)
          }}
        >
          <StyledText size={16}>{text}</StyledText>
          {rightIcon && <Icon name={rightIcon} />}
          {!noCheveron && <Icon name="chevron-right" />}
        </View>
      </View>
    </RectButton>
  );
}
