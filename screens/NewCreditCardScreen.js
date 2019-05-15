import React, { useState, useContext } from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { NavigationContext, SafeAreaView } from "react-navigation";
import { useTextAlign } from "../hooks/direction";
import { CreditCardStorage } from "../Storage";
import CreditCardIcon from "../components/CreditCardIcon";
import DarkHeader from "../components/DarkHeader";
import {
  ScrollView,
  TextInput,
  RectButton
} from "react-native-gesture-handler";

const formatCardNumber = cardNumber =>
  cardNumber ? cardNumber.match(/.{1,4}/g).join(" ") : "";

const formatDate = date => (date ? date.match(/.{1,2}/g).join("/") : "");

function isCreditCardValid(cardNumber, date, cvv) {
  return (
    cardNumber.length === 16 &&
    date.length === 4 &&
    +date.slice(0, 2) >= 1 &&
    +date.slice(0, 2) <= 12 &&
    cvv.length === 3
  );
}

function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  maxLength,
  icon
}) {
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
      <TextInput
        keyboardType="decimal-pad"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        maxLength={maxLength}
        style={{ textAlign, fontSize: 17, flex: 1 }}
      />
      {icon}
    </View>
  );
}

export default function NewCreditCardScreen() {
  const { t } = useTranslation("settings");
  const { goBack } = useContext(NavigationContext);
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCVV] = useState("");
  const cardValid = isCreditCardValid(cardNumber, expirationDate, cvv);
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <DarkHeader back title={t("creditCardTitle")} />
      </SafeAreaView>
      <ScrollView style={{ flex: 1, backgroundColor: "#f4f4f4" }}>
        <FormField
          label={t("cardNumber")}
          value={formatCardNumber(cardNumber)}
          onChangeText={newText => {
            setCardNumber(newText.replace(/ /g, ""));
          }}
          placeholder="•••• •••• •••• ••••"
          maxLength={19}
          icon={
            <CreditCardIcon
              cardNumber={cardNumber}
              style={{ fontSize: 25, marginStart: 10 }}
            />
          }
        />
        <FormField
          label={t("expiry")}
          placeholder="MM/YY"
          maxLength={5}
          value={formatDate(expirationDate)}
          onChangeText={newText => {
            setExpirationDate(newText.replace(/\//g, ""));
          }}
        />
        <FormField
          label={t("securityCode")}
          placeholder="•••"
          maxLength={3}
          value={cvv}
          onChangeText={setCVV}
        />
        <RectButton
          style={{
            backgroundColor: cardValid ? "#157EFB" : "#999",
            width: "100%",
            marginTop: 20,
            padding: 10,
            alignItems: "center"
          }}
          enabled={cardValid}
          onPress={async () => {
            await CreditCardStorage.set(cardNumber, expirationDate, cvv);
            goBack();
          }}
        >
          <View>
            <Text style={{ color: "white", fontSize: 17 }}>
              {t("saveCreditCard")}
            </Text>
          </View>
        </RectButton>
      </ScrollView>
    </View>
  );
}
