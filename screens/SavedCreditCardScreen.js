import React, { useState, useContext, useEffect } from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { NavigationContext, SafeAreaView } from "react-navigation";
import { CreditCardStorage } from "../Storage";
import CreditCardIcon from "../components/CreditCardIcon";
import DarkHeader from "../components/DarkHeader";
import { ScrollView, RectButton } from "react-native-gesture-handler";
import { useTextAlign } from "../hooks/direction";

const formatCardNumber = cardNumber =>
  cardNumber ? cardNumber.match(/.{1,4}/g).join(" ") : "";

const formatDate = date => (date ? date.match(/.{1,2}/g).join("/") : "");

function FormField({ label, value, icon }) {
  const textAlign = useTextAlign();
  return (
    <View
      style={{
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: "row",
        borderBottomColor: "#CCC",
        borderBottomWidth: 1,
        alignItems: "center"
      }}
    >
      <Text style={{ fontSize: 17, color: "#555", marginEnd: 15 }}>
        {label}
      </Text>
      <Text value={value} style={{ textAlign, fontSize: 17, flex: 1 }}>
        {value}
      </Text>
      {icon}
    </View>
  );
}

export default function SavedCreditCardScreen() {
  const { t } = useTranslation("settings");
  const { goBack, getParam } = useContext(NavigationContext);
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCVV] = useState("");
  useEffect(() => {
    const navigationCardNumber = getParam("cardNumber", "");
    if (navigationCardNumber) {
      CreditCardStorage.get(navigationCardNumber).then(result => {
        if (result) {
          const [cardNumber, expirationDate, cvv] = result;
          setCardNumber(cardNumber);
          setExpirationDate(expirationDate);
          setCVV(cvv);
        }
      });
    }
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <DarkHeader back title={t("creditCardTitle")} />
      </SafeAreaView>
      <ScrollView style={{ flex: 1, backgroundColor: "#f4f4f4" }}>
        <FormField
          label={t("cardNumber")}
          value={formatCardNumber(cardNumber)}
          icon={
            <CreditCardIcon
              cardNumber={cardNumber}
              style={{ fontSize: 25, marginStart: 10 }}
            />
          }
        />
        <FormField label={t("expiry")} value={formatDate(expirationDate)} />
        <FormField label={t("securityCode")} value={cvv} />
        <RectButton
          style={{
            backgroundColor: "#D75452",
            width: "100%",
            marginTop: 20,
            padding: 10,
            alignItems: "center"
          }}
          onPress={async () => {
            await CreditCardStorage.delete(cardNumber);
            goBack();
          }}
        >
          <View>
            <Text style={{ color: "white", fontSize: 17 }}>
              {t("removeCreditCard")}
            </Text>
          </View>
        </RectButton>
      </ScrollView>
    </View>
  );
}
