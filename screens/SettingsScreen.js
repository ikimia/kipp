import * as React from "react";
import { useContext, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { View, Image, Alert } from "react-native";
import { NavigationContext, NavigationEvents } from "react-navigation";
import ListItem from "../components/ListItem";
import StyledText from "../components/StyledText";
import AppHeader from "../components/AppHeader";
import CreditCardIcon from "../components/CreditCardIcon";
import { CreditCardStorage } from "../Storage";
import { COLORS } from "../components/ItemListItem";
import { LoginManager } from "react-native-fbsdk";
import { getCurrentUser, signOut } from "../Backend";

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
  const size = 2 * radius;
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
        source={{ uri: `${uri}?width=${size}&height=${size}` }}
        style={{
          borderColor: "white",
          borderWidth,
          width: size,
          height: size,
          borderRadius: radius
        }}
      />
    </View>
  );
}

function confirmSignOut(onPress) {
  return () => {
    Alert.alert("Sign out from Kipp?", "", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "OK",
        onPress
      }
    ]);
  };
}

export default function SettingsScreen() {
  const { navigate } = useContext(NavigationContext);
  const [cardNumber, setCardNumber] = useState(null);
  const [cardLoading, setCardLoading] = useState(true);
  const currentUser = getCurrentUser();
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
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: 1130,
              top: -1000,
              backgroundColor: COLORS[4]
            }}
          />
          <ProfilePicture uri={currentUser.photoURL} radius={75} />
          <StyledText size={20} bold style={{ marginTop: 10 }}>
            {currentUser.displayName}
          </StyledText>
          <CreditCardPreview loading={cardLoading} cardNumber={cardNumber} />
        </View>
        <View style={{ marginBottom: 60 }}>
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
            last
            onPress={() => {
              navigate("LanguageSettings");
            }}
          />
        </View>
        <ListItem
          last
          first
          noCheveron
          icon="log-out"
          text="Sign Out"
          onPress={confirmSignOut(async () => {
            LoginManager.logOut();
            await signOut();
            navigate("Auth");
          })}
        />
      </ScrollView>
    </View>
  );
}
