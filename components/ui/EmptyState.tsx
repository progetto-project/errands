import { View, StyleSheet } from "react-native";
import { colors, spacing, radii } from "@constants/theme";
import { Text } from "./Text";
import { Button } from "./Button";
import type { IconComponent } from "@constants/theme";

interface EmptyStateProps {
  icon: IconComponent;
  title: string;
  description?: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

/**
 * NOTA: nessun mockup allegato mostra uno stato vuoto — questo componente
 * è un'inferenza necessaria (richiesta esplicitamente dallo spec) per
 * coerenza del design system, non un pattern osservato. Ho riusato gli
 * stessi token (icona in riquadro chiaro, titolo serif, corpo sans,
 * bottone primary) delle altre schermate per non introdurre uno stile
 * estraneo. Da validare/eventualmente correggere quando/se comparirà in
 * un mockup reale.
 */
export function EmptyState({ icon: Icon, title, description, actionLabel, onActionPress }: EmptyStateProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.iconWrap}>
        <Icon size={28} color={colors.textSecondary} />
      </View>
      <Text variant="heading3" style={styles.title}>
        {title}
      </Text>
      {description ? (
        <Text variant="bodySmall" color={colors.textSecondary} style={styles.description}>
          {description}
        </Text>
      ) : null}
      {actionLabel ? (
        <Button
          label={actionLabel}
          variant="secondary"
          onPress={onActionPress}
          fullWidth={false}
          style={styles.action}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md
  },
  title: {
    textAlign: "center"
  },
  description: {
    textAlign: "center",
    marginTop: spacing.xs
  },
  action: {
    marginTop: spacing.lg
  }
});
