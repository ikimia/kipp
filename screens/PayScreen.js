import React, { useContext, useState } from "react";
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
  View,
  Drawer
} from "native-base";
import StyleSheets from "../constants/StyleSheets";
import NumPad from "../components/NumPad";
import { NavigationContext, NavigationEvents } from "react-navigation";
import SideBar from "../components/SideBar";

const CODE_SIZE = 5;

export default function PayScreen() {
  const { navigate } = useContext(NavigationContext);
  const { t } = useTranslation("common");

  const [receiptNumber, setReceiptNumber] = useState("12345");
  let drawer = null;
  const closeDrawer = () => drawer._root.close();

  return (
    <Drawer
      ref={ref => (drawer = ref)}
      onClose={closeDrawer}
      content={<SideBar />}
    >
      <NavigationEvents onDidBlur={closeDrawer} />
      <Container>
        <Header transparent>
          <Left>
            <Icon
              name="menu"
              onPress={() => {
                drawer._root.open();
              }}
            />
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
    </Drawer>
  );
}
