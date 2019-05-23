import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { View, Image } from "react-native";
import StyledText from "../components/StyledText";
import { NavigationContext, NavigationEvents } from "react-navigation";
import { RectButton } from "react-native-gesture-handler";
import { COLORS } from "../components/ItemListItem";

const payingImage = require("../assets/img/paying.gif");
const successImage = require("../assets/img/success.gif");

export default function PaymentScreen() {
  const [success, setSuccess] = useState(false);
  const { getParam, navigate } = useContext(NavigationContext);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [success]);
  return (
    <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 30 }}>
      <NavigationEvents
        onWillFocus={() => {
          setSuccess(false);
        }}
      />
      <View style={{ alignItems: "center" }}>
        <View style={{ height: 120, justifyContent: "center" }}>
          <StyledText bold size={success ? 45 : 20}>
            {success
              ? "Success!"
              : `Paying $${getParam("price")} to ${getParam("storeName")}`}
          </StyledText>
        </View>
        <View style={{ height: 300 }}>
          <Image
            source={success ? successImage : payingImage}
            style={{ height: 300, width: 300 }}
          />
        </View>
        <View
          style={{
            height: 100,
            justifyContent: "center",
            alignSelf: "stretch"
          }}
        >
          <RectButton
            style={{
              display: success ? "flex" : "none",
              backgroundColor: COLORS[4],
              paddingVertical: 10,
              borderRadius: 5,
              alignItems: "center"
            }}
            onPress={() => navigate("Main")}
          >
            <View>
              <StyledText bold size={16} color="white">
                GO BACK
              </StyledText>
            </View>
          </RectButton>
        </View>
      </View>
    </View>
  );
}
