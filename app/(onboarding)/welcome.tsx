import { View, StyleSheet } from "react-native";
import { router, Link } from "expo-router";
import { colors, spacing, icons } from "@constants/theme";
import { Text } from "@components/ui/Text";
import { Button } from "@components/ui/Button";
import { Screen } from "@components/ui/Screen";
import { RouteIllustration, type RouteIllustrationStop } from "@features/onboarding/components/RouteIllustration";

/**
 * Onboarding 1/3 — schermata di benvenuto.
 *
 * NOTA: "Inizia" e "Accedi" per ora navigano solo al passo onboarding
 * successivo / restano placeholder — il vero flusso auth arriva in
 * Fase 6. La UI qui è già quella definitiva.
 */
const stops: RouteIllustrationStop[] = [
  { key: "casa1", icon: icons.errandCategory.home, label: "Casa", x: 0.06, y: 0.78, labelPosition: "right" },
  { key: "poste", icon: icons.errandCategory.mail, label: "Poste", x: 0.4, y: 0.14, labelPosition: "bottom" },
  { key: "casa2", icon: icons.errandCategory.home, label: "Casa", x: 0.92, y: 0.06, labelPosition: "bottom" },
  { key: "farmacia", icon: icons.errandCategory.pharmacy, label: "Farmacia", x: 0.32, y: 0.58, labelPosition: "right" },
  { key: "supermercato", icon: icons.errandCategory.groceries, label: "Supermercato", x: 0.6, y: 0.9, labelPosition: "right" }
];

export default function OnboardingWelcomeScreen() {
  return (
    <Screen edges={["top", "bottom"]} contentContainerStyle={styles.content}>
      <Text variant="sectionLabel" style={styles.wordmark}>
        errands
      </Text>

      <View style={styles.mainBlock}>
        <Text variant="display" style={styles.headline}>
          Non uscire due volte per la stessa cosa.
        </Text>

        <View style={styles.illustrationWrap}>
          <RouteIllustration stops={stops} />
        </View>

        <Text variant="body" color={colors.textSecondary} style={styles.body}>
          Errands organizza le tue commissioni e trova il modo più semplice per
          completarle.
        </Text>
      </View>

      <View style={styles.spacer} />

      <Button label="Inizia" variant="primary" onPress={() => router.push("/(auth)/register")} />

      <View style={styles.loginRow}>
        <Text variant="body" color={colors.textSecondary}>
          Hai già un account?{" "}
        </Text>
        <Link href="/(auth)/login" asChild>
          <Text variant="body" color={colors.primary}>
            Accedi
          </Text>
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingTop: spacing.lg
  },
  wordmark: {
    textAlign: "center",
    marginBottom: spacing.xl
  },
  headline: {
    textAlign: "center",
    marginBottom: spacing.lg
  },
  illustrationWrap: {
    alignItems: "center",
    marginBottom: spacing.lg
  },
  body: {
    textAlign: "center",
    paddingHorizontal: spacing.sm
  },
  mainBlock: {
    flex:1.7,
    marginTop: spacing.xl,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  spacer: {
    flex: 0.30,
    minHeight: spacing.sm,
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.md
  }
});
