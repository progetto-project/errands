import { Pressable, StyleSheet } from "react-native";
import { colors, radii, shadows } from "@constants/theme";
import { icons } from "@constants/theme";

interface FabProps {
  onPress?: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
}

/**
 * FAB circolare verde con "+", sovrapposto al centro della bottom
 * navigation e leggermente sollevato sopra di essa, come nei mockup.
 * Il posizionamento (offset verticale rispetto alla tab bar) è gestito dal
 * componente BottomNavigation, non da questo componente.
 */
export function Fab({ onPress, disabled = false, accessibilityLabel = "Nuova commissione" }: FabProps) {
  const PlusIcon = icons.ui.add;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      style={({ pressed }) => [
        styles.fab,
        shadows.floating,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled
      ]}
    >
      <PlusIcon size={26} color={colors.textOnPrimary} strokeWidth={2.5} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    width: 56,
    height: 56,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  pressed: {
    backgroundColor: colors.primaryPressed
  },
  disabled: {
    backgroundColor: colors.disabledBackground
  }
});
