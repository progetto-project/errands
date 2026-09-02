/**
 * Palette ricavata dai mockup allegati (source of truth visiva).
 *
 * - Sfondo generale: crema/off-white caldo, mai bianco puro.
 * - Verde primario: usato per bottoni pieni, FAB, tab attiva, path sulle
 *   mappe, testo dei link ("Accedi", "Vai al luogo").
 * - Oro/giallo: riservato SOLO agli elementi "intelligenti" di Errands
 *   (SmartSuggestionCard, box "Potresti fare tutto in un'uscita",
 *   "Errands ha trovato qualcosa") — mai usato per azioni normali.
 * - Rosso: solo per priorità alta (pallino) — mai come colore di sfondo
 *   esteso, per non creare falsi allarmi.
 */
export const colors = {
  // Superfici
  background: "#F1EFE7",
  surface: "#FFFFFF",
  surfaceMuted: "#F7F6F1",
  border: "#E3E0D4",
  borderStrong: "#C9C5B4",

  // Primario (verde)
  primary: "#1C4B3A",
  primaryPressed: "#153A2C",
  primaryLight: "#E3ECE6",
  onPrimary: "#FFFFFF",

  // Testo
  textPrimary: "#1A1D1A",
  textSecondary: "#5F6660",
  textMuted: "#8B9089",
  textOnPrimary: "#FFFFFF",
  textLink: "#1C4B3A",

  // Smart / intelligenza (oro)
  smart: "#8A6D1E",
  smartBackground: "#FBF2D7",
  smartBorder: "#EBD98F",
  smartIcon: "#B8901F",

  // Stato
  error: "#C74A3B",
  errorBackground: "#FBEAE7",
  success: "#2F7A4F",
  successBackground: "#E7F3EB",

  // Priorità
  priorityHigh: "#D64545",
  priorityNormal: "#8B9089",
  priorityLow: "#B7BBB2",

  // Chip / selettori non attivi
  chipBackground: "#FFFFFF",
  chipBorder: "#DEDAC9",
  chipTextInactive: "#5F6660",

  // Overlay / disabled
  disabledBackground: "#E9E7DE",
  disabledText: "#A8ABA2",

  // Trasparente utility
  transparent: "transparent"
} as const;

export type ColorToken = keyof typeof colors;
