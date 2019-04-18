import React, { useEffect, useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { LoginManager } from "react-native-fbsdk";

import AppNavigator from "./navigation/AppNavigator";
import { useDirection } from "./hooks/direction";
import FBLoginButton from "./components/FBLoginButton";
import { SocialProfile } from "./contexes/SocialProfile";
import AsyncStorage from "@react-native-community/async-storage";
import { useTranslation } from "react-i18next";

export default function App() {
  const [userProfile, setUserProfile] = useState({ isLoggedIn: false });
  const [languageSet, setLanguageSet] = useState(false);
  const logOut = () => {
    LoginManager.logOut();
    setUserProfile({ isLoggedIn: false });
  };

  const { i18n } = useTranslation();
  useEffect(() => {
    AsyncStorage.getItem("@StreetPay_language").then(code => {
      if (code) {
        i18n.changeLanguage(code);
      }
      setLanguageSet(true);
    });
  }, []);

  const direction = useDirection();
  return (
    <SocialProfile.Provider value={{ setUserProfile, userProfile, logOut }}>
      <View style={[styles.container, { direction }]}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        {userProfile.isLoggedIn && languageSet ? (
          <AppNavigator />
        ) : (
          <FBLoginButton />
        )}
      </View>
    </SocialProfile.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
