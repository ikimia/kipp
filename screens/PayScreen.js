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
import {
  NavigationContext,
  NavigationEvents,
  SafeAreaView
} from "react-navigation";
import SideBar from "../components/SideBar";

const CODE_SIZE = 5;

export default function PayScreen() {
  const { navigate } = useContext(NavigationContext);
  const { t } = useTranslation("common");

  const initialReceiptNumber = [...Array(CODE_SIZE)]
    .map(() => Math.floor(Math.random() * 10))
    .join("");
  const [receiptNumber, setReceiptNumber] = useState(initialReceiptNumber);
  let drawer = null;
  const openDrawer = () => drawer._root.open();
  const closeDrawer = () => drawer._root.close();

  return (
    <Drawer
      ref={ref => (drawer = ref)}
      onClose={closeDrawer}
      content={<SideBar closeDrawer={closeDrawer} />}
    >
      <NavigationEvents
        onDidBlur={closeDrawer}
        onWillFocus={e => {
          if ((e.state.params || {}).resetCode && receiptNumber !== "") {
            setReceiptNumber("");
          }
        }}
      />
      <Container>
        <Header transparent>
          <Left>
            <Button transparent onPress={openDrawer}>
              <Icon name="menu" style={{ color: "black" }} />
            </Button>
          </Left>
          <Body />
          <Right />
        </Header>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 15 }}>
            <View style={{ alignSelf: "center" }}>
              <Text style={{ alignSelf: "center", marginBottom: 10 }}>
                Enter Receipt Number
              </Text>
              <CodeInput size={CODE_SIZE} value={receiptNumber} />
            </View>
            <View style={{ flex: 1, marginVertical: 30 }}>
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
            <Button
              disabled={receiptNumber.length !== 5}
              onPress={() => navigate("Confirm", { receiptNumber })}
              block
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
        </SafeAreaView>
      </Container>
    </Drawer>
  );
}
