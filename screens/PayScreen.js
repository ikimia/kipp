import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import CodeInput from "../components/CodeInput";
import {
  Button,
  Text,
  Container,
  Header,
  Left,
  Body,
  Right,
  Content,
  Title
} from "native-base";
import StyleSheets from "../constants/StyleSheets";

export default function PayScreen({ navigation }) {
  const { navigate } = navigation;
  const { t } = useTranslation("common");

  let textInput = React.createRef();

  const [receiptNumber, setReceiptNumber] = useState("12345");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Pay</Title>
        </Body>
        <Right />
      </Header>
      <Content
        style={[styles.container, StyleSheets.container]}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text style={styles.title}>{t("pay:receiptNumber")}</Text>
        <CodeInput
          size={5}
          style={{ marginBottom: 15 }}
          onUpdate={receiptNumber => {
            setReceiptNumber(receiptNumber);
            setButtonDisabled(receiptNumber.length !== 5);
          }}
          ref={ref => (textInput = ref)}
        />
        <Button
          disabled={buttonDisabled}
          title={"Proceed"}
          onPress={() => {
            textInput.blur();
            navigate("Confirm", { receiptNumber });
          }}
          style={[StyleSheets.button, StyleSheets.mt5, { height: 80 }]}
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
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1
  },
  title: {
    fontSize: 15,
    marginBottom: 10
  },
  button: {
    alignSelf: "center"
  }
});
