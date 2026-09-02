import { useState, type ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { colors, spacing, radii, icons } from "@constants/theme";
import { Text } from "@components/ui/Text";
import { Button, IconButton } from "@components/ui/Button";
import { Card } from "@components/ui/Card";
import { Badge, PriorityBadge } from "@components/ui/Badge";
import {
  TextField,
  SearchInput,
  LocationInput,
  DateSelector,
  PrioritySelector,
  type DateOptionKey
} from "@components/ui/Input";
import { BottomNavigation } from "@components/ui/BottomNavigation";
import { AppIcon } from "@components/ui/AppIcon";
import { Divider } from "@components/ui/Divider";
import { SectionHeader } from "@components/ui/SectionHeader";
import { ScreenHeader } from "@components/ui/ScreenHeader";
import { EmptyState } from "@components/ui/EmptyState";
import { Screen } from "@components/ui/Screen";
import { ErrandCard } from "@features/errands/components/ErrandCard";
import { SmartSuggestionCard } from "@features/suggestions/components/SmartSuggestionCard";

/**
 * Schermata di sviluppo interna — NON fa parte del prodotto finale.
 * Serve solo a confrontare visivamente i componenti implementati con i
 * mockup allegati, sezione per sezione. Dati statici ovunque.
 */
export default function DesignSystemPreview() {
  const [dateValue, setDateValue] = useState<DateOptionKey>("today");
  const [priorityValue, setPriorityValue] = useState<"low" | "normal" | "high">("normal");
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.safe}>
      <Screen edges={["top"]} contentContainerStyle={styles.content}>
        <Text variant="display">Design System</Text>
        <Text variant="body" color={colors.textSecondary} style={styles.intro}>
          Schermata interna di sviluppo. Confronta ogni sezione con i mockup
          allegati.
        </Text>

        <Section title="Colori">
          <View style={styles.swatchRow}>
            {(
              [
                ["background", colors.background],
                ["surface", colors.surface],
                ["primary", colors.primary],
                ["primaryPressed", colors.primaryPressed],
                ["smart", colors.smart],
                ["smartBackground", colors.smartBackground],
                ["error", colors.error],
                ["textPrimary", colors.textPrimary],
                ["textSecondary", colors.textSecondary]
              ] as const
            ).map(([name, value]) => (
              <View key={name} style={styles.swatch}>
                <View style={[styles.swatchColor, { backgroundColor: value, borderColor: colors.border }]} />
                <Text variant="caption">{name}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Tipografia">
          <Text variant="display">Display / Non uscire due volte</Text>
          <Text variant="heading1">Heading 1 / Cosa c'è da fare?</Text>
          <Text variant="heading2">Heading 2 / Profilo</Text>
          <Text variant="heading3">Heading 3 / Il percorso migliore</Text>
          <Text variant="sectionLabel">SECTION LABEL / Oggi</Text>
          <Text variant="body">Body / testo standard di Errands.</Text>
          <Text variant="bodyMedium">Body medium / Restituire pacco</Text>
          <Text variant="bodySmall" color={colors.textSecondary}>
            Body small / Poste · entro oggi
          </Text>
          <Text variant="caption" color={colors.textMuted}>
            Caption / helper text
          </Text>
        </Section>

        <Section title="Bottoni">
          <Button label="Inizia" variant="primary" style={styles.stackGap} />
          <Button label="Attiva posizione" variant="primary" style={styles.stackGap} />
          <Button label="Secondario" variant="secondary" style={styles.stackGap} />
          <Button label="Non ora" variant="text" style={styles.stackGap} />
          <Button label="Caricamento" variant="primary" loading={loading} style={styles.stackGap} />
          <Button label="Disabilitato" variant="primary" disabled style={styles.stackGap} />
          <Button
            label="Sto uscendo"
            variant="primary"
            icon={icons.ui.navigate}
            style={styles.stackGap}
          />
          <View style={[styles.row, styles.stackGap]}>
            <IconButton icon={icons.ui.back} accessibilityLabel="Indietro" />
            <IconButton
              icon={icons.ui.user}
              accessibilityLabel="Profilo"
              backgroundColor={colors.surfaceMuted}
            />
          </View>
        </Section>

        <Section title="Chip (Quando / Priorità)">
          <Text variant="sectionLabel" style={styles.label}>
            Quando?
          </Text>
          <DateSelector value={dateValue} onChange={setDateValue} />
          <Text variant="sectionLabel" style={[styles.label, styles.stackGap]}>
            Priorità
          </Text>
          <PrioritySelector value={priorityValue} onChange={setPriorityValue} />
        </Section>

        <Section title="Badge">
          <View style={[styles.row, styles.stackGap]}>
            <Badge label="Apri in Maps" />
          </View>
          <View style={styles.stackGap}>
            <PriorityBadge priority="high" />
          </View>
          <View style={styles.stackGap}>
            <PriorityBadge priority="normal" />
          </View>
        </Section>

        <Section title="Input">
          <TextField
            placeholder="Restituire il pacco Amazon"
            helperText="Scrivilo come lo diresti a qualcuno."
            style={styles.stackGap}
          />
          <SearchInput placeholder="Cerca un luogo o una commissione" style={styles.stackGap} />
          <LocationInput
            placeName="Poste Italiane"
            address="Via Roma 24"
            style={styles.stackGap}
          />
          <LocationInput placeholder="Aggiungi un luogo" style={styles.stackGap} />
        </Section>

        <Section title="Card generiche">
          <Card style={styles.stackGap}>
            <Text variant="heading3">Card di default</Text>
            <Text variant="bodySmall" color={colors.textSecondary}>
              Bordo sottile, radius medio, ombra quasi assente.
            </Text>
          </Card>
        </Section>

        <Section title="SmartSuggestionCard">
          <SmartSuggestionCard
            type="route_opportunity"
            title="Potresti fare tutto in un'uscita"
            description="Hai 4 commissioni nella stessa zona. +18 min rispetto al percorso normale."
            primaryActionLabel="Organizza uscita"
          />
          <View style={styles.stackGap}>
            <SmartSuggestionCard
              type="closing_soon"
              title="Il calzolaio chiude tra 40 minuti"
              description="Puoi completare questa commissione prima di tornare a casa."
              primaryActionLabel="Aggiungi al percorso"
            />
          </View>
          <View style={styles.stackGap}>
            <SmartSuggestionCard
              type="nearby"
              title="Sei vicino alla farmacia"
              description="Hai una commissione qui. 200 m di distanza."
              primaryActionLabel="Vai"
              secondaryActionLabel="Non ora"
            />
          </View>
        </Section>

        <Section title="ErrandCard">
          <ErrandCard
            title="Restituire pacco"
            placeName="Poste"
            dueLabel="entro oggi"
            priority="high"
            status="pending"
            icon={icons.errandCategory.package}
            variant="urgent"
          />
          <ErrandCard
            title="Farmacia"
            placeName="Farmacia Rossi"
            dueLabel="entro oggi"
            priority="normal"
            status="pending"
            icon={icons.errandCategory.pharmacy}
          />
          <ErrandCard
            title="Comprare detersivo"
            placeName="Supermercato"
            dueLabel="nessuna scadenza"
            priority="low"
            status="pending"
            icon={icons.errandCategory.groceries}
          />
          <ErrandCard
            title="Portare scarpe dal calzolaio"
            placeName="Calzolaio"
            dueLabel="domani"
            priority="normal"
            status="completed"
            icon={icons.errandCategory.shoes}
            variant="completed"
          />
          <ErrandCard
            title="Ritirare pacco"
            placeName="Poste"
            dueLabel="venerdì"
            priority="high"
            status="pending"
            icon={icons.errandCategory.package}
            variant="overdue"
          />
        </Section>

        <Section title="Icone">
          <View style={styles.row}>
            {(
              [
                ["package", icons.errandCategory.package],
                ["pharmacy", icons.errandCategory.pharmacy],
                ["groceries", icons.errandCategory.groceries],
                ["shoes", icons.errandCategory.shoes],
                ["home", icons.errandCategory.home],
                ["mail", icons.errandCategory.mail],
                ["location", icons.ui.location],
                ["map", icons.ui.map],
                ["clock", icons.ui.clock],
                ["navigate", icons.ui.navigate],
                ["suggestion", icons.ui.suggestion],
                ["bell", icons.ui.bell]
              ] as const
            ).map(([name, Icon]) => (
              <View key={name} style={styles.iconSwatch}>
                <AppIcon icon={Icon} size="lg" color={colors.textPrimary} />
                <Text variant="caption" color={colors.textMuted}>
                  {name}
                </Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Spacing">
          <View style={styles.row}>
            {(["xs", "sm", "md", "lg", "xl", "xxl"] as const).map((key) => (
              <View key={key} style={styles.spacingItem}>
                <View style={[styles.spacingBar, { width: spacing[key] }]} />
                <Text variant="caption" color={colors.textMuted}>
                  {key} · {spacing[key]}
                </Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Radius & Shadow">
          <View style={styles.row}>
            {(["sm", "md", "lg", "xl", "pill"] as const).map((key) => (
              <View
                key={key}
                style={[
                  styles.radiusBox,
                  { borderRadius: radii[key] }
                ]}
              >
                <Text variant="caption">{key}</Text>
              </View>
            ))}
          </View>
          <Card style={styles.stackGap}>
            <Text variant="bodySmall" color={colors.textSecondary}>
              shadows.card — quasi impercettibile, il bordo fa il lavoro principale
            </Text>
          </Card>
        </Section>

        <Section title="ScreenHeader">
          <Card padded={false} style={styles.headerPreviewCard}>
            <View style={styles.headerPreviewInner}>
              <ScreenHeader
                title="Dettaglio commissione"
                subtitle="Restituire pacco"
                showBack
              />
            </View>
          </Card>
        </Section>

        <Section title="SectionHeader">
          <Card style={styles.stackGap}>
            <SectionHeader title="Oggi" actionLabel="Vedi tutto" />
            <Text variant="bodySmall" color={colors.textSecondary}>
              (contenuto lista qui sotto)
            </Text>
          </Card>
        </Section>

        <Section title="Divider">
          <Text variant="bodySmall">Riga 1</Text>
          <Divider style={styles.stackGap} />
          <Text variant="bodySmall">Riga 2</Text>
        </Section>

        <Section title="EmptyState">
          <Card padded={false}>
            <View style={styles.emptyStateWrap}>
              <EmptyState
                icon={icons.ui.terms}
                title="Nessuna commissione"
                description="Le commissioni che aggiungi appariranno qui."
                actionLabel="Nuova commissione"
              />
            </View>
          </Card>
        </Section>
      </Screen>

      <BottomNavigation
        activeKey="home"
        onNavigate={() => {}}
        onFabPress={() => setLoading((v) => !v)}
      />
    </View>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text variant="sectionLabel" color={colors.textMuted} style={styles.sectionTitle}>
        {title.toUpperCase()}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl
  },
  intro: {
    marginTop: spacing.xs,
    marginBottom: spacing.lg
  },
  section: {
    marginBottom: spacing.xl,
    gap: spacing.sm
  },
  sectionTitle: {
    marginBottom: spacing.xs
  },
  swatchRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md
  },
  swatch: {
    alignItems: "center",
    width: 72
  },
  swatchColor: {
    width: 48,
    height: 48,
    borderRadius: radii.sm,
    borderWidth: 1,
    marginBottom: spacing.xs
  },
  row: {
    flexDirection: "row",
    gap: spacing.sm,
    flexWrap: "wrap"
  },
  stackGap: {
    marginTop: spacing.sm
  },
  label: {
    marginBottom: spacing.xs
  },
  radiusBox: {
    width: 64,
    height: 64,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center"
  },
  iconSwatch: {
    width: 72,
    alignItems: "center",
    gap: 4
  },
  spacingItem: {
    alignItems: "flex-start",
    gap: 4
  },
  spacingBar: {
    height: 8,
    backgroundColor: colors.primary,
    borderRadius: 2
  },
  headerPreviewCard: {
    overflow: "hidden"
  },
  headerPreviewInner: {
    padding: spacing.md,
    backgroundColor: colors.surface
  },
  emptyStateWrap: {
    padding: spacing.sm
  }
});
