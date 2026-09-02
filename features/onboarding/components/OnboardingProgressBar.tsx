import { View, StyleSheet } from "react-native";
import { colors, spacing } from "@constants/theme";
import { Text } from "@components/ui/Text";

interface OnboardingProgressBarProps {
  step: number; // 1-based
  total: number;
}

/**
 * Barra sottile in alto osservata nelle schermate 2 e 3 dell'onboarding
 * ("2 di 3", "3 di 3"): linea continua, porzione verde piena fino al passo
 * corrente, resto grigio chiaro. Etichetta "X di Y" centrata sotto.
 */
export function OnboardingProgressBar({ step, total }: OnboardingProgressBarProps) {
  const fraction = Math.min(Math.max(step / total, 0), 1);

  return (
    <View>
      <View style={styles.track}>
        <View style={[styles.fill, { flex: fraction }]} />
        <View style={{ flex: 1 - fraction }} />
      </View>
      <Text variant="caption" color={colors.textSecondary} style={styles.label}>
        {step} di {total}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: "row",
    height: 2,
    borderRadius: 1,
    overflow: "hidden",
    backgroundColor: colors.border
  },
  fill: {
    backgroundColor: colors.primary
  },
  label: {
    textAlign: "center",
    marginTop: spacing.sm
  }
});
