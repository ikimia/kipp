import React, { useEffect, useState, useContext, useRef } from "react";
import { View, StatusBar, Animated } from "react-native";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { BorderlessButton } from "react-native-gesture-handler";
import { SocialProfile } from "../contexes/SocialProfile";
import Logo from "../components/Logo";
import Backdrop, { PATTERNS } from "../components/Backdrop";
import StyledText from "../components/StyledText";
import { getCode } from "../Backend";
import { PulseIndicator as ActivityIndicator } from "react-native-indicators";

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

function PaymentCode({ code }) {
  const loadingOpacity = useRef(new Animated.Value(0)).current;
  const [codeElement, setCodeElement] = useState(null);
  const fade = (toValue, duration) =>
    new Promise(resolve =>
      Animated.timing(loadingOpacity, { toValue, duration }).start(resolve)
    );
  useEffect(() => {
    (async function() {
      if (code === null) {
        await fade(0, 100);
        setCodeElement(
          <View style={{ flexDirection: "row" }}>
            {[...Array(7)].map((_, i) => (
              <View key={i} style={{ width: 35 }}>
                {i === 3 ? null : <ActivityIndicator size={35} color="white" />}
              </View>
            ))}
          </View>
        );
        await fade(1, 100);
      } else {
        await fade(0, 250);
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
