import React, { useEffect, useState, useContext } from "react";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";
import { BorderlessButton } from "react-native-gesture-handler";
import { SocialProfile } from "../contexes/SocialProfile";
import Logo from "../components/Logo";
import Backdrop, { PATTERNS } from "../components/Backdrop";

const CODE_TIMEOUT = 120;

const generateCode = () =>
  Math.random()
    .toString(10)
    .slice(2, 8);

function useTimer(code, onEnd) {
  const [total, setTotal] = useState(CODE_TIMEOUT);
  useEffect(() => {
    setTotal(CODE_TIMEOUT);
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
  const [code, setCode] = useState(generateCode());
  const [pattern, setPattern] = useState(getRandomPattern(-1));
  const { userProfile } = useContext(SocialProfile);
  const setNewCode = () => {
    setCode(generateCode());
    setPattern(getRandomPattern(pattern));
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <Backdrop pattern={PATTERNS[pattern]} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ alignItems: "center", padding: 10 }}>
          <Logo color="white" fontSize={25} />
        </View>
        <View style={{ flex: 2, justifyContent: "center" }}>
          <View style={{ alignItems: "center" }}>
            <Text style={[styles.text, { fontSize: 16 }]}>
              One-Time Payment Code:
            </Text>
            <Text style={[styles.text, { fontSize: 70, fontWeight: "bold" }]}>
              {code.match(/.{3}/g).join(" ")}
            </Text>
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
            <Text key={i} style={[styles.text, { fontSize: 14 }]}>
              {text}
            </Text>
          ))}
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.text}>To get another code, </Text>
            <BorderlessButton activeOpacity={0.5} onPress={setNewCode}>
              <Text
                style={[
                  styles.text,
                  { fontWeight: "bold", textDecorationLine: "underline" }
                ]}
              >
                click here
              </Text>
            </BorderlessButton>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontFamily: "Open Sans"
  }
});
