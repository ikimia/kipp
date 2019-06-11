import * as React from "react";
import { View } from "react-native";
import { COLORS } from "./ItemListItem";
import murmurhash from "murmurhash";
import StyledText from "./StyledText";
import FastImage from "react-native-fast-image";

export default function StoreLogo({ logoURL, storeName, size = 120 }) {
  const style = { borderRadius: 5, width: size, height: size };
  if (logoURL) {
    return <FastImage source={{ uri: logoURL }} style={style} />;
  }
  return (
    <View
      style={{
        ...style,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS[murmurhash(storeName) % COLORS.length]
      }}
    >
      <StyledText
        bold
        size={16}
        align="center"
        color="white"
        style={{ opacity: 0.5 }}
      >
        {size <= 50 ? storeName[0] : storeName}
      </StyledText>
    </View>
  );
}
