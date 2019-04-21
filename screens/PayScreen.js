import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CodeInput from "../components/CodeInput";
import {
  Button,
  Text,
  Container,
  Header,
  Left,
  Body,
  Right,
  Icon,
  View
} from "native-base";
import StyleSheets from "../constants/StyleSheets";
import NumPad from "../components/NumPad";

const CODE_SIZE = 5;

export default function PayScreen({ navigation }) {
  const { navigate } = navigation;
  const { t } = useTranslation("common");

  const [receiptNumber, setReceiptNumber] = useState("12345");

  return (
    <Container>
      <Header transparent>
        <Left>
          <Icon name="menu" />
        </Left>
        <Body />
        <Right />
      </Header>
      <View
        style={{
          alignItems: "center",
          flex: 1
        }}
      >
        <View style={{ marginVertical: 30 }}>
          <CodeInput
            size={CODE_SIZE}
            onUpdate={receiptNumber => {
              setReceiptNumber(receiptNumber);
            }}
            value={receiptNumber}
          />
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <NumPad
            onPress={key => {
              if ("1234567890".includes(key)) {
                if (receiptNumber.length < CODE_SIZE) {
                  setReceiptNumber(receiptNumber + key);
                }
              } else {
                if (receiptNumber.length > 0) {
                  setReceiptNumber(receiptNumber.slice(0, -1));
                }
              }
            }}
          />
        </View>
        <View style={{ marginVertical: 30 }}>
          <Button
            disabled={receiptNumber.length !== 5}
            onPress={() => {
              navigate("Confirm", { receiptNumber });
            }}
            transparent
            full
          >
            <Text
              style={[
                StyleSheets.textCenter,
                StyleSheets.textSize3,
                StyleSheets.textBold
              ]}
            >
              {t("pay:proceed")}
            </Text>
          </Button>
        </View>
      </View>
    </Container>
  );
}
