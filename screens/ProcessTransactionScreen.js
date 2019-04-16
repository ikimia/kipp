import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Button, Spinner, Container, Text, Header } from "native-base";
import StyleSheets from "../constants/StyleSheets";

export default function ProcessTransactionScreen({ navigation: { navigate } }) {
  const [text, setText] = useState("Sending Transaction");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setTimeout(() => setText("Authorizing"), 1000);
    setTimeout(() => setText("Capturing"), 2000);
    setTimeout(() => setDone(true), 3200);
  });
  return (
    <Container>
      <Header />
      <View alignItems={"center"} style={StyleSheets.f1}>
        <View style={StyleSheets.f1}>
          {done ? null : <Spinner />}
          {done ? null : <Text>{text}</Text>}
        </View>
        <View style={StyleSheets.f4}>
          <Button
            title={"Done"}
            disabled={!done}
            onPress={() => {
              navigate("Pay");
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
              Done
            </Text>
          </Button>
        </View>
      </View>
    </Container>
  );
}
