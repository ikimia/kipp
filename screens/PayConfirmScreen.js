import React, { useContext } from "react";
import OrderScreen from "./OrderScreen";
import { NavigationContext } from "react-navigation";

export default function PayConfirmScreen() {
  const navigation = useContext(NavigationContext);
  const receiptNumber = navigation.getParam("receiptNumber", "NO-ID");
  return <OrderScreen receiptNumber={receiptNumber} storeName="apparelStore" />;
}
