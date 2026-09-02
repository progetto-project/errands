import { View, StyleSheet } from "react-native";
import { colors, spacing, icons } from "@constants/theme";
import { Text } from "./Text";
import { IconButton } from "./Button";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBackPress?: () => void;
  /** Nasconde la freccia indietro per schermate radice (es. tab principali). */
  showBack?: boolean;
}

/**
 * Header osservato in "Dettaglio commissione", "Nuova commissione",
 * "Sto uscendo", "Percorso ottimizzato": freccia indietro sottile in alto
 * a sinistra, titolo serif sotto, sottotitolo sans opzionale (es. "Cosa
 * vuoi fare oggi?", "4 commissioni · 32 min").
 */
export function ScreenHeader({ title, subtitle, onBackPress, showBack = true }: ScreenHeaderProps) {
  return (
    <View style={styles.wrapper}>
      {showBack ? (
        <IconButton
          icon={icons.ui.back}
          accessibilityLabel="Indietro"
          onPress={onBackPress}
          color={colors.primary}
          style={styles.backButton}
        />
      ) : null}
      <Text variant="heading1">{title}</Text>
      {subtitle ? (
        <Text variant="body" color={colors.textSecondary} style={styles.subtitle}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md
  },
  backButton: {
    marginLeft: -spacing.sm,
    marginBottom: spacing.xs
  },
  subtitle: {
    marginTop: spacing.xs
  }
});
