import React, { useEffect, useState, useContext } from "react";
import { View, StatusBar, Alert } from "react-native";
import {
  SafeAreaView,
  NavigationEvents,
  NavigationContext
} from "react-navigation";
import { BorderlessButton } from "react-native-gesture-handler";
import Logo from "../components/Logo";
import Backdrop, { PATTERNS } from "../components/Backdrop";
import StyledText from "../components/StyledText";
import * as Backend from "../Backend";
import PaymentCode from "../components/PaymentCode";
import firebase from "react-native-firebase";

const CODE_TIMEOUT = 120;

function getGreeting() {
  const hours = new Date().getHours();
  if (hours < 5) {
    return "Good night";
  }
  if (hours < 12) {
    return "Good morning";
  }
  if (hours < 17) {
    return "Good afternoon";
  }
  return "Good evening";
}

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

function confirmPayment(storeName, price, onConfirm) {
  Alert.alert(
    "Confirm Payment",
    `Confirm payment of $${price} to ${storeName}`,
    [{ text: "No" }, { text: "Yes", onPress: onConfirm }]
  );
}

export default function MainScren() {
  const [code, setCode] = useState(null);
  const [pattern, setPattern] = useState(getRandomPattern(-1));
  const { navigate } = useContext(NavigationContext);
  const setNewCode = (keepPattern = false) => {
    setCode(null);
    if (!keepPattern) {
      setPattern(getRandomPattern(pattern));
    }
    Backend.getCode().then(newCode => {
      if (code) {
        Backend.unsubscribe(code);
      }
      setCode(newCode);
      Backend.subscribe(newCode, message => {
        const {
          data: { storeName, price }
        } = message;
        confirmPayment(storeName, price, () => {
          navigate("Payment", { storeName, price });
        });
      });
    });
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
            padding: 10,
            backgroundColor: "rgba(0, 0, 0, 0.2)"
          }}
        >
          {[
            `${getGreeting()}, ${firebase.auth().currentUser.displayName}!`,
            "To pay, give the payment code to the seller.",
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
