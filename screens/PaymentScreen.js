import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { View } from "react-native";
import StyledText from "../components/StyledText";
import { NavigationContext } from "react-navigation";
import { RectButton, BorderlessButton } from "react-native-gesture-handler";
import { acceptPayment } from "../Backend";
import { Bubbles, Checkmark } from "../components/animations";

export default function PaymentScreen({ orderId, onDone }) {
  const [success, setSuccess] = useState(false);
  const [receiptId, setReceiptId] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const { navigate } = useContext(NavigationContext);
  useEffect(() => {
    (async () => {
      const result = await acceptPayment({ orderId });
      setReceiptId(result.receiptId);
      setSuccess(true);
    })();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ flex: 4, alignItems: "center", justifyContent: "flex-end" }}
      >
        <View>
          {showCheckmark ? (
            <Checkmark />
          ) : (
            <Bubbles
              shouldFinish={success}
              onDone={() => setShowCheckmark(true)}
            />
          )}
        </View>
        <View style={{ marginTop: 25 }}>
          <StyledText color="white" bold size={20}>
            {showCheckmark ? "Payment Completed" : "Processing Payment"}
          </StyledText>
        </View>
      </View>
      <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
        {showCheckmark ? (
          <View
            style={{
              borderRadius: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5
            }}
          >
            <RectButton
              style={{
                backgroundColor: "white",
                padding: 10,
                paddingHorizontal: 20,
                borderRadius: 5
              }}
              onPress={() => {
                onDone();
                navigate("PastOrder", { receiptId });
              }}
            >
              <View>
                <StyledText size={20} bold>
                  View Receipt
                </StyledText>
              </View>
            </RectButton>
          </View>
        ) : null}
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        {showCheckmark ? (
          <BorderlessButton onPress={onDone}>
            <View>
              <StyledText size={20} bold color="white">
                Done
              </StyledText>
            </View>
          </BorderlessButton>
        ) : null}
      </View>
    </View>
  );
}
