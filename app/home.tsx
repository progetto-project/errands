import { View, ScrollView, StyleSheet } from "react-native";
import { router } from "expo-router";
import { colors, spacing, radii, icons } from "@constants/theme";
import { Text } from "@components/ui/Text";
import { Screen } from "@components/ui/Screen";
import { SectionHeader } from "@components/ui/SectionHeader";
import { BottomNavigation } from "@components/ui/BottomNavigation";
import { ErrandCard } from "@features/errands/components/ErrandCard";
import { UpcomingErrandTile } from "@features/errands/components/UpcomingErrandTile";
import { SmartSuggestionCard } from "@features/suggestions/components/SmartSuggestionCard";
import { RouteChainPreview } from "@features/routes/components/RouteChainPreview";
import type { Errand } from "../types/errand";

/**
 * Home — schermata più importante dell'app ("Cosa c'è da fare?").
 *
 * NOTA IMPORTANTE: questa implementazione usa dati statici (mock*
 * qui sotto) perché le Fasi 4-8 (Navigation, Onboarding, Auth, Supabase,
 * CRUD commissioni) non sono ancora state costruite. Quando arriveremo a
 * quelle fasi, questa schermata andrà ricollegata a:
 * - lo stato di autenticazione reale per il nome utente
 * - una query Supabase (via TanStack Query) al posto di mockTodayErrands /
 *   mockUpcomingErrands
 * - la vera logica di generazione suggerimenti al posto del suggerimento
 *   hardcoded
 * La UI e la struttura dei componenti, invece, sono già quelle definitive.
 */

type MockErrand = Pick<Errand, "id" | "title" | "priority" | "status"> & {
  placeName: string;
  dueLabel: string;
  icon: keyof typeof icons.errandCategory;
};

const mockTodayErrands: MockErrand[] = [
  {
    id: "1",
    title: "Restituire pacco",
    placeName: "Poste",
    dueLabel: "entro oggi",
    priority: "high",
    status: "pending",
    icon: "package"
  },
  {
    id: "2",
    title: "Farmacia",
    placeName: "Farmacia Rossi",
    dueLabel: "entro oggi",
    priority: "normal",
    status: "pending",
    icon: "pharmacy"
  },
  {
    id: "3",
    title: "Comprare detersivo",
    placeName: "Supermercato",
    dueLabel: "nessuna scadenza",
    priority: "low",
    status: "pending",
    icon: "groceries"
  }
];

const mockUpcomingErrands: (Pick<MockErrand, "id" | "title" | "icon"> & { dateLabel: string })[] = [
  { id: "4", title: "Portare scarpe dal calzolaio", dateLabel: "Domani", icon: "shoes" },
  { id: "5", title: "Ritirare pacco", dateLabel: "Venerdì", icon: "package" }
];

const routeStops = [
  { key: "casa", label: "Casa", icon: icons.errandCategory.home },
  { key: "poste", label: "Poste", icon: icons.errandCategory.mail },
  { key: "farmacia", label: "Farmacia", icon: icons.errandCategory.pharmacy },
  { key: "supermercato", label: "Supermercato", icon: icons.errandCategory.groceries }
];

export default function HomeScreen() {
  // TODO(Fase 6 - Auth): sostituire con il nome reale dell'utente autenticato.
  const userFirstName = "Marco";
  const UserIcon = icons.ui.user;

  return (
    <View style={styles.wrapper}>
      <Screen edges={["top"]} contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.headerText}>
            <Text variant="body" color={colors.textSecondary}>
              Buongiorno, {userFirstName}
            </Text>
            <Text variant="heading1">Cosa c'è da fare?</Text>
          </View>
          <View style={styles.avatar}>
            <UserIcon size={20} color={colors.textSecondary} />
          </View>
        </View>

        <SmartSuggestionCard
          type="route_opportunity"
          title="Potresti fare tutto in un'uscita"
          description="Hai 4 commissioni nella stessa zona."
          primaryActionLabel="Organizza uscita"
          onPrimaryAction={() => {
            // TODO(Fase 13 - Google Routes): collegare al flusso "Sto uscendo".
          }}
        >
          <RouteChainPreview stops={routeStops} />
          <View style={styles.statLine}>
            <Text variant="bodyMedium" color={colors.textPrimary}>
              +18 min{" "}
            </Text>
            <Text variant="bodySmall" color={colors.textSecondary}>
              rispetto al percorso normale
            </Text>
          </View>
        </SmartSuggestionCard>

        <View style={styles.section}>
          <SectionHeader title="Oggi" actionLabel="Vedi tutto" onActionPress={() => {}} />
          <View style={styles.list}>
            {mockTodayErrands.map((errand) => (
              <ErrandCard
                key={errand.id}
                title={errand.title}
                placeName={errand.placeName}
                dueLabel={errand.dueLabel}
                priority={errand.priority}
                status={errand.status}
                icon={icons.errandCategory[errand.icon]}
                onPress={() => router.push(`/errand/${errand.id}`)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Prossimamente" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.upcomingRow}
          >
            {mockUpcomingErrands.map((errand) => (
              <UpcomingErrandTile
                key={errand.id}
                title={errand.title}
                dateLabel={errand.dateLabel}
                icon={icons.errandCategory[errand.icon]}
                onPress={() => router.push(`/errand/${errand.id}`)}
              />
            ))}
          </ScrollView>
        </View>
      </Screen>

      <BottomNavigation
        activeKey="home"
        onNavigate={(key) => {
          // TODO(Fase 4 - Navigation): collegare alla vera tab navigation.
          if (key !== "home") {
            // placeholder, nessuna route reale per le altre tab in questa fase
          }
        }}
        onFabPress={() => router.push("/errand/new")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    paddingTop: spacing.sm
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.lg
  },
  headerText: {
    flex: 1,
    paddingRight: spacing.md
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center"
  },
  section: {
    marginTop: spacing.xl
  },
  list: {
    gap: 2
  },
  upcomingRow: {
    gap: spacing.sm,
    paddingRight: spacing.md
  },
  statLine: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: spacing.sm
  }
});
