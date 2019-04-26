import React, { useRef, useContext } from "react";
import ImageBackground from "react-native/Libraries/Image/ImageBackground";
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
  Title,
  Badge
} from "native-base";
import SideBar from "../components/SideBar";
import PayCard from "../components/PayCard";
import Purchases from "../components/Purchases";
import { NavigationContext } from "react-navigation";

const headerTextColor = { color: "#F4F4F4" };

export default function MainScreen() {
  const { navigate } = useContext(NavigationContext);
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
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.65)",
              paddingBottom: 10
            }}
          >
            <Header transparent iosBarStyle="light-content">
              <Left>
                <Button transparent onPress={openDrawer}>
                  <Icon name="menu" style={headerTextColor} />
                </Button>
              </Left>
              <Body>
                <Title style={headerTextColor}>Pay</Title>
              </Body>
              <Right>
                <Button transparent onPress={() => navigate("Rewards")}>
                  <Icon
                    style={headerTextColor}
                    type="SimpleLineIcons"
                    name="present"
                  />
                  <Badge
                    style={{ position: "absolute", backgroundColor: "#20BC62" }}
                  >
                    <Text>2</Text>
                  </Badge>
                </Button>
              </Right>
            </Header>
            <PayCard />
          </View>
        </ImageBackground>
        <View
          style={{
            backgroundColor: "#20BC62",
            flexDirection: "row"
          }}
        >
          <View style={{ padding: 10, flex: 1, alignItems: "center" }}>
            <Text
              style={{ color: "#f4f4f4", fontWeight: "bold", fontSize: 16 }}
            >
              Psst... you have %20 waiting for you at Zara
            </Text>
          </View>
        </View>

        <Content style={{ backgroundColor: "#F4F4F4", paddingVertical: 10 }}>
          <Purchases />
        </Content>
      </Container>
    </Drawer>
  );
}
