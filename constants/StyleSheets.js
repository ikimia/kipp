import { StyleSheet } from "react-native";
import Colors from "./Colors";

const paddingLevels = [0, 4, 6, 8, 12, 16];

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor
  },
  textBold: {
    fontWeight: "bold"
  },
  textCenter: {
    textAlign: "center"
  },
  textSize0: {
    fontSize: 10
  },
  textSize1: {
    fontSize: 12
  },
  textSize2: {
    fontSize: 16
  },
  textSize3: {
    fontSize: 24
  },
  textSize4: {
    fontSize: 36
  },
  textSize5: {
    fontSize: 60
  },
  button: {
    alignSelf: "center",
    justifyContent: "center"
  },
  buttonShadow: {
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { height: 0, width: 0 }
  },
  // Padding p{direction}{level}
  p0: {
    padding: paddingLevels[0]
  },
  pt0: {
    paddingTop: paddingLevels[0]
  },
  pb0: {
    paddingBottom: paddingLevels[0]
  },
  p1: {
    padding: paddingLevels[1]
  },
  pt1: {
    paddingTop: paddingLevels[1]
  },
  pb1: {
    paddingBottom: paddingLevels[1]
  },
  p2: {
    padding: paddingLevels[2]
  },
  pt2: {
    paddingTop: paddingLevels[2]
  },
  pb2: {
    paddingBottom: paddingLevels[2]
  },
  p3: {
    padding: paddingLevels[3]
  },
  pt3: {
    paddingTop: paddingLevels[3]
  },
  pb3: {
    paddingBottom: paddingLevels[3]
  },
  p4: {
    padding: paddingLevels[4]
  },
  pt4: {
    paddingTop: paddingLevels[4]
  },
  pb4: {
    paddingBottom: paddingLevels[4]
  },
  p5: {
    padding: paddingLevels[5]
  },
  pt5: {
    paddingTop: paddingLevels[5]
  },
  pb5: {
    paddingBottom: paddingLevels[5]
  },
  // margin m{direction}{level}
  m0: {
    margin: paddingLevels[0]
  },
  mt0: {
    marginTop: paddingLevels[0]
  },
  mb0: {
    marginBottom: paddingLevels[0]
  },
  m1: {
    margin: paddingLevels[1]
  },
  mt1: {
    marginTop: paddingLevels[1]
  },
  mb1: {
    marginBottom: paddingLevels[1]
  },
  m2: {
    margin: paddingLevels[2]
  },
  mt2: {
    marginTop: paddingLevels[2]
  },
  mb2: {
    marginBottom: paddingLevels[2]
  },
  m3: {
    margin: paddingLevels[3]
  },
  mt3: {
    marginTop: paddingLevels[3]
  },
  mb3: {
    marginBottom: paddingLevels[3]
  },
  m4: {
    margin: paddingLevels[4]
  },
  mt4: {
    marginTop: paddingLevels[4]
  },
  mb4: {
    marginBottom: paddingLevels[4]
  },
  m5: {
    margin: paddingLevels[5]
  },
  mt5: {
    marginTop: paddingLevels[5]
  },
  mb5: {
    marginBottom: paddingLevels[5]
  },
  f1: {
    flex: 1
  },
  f2: {
    flex: 2
  },
  f3: {
    flex: 3
  },
  f4: {
    flex: 4
  },
  f5: {
    flex: 5
  }
});
