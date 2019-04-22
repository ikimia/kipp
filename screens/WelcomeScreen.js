import React, { useContext } from "react";
import { Image } from "react-native";
import {
  Container,
  Header,
  View,
  DeckSwiper,
  Card,
  CardItem,
  Button,
  Text,
  Body,
  Title
} from "native-base";
import FBLoginButton from "../components/FBLoginButton";
import { SocialProfile } from "../contexes/SocialProfile";
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";
import { FacebookAccessTokenStorage, FacebookProfileStorage } from "../Storage";

const cards = [
  {
    text: "Easily pay with your phone, no credit card needed",
    subtext: "Open the app and type the five digits you got",
    image: require("../assets/screenshots/welcome.png")
  },
  {
    text: "Card One",
    image: require("../assets/screenshots/welcome.png")
  },
  {
    text: "Card One",
    image: require("../assets/screenshots/welcome.png")
  }
];

async function getAccessToken(setUserProfile) {
  let accessToken = await FacebookAccessTokenStorage.get();
  if (accessToken === null || accessToken.expirationTime < Date.now()) {
    accessToken = await AccessToken.getCurrentAccessToken();
    if (accessToken === null) {
      setUserProfile({
        isLoggedIn: false
      });
      return;
    }
    FacebookAccessTokenStorage.set(accessToken);
  }
  return accessToken;
}

async function initFacebookProfile(setUserProfile) {
  const accessToken = await getAccessToken(setUserProfile);
  if (!accessToken) {
    return;
  }
  const { permissions, userId } = accessToken;
  let profile = await FacebookProfileStorage.get();
  if (profile) {
    setUserProfile({
      permissions,
      userId,
      isLoggedIn: true,
      ...profile
    });
    return;
  }
  return new GraphRequestManager()
    .addRequest(
      new GraphRequest(
        "/me",
        {
          parameters: {
            fields: {
              string: "picture.height(400).type(square),name"
            }
          }
        },
        (error, result) => {
          profile = {
            permissions,
            userId,
            name: result.name,
            picture: result.picture.data.url || "def",
            isLoggedIn: true
          };
          setUserProfile(profile);
          FacebookProfileStorage.set(profile);
        }
      )
    )
    .start();
}

export default function WelcomeScreen() {
  const { setUserProfile, isInitialized, setIsInitialized } = useContext(
    SocialProfile
  );
  initFacebookProfile(setUserProfile).then(() => setIsInitialized(true));
  if (!isInitialized) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <Container>
      <Header transparent>
        <Body>
          <Title>Welcome to Street Pay</Title>
        </Body>
      </Header>
      <View style={{ flex: 2, flexDirection: "column" }}>
        <DeckSwiper
          dataSource={cards}
          renderItem={item => (
            <Card style={{ elevation: 3 }}>
              <CardItem cardBody>
                <Image style={{ height: 300, flex: 1 }} source={item.image} />
              </CardItem>
              <CardItem>
                <View>
                  <Text>{item.text}</Text>
                  <Text style={{ fontSize: 14 }}>{item.subtext}</Text>
                </View>
              </CardItem>
            </Card>
          )}
        />
      </View>
      <View style={{ flex: 1 }}>
        <FBLoginButton onLogin={() => initFacebookProfile(setUserProfile)} />
      </View>
    </Container>
  );
}
