import { ReactNode } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ViewStyle,
  StyleProp
} from "react-native";
import { SafeAreaView, Edge } from "react-native-safe-area-context";
import { colors, spacing } from "@constants/theme";

interface ScreenProps {
  children: ReactNode;
  /** Scrollable di default (la maggior parte delle schermate dei mockup scrolla). */
  scroll?: boolean;
  /** Da disattivare per schermate con la propria mappa/immagine full-bleed. */
  paddedHorizontal?: boolean;
  edges?: Edge[];
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  /** Attiva KeyboardAvoidingView, per schermate con input (Nuova commissione). */
  avoidKeyboard?: boolean;
}

/**
 * Container base per tutte le schermate dell'app: sfondo crema costante,
 * safe area, padding orizzontale standard. Le schermate specifiche
 * compongono il proprio contenuto dentro <Screen>...</Screen> invece di
 * ridefinire background/safe area ogni volta.
 */
export function Screen({
  children,
  scroll = true,
  paddedHorizontal = true,
  edges = ["top", "bottom"],
  style,
  contentContainerStyle,
  avoidKeyboard = false
}: ScreenProps) {
  const content = scroll ? (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={[
        paddedHorizontal && styles.padded,
        styles.scrollContent,
        contentContainerStyle
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.flex, paddedHorizontal && styles.padded, contentContainerStyle]}>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={[styles.safe, style]} edges={edges}>
      {avoidKeyboard ? (
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          {content}
        </KeyboardAvoidingView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background
  },
  flex: {
    flex: 1
  },
  padded: {
    paddingHorizontal: spacing.md
  },
  scrollContent: {
    paddingBottom: spacing.xl
  }
});
