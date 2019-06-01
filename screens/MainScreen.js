import React, { useEffect, useState, useContext } from "react";
import { View, StatusBar, Alert } from "react-native";
import {
  SafeAreaView,
  NavigationEvents,
  NavigationContext,
  NavigationActions
} from "react-navigation";
import { BorderlessButton } from "react-native-gesture-handler";
import Logo from "../components/Logo";
import Backdrop, { PATTERNS } from "../components/Backdrop";
import StyledText from "../components/StyledText";
import * as Backend from "../Backend";
import PaymentCode from "../components/PaymentCode";
import Icon from "react-native-vector-icons/Feather";
import PaymentScreen from "./PaymentScreen";

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
    const pattern = PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
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

function CodeView({ onCodeChange }) {
  const [code, setCode] = useState(null);
  const setNewCode = async (firstCode = false) => {
    if (!firstCode) {
      onCodeChange();
    }
    const { code: newCode } = await Backend.getCode();
    setCode(newCode);
  };
  useEffect(() => {
    setNewCode(true);
  }, []);
  useEffect(() => {
    if (code) {
      return Backend.subscribe(code);
    }
  }, [code]);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 4, justifyContent: "center" }}>
        <View style={{ alignItems: "center" }}>
          <StyledText size={18} color="white">
            One-Time Payment Code:
          </StyledText>
          <PaymentCode code={code} />
          <View style={{ flexDirection: "row" }}>
            <View>
              <StyledText color="white">
                The code will expire{"\n"}
                in <StyledText bold>
                  {useTimer(code, setNewCode)}
                </StyledText>{" "}
                minutes
              </StyledText>
            </View>
            <View
              style={{
                borderStartColor: "white",
                borderStartWidth: 1,
                paddingStart: 15,
                marginStart: 15,
                justifyContent: "center"
              }}
            >
              <BorderlessButton enabled={!!code} onPress={setNewCode}>
                <Icon color="white" name="refresh-cw" size={30} />
              </BorderlessButton>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 3 }} />
    </View>
  );
}

export default function MainScren() {
  const [orderId, setOrderId] = useState(null);
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);
  const { dispatch } = useContext(NavigationContext);
  useEffect(() => {
    return Backend.onChargeAttempt(message => {
      const { storeName, price, orderId: orderIdFromBackend } = message.data;
      confirmPayment(storeName, price, () => {
        setOrderId(orderIdFromBackend);
        setShowPaymentScreen(true);
      });
    });
  }, []);
  useEffect(() => {
    dispatch(
      NavigationActions.setParams({
        key: "Pay",
        params: { tabBarHidden: showPaymentScreen }
      })
    );
  }, [showPaymentScreen]);
  const [pattern, setPattern] = useState(getRandomPattern(null));
  const setNewPattern = () => setPattern(getRandomPattern(pattern));
  return (
    <View style={{ flex: 1 }}>
      <NavigationEvents
        onWillFocus={() => StatusBar.setBarStyle("light-content")}
        onDidBlur={() => StatusBar.setBarStyle("default")}
      />
      <Backdrop pattern={pattern} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ alignItems: "center", padding: 10 }}>
          <Logo color="white" fontSize={25} />
        </View>
        {showPaymentScreen ? (
          <PaymentScreen
            orderId={orderId}
            onDone={() => {
              setShowPaymentScreen(false);
              setNewPattern();
            }}
          />
        ) : (
          <CodeView onCodeChange={setNewPattern} />
        )}
      </SafeAreaView>
    </View>
  );
}
