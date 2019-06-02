import * as React from "react";
import { useState, useEffect } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { BorderlessButton } from "react-native-gesture-handler";

import * as Backend from "../Backend";
import StyledText from "../components/StyledText";
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

export default function CodeView({ onCodeChange }) {
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
