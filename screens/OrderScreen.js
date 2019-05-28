import * as React from "react";
import { useState, useEffect } from "react";
import { View } from "react-native";
import { items, totalAmount } from "../constants/Data";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import StyledText from "../components/StyledText";
import ListItem from "../components/ListItem";
import SmallHeader from "../components/SmallHeader";
import { getReceipt } from "../Backend";
import moment from "moment";

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
          <View
            style={{
              borderBottomColor: "#999",
              borderBottomWidth: 1,
              paddingBottom: 5,
              marginBottom: 5
            }}
          >
            <StyledText bold>Purchase Details</StyledText>
          </View>
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
            <StyledText bold>${totalAmount}</StyledText>
          </View>
          <View
            style={{
              borderBottomColor: "#999",
              borderBottomWidth: 1,
              paddingBottom: 5,
              marginBottom: 5,
              marginTop: 20
            }}
          >
            <StyledText bold>Businesss Details</StyledText>
          </View>
          <View>
            <StyledText>McDonalds</StyledText>
            <StyledText>Aba Ahimeir 23, Tel Aviv, Israel</StyledText>
          </View>
          <View
            style={{
              borderBottomColor: "#999",
              borderBottomWidth: 1,
              paddingBottom: 5,
              marginBottom: 5,
              marginTop: 20
            }}
          >
            <StyledText bold>Additional Information</StyledText>
          </View>
          <View>
            <StyledText>Order ID: 12391241231</StyledText>
          </View>
          <View
            style={{
              borderBottomColor: "#999",
              borderBottomWidth: 1,
              paddingBottom: 5,
              marginBottom: 5,
              marginTop: 20
            }}
          >
            <StyledText bold>Actions</StyledText>
          </View>
          <ListItem
            last
            small
            icon="tag"
            text="View original receipt"
            noCheveron
          />
          <ListItem
            last
            small
            icon="mail"
            text="Send receipt to email"
            noCheveron
          />
          <ListItem
            last
            small
            icon="phone"
            text="Contact business"
            noCheveron
          />
          <View style={{ height: 100 }} />
        </ScrollView>
      )}
    </View>
  );
}
