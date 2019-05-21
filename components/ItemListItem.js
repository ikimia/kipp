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
  color,
  logo,
  title,
  text,
  secondaryText,
  secondaryTextImportant,
  sideText
}) {
  return (
    <RectButton onPress={onPress} style={{ backgroundColor: "white" }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ padding: 15 }}>
          <View
            style={{
              height: 50,
              width: 50,
              borderRadius: 10,
              backgroundColor: color,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <StyledText bold color="white" size={20}>
              {logo}
            </StyledText>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignSelf: "stretch",
            padding: 15,
            paddingStart: 0,
            borderBottomColor: "#EEE",
            borderBottomWidth: 1,
            alignItems: "center"
          }}
        >
          <View style={{ flex: 1 }}>
            <StyledText bold size={16}>
              {title}
            </StyledText>
            <StyledText size={12}>{text}</StyledText>
            {secondaryText && (
              <StyledText
                size={12}
                color="#333"
                style={{
                  fontSize: 12,
                  fontStyle: "italic",
                  marginTop: 5,
                  ...(secondaryTextImportant
                    ? {
                        fontWeight: "bold",
                        color: "darkred"
                      }
                    : undefined)
                }}
              >
                {secondaryText}
              </StyledText>
            )}
          </View>
          <StyledText size={20}>{sideText}</StyledText>
        </View>
      </View>
    </RectButton>
  );
}
