import * as React from "react";
import { useContext, useState } from "react";
import { View } from "react-native";
import SmallHeader from "../components/SmallHeader";
import StyledText from "../components/StyledText";
import Icon from "react-native-vector-icons/Feather";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationContext } from "react-navigation";
import StoreLogo from "../components/StoreLogo";
import Container from "../components/Container";
import { revealOffer } from "../Backend";

export default function OfferScreen() {
  const { getParam } = useContext(NavigationContext);
  const [offer, setOffer] = useState();
  const offerId = getParam("offerId");
  revealOffer({ offerId }).then(setOffer);
  return (
    <Container>
      <SmallHeader title="Offer" />
      {offer && (
        <ScrollView style={{ flex: 1 }}>
          <View style={{ alignItems: "center", padding: 20 }}>
            <View style={{ marginVertical: 20, alignItems: "center" }}>
              <View style={{ marginBottom: 10 }}>
                <StoreLogo logoURL={offer.store.logoURL} size={100} />
              </View>
              <StyledText size={16}>{offer.store.name}</StyledText>
            </View>
            <Icon name="star" size={25} />
          </View>
          <View style={{ padding: 20, alignItems: "center" }}>
            <StyledText bold size={20} align="center">
              {offer.text}
            </StyledText>
          </View>
          <View
            style={{
              alignItems: "center",
              backgroundColor: "#FAFAFA",
              padding: 20
            }}
          >
            <StyledText>Give this code to the Cashier:</StyledText>
            <StyledText bold size={40}>
              {offer.code}
            </StyledText>
          </View>
        </ScrollView>
      )}
    </Container>
  );
}
