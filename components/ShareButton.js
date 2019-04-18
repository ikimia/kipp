import { Button, Icon } from "native-base";
import React from "react";
import { Share } from "react-native";

const onShare = async () => {
  try {
    const result = await Share.share({
      message: "React Native | A framework for building native apps using React"
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

export default function ShareButton() {
  return (
    <Button transparent onPress={onShare}>
      <Icon name={"share"} />
    </Button>
  );
}
