const tintColor = "#2f95dc";
const openColor = require("open-color");

export const DARK_GRAY = "#1E1E1E";
export const OFFWHITE = "#EEEEEE";

export default {
  black: openColor.gray[8],
  white: openColor.white,
  backgroundColor: openColor.gray[0],
  textColor: openColor.gray[1],
  borderColor: openColor.gray[5],
  tabIconDefault: "#ccc",
  tabIconSelected: tintColor,
  tabBar: "#fefefe",
  errorBackground: "red",
  errorText: "#fff",
  warningBackground: "#EAEB5E",
  warningText: "#666804",
  noticeBackground: tintColor,
  noticeText: "#fff",
  tintColor
};
