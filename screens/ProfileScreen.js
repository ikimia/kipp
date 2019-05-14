import * as React from "react";
import { useContext, useState } from "react";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import { Text, View, Image } from "react-native";
import {
  SafeAreaView,
  NavigationContext,
  NavigationEvents
} from "react-navigation";
import { SocialProfile } from "../contexes/SocialProfile";
import { CreditCardStorage } from "../Storage";
import ListItem from "../components/ListItem";
import ListHeader from "../components/ListHeader";
import BackButton from "../components/BackButton";
import CreditCardIcon from "../components/CreditCardIcon";
import Icon from "react-native-vector-icons/Feather";

export default function ProfileScreen() {
  const { navigate } = useContext(NavigationContext);
  const { userProfile, logout } = useContext(SocialProfile);
  const [storedPaymentMethods, setStoredPaymentMethods] = useState([]);
  return (
    <View style={{ flex: 1 }}>
      <NavigationEvents
        onWillFocus={() => {
          CreditCardStorage.getAll().then(creditCards => {
            setStoredPaymentMethods(
              creditCards.map(([cardNumber]) => cardNumber)
            );
          });
        }}
      />

      <SafeAreaView>
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <BackButton />
          <Icon name="bell" size={25} style={{ marginTop: 5, marginEnd: 5 }} />
        </View>
      </SafeAreaView>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Image
          source={{ uri: userProfile.picture }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 75,
            marginBottom: 10
          }}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {userProfile.name}
        </Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginBottom: 25 }}>
          <ListItem
            icon="gift"
            text="Rewards"
            onPress={() => {
              navigate("Rewards");
            }}
          />
          <ListItem
            icon="tag"
            text="Purchases"
            onPress={() => {
              navigate("Purchases");
            }}
          />
        </View>
        <View style={{ marginBottom: 25 }}>
          <ListHeader text="Saved Payment Methods" />
          <FlatList
            data={storedPaymentMethods}
            keyExtractor={cardNumber => cardNumber}
            renderItem={({ item: cardNumber }) => (
              <ListItem
                onPress={() => {
                  navigate("SavedCreditCard", { cardNumber });
                }}
                iconElement={<CreditCardIcon cardNumber={cardNumber} />}
                text={`Ends with ${cardNumber.slice(-4)}`}
              />
            )}
          />
          <ListItem
            onPress={() => {
              navigate("NewCreditCard");
            }}
            icon="plus"
            text="Add new payment method"
          />
        </View>
        <View style={{ marginBottom: 25 }}>
          <ListHeader text="General" />
          <ListItem
            icon="globe"
            text="Language"
            onPress={() => {
              navigate("LanguageSettings");
            }}
          />
        </View>
        <View>
          <ListHeader text="Account" />
          <ListItem icon="log-out" text="Sign Out" onPress={logout} />
        </View>
      </ScrollView>
    </View>
  );
}
