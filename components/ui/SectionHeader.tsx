import { View, Pressable, StyleSheet } from "react-native";
import { colors, spacing } from "@constants/theme";
import { Text } from "./Text";

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

/**
 * Intestazione di sezione osservata in Home ("Oggi" + "Vedi tutto",
 * "Prossimamente") e in altre liste. Titolo in sansSemiBold, azione
 * opzionale allineata a destra in verde.
 */
export function SectionHeader({ title, actionLabel, onActionPress }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <Text variant="sectionLabel">{title}</Text>
      {actionLabel ? (
        <Pressable onPress={onActionPress} hitSlop={8} accessibilityRole="button">
          <Text variant="bodySmall" color={colors.primary}>
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm
  }
});
