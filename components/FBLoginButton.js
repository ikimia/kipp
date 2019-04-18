import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";
import { SocialProfile } from "../contexes/SocialProfile";

function setLoginData(setUserProfile) {
  return AccessToken.getCurrentAccessToken().then(data => {
    if (data === null) {
      setUserProfile({
        isLoggedIn: false
      });
      return Promise.resolve();
    }
    const { permissions, userId } = data;
    setUserProfile({
      permissions,
      userId,
      isLoggedIn: true
    });
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
            setUserProfile({
              permissions,
              userId,
              name: result.name,
              picture: result.picture.data.url,
              isLoggedIn: true
            });
          }
        )
      )
      .start();
  });
}

export default function FBLoginButton() {
  const { setUserProfile } = useContext(SocialProfile);
  useEffect(() => {
    setLoginData(setUserProfile);
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ margin: 40 }}>
        <LoginButton
          readPermissions={["public_profile email"]}
          onLoginFinished={(error, result) => {
            if (error) {
              // eslint-disable-next-line no-console
              console.warn(`Login failed with error: ${error.message}`);
            } else if (result.isCancelled) {
              // eslint-disable-next-line no-console
              console.warn("Login was cancelled");
            } else {
              setLoginData(setUserProfile);
            }
          }}
          onLogoutFinished={() => alert("User logged out")}
        />
      </View>
    </View>
  );
}
