import React, { useContext } from "react";
import { NavigationContext } from "react-navigation";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";

export default function BackButton() {
  const { goBack } = useContext(NavigationContext);
  return (
    <TouchableOpacity onPress={() => goBack()}>
      <Icon name="arrow-left" size={30} />
    </TouchableOpacity>
  );
}
