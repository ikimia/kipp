import React from "react";
import { View } from "react-native";
import { LoginManager } from "react-native-fbsdk";
import * as PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";
import { RectButton } from "react-native-gesture-handler";
import StyledText from "./StyledText";

export default function FBLoginButton({ onLogin, onCancel, onError }) {
  return (
    <RectButton
      style={{ backgroundColor: "#3b5998", borderRadius: 5 }}
      onPress={() => {
        LoginManager.logInWithReadPermissions(["public_profile", "email"])
          .then(result => {
            if (result.isCancelled) {
              onCancel && onCancel(result);
            } else {
              onLogin(result);
            }
          })
          .catch(function(error) {
            onError && onError(error);
          });
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 10
        }}
      >
        <Icon
          name="logo-facebook"
          style={{ fontSize: 22, color: "white", marginEnd: 10 }}
        />
        <StyledText color="white" size={16}>
          Continue with Facebook
        </StyledText>
      </View>
    </RectButton>
  );
}

FBLoginButton.propTypes = {
  onLogin: PropTypes.func,
  onCancel: PropTypes.func,
  onError: PropTypes.func
};
