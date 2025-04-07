import { Dimensions, Platform } from "react-native";

export const IS_IOS = Platform.OS === "ios";

export const { width, height } = Dimensions.get("window");

export const { width: screenWidth, height: screenHeight } =
  Dimensions.get("screen"); 
