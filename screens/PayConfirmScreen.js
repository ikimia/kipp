import React from "react";
import OrderScreen from "./OrderScreen";

export default function PayConfirmScreen({ navigation }) {
  const receiptNumber = navigation.getParam("receiptNumber", "NO-ID");
  return <OrderScreen receiptNumber={receiptNumber} storeName="apparelStore" />;
}
