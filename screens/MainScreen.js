import React, { useRef, useContext, useEffect, useState } from "react";
import ImageBackground from "react-native/Libraries/Image/ImageBackground";
import { useTranslation } from "react-i18next";
import {
  Button,
  Text,
  Container,
  Header,
  Left,
  Body,
  Right,
  Icon,
  View,
  Drawer,
  Content,
  CardItem,
  Card,
  Title,
  Badge
} from "native-base";
import { NavigationContext } from "react-navigation";
import SideBar from "../components/SideBar";
import moment from "moment";

const CODE_SIZE = 6;

const data = [
  ["foodStore", [3, "hours"], "foodStoreLocation", "45"],
  ["apparelStore", [5, "days"], "apparelStoreLocation", "211"],
  ["gasStation", [2, "weeks"], "gasStationLocation", "92"],
  ["ShoesStore", [1, "month"], "ShoesStoreLocation", "142"]
];

function CountdownTimer() {
  const [value, setValue] = useState(600);
  useEffect(() => {
    const timer = setInterval(() => {
      setValue(value => {
        if (value === 0) {
          clearInterval(timer);
        } else {
          return value - 1;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const twoDigits = n => String(n).padStart(2, "0");
  const minutes = twoDigits(Math.floor(value / 60));
  const seconds = twoDigits(value % 60);
  return (
    <Text style={{ color: "#F4F4F4" }}>
      {minutes}:{seconds}
    </Text>
  );
}

const m = language => {
  const localizedMoment = moment();
  localizedMoment.locale(language);
  return localizedMoment;
};

export default function MainScreen() {
  const { navigate } = useContext(NavigationContext);
  const {
    t,
    i18n: { language }
  } = useTranslation("common");

  const initialReceiptNumber = [...Array(CODE_SIZE)]
    .map(() => Math.floor(Math.random() * 10))
    .join("");
  const drawer = useRef(null);
  const openDrawer = () => drawer.current._root.open();
  const closeDrawer = () => drawer.current._root.close();

  return (
    <Drawer
      ref={drawer}
      onClose={closeDrawer}
      content={<SideBar closeDrawer={closeDrawer} />}
    >
      <Container>
        <ImageBackground source={require("../img/backdrop.jpg")} style={{}}>
          <View style={{ backgroundColor: "rgba(0,0,0,0.65)" }}>
            <Header transparent iosBarStyle="light-content">
              <Left>
                <Button transparent onPress={openDrawer}>
                  <Icon name="menu" style={{ color: "#F4F4F4" }} />
                </Button>
              </Left>
              <Body>
                <Title style={{ color: "#F4F4F4" }}>Pay</Title>
              </Body>
              <Right>
                <Button transparent>
                  <Icon
                    style={{ color: "#F4F4F4" }}
                    type="SimpleLineIcons"
                    name="present"
                  />
                  <Badge success style={{ position: "absolute" }}>
                    <Text>2</Text>
                  </Badge>
                </Button>
              </Right>
            </Header>
            <View
              style={{
                alignItems: "center",
                paddingTop: 20,
                paddingBottom: 30
              }}
            >
              <Text style={{ color: "#F4F4F4" }}>Your Temporary Number is</Text>
              <Text
                style={{
                  color: "#F4F4F4",
                  fontSize: 45,
                  fontWeight: "600"
                }}
              >
                {initialReceiptNumber}
              </Text>
              <Text style={{ color: "#F4F4F4" }}>
                valid for the next <CountdownTimer /> minutes
              </Text>
            </View>
          </View>
        </ImageBackground>
        <Content padder style={{ backgroundColor: "#F4F4F4" }}>
          {data.map(([name, timeAgo, location, amount]) => (
            <Card key={name}>
              <CardItem
                style={{ alignItems: "flex-start" }}
                button
                onPress={() => navigate("PastOrder", { storeName: name })}
              >
                <View
                  style={{
                    flex: 1
                  }}
                >
                  <Text note>
                    {m(language)
                      .subtract(...timeAgo)
                      .calendar()}
                  </Text>
                  <View>
                    <Text style={{ fontSize: 20 }}>{t(`stores:${name}`)}</Text>
                    <Text style={{ fontSize: 12 }}>
                      {t(`stores:${location}`)}
                    </Text>
                  </View>
                </View>
                <Text style={{ fontSize: 20 }}>
                  {t("common:currencySign")}
                  {amount}
                </Text>
              </CardItem>
            </Card>
          ))}
        </Content>
      </Container>
    </Drawer>
  );
}
