import * as React from "react";
import { View } from "react-native";
import StyledText from "./StyledText";

export default function ItemListSectionHeader({ title }) {
  return (
    <View
      style={{
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: "#EEE"
      }}
    >
      <StyledText bold>{title}</StyledText>
    </View>
  );
}
