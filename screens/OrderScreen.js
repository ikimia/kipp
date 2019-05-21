import * as React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import ReceiptItemsTable from "../components/ReceiptItemsTable";
import Icon from "react-native-vector-icons/Feather";
import { items, taxes, totalAmount } from "../constants/Data";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-navigation";
import BackButton from "../components/BackButton";
import { ScrollView } from "react-native-gesture-handler";
import StyledText from "../components/StyledText";

export default function OrderScreen({ receiptNumber, storeName }) {
  const { t } = useTranslation("common");
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderBottomColor: "#EEE",
            borderBottomWidth: 1
          }}
        >
          <BackButton />
          <View
            style={{
              marginTop: 5,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <StyledText bold size={25}>
              {t(`stores:${storeName}`)}
            </StyledText>
            <StyledText bold size={25}>
              {t("currencySign")}
              {totalAmount}
            </StyledText>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="info" style={{ fontSize: 15, marginEnd: 5 }} />
            <StyledText size={15}>Receipt no. {receiptNumber}</StyledText>
          </View>
        </View>
      </SafeAreaView>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 15 }}>
          <View style={{ alignItems: "center" }}>
            <ReceiptItemsTable items={items} taxes={taxes} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
OrderScreen.propTypes = {
  receiptNumber: PropTypes.string.isRequired,
  storeName: PropTypes.string.isRequired
};
