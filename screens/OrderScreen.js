import * as React from "react";
import { View } from "react-native";
import { items, totalAmount } from "../constants/Data";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-navigation";
import BackButton from "../components/BackButton";
import { ScrollView } from "react-native-gesture-handler";
import StyledText from "../components/StyledText";
import ListItem from "../components/ListItem";

export default function OrderScreen() {
  const { t } = useTranslation("stores");
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        forceInset={{ top: "always" }}
        style={{
          paddingHorizontal: 15,
          backgroundColor: "#FAFAFA",
          borderBottomColor: "#EEE",
          borderBottomWidth: 1
        }}
      >
        <View
          style={{
            marginVertical: 10,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <View style={{ flex: 1 }}>
            <BackButton />
          </View>
          <View
            style={{ flex: 3, flexDirection: "row", justifyContent: "center" }}
          >
            <StyledText bold size={18}>
              Receipt
            </StyledText>
          </View>
          <View style={{ flex: 1 }} />
        </View>
      </SafeAreaView>
      <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>
        <View style={{ alignItems: "center", marginVertical: 25 }}>
          <StyledText size={20}>McDonalds</StyledText>
          <StyledText color="#333">15/5/19 11:20</StyledText>
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
        <ListItem last small icon="phone" text="Contact business" noCheveron />
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}
