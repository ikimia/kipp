import React, { Suspense, useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { LoginManager } from "react-native-fbsdk";

import AppNavigator from "./navigation/AppNavigator";
import { useDirection } from "./hooks/direction";
import { SocialProfile } from "./contexes/SocialProfile";
import { StyleProvider } from "native-base";
import getTheme from "./native-base-theme/components";
import WelcomeScreen from "./screens/WelcomeScreen";
import { FacebookAccessTokenStorage, FacebookProfileStorage } from "./Storage";
function App() {
  const [userProfile, setUserProfile] = useState({ isLoggedIn: false });
  const [isInitialized, setIsInitialized] = useState(false);
  const logOut = () => {
    LoginManager.logOut();
    setUserProfile({ isLoggedIn: false });
    FacebookProfileStorage.delete();
    FacebookAccessTokenStorage.delete();
  };
  const direction = useDirection();

  return (
    <SocialProfile.Provider
      value={{
        setIsInitialized,
        isInitialized,
        setUserProfile,
        userProfile,
        logOut
      }}
    >
      <StyleProvider style={getTheme()}>
        <View style={[styles.container, { direction }]}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          {userProfile.isLoggedIn ? <AppNavigator /> : <WelcomeScreen />}
        </View>
      </StyleProvider>
    </SocialProfile.Provider>
  );
}

export default function SuspendedApp() {
  return (
    <Suspense fallback={<View />}>
      <App />
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
