import * as React from "react";
import { useContext } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { View, Image } from "react-native";
import { SafeAreaView, NavigationContext } from "react-navigation";
import { SocialProfile } from "../contexes/SocialProfile";
import ListItem from "../components/ListItem";
import Icon from "react-native-vector-icons/FontAwesome";
import StyledText from "../components/StyledText";

export default function ProfileScreen() {
  const { navigate, state } = useContext(NavigationContext);
  const { userProfile, logout } = useContext(SocialProfile);
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          backgroundColor: "#FAFAFA",
          borderBottomColor: "#EEE",
          borderBottomWidth: 1
        }}
      >
        <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
          <StyledText bold size={30}>
            {state.routeName}
          </StyledText>
        </View>
      </SafeAreaView>
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
              borderColor: "#3b5998",
              borderWidth: 3,
              height: 162,
              width: 162,
              borderRadius: 81,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10
            }}
          >
            <Image
              source={{ uri: userProfile.picture }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 75
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Icon
              name="facebook-official"
              size={25}
              color="#3b5998"
              style={{ marginEnd: 5 }}
            />
            <StyledText size={20} bold>
              {userProfile.name}
            </StyledText>
          </View>
        </View>
        <View>
          <ListItem
            first
            onPress={() => {
              navigate("NewCreditCard");
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
