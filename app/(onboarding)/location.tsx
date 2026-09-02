import { View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { router } from "expo-router";
import { colors, spacing, icons } from "@constants/theme";
import { Text } from "@components/ui/Text";
import { Button } from "@components/ui/Button";
import { Screen } from "@components/ui/Screen";
import { OnboardingProgressBar } from "@features/onboarding/components/OnboardingProgressBar";
import { RouteIllustration, type RouteIllustrationStop } from "@features/onboarding/components/RouteIllustration";

const stops: RouteIllustrationStop[] = [
  { key: "casa", icon: icons.errandCategory.home, label: "Casa", x: 0.08, y: 0.85, labelPosition: "right" },
  { key: "farmacia", icon: icons.ui.location, label: "Farmacia", x: 0.5, y: 0.42, labelPosition: "right" },
  { key: "poste", icon: icons.ui.location, label: "Poste", x: 0.92, y: 0.06, labelPosition: "right" }
];

export default function OnboardingLocationScreen() {

   const handleEnableLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      router.push("/(onboarding)/notifications");
    }
  };

  return (
    <Screen edges={["top", "bottom"]} contentContainerStyle={styles.content}>
      <OnboardingProgressBar step={2} total={3} />

      <View style={styles.mainBlock}>
        <Text variant="display" style={styles.headline}>
          Lascia che Errands ti segua nel mondo reale.
        </Text>

        <Text variant="body" color={colors.textSecondary} style={styles.body}>
          Usa la tua posizione per ricordarti le commissioni quando sei vicino a
          un luogo e trovare le deviazioni più efficienti.
        </Text>

        <View style={styles.illustrationWrap}>
          <RouteIllustration stops={stops} width={220} height={110} />
        </View>
      </View>

      <View style={styles.spacer} />

        <Button
          label="Attiva posizione"
          variant="primary"
          onPress={handleEnableLocation}
        />

      <View style={styles.loginRow}>
          <Text
            variant="body"
            color={colors.primary}
            onPress={() => router.push("/(onboarding)/notifications")}
          >
          Non ora
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingTop: spacing.lg
  },
  headline: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    textAlign:"center"
  },
  body: {
    marginBottom: spacing.xl,
    textAlign:"center"
  },
  illustrationWrap: {
    justifyContent: "center",
    alignContent:"center"
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
