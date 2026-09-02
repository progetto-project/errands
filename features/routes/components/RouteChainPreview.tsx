import { View, StyleSheet } from "react-native";
import { colors, spacing, radii } from "@constants/theme";
import { Text } from "@components/ui/Text";
import type { IconComponent } from "@constants/theme";

export interface RouteStop {
  key: string;
  label: string;
  icon: IconComponent;
}

/**
 * Sequenza di tappe con connettore orizzontale, osservata nella card
 * "Potresti fare tutto in un'uscita" in Home (Casa → Poste → Farmacia →
 * Supermercato). Versione compatta rispetto all'illustrazione "disegnata a
 * mano" dell'onboarding — qui le tappe sono icone in cerchio con etichetta
 * sotto, unite da una linea sottile.
 */
export function RouteChainPreview({ stops }: { stops: RouteStop[] }) {
  return (
    <View style={styles.row}>
      {stops.map((stop, index) => (
        <View key={stop.key} style={styles.stopWrap}>
          {index > 0 ? <View style={styles.connector} /> : null}
          <View style={styles.stop}>
            <View style={styles.iconCircle}>
              <stop.icon size={14} color={colors.primary} />
            </View>
            <Text variant="caption" color={colors.textSecondary} numberOfLines={1}>
              {stop.label}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const CIRCLE_SIZE = 28;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  stopWrap: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1
  },
  connector: {
    width: spacing.md,
    height: 1,
    backgroundColor: colors.smartBorder,
    marginHorizontal: 2,
    marginBottom: 16
  },
  stop: {
    alignItems: "center",
    width: 62
  },
  iconCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.smartBorder,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4
  }
});
