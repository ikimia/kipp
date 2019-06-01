import * as React from "react";
import { useState, useContext } from "react";
import { View } from "react-native";
import SmallHeader from "../components/SmallHeader";
import {
  ScrollView,
  TextInput,
  RectButton
} from "react-native-gesture-handler";
import CreditCardIcon from "../components/CreditCardIcon";
import { useTextAlign } from "../hooks/direction";
import { useTranslation } from "react-i18next";
import { NavigationContext, NavigationEvents } from "react-navigation";
import { CreditCardStorage } from "../Storage";
import StyledText from "../components/StyledText";
import { COLORS } from "../components/ItemListItem";
import Container from "../components/Container";
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
  enabled,
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
        paddingHorizontal: 5,
        paddingVertical: 10,
        flexDirection: "row",
        borderBottomColor: "#EEE",
        borderBottomWidth: 1,
        alignItems: "center"
      }}
    >
      <StyledText size={16} style={{ marginEnd: 10 }}>
        {label}
      </StyledText>
      <TextInput
        keyboardType="decimal-pad"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        maxLength={maxLength}
        editable={enabled}
        style={{ textAlign, fontSize: 16, flex: 1, fontFamily: "Open Sans" }}
      />
      {icon}
    </View>
  );
}

function ActionButton({ activeColor, enabled = true, onPress, title }) {
  return (
    <RectButton
      style={{
        backgroundColor: enabled ? activeColor : "#999",
        width: "100%",
        padding: 10,
        alignItems: "center",
        borderRadius: 5
      }}
      enabled={enabled}
      onPress={onPress}
    >
      <View>
        <StyledText size={16} color="white">
          {title}
        </StyledText>
      </View>
    </RectButton>
  );
}

export default function PaymentSettingsScreen() {
  const { t } = useTranslation("settings");
  const { goBack } = useContext(NavigationContext);
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCVV] = useState("");
  const cardValid = isCreditCardValid(cardNumber, expirationDate, cvv);

  const [savedCard, setSavedCard] = useState(false);
  const [savedCardLoading, setSavedCardLoading] = useState(true);

  return (
    <Container>
      <NavigationEvents
        onWillFocus={async () => {
          const creditCard = await CreditCardStorage.get();
          if (creditCard) {
            const { cardNumber, expirationDate, cvv } = creditCard;
            setSavedCard(true);
            setCardNumber(cardNumber);
            setExpirationDate(expirationDate);
            setCVV(cvv);
          }
          setSavedCardLoading(false);
        }}
      />
      <SmallHeader title="Payment" />
      <ScrollView
        style={{
          display: savedCardLoading ? "none" : undefined,
          paddingTop: 20,
          paddingHorizontal: 10,
          flex: 1
        }}
      >
        <StyledText bold size={16}>
          {savedCard ? "Saved" : "New"} Credit Card
        </StyledText>
        <View style={{ paddingTop: 10, paddingBottom: 20 }}>
          <FormField
            enabled={!savedCard}
            label={t("cardNumber")}
            value={formatCardNumber(cardNumber)}
            onChangeText={newText => {
              setCardNumber(newText.replace(/ /g, ""));
            }}
            placeholder="•••• •••• •••• ••••"
            maxLength={19}
            icon={<CreditCardIcon cardNumber={cardNumber} />}
          />
          <FormField
            enabled={!savedCard}
            label={t("expiry")}
            placeholder="MM/YY"
            maxLength={5}
            value={formatDate(expirationDate)}
            onChangeText={newText => {
              setExpirationDate(newText.replace(/\//g, ""));
            }}
          />
          <FormField
            enabled={!savedCard}
            label={t("securityCode")}
            placeholder="•••"
            maxLength={3}
            value={cvv}
            onChangeText={setCVV}
          />
        </View>
        {savedCard ? (
          <ActionButton
            activeColor={COLORS[1]}
            onPress={async () => {
              await CreditCardStorage.delete();
              goBack();
            }}
            title={t("removeCreditCard")}
          />
        ) : (
          <ActionButton
            activeColor={COLORS[3]}
            enabled={cardValid}
            onPress={async () => {
              await CreditCardStorage.set(cardNumber, expirationDate, cvv);
              goBack();
            }}
            title={t("saveCreditCard")}
          />
        )}
      </ScrollView>
    </Container>
  );
}
