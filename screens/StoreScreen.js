import * as React from "react";
import { useState } from "react";
import { View, Image } from "react-native";
import SmallHeader from "../components/SmallHeader";
import StyledText from "../components/StyledText";
import Icon from "react-native-vector-icons/Feather";
import { ScrollView, BorderlessButton } from "react-native-gesture-handler";
import { COLORS } from "../components/ItemListItem";
import { NavigationEvents } from "react-navigation";
import firebase from "react-native-firebase";

const features = [
  "10% off for the first month",
  "Birthday gift",
  "Punch card",
  "And much more"
];

function Section({ title, children, marginBottom = 10 }) {
  return (
    <View style={{ padding: 10, marginBottom }}>
      <View style={{ paddingBottom: 10 }}>
        <StyledText bold size={18}>
          {title}
        </StyledText>
      </View>
      {children}
    </View>
  );
}

function formatContact(type, value) {
  if (type === "phone") {
    if (value[0] === "0") {
      return value.replace(/^0(2|3|4|8|9|7\d|5\d)(\d{3})(\d+)$/, "0$1-$2-$3");
    }
    if (value[0] === "1") {
      return value.replace(/^1(\d{3})(\d{3})(\d+)$/, "1-$1-$2-$3");
    }
  }
  return value;
}

export default function StoreScreen() {
  const [store, setStore] = useState({ name: "Store" });
  return (
    <View style={{ flex: 1 }}>
      <NavigationEvents
        onWillFocus={async ({ state: { params = {} } }) => {
          const doc = await firebase
            .firestore()
            .collection("stores")
            .doc(params.storeId)
            .get();
          setStore(doc.data());
        }}
      />
      <SmallHeader title={store.name} />
      <ScrollView>
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: 10,
            flexDirection: "row"
          }}
        >
          <Image
            source={require("../assets/img/zaralogo.jpg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderColor: "#EEE",
              borderWidth: 1
            }}
          />
          <View style={{ paddingStart: 15 }}>
            <StyledText bold size={22}>
              {store.name}
            </StyledText>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "lightgreen",
                  marginEnd: 5
                }}
              />
              <StyledText>Open today until 23:00</StyledText>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#FAFAFA",
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "#EEE",
            paddingHorizontal: 5,
            marginBottom: 20
          }}
        >
          <Section title="Membership" marginBottom={0}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                {features.map(text => (
                  <View key={text}>
                    <StyledText>• {text}</StyledText>
                  </View>
                ))}
              </View>
              <View>
                <BorderlessButton>
                  <StyledText bold color={COLORS[5]}>
                    JOIN NOW
                  </StyledText>
                </BorderlessButton>
              </View>
            </View>
          </Section>
        </View>
        <Section title="Location">
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <StyledText>{store.address1}</StyledText>
              <StyledText>{store.city}</StyledText>
              <StyledText>Israel</StyledText>
            </View>
            <View>
              <BorderlessButton>
                <StyledText color={COLORS[5]}>Map</StyledText>
              </BorderlessButton>
            </View>
          </View>
        </Section>
        <Section title="Contact">
          <View>
            {(store.contact || []).map(({ type, value }) => (
              <View
                key={value}
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <View style={{ marginHorizontal: 10 }}>
                  <Icon name={type} size={20} />
                </View>
                <View
                  style={{
                    flex: 1,
                    paddingStart: 5,
                    paddingVertical: 15,
                    borderBottomColor: "#EEE",
                    borderBottomWidth: 1
                  }}
                >
                  <StyledText size={16}>
                    {formatContact(type, value)}
                  </StyledText>
                </View>
              </View>
            ))}
          </View>
        </Section>
      </ScrollView>
    </View>
  );
}
