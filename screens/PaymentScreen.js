import * as React from "react";
import { useContext } from "react";
import { View, Image } from "react-native";
import SmallHeader from "../components/SmallHeader";
import StyledText from "../components/StyledText";
import { NavigationContext } from "react-navigation";

export default function PaymentScreen() {
  const { getParam } = useContext(NavigationContext);
  return (
    <View style={{ flex: 1 }}>
      <SmallHeader title="Payment" />
      <View style={{ padding: 15, flex: 1, alignItems: "center" }}>
        <StyledText bold size={20}>
          Paying ${getParam("price")} to {getParam("storeName")}
        </StyledText>
        {/* <Image
          source={{
            uri:
              "https://media.gq.com/photos/5768367b5db2e8cb18c9e9d3/master/w_1280%2Cc_limit/BrowserPreview_tmp-2.gif"
          }}
          style={{ height: 200, width: 200 }}
        /> */}
      </View>
    </View>
  );
}
