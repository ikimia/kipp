import React from "react";
import OrderScreen from "./OrderScreen";

export default function PastOrderScreen({ navigation }) {
  const storeName = navigation.getParam("storeName");
  return (
    <OrderScreen hidePayment storeName={storeName} receiptNumber="12345" />
  );
}
