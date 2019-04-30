import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";
import { Button, Spinner, Container, Text, Header } from "native-base";
import StyleSheets from "../constants/StyleSheets";
import { useTranslation } from "react-i18next";
import { NavigationContext } from "react-navigation";

export default function ProcessTransactionScreen() {
  const [text, setText] = useState("sendingTransaction");
  const [done, setDone] = useState(false);
  const { t } = useTranslation("pay");
  const { navigate } = useContext(NavigationContext);
  useEffect(() => {
    const timers = [
      setTimeout(() => setText("authorizing"), 1000),
      setTimeout(() => setText("capturing"), 2000),
      setTimeout(() => setDone(true), 3200)
    ];
    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);
  return (
    <Container>
      <Header />
      <View style={[StyleSheets.f1, { alignItems: "center" }]}>
        <View style={StyleSheets.f1}>
          {done ? null : <Spinner />}
          {done ? null : <Text>{t(text)}</Text>}
        </View>
        <View style={StyleSheets.f4}>
          <Button
            disabled={!done}
            onPress={() => {
              navigate("Pay", { resetCode: true });
            }}
            style={[StyleSheets.button, { height: 80, width: 200 }]}
          >
            <Text
              style={[
                StyleSheets.textCenter,
                StyleSheets.textSize3,
                StyleSheets.textBold
              ]}
            >
              {t("common:done")}
            </Text>
          </Button>
        </View>
      </View>
    </Container>
  );
}
