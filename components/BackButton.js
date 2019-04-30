import React, { useContext } from "react";
import { Button } from "native-base";
import { NavigationContext } from "react-navigation";
import ArrowIcon from "./ArrowIcon";

export default function BackButton() {
  const { goBack } = useContext(NavigationContext);
  return (
    <Button transparent onPress={() => goBack()}>
      <ArrowIcon back />
    </Button>
  );
}
