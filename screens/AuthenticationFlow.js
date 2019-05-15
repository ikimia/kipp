import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Logo from "../components/Logo";
import FBLoginButton from "../components/FBLoginButton";
import { SocialProfile } from "../contexes/SocialProfile";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { FacebookAccessTokenStorage, FacebookProfileStorage } from "../Storage";
import PropTypes from "prop-types";
import { SafeAreaView } from "react-navigation";

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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 5, justifyContent: "center", alignItems: "center" }}>
        <Logo fontSize={100} />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20
        }}
      >
        <FBLoginButton onLogin={login} />
      </View>
    </SafeAreaView>
  );
}

AuthenticationFlow.propTypes = {
  Loading: PropTypes.elementType.isRequired,
  App: PropTypes.elementType.isRequired
};
