import * as React from "react";
import { useState, useEffect } from "react";
import { View } from "react-native";
import { items } from "../constants/Data";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import StyledText from "../components/StyledText";
import ListItem from "../components/ListItem";
import SmallHeader from "../components/SmallHeader";
import { getReceipt } from "../Backend";
import moment from "moment";

function Section({ title, children }) {
  return (
    <View style={{ marginBottom: 20 }}>
      <View
        style={{
          borderBottomColor: "#999",
          borderBottomWidth: 1,
          paddingBottom: 5,
          marginBottom: 5
        }}
      >
        <StyledText bold>{title}</StyledText>
      </View>
      {children}
    </View>
  );
}

const ACTIONS = [
  { icon: "tag", text: "View original receipt" },
  { icon: "mail", text: "Send receipt to email" },
  { icon: "phone", text: "Contact business" }
];

export default function OrderScreen({ receiptId }) {
  const { t } = useTranslation("stores");
  const [receipt, setReceipt] = useState(null);
  useEffect(() => {
    getReceipt(receiptId).then(setReceipt);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <SmallHeader title="Receipt" />
      {receipt && (
        <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>
          <View style={{ alignItems: "center", marginVertical: 25 }}>
            <StyledText size={20}>{receipt.storeName}</StyledText>
            <StyledText color="#333">
              {moment(receipt.created).format("L LT")}
            </StyledText>
          </View>
          <Section title="Purchase Details">
            {items.map((item, i) => (
              <View
                key={i}
                style={{
                  borderBottomColor: "#EEE",
                  borderBottomWidth: 1,
                  paddingBottom: 5,
                  marginBottom: 5,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <StyledText>{t(item.description)}</StyledText>
                  {item.count > 1 ? (
                    <StyledText color="#666"> &times;{item.count}</StyledText>
                  ) : null}
                </View>
                <StyledText>${item.price * item.count}</StyledText>
              </View>
            ))}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <StyledText bold>Total</StyledText>
              <StyledText bold>${receipt.price}</StyledText>
            </View>
          </Section>
          <Section title="Business Details">
            <StyledText>{receipt.storeName}</StyledText>
            <StyledText>Aba Ahimeir 23, Tel Aviv, Israel</StyledText>
          </Section>
          <Section title="Additional Information">
            <StyledText>Order ID: {receipt.id}</StyledText>
          </Section>
          <Section title="Actions">
            {ACTIONS.map(({ icon, text }) => (
              <ListItem
                key={icon}
                last
                small
                icon={icon}
                text={text}
                noCheveron
              />
            ))}
          </Section>
        </ScrollView>
      )}
    </View>
  );
}
