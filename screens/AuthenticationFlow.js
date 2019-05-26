import * as React from "react";
import { useContext } from "react";
import { View } from "react-native";
import { SafeAreaView, NavigationContext } from "react-navigation";
import { AccessToken } from "react-native-fbsdk";
import firebase from "react-native-firebase";

import Logo from "../components/Logo";
import FBLoginButton from "../components/FBLoginButton";
import Backdrop, { PATTERNS } from "../components/Backdrop";

export default function AuthenticationFlow() {
  const { navigate } = useContext(NavigationContext);
  const login = async () => {
    const accessToken = await AccessToken.getCurrentAccessToken();
    if (!accessToken) {
      return;
    }
    const credential = firebase.auth.FacebookAuthProvider.credential(
      accessToken.accessToken
    );
    await firebase.auth().signInWithCredential(credential);
    navigate("App");
  };
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
      <Backdrop pattern={PATTERNS.Triangles} />
      <View style={{ flex: 5, justifyContent: "center", alignItems: "center" }}>
        <Logo fontSize={100} color="white" />
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <FBLoginButton onLogin={login} />
      </View>
    </SafeAreaView>
  );
}
