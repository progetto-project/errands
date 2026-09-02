import { View, Pressable, StyleSheet } from "react-native";
import { colors, radii, spacing, icons, type IconComponent } from "@constants/theme";
import { Text } from "@components/ui/Text";
import type { ErrandPriority, ErrandStatus } from "../../../types/errand";

export type ErrandCardVariant = "normal" | "urgent" | "completed" | "overdue";

interface ErrandCardProps {
  title: string;
  placeName?: string;
  dueLabel?: string; // es. "entro oggi", "domani", "nessuna scadenza"
  priority: ErrandPriority;
  status: ErrandStatus;
  icon: IconComponent;
  variant?: ErrandCardVariant;
  onPress?: () => void;
}

/**
 * Riga commissione osservata nelle liste "Oggi" / "Prossimamente" / "Le tue
 * commissioni": icona categoria a sinistra in riquadro chiaro, titolo bold,
 * sottotitolo luogo + scadenza. Nessuna ombra, solo bordo sottile tra righe
 * (qui gestito dal contenitore lista, non dalla singola card).
 *
 * Varianti:
 * - normal: aspetto standard.
 * - urgent: bordo/testo scadenza in rosso (priorità alta o scadenza vicina).
 * - completed: titolo con testo attenuato + barrato, icona check.
 * - overdue: come urgent ma con badge "Scaduta" esplicito (mai solo colore).
 */
export function ErrandCard({
  title,
  placeName,
  dueLabel,
  priority,
  status,
  icon: Icon,
  variant = "normal",
  onPress
}: ErrandCardProps) {
  const isCompleted = variant === "completed" || status === "completed";
  const isUrgentLook = variant === "urgent" || variant === "overdue" || priority === "high";

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={[styles.iconWrap, isCompleted && styles.iconWrapCompleted]}>
        {isCompleted ? (
          <icons.ui.check size={20} color={colors.success} />
        ) : (
          <Icon size={20} color={colors.textPrimary} />
        )}
      </View>
      <View style={styles.textWrap}>
        <Text
          variant="bodyMedium"
          color={isCompleted ? colors.textMuted : colors.textPrimary}
          style={isCompleted ? styles.strikethrough : undefined}
          numberOfLines={1}
        >
          {title}
        </Text>
        <View style={styles.subtitleRow}>
          {placeName ? (
            <Text variant="bodySmall" color={colors.textSecondary}>
              {placeName}
            </Text>
          ) : null}
          {placeName && dueLabel ? (
            <Text variant="bodySmall" color={colors.textSecondary}>
              {" · "}
            </Text>
          ) : null}
          {dueLabel ? (
            <Text
              variant="bodySmall"
              color={isUrgentLook && !isCompleted ? colors.error : colors.textSecondary}
            >
              {variant === "overdue" ? `Scaduta · ${dueLabel}` : dueLabel}
            </Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
    gap: spacing.sm
  },
  pressed: {
    opacity: 0.6
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center"
  },
  iconWrapCompleted: {
    backgroundColor: colors.successBackground,
    borderColor: colors.successBackground
  },
  textWrap: {
    flex: 1
  },
  subtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2
  },
  strikethrough: {
    textDecorationLine: "line-through"
  }
});
