import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import {
  Container,
  Header,
  View,
  DeckSwiper,
  Card,
  CardItem,
  Text,
  Body,
  Title
} from "native-base";
import FBLoginButton from "../components/FBLoginButton";
import { SocialProfile } from "../contexes/SocialProfile";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { FacebookAccessTokenStorage, FacebookProfileStorage } from "../Storage";
import PropTypes from "prop-types";

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

async function getAccessToken() {
  let accessToken = await FacebookAccessTokenStorage.get();
  if (accessToken === null || accessToken.expirationTime < Date.now()) {
    accessToken = await AccessToken.getCurrentAccessToken();
    if (accessToken === null) {
      return;
    }
    FacebookAccessTokenStorage.set(accessToken);
  }
  return accessToken;
}

async function initFacebookProfile() {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return;
  }
  const { permissions, userId } = accessToken;
  let profile = await FacebookProfileStorage.get();
  if (profile) {
    return {
      permissions,
      userId,
      isLoggedIn: true,
      ...profile
    };
  }

  const { name, picture } = await (await fetch(
    "https://graph.facebook.com/v3.2/me?fields=picture.type(large),name",
    { headers: { Authorization: `Bearer ${accessToken.accessToken}` } }
  )).json();

  profile = {
    permissions,
    userId,
    name,
    picture: picture.data.url,
    isLoggedIn: true
  };
  FacebookProfileStorage.set(profile);
  return profile;
}

export default function AuthenticationFlow({ Loading, App }) {
  const [userProfile, setUserProfile] = useState({ isLoggedIn: false });
  const [isInitialized, setIsInitialized] = useState(false);

  const logout = () => {
    LoginManager.logOut();
    setUserProfile({ isLoggedIn: false });
    FacebookProfileStorage.delete();
    FacebookAccessTokenStorage.delete();
  };
  const login = () => {
    initFacebookProfile().then(profile => {
      if (profile) {
        setUserProfile(profile);
      }
      setIsInitialized(true);
    });
  };

  useEffect(login, []);
  if (!isInitialized) {
    return <Loading />;
  }
  if (userProfile.isLoggedIn) {
    return (
      <SocialProfile.Provider value={{ userProfile, logout }}>
        <App />
      </SocialProfile.Provider>
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
        <FBLoginButton onLogin={login} />
      </View>
    </Container>
  );
}

AuthenticationFlow.propTypes = {
  Loading: PropTypes.elementType.isRequired,
  App: PropTypes.elementType.isRequired
};
