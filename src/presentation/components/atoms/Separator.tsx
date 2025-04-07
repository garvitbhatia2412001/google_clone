import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
type Props = {
  height: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};
export const Separator = ({ height, color, style }: Props) => (
  <View style={[{ height, backgroundColor: color ?? "transparent" }, style]} />
);
