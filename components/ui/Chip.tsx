import { Pressable, StyleSheet } from "react-native";
import { colors, radii, spacing } from "@constants/theme";
import { Text } from "./Text";

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  disabled?: boolean;
}

/**
 * Pill selezionabile osservata in "Quando?" (Oggi/Domani/Questa
 * settimana/Nessuna scadenza) e "Priorità" (Bassa/Normale/Alta).
 * Selezionato = sfondo verde pieno; non selezionato = outline chiaro.
 */
export function Chip({ label, selected = false, onPress, disabled = false }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      style={({ pressed }) => [
        styles.base,
        selected ? styles.selected : styles.unselected,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled
      ]}
    >
      <Text
        variant="bodySmall"
        color={
          disabled ? colors.disabledText : selected ? colors.textOnPrimary : colors.chipTextInactive
        }
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: radii.pill,
    borderWidth: 1,
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  unselected: {
    backgroundColor: colors.chipBackground,
    borderColor: colors.chipBorder
  },
  pressed: {
    opacity: 0.8
  },
  disabled: {
    backgroundColor: colors.disabledBackground,
    borderColor: colors.disabledBackground
  }
});
