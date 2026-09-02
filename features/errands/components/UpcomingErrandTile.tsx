import { Pressable, View, StyleSheet } from "react-native";
import { colors, radii, spacing, type IconComponent } from "@constants/theme";
import { Text } from "@components/ui/Text";

interface UpcomingErrandTileProps {
  title: string;
  dateLabel: string; // es. "Domani", "Venerdì"
  icon: IconComponent;
  onPress?: () => void;
}

const TILE_WIDTH = 150;

/**
 * Card compatta osservata nella sezione "Prossimamente" della Home
 * ("Portare scarpe dal calzolaio · Domani", "Ritirare pacco · Venerdì"):
 * icona in riquadro chiaro in alto, titolo su due righe, data sotto.
 * Pensata per essere affiancata in uno scroll orizzontale.
 */
export function UpcomingErrandTile({ title, dateLabel, icon: Icon, onPress }: UpcomingErrandTileProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
    >
      <View style={styles.iconWrap}>
        <Icon size={20} color={colors.textPrimary} />
      </View>
      <Text variant="bodyMedium" numberOfLines={2} style={styles.title}>
        {title}
      </Text>
      <Text variant="bodySmall" color={colors.textSecondary}>
        {dateLabel}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: TILE_WIDTH,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.sm
  },
  pressed: {
    opacity: 0.7
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm
  },
  title: {
    marginBottom: 2
  }
});
