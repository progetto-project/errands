import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { colors, spacing } from "@constants/theme";
import { Text } from "@components/ui/Text";
import { Button } from "@components/ui/Button";
import { Screen } from "@components/ui/Screen";

/**
 * Entry point temporaneo di sviluppo — NON è una schermata del prodotto
 * finale. Sarà sostituita in una fase successiva dalla vera logica di
 * ingresso (recupero sessione: se onboarding già completato + utente
 * autenticato -> Home direttamente; altrimenti -> onboarding).
 *
 * Per ora offre solo due punti di ingresso, come richiesto:
 * - "System Design Preview": la galleria interna dei componenti.
 * - "Utilizza Applicazione": avvia il flusso reale
 *   Welcome -> Posizione -> Notifiche -> Home (login esclusa per ora).
 */
export default function DevLauncherScreen() {
  return (
    <Screen scroll={false} contentContainerStyle={styles.content}>
      <View style={styles.spacerTop} />

      <Text variant="display" style={styles.title}>
        errands
      </Text>
      <Text variant="body" color={colors.textSecondary} style={styles.subtitle}>
        Ambiente di sviluppo
      </Text>

      <View style={styles.spacerMiddle} />

      <Button
        label="Utilizza Applicazione"
        variant="primary"
        onPress={() => router.push("/(onboarding)/welcome")}
      />
      <Button
        label="System Design Preview"
        variant="secondary"
        onPress={() => router.push("/dev/design-system")}
        style={styles.secondButton}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: "center"
  },
  spacerTop: {
    flex: 1
  },
  spacerMiddle: {
    flex: 1
  },
  title: {
    textAlign: "center"
  },
  subtitle: {
    textAlign: "center",
    marginTop: spacing.xs
  },
  secondButton: {
    marginTop: spacing.sm
  }
});
