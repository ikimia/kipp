import React, { useContext } from "react";
import OrderScreen from "./OrderScreen";
import { NavigationContext } from "react-navigation";

export default function PastOrderScreen() {
  const navigation = useContext(NavigationContext);
  const storeName = navigation.getParam("storeName");
  return (
    <OrderScreen hidePayment storeName={storeName} receiptNumber="12345" />
  );
}
