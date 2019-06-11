import * as React from "react";
import { useContext } from "react";
import { View } from "react-native";
import { SafeAreaView, NavigationContext } from "react-navigation";
import { AccessToken } from "react-native-fbsdk";

import Logo from "../../components/Logo";
import FBLoginButton from "../../components/FBLoginButton";
import Backdrop, { PATTERNS } from "../../components/Backdrop";
import { signIn } from "../../Backend";
import StyledText from "../../components/StyledText";
import { RectButton, BorderlessButton } from "react-native-gesture-handler";

export default function LoginScreen() {
  const { navigate } = useContext(NavigationContext);
  const login = async () => {
    const accessToken = await AccessToken.getCurrentAccessToken();
    if (!accessToken) {
      return;
    }
    await signIn(accessToken.accessToken);
    navigate("App");
  };
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
      <Backdrop pattern={PATTERNS[12]} />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ alignItems: "center" }}>
          <Logo fontSize={100} color="white" />
        </View>
        <View style={{ marginTop: 50 }}>
          <FBLoginButton onLogin={login} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10
            }}
          >
            <View
              style={{ flex: 1, borderTopColor: "white", borderTopWidth: 1 }}
            />
            <View style={{ marginHorizontal: 10 }}>
              <StyledText color="white">OR</StyledText>
            </View>
            <View
              style={{ flex: 1, borderTopColor: "white", borderTopWidth: 1 }}
            />
          </View>
          <RectButton
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: 10,
              borderRadius: 5,
              alignItems: "center"
            }}
          >
            <View>
              <StyledText size={16}>Create an Account</StyledText>
            </View>
          </RectButton>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10
            }}
          >
            <StyledText color="white">Already have an account? </StyledText>
            <BorderlessButton>
              <StyledText color="white" bold>
                Sign In
              </StyledText>
            </BorderlessButton>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
