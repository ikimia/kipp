import React, { useEffect, useState, useContext, useReducer } from "react";
import { View, StatusBar, Alert } from "react-native";
import {
  SafeAreaView,
  NavigationEvents,
  NavigationContext,
  NavigationActions
} from "react-navigation";
import Logo from "../components/Logo";
import Backdrop, { PATTERNS } from "../components/Backdrop";
import * as Backend from "../Backend";
import PaymentScreen from "./PaymentScreen";
import CodeView from "./CodeView";
import TouchID from "react-native-touch-id";
import DeviceInfo from "react-native-device-info";

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

export default function MainScren() {
  const [orderId, setOrderId] = useState(null);
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);
  const { dispatch } = useContext(NavigationContext);
  const setTabBarHidden = tabBarHidden => {
    dispatch(
      NavigationActions.setParams({
        key: "Pay",
        params: { tabBarHidden }
      })
    );
  };
  useEffect(() => {
    return Backend.onChargeAttempt(message => {
      const { storeName, price, orderId: orderIdFromBackend } = message.data;
      confirmPayment(storeName, price, async () => {
        if (!DeviceInfo.isEmulator()) {
          await TouchID.authenticate();
        }
        setTabBarHidden(true);
        setOrderId(orderIdFromBackend);
        setShowPaymentScreen(true);
      });
    });
  }, []);
  const [pattern, setNewPattern] = useReducer(
    getRandomPattern,
    null,
    getRandomPattern
  );
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
              setTabBarHidden(false);
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
