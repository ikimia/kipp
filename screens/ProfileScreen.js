import * as React from "react";
import { useContext, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { View, Image } from "react-native";
import { NavigationContext, NavigationEvents } from "react-navigation";
import { SocialProfile } from "../contexes/SocialProfile";
import ListItem from "../components/ListItem";
import StyledText from "../components/StyledText";
import AppHeader from "../components/AppHeader";
import CreditCardIcon from "../components/CreditCardIcon";
import { CreditCardStorage } from "../Storage";
import Backdrop from "../components/Backdrop";
import { COLORS } from "../components/ItemListItem";

function CreditCardPreview({ cardNumber, loading }) {
  if (!loading && !cardNumber) {
    return <StyledText>Payment Method Not Set</StyledText>;
  }
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <CreditCardIcon cardNumber={cardNumber} style={{ marginEnd: 5 }} />
      <StyledText size={16}>{(cardNumber || "••••").slice(-4)}</StyledText>
    </View>
  );
}

function ProfilePicture({ uri, radius, borderWidth = 3 }) {
  const outerRadius = radius + 2 * borderWidth;
  return (
    <View
      style={{
        borderColor: "white",
        borderWidth,
        backgroundColor: COLORS[4],
        height: 2 * outerRadius,
        width: 2 * outerRadius,
        borderRadius: outerRadius,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Image
        source={{ uri }}
        style={{
          borderColor: "white",
          borderWidth,
          width: 2 * radius,
          height: 2 * radius,
          borderRadius: radius
        }}
      />
    </View>
  );
}

export default function ProfileScreen() {
  const { navigate } = useContext(NavigationContext);
  const { userProfile, logout } = useContext(SocialProfile);
  const [cardNumber, setCardNumber] = useState(null);
  const [cardLoading, setCardLoading] = useState(true);
  return (
    <View style={{ flex: 1 }}>
      <NavigationEvents
        onWillFocus={async () => {
          const creditCard = await CreditCardStorage.get();
          if (creditCard) {
            setCardNumber(creditCard.cardNumber);
          } else {
            setCardNumber(null);
          }
          setCardLoading(false);
        }}
      />
      <AppHeader />
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            alignItems: "center",
            paddingVertical: 20,
            marginBottom: 20
          }}
        >
          <Backdrop
            style={{
              position: "absolute",
              width: "100%",
              height: 1130,
              top: -1000,
              backgroundColor: COLORS[4]
            }}
          />
          <ProfilePicture uri={userProfile.picture} radius={75} />
          <StyledText size={20} bold style={{ marginTop: 10 }}>
            {userProfile.name}
          </StyledText>
          <CreditCardPreview loading={cardLoading} cardNumber={cardNumber} />
        </View>
        <View>
          <ListItem
            first
            onPress={() => {
              navigate("PaymentSettings");
            }}
            icon="credit-card"
            text="Payment"
          />
          <ListItem
            icon="globe"
            text="Language"
            onPress={() => {
              navigate("LanguageSettings");
            }}
          />
          <ListItem last icon="log-out" text="Sign Out" onPress={logout} />
        </View>
      </ScrollView>
    </View>
  );
}
