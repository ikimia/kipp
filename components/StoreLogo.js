import * as React from "react";
import { useState, useEffect } from "react";
import { Image, View } from "react-native";
import { getStoreLogo } from "../Backend";
import { COLORS } from "./ItemListItem";
import murmurhash from "murmurhash";
import StyledText from "./StyledText";

export default function StoreLogo({ storeId, storeName, size = 120 }) {
  const [uri, setURI] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (storeId) {
      getStoreLogo(storeId)
        .then(setURI, () => {})
        .then(() => {
          setLoading(false);
        });
    }
  }, [storeId]);

  const style = { borderRadius: 5, width: size, height: size };
  if (loading) {
    return <View style={style} />;
  }
  if (uri) {
    return <Image source={{ uri }} style={style} />;
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
