import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { View, Text, Icon } from "native-base";
import { NavigationEvents, SafeAreaView } from "react-navigation";
import { TouchableHighlight } from "react-native-gesture-handler";
import Logo from "../components/Logo";
import { DARK_GRAY, OFFWHITE } from "../constants/Colors";

const generateCode = () =>
  Math.random()
    .toString(10)
    .slice(2, 8);

function CountdownTimer({ round }) {
  const [total, setTotal] = useState(600);
  useEffect(() => {
    setTotal(600);
    const timer = setInterval(() => {
      setTotal(prevTotal => {
        if (prevTotal > 0) {
          return prevTotal - 1;
        }
        clearInterval(timer);
        return prevTotal;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [round]);
  const minutes = Math.floor(total / 60)
    .toString(10)
    .padStart(2, "0");
  const seconds = (total % 60).toString(10).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function MainScren() {
  const [code, setCode] = useState(generateCode());
  const [validUntil, setValidUntil] = useState(Date.now() + 600000);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "stretch",
        backgroundColor: DARK_GRAY
      }}
    >
      <NavigationEvents
        onWillFocus={() => {
          StatusBar.setBarStyle("light-content");
        }}
      />
      <View style={{ marginTop: 50, alignItems: "center" }}>
        <Logo />
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 3
        }}
      >
        <Text
          style={{
            color: OFFWHITE,
            fontWeight: "bold",
            fontSize: 18
          }}
        >
          One-Time Code:
        </Text>
        <Text
          style={{
            color: OFFWHITE,
            fontWeight: "bold",
            fontSize: 55
          }}
        >
          {code.match(/.{3}/g).join(" ")}
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 14, color: OFFWHITE }}>
          valid for the next <CountdownTimer round={validUntil} /> minutes
        </Text>
        <TouchableHighlight
          onPress={() => {
            setCode(generateCode());
            setValidUntil(Date.now() + 600000);
          }}
          style={{ marginTop: 30, width: 60, height: 60, borderRadius: 30 }}
        >
          <View
            style={{
              backgroundColor: "rgba(0,255,125,0.7)",
              alignItems: "center",
              justifyContent: "center",
              width: 60,
              height: 60,
              borderRadius: 30
            }}
          >
            <Icon
              type="FontAwesome"
              name="refresh"
              style={{ color: "#222", fontSize: 35 }}
            />
          </View>
        </TouchableHighlight>
      </View>
      <View style={{ flex: 1 }} />
    </SafeAreaView>
  );
}
