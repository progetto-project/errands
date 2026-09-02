import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { colors } from "@constants/theme";

/** Linea sottile 1px, usata per separare righe di lista (es. voci "Le tue commissioni"). */
export function Divider({ style }: { style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.line, style]} />;
}

const styles = StyleSheet.create({
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    width: "100%"
  }
});
