import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { Animated, View } from "react-native";
import StyledText from "./StyledText";
import { PulseIndicator as ActivityIndicator } from "react-native-indicators";

export default function PaymentCode({ code }) {
  const loadingOpacity = useRef(new Animated.Value(0)).current;
  const [codeElement, setCodeElement] = useState(null);
  const fade = (toValue, duration) =>
    new Promise(resolve =>
      Animated.timing(loadingOpacity, { toValue, duration }).start(resolve)
    );
  useEffect(() => {
    (async function() {
      if (code === null) {
        setCodeElement(
          <View style={{ flexDirection: "row" }}>
            {[...Array(7)].map((_, i) => (
              <View key={i} style={{ width: 35 }}>
                {i === 3 ? null : <ActivityIndicator size={35} color="white" />}
              </View>
            ))}
          </View>
        );
      } else {
        await fade(0, 150);
        setCodeElement(
          <StyledText bold size={70} color="white">
            {code.match(/.{3}/g).join(" ")}
          </StyledText>
        );
        await fade(1, 250);
      }
    })();
  }, [code]);
  return (
    <Animated.View
      style={{
        height: 100,
        justifyContent: "center",
        opacity: loadingOpacity
      }}
    >
      {codeElement}
    </Animated.View>
  );
}
