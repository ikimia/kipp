import React from "react";
import { Button, Icon, Text } from "native-base";
import { LoginManager } from "react-native-fbsdk";
import * as PropTypes from "prop-types";

export default function FBLoginButton({ onLogin, onCancel, onError }) {
  return (
    <Button
      iconLeft
      block
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
      <Icon name="logo-facebook" />
      <Text>Login with Facebook</Text>
    </Button>
  );
}

FBLoginButton.propTypes = {
  onLogin: PropTypes.func,
  onCancel: PropTypes.func,
  onError: PropTypes.func
};
