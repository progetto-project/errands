import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import * as Notifications from "expo-notifications";
import { colors, spacing, radii, icons } from "@constants/theme";
import { Text } from "@components/ui/Text";
import { Button } from "@components/ui/Button";
import { Card } from "@components/ui/Card";
import { Screen } from "@components/ui/Screen";
import { OnboardingProgressBar } from "@features/onboarding/components/OnboardingProgressBar";
import { RouteIllustration, type RouteIllustrationStop } from "@features/onboarding/components/RouteIllustration";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
});
const stops: RouteIllustrationStop[] = [
  { key: "casa", icon: icons.errandCategory.home, label: "Casa", x: 0.08, y: 0.94, labelPosition: "right" },
  {
    key: "farmacia",
    icon: icons.ui.location,
    label: "",
    x: 0.88,
    y: 0.42,
    badgeIcon: icons.ui.lock
  }
];

async function handleEnableNotifications() {
  const { status } = await Notifications.requestPermissionsAsync();

  if (status === "granted") {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Errands",
        body: "Le notifiche sono attive. Ti ricorderemo le tue commissioni.",
        sound: true
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 5
      }
    });
  }

  router.replace("/home");
}

function goToApp() {
  router.replace("/home");
}

export default function OnboardingNotificationsScreen() {
  return (
    <Screen edges={["top", "bottom"]} contentContainerStyle={styles.content}>
      <OnboardingProgressBar step={3} total={3} />
      <View style={styles.mainBlock}>
        <Text variant="display" style={styles.headline}>
          Ricordati le cose al momento giusto.
        </Text>

        <Text variant="body" color={colors.textSecondary} style={styles.body}>
          Errands può avvisarti quando sei vicino a un luogo, quando una
          commissione sta per scadere o quando conviene fare una deviazione.
        </Text>

        <View style={styles.illustrationWrap}>
          <RouteIllustration stops={stops} width={240} height={150} />
          <Card style={styles.tooltip}>
            <Text variant="bodyMedium">Sei vicino alla farmacia</Text>
            <Text variant="bodySmall" color={colors.textSecondary} style={styles.tooltipSubtitle}>
              Ti serve ancora questa commissione?
            </Text>
          </Card>
        </View>
      </View>
      <View style={styles.spacer} />

      <Text variant="caption" color={colors.textMuted} style={styles.footnote}>
        Puoi modificare queste preferenze in qualsiasi momento.
      </Text>
      <Button label="Attiva notifiche" variant="primary" onPress={handleEnableNotifications} />

      <View style={styles.loginRow}>
        <Text
          variant="body"
          color={colors.primary}
          onPress={goToApp}
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
    marginBottom: spacing.lg,
    textAlign:"center"
  },
  illustrationWrap: {
    alignItems: "flex-start"
  },
  tooltip: {
    position: "absolute",
    top: 4,
    left: 4,
    width: 190,
    borderRadius: radii.lg
  },
  tooltipSubtitle: {
    marginTop: 2
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
  footnote: {
    textAlign: "center",
    marginBottom: spacing.sm
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.md
  }
});
