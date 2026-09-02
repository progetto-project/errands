import { View, StyleSheet } from "react-native";
import { colors, radii, spacing } from "@constants/theme";
import { Text } from "./Text";
import type { ErrandPriority } from "../../types/errand";

/** Pill outline verde, es. "Apri in Maps". */
export function Badge({ label }: { label: string }) {
  return (
    <View style={styles.pill}>
      <Text variant="caption" color={colors.primary}>
        {label}
      </Text>
    </View>
  );
}

const priorityColor: Record<ErrandPriority, string> = {
  high: colors.priorityHigh,
  normal: colors.priorityNormal,
  low: colors.priorityLow
};

const priorityLabel: Record<ErrandPriority, string> = {
  high: "Alta",
  normal: "Normale",
  low: "Bassa"
};

/**
 * Indicatore di priorità: SEMPRE testo + colore insieme (mai solo il
 * pallino colorato), per non affidare lo stato al solo colore.
 */
export function PriorityBadge({ priority }: { priority: ErrandPriority }) {
  return (
    <View style={styles.priorityRow} accessibilityLabel={`Priorità ${priorityLabel[priority]}`}>
      <Text variant="body" color={colors.textPrimary}>
        {priorityLabel[priority]}
      </Text>
      <View style={[styles.dot, { backgroundColor: priorityColor[priority] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radii.pill,
    backgroundColor: colors.primaryLight
  },
  priorityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4
  }
});
