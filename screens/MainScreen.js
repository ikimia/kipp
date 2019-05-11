import React, { useEffect, useState, useContext } from "react";
import { Image, View, Text } from "react-native";
import { SafeAreaView, NavigationContext } from "react-navigation";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SocialProfile } from "../contexes/SocialProfile";
import Icon from "react-native-vector-icons/Feather";

const generateCode = () =>
  Math.random()
    .toString(10)
    .slice(2, 8);

function CountdownTimer({ code, onEnd }) {
  const [total, setTotal] = useState(600);
  useEffect(() => {
    setTotal(600);
    const timer = setInterval(() => {
      setTotal(prevTotal => {
        if (prevTotal > 0) {
          return prevTotal - 1;
        }
        clearInterval(timer);
        onEnd();
        return prevTotal;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [code]);
  const minutes = Math.floor(total / 60)
    .toString(10)
    .padStart(2, "0");
  const seconds = (total % 60).toString(10).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function MainScren() {
  const [code, setCode] = useState(generateCode());
  const { userProfile } = useContext(SocialProfile);
  const { navigate } = useContext(NavigationContext);
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../img/pay-backdrop.jpg")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%"
        }}
      />
      <SafeAreaView style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
            marginHorizontal: 15
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 25
              }}
            >
              Pay
            </Text>
            <Text>{userProfile.name}</Text>
          </View>
          <TouchableOpacity onPress={() => navigate("Profile")}>
            <Image
              source={{ uri: userProfile.picture }}
              style={{ width: 46, height: 46 }}
              borderRadius={23}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={{ marginTop: 1, alignItems: "flex-end" }}>
        <TouchableOpacity
          onPress={() => {
            navigate("Stores");
          }}
        >
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              borderBottomLeftRadius: 10,
              backgroundColor: "rgba(255, 255, 255, 0.8)"
            }}
          >
            <Icon name="shopping-bag" size={15} />
            <Text style={{ fontWeight: "bold" }}> Stores</Text>
          </View>
        </TouchableOpacity>
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              alignItems: "center",
              borderRadius: 10,
              padding: 25,
              marginBottom: 25
            }}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Pay with One-Time Code:
            </Text>
            <Text style={{ color: "white", fontSize: 48, fontWeight: "bold" }}>
              {code.match(/.{3}/g).join(" ")}
            </Text>
            <Text style={{ color: "white", fontSize: 14 }}>
              valid for the next{" "}
              <CountdownTimer
                code={code}
                onEnd={() => {
                  setCode(generateCode());
                }}
              />{" "}
              minutes
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginEnd: 30,
            marginBottom: 30
          }}
        >
          <TouchableOpacity
            style={{ opacity: 0.7 }}
            activeOpacity={0.5}
            onPress={() => {
              setCode(generateCode());
            }}
          >
            <Icon name="refresh-cw" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
