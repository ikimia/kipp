import React, { useEffect, useState, useContext } from "react";
import { View, StatusBar } from "react-native";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { BorderlessButton } from "react-native-gesture-handler";
import { SocialProfile } from "../contexes/SocialProfile";
import Logo from "../components/Logo";
import Backdrop, { PATTERNS } from "../components/Backdrop";
import StyledText from "../components/StyledText";
import { getCode } from "../Backend";
import PaymentCode from "../components/PaymentCode";

const CODE_TIMEOUT = 120;

function useTimer(code, onEnd) {
  const [total, setTotal] = useState(CODE_TIMEOUT);
  useEffect(() => {
    setTotal(CODE_TIMEOUT);
    if (!code) {
      return;
    }
    const timer = setInterval(() => {
      setTotal(prevTotal => {
        if (prevTotal > 0) {
          return prevTotal - 1;
        }
        clearInterval(timer);
        onEnd();
        return prevTotal;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [code]);
  const minutes = Math.floor(total / 60)
    .toString(10)
    .padStart(2, "0");
  const seconds = (total % 60).toString(10).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function getRandomPattern(prevPattern) {
  for (;;) {
    const keys = Object.keys(PATTERNS);
    const randomKeyIndex = Math.floor(Math.random() * keys.length);
    const pattern = PATTERNS[keys[randomKeyIndex]];
    if (pattern !== prevPattern) {
      return pattern;
    }
  }
}

export default function MainScren() {
  const [code, setCode] = useState(null);
  const [pattern, setPattern] = useState(getRandomPattern(-1));
  const { userProfile } = useContext(SocialProfile);
  const setNewCode = (keepPattern = false) => {
    setCode(null);
    if (!keepPattern) {
      setPattern(getRandomPattern(pattern));
    }
    getCode().then(setCode);
  };
  useEffect(() => {
    setNewCode(true);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <NavigationEvents
        onWillFocus={() => StatusBar.setBarStyle("light-content")}
        onDidBlur={() => StatusBar.setBarStyle("default")}
      />
      <Backdrop pattern={PATTERNS[pattern]} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ alignItems: "center", padding: 10 }}>
          <Logo color="white" fontSize={25} />
        </View>
        <View style={{ flex: 2, justifyContent: "center" }}>
          <View style={{ alignItems: "center" }}>
            <StyledText size={16} color="white">
              One-Time Payment Code:
            </StyledText>
            <PaymentCode code={code} />
          </View>
        </View>
        <View style={{ flex: 1 }} />
        <View
          style={{
            marginHorizontal: 15,
            marginBottom: 30,
            padding: 5,
            backgroundColor: "rgba(0, 0, 0, 0.2)"
          }}
        >
          {[
            `Good evening, ${userProfile.name}!`,
            "To pay, give the code above at the counter.",
            `The code is valid for the next ${useTimer(
              code,
              setNewCode
            )} minutes.`
          ].map((text, i) => (
            <StyledText key={i} color="white">
              {text}
            </StyledText>
          ))}
          <View style={{ flexDirection: "row" }}>
            <StyledText color="white">To get another code, </StyledText>
            <BorderlessButton
              activeOpacity={0.5}
              enabled={!!code}
              onPress={setNewCode}
            >
              <StyledText bold underline color="white">
                click here
              </StyledText>
            </BorderlessButton>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
