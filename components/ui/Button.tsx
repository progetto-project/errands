import {
  Pressable,
  PressableProps,
  StyleSheet,
  ActivityIndicator,
  View,
  ViewStyle,
  StyleProp
} from "react-native";
import { colors, radii, spacing } from "@constants/theme";
import { Text } from "./Text";
import type { IconComponent } from "@constants/theme";

type ButtonVariant = "primary" | "secondary" | "text";

interface ButtonProps extends Omit<PressableProps, "style" | "children"> {
  label: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  /** Icona opzionale mostrata prima del testo (es. "Sto uscendo" con icona bussola). */
  icon?: IconComponent;
  fullWidth?: boolean;
  /** Styling esterno (es. margini di layout) — NON per sovrascrivere i token del design system. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Bottoni pill osservati nei mockup:
 * - Primary: sfondo verde pieno, testo bianco bold ("Inizia", "Attiva
 *   posizione", "Salva commissione", "Ottimizza il mio percorso"...).
 * - Secondary: variante outline verde — non presente esplicitamente nei
 *   mockup allegati ma richiesta dallo spec del design system; usata dove
 *   serve un'azione alternativa non primaria con pari enfasi (es. futuri
 *   flussi non ancora mostrati). DA VALIDARE quando comparirà nei mockup.
 * - Text: nessuno sfondo, solo testo verde ("Non ora", "Annulla",
 *   "Modifica", "Vedi tutto", "Accedi").
 */
export function Button({
  label,
  variant = "primary",
  disabled = false,
  loading = false,
  icon: Icon,
  fullWidth = true,
  style,
  ...pressableProps
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        style,
        variant === "primary" && styles.primary,
        variant === "secondary" && styles.secondary,
        variant === "text" && styles.text,
        fullWidth && styles.fullWidth,
        pressed && !isDisabled && variant === "primary" && styles.primaryPressed,
        pressed && !isDisabled && variant === "secondary" && styles.secondaryPressed,
        pressed && !isDisabled && variant === "text" && styles.textPressed,
        isDisabled && variant !== "text" && styles.disabled
      ]}
      {...pressableProps}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? colors.textOnPrimary : colors.primary}
        />
      ) : (
        <View style={styles.content}>
          {Icon ? (
            <Icon
              size={18}
              color={
                isDisabled
                  ? colors.disabledText
                  : variant === "primary"
                    ? colors.textOnPrimary
                    : colors.primary
              }
              style={styles.icon}
            />
          ) : null}
          <Text
            variant="button"
            color={
              isDisabled
                ? colors.disabledText
                : variant === "primary"
                  ? colors.textOnPrimary
                  : colors.primary
            }
          >
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

/** Bottone icona circolare, per azioni singole (es. profilo in Home). Garantisce touch target >= 44px. */
interface IconButtonProps extends Omit<PressableProps, "style"> {
  icon: IconComponent;
  color?: string;
  backgroundColor?: string;
  size?: number;
  accessibilityLabel: string;
  style?: StyleProp<ViewStyle>;
}

export function IconButton({
  icon: Icon,
  color = colors.textPrimary,
  backgroundColor = "transparent",
  size = 22,
  accessibilityLabel,
  disabled,
  style,
  ...pressableProps
}: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      hitSlop={8}
      style={({ pressed }) => [
        iconButtonStyles.base,
        { backgroundColor },
        style,
        pressed && !disabled && iconButtonStyles.pressed,
        disabled && iconButtonStyles.disabled
      ]}
      {...pressableProps}
    >
      <Icon size={size} color={disabled ? colors.disabledText : color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: radii.pill,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg
  },
  fullWidth: {
    width: "100%"
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    marginRight: spacing.sm
  },
  primary: {
    backgroundColor: colors.primary
  },
  primaryPressed: {
    backgroundColor: colors.primaryPressed
  },
  secondary: {
    backgroundColor: colors.transparent,
    borderWidth: 1.5,
    borderColor: colors.primary
  },
  secondaryPressed: {
    backgroundColor: colors.primaryLight
  },
  text: {
    backgroundColor: colors.transparent,
    minHeight: 44,
    paddingHorizontal: spacing.sm
  },
  textPressed: {
    opacity: 0.6
  },
  disabled: {
    backgroundColor: colors.disabledBackground,
    borderColor: colors.disabledBackground
  }
});

const iconButtonStyles = StyleSheet.create({
  base: {
    width: 44,
    height: 44,
    borderRadius: radii.pill,
    alignItems: "center",
    justifyContent: "center"
  },
  pressed: {
    opacity: 0.6
  },
  disabled: {
    opacity: 0.4
  }
});
