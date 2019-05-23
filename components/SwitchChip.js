import * as React from "react";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import StyledText from "./StyledText";

export default function SwitchChip({ value, onValueChange, title }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <RectButton
        style={{
          backgroundColor: value ? "#49beb7" : "#999",
          marginEnd: 5,
          borderRadius: 13,
          height: 26,
          width: 50
        }}
        onPress={() => onValueChange(!value)}
      >
        <View
          style={{
            height: 22,
            width: 22,
            margin: 2,
            borderRadius: 11,
            backgroundColor: "white",
            alignSelf: value ? "flex-end" : "flex-start"
          }}
        />
      </RectButton>
      <StyledText style={{ marginStart: 5 }}>{title}</StyledText>
    </View>
  );
}
