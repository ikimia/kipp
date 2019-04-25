import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { View, Text } from "native-base";
import { SocialProfile } from "../contexes/SocialProfile";

const headerTextColor = { color: "#F4F4F4" };

function CountdownTimer() {
  const [value, setValue] = useState(600);
  useEffect(() => {
    const timer = setInterval(() => {
      setValue(value => {
        if (value === 0) {
          clearInterval(timer);
          return value;
        } else {
          return value - 1;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const twoDigits = n => String(n).padStart(2, "0");
  const minutes = twoDigits(Math.floor(value / 60));
  const seconds = twoDigits(value % 60);
  return <CardText text={`${minutes}:${seconds}`} />;
}

function CardLabel({ text }) {
  return (
    <Text style={[headerTextColor, { fontWeight: "bold", fontSize: 12 }]}>
      {text}
    </Text>
  );
}
CardLabel.propTypes = { text: PropTypes.string.isRequired };

function CardText({ text, fontSize }) {
  return (
    <Text style={[headerTextColor, { fontWeight: "bold", fontSize }]}>
      {text}
    </Text>
  );
}
CardText.propTypes = {
  text: PropTypes.string.isRequired,
  fontSize: PropTypes.number
};

export default function PayCard() {
  const cardNumber = Math.random()
    .toString(10)
    .slice(2, 8);
  const { userProfile } = useContext(SocialProfile);

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "space-evenly",
        height: 200,
        borderWidth: 3,
        borderColor: "#F4F4F4",
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "rgba(244,244,244,0.2)"
      }}
    >
      <View style={{ flex: 1 }} />
      <View style={{ flex: 1 }}>
        <CardLabel text="TEMPORARY NUMBER" />
        <CardText fontSize={24} text={cardNumber.match(/.{3}/g).join(" ")} />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <View>
          <CardLabel text="CARDHOLDER NAME" />
          <CardText text={userProfile.name} />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ marginEnd: 10 }}>
            <CardLabel text="VALID FOR" />
            <CardLabel text="(MINUTES)" />
          </View>
          <CountdownTimer />
        </View>
      </View>
    </View>
  );
}
