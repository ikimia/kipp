import * as React from "react";
import { Image, View } from "react-native";
import StyledText from "./components/StyledText";

export function RandomLogo({ text, height = 120, width = 120, seed = null }) {
  return (
    <View
      style={{
        height,
        width,
        alignItems: "flex-end",
        flexDirection: "row"
      }}
    >
      <Image
        style={{
          borderRadius: 3,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
        source={{
          uri: `https://picsum.photos/${width}/${height}${
            seed ? "?random=" + seed : ""
          }`
        }}
      />
      {text ? (
        <View>
          <View
            style={{
              margin: 10,
              backgroundColor: "rgba(0,0,0, 0.5)",
              padding: 5
            }}
          >
            <StyledText bold color="white" size={18}>
              {text}
            </StyledText>
          </View>
        </View>
      ) : null}
    </View>
  );
}
