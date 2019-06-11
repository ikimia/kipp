import * as React from "react";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import StyledText from "./StyledText";

export const COLORS = [
  "#ff9f43",
  "#ee5253",
  "#5f27cd",
  "#2e86de",
  "#222f3e",
  "#10ac84",
  "#01a3a4",
  "#f368e0"
];

export default function ItemListItem({
  onPress,
  logoComponent,
  last,
  secondaryTitle,
  title,
  text,
  sideComponent
}) {
  return (
    <RectButton onPress={onPress} style={{ backgroundColor: "white" }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ paddingHorizontal: 15, alignSelf: "center" }}>
          {logoComponent}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignSelf: "stretch",
            alignItems: "center",
            ...(!last
              ? {
                  borderBottomColor: "#EEE",
                  borderBottomWidth: 1
                }
              : undefined)
          }}
        >
          <View
            style={{ flex: 1, paddingVertical: 15, justifyContent: "center" }}
          >
            {secondaryTitle && (
              <StyledText color="#333">{secondaryTitle}</StyledText>
            )}
            <StyledText bold size={16}>
              {title}
            </StyledText>
            {text && <StyledText size={12}>{text}</StyledText>}
          </View>
          {sideComponent}
        </View>
      </View>
    </RectButton>
  );
}
