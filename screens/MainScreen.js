import React, { useEffect, useState, useContext } from "react";
import { Image, View, Text } from "react-native";
import { SafeAreaView, NavigationContext } from "react-navigation";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SocialProfile } from "../contexes/SocialProfile";
import Icon from "react-native-vector-icons/Feather";

const CODE_TIMEOUT = 180;

const generateCode = () =>
  Math.random()
    .toString(10)
    .slice(2, 8);

function getGreeting() {
  const hours = new Date().getHours();
  if (hours > 5 && hours < 12) {
    return "Good Morning";
  }
  if (hours > 12 && hours < 17) {
    return "Good Afternoon";
  }
  if (hours > 17) {
    return "Good Evening";
  }
  return "Good Night";
}

function CountdownTimer({ code, onEnd }) {
  const [total, setTotal] = useState(CODE_TIMEOUT);
  useEffect(() => {
    setTotal(CODE_TIMEOUT);
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

const BACKDROPS = [
  require("../img/backdrops/0.jpg"),
  require("../img/backdrops/1.jpg"),
  require("../img/backdrops/2.jpg"),
  require("../img/backdrops/3.jpg"),
  require("../img/backdrops/4.jpg"),
  require("../img/backdrops/5.jpg")
];

function getRandomBackdrop(prevIndex) {
  for (;;) {
    const index = Math.floor(Math.random() * BACKDROPS.length);
    if (index !== prevIndex) {
      return index;
    }
  }
}

export default function MainScren() {
  const [code, setCode] = useState(generateCode());
  const [backdropIndex, setBackdropIndex] = useState(getRandomBackdrop(-1));
  const { userProfile } = useContext(SocialProfile);
  const { navigate } = useContext(NavigationContext);
  const setNewCode = () => {
    setCode(generateCode());
    setBackdropIndex(getRandomBackdrop(backdropIndex));
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={BACKDROPS[backdropIndex]}
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
              {getGreeting()}
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
          activeOpacity={0.8}
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
            <Text style={{ fontWeight: "bold" }}> Where can I use Kipp?</Text>
          </View>
        </TouchableOpacity>
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              alignItems: "center",
              borderRadius: 10,
              paddingTop: 25,
              paddingHorizontal: 25,
              paddingBottom: 15
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
              <CountdownTimer code={code} onEnd={setNewCode} /> minutes
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={setNewCode}
              style={{ marginTop: 15 }}
            >
              <View>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textDecorationLine: "underline"
                  }}
                >
                  Get Another Code
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1 }} />
      </SafeAreaView>
    </View>
  );
}
