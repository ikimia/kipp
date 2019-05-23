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
        <View style={{ height: 200, justifyContent: "center" }}>
          <StyledText bold size={30}>
            {success
              ? "Success!"
              : `Paying $${getParam("price")} to ${getParam("storeName")}`}
          </StyledText>
        </View>
        <Image
          source={success ? successImage : payingImage}
          style={{ height: 250 }}
        />
        <View style={{ height: 100, justifyContent: "center" }}>
          <RectButton
            style={{
              display: success ? "flex" : "none",
              backgroundColor: COLORS[5],
              paddingVertical: 10,
              paddingHorizontal: 15,
              borderRadius: 5
            }}
            onPress={() => navigate("Main")}
          >
            <View>
              <StyledText size={16} color="white">
                Continue
              </StyledText>
            </View>
          </RectButton>
        </View>
      </View>
    </View>
  );
}
