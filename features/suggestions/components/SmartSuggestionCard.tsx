import { View, StyleSheet, type ReactNode } from "react-native";
import { colors, spacing, icons, type IconComponent } from "@constants/theme";
import { Text } from "@components/ui/Text";
import { Card } from "@components/ui/Card";
import { Button } from "@components/ui/Button";
import type { SuggestionType } from "../../../types/errand";

interface SmartSuggestionCardProps {
  type: SuggestionType;
  title: string;
  description: string;
  primaryActionLabel: string;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  /** Contenuto opzionale tra descrizione e azioni (es. anteprima percorso in Home). */
  children?: ReactNode;
}

const iconByType: Record<SuggestionType, IconComponent> = {
  nearby: icons.ui.location,
  closing_soon: icons.ui.clock,
  route_opportunity: icons.ui.navigate,
  overdue: icons.ui.clock,
  planning: icons.ui.suggestion
};

/**
 * Card oro/gold usata per gli elementi "intelligenti" di Errands: box
 * "Potresti fare tutto in un'uscita" in Home, "Errands ha trovato
 * qualcosa" nella conferma commissione, righe della schermata
 * "Suggerimenti" ("Sei vicino alla farmacia", "Il calzolaio chiude tra 40
 * minuti", "Domani passerai vicino alle Poste").
 *
 * Puramente UI in questa fase: nessuna logica di generazione suggerimenti.
 */
export function SmartSuggestionCard({
  type,
  title,
  description,
  primaryActionLabel,
  secondaryActionLabel,
  onPrimaryAction,
  onSecondaryAction,
  children
}: SmartSuggestionCardProps) {
  const Icon = iconByType[type];

  return (
    <Card variant="suggestion">
      <View style={styles.header}>
        <Icon size={18} color={colors.smartIcon} style={styles.icon} />
        <Text variant="heading3" color={colors.textPrimary} style={styles.title}>
          {title}
        </Text>
      </View>
      <Text variant="bodySmall" color={colors.textSecondary} style={styles.description}>
        {description}
      </Text>
      {children ? <View style={styles.childrenSlot}>{children}</View> : null}
      <View style={styles.actions}>
        <Button label={primaryActionLabel} variant="primary" onPress={onPrimaryAction} />
        {secondaryActionLabel ? (
          <Button
            label={secondaryActionLabel}
            variant="text"
            onPress={onSecondaryAction}
            fullWidth={false}
          />
        ) : null}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm
  },
  icon: {
    marginTop: 2
  },
  title: {
    flex: 1
  },
  description: {
    marginTop: spacing.xs,
    marginLeft: 26
  },
  childrenSlot: {
    marginTop: spacing.md
  },
  actions: {
    marginTop: spacing.md,
    gap: spacing.xs,
    alignItems: "stretch"
  }
});
