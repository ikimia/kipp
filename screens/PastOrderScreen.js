import React, { useContext } from "react";
import OrderScreen from "./OrderScreen";
import { NavigationContext } from "react-navigation";

export default function PastOrderScreen() {
  const { getParam } = useContext(NavigationContext);
  return <OrderScreen receiptId={getParam("receiptId")} />;
}
