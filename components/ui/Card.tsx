import { View, ViewProps, StyleSheet } from "react-native";
import { colors, radii, spacing, shadows } from "@constants/theme";

export type CardVariant = "default" | "suggestion" | "warning" | "flat";

interface CardProps extends ViewProps {
  variant?: CardVariant;
  padded?: boolean;
}

/**
 * Primitiva Card osservata in tutti i mockup: bordo sottile, radius medio,
 * ombra quasi assente. Le varianti "suggestion"/"warning" applicano lo
 * sfondo oro tenue usato per gli elementi smart (es. "Potresti fare tutto
 * in un'uscita", "Errands ha trovato qualcosa").
 *
 * ErrandCard e SmartSuggestionCard sono composti sopra questa primitiva
 * invece di duplicare bordo/radius/padding.
 */
export function Card({ variant = "default", padded = true, style, ...props }: CardProps) {
  return (
    <View
      style={[
        styles.base,
        padded && styles.padded,
        variant === "default" && styles.default,
        variant === "suggestion" && styles.suggestion,
        variant === "warning" && styles.warning,
        variant === "flat" && styles.flat,
        style
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.md,
    borderWidth: 1
  },
  padded: {
    padding: spacing.md
  },
  default: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    ...shadows.card
  },
  suggestion: {
    backgroundColor: colors.smartBackground,
    borderColor: colors.smartBorder
  },
  warning: {
    backgroundColor: colors.smartBackground,
    borderColor: colors.smartBorder
  },
  flat: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: StyleSheet.hairlineWidth
  }
});
