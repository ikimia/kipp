import React, { Suspense, useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { LoginManager } from "react-native-fbsdk";

import AppNavigator from "./navigation/AppNavigator";
import { useDirection } from "./hooks/direction";
import FBLoginButton from "./components/FBLoginButton";
import { SocialProfile } from "./contexes/SocialProfile";

export default function App() {
  const [userProfile, setUserProfile] = useState({ isLoggedIn: false });

  const logOut = () => {
    LoginManager.logOut();
    setUserProfile({ isLoggedIn: false });
  };

  const direction = useDirection();

  return (
    <Suspense fallback={<View />}>
      <SocialProfile.Provider value={{ setUserProfile, userProfile, logOut }}>
        <View style={[styles.container, { direction }]}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          {userProfile.isLoggedIn ? <AppNavigator /> : <FBLoginButton />}
        </View>
      </SocialProfile.Provider>
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
