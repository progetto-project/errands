/**
 * Typography system.
 *
 * DECISIONE PRESA (da riconfermare — vedi nota a fine Fase 3):
 * Il mockup usa un serif elegante da display (simile a Tiempos/GT Sectra,
 * font a pagamento non identificabile con certezza da uno screenshot) per
 * headline e titoli, e un sans-serif neutro per body/label/bottoni.
 *
 * In assenza del font originale ho scelto la coppia gratuita più vicina
 * disponibile per Expo via Google Fonts:
 *   - Lora (serif, per display/heading)
 *   - Inter (sans, per body/label/button)
 *
 * Se possiedi il font originale (licenza inclusa), sostituiscilo caricandolo
 * con expo-font e aggiornando SOLO `fontFamily` qui sotto: nessun componente
 * dovrà cambiare.
 */

export const fontFamily = {
  serifRegular: "Lora_400Regular",
  serifMedium: "Lora_500Medium",
  serifSemiBold: "Lora_600SemiBold",
  serifBold: "Lora_700Bold",

  sansRegular: "Inter_400Regular",
  sansMedium: "Inter_500Medium",
  sansSemiBold: "Inter_600SemiBold",
  sansBold: "Inter_700Bold"
} as const;

interface TextStyleToken {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
}

export const typography: Record<string, TextStyleToken> = {
  // Headline onboarding ("Non uscire due volte per la stessa cosa.")
  display: {
    fontFamily: fontFamily.serifSemiBold,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.3
  },
  // Titoli schermata ("Cosa c'è da fare?", "Le tue commissioni",
  // "Dettaglio commissione" nome commissione, "Percorso ottimizzato")
  heading1: {
    fontFamily: fontFamily.serifSemiBold,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.2
  },
  // Titoli secondari ("Suggerimenti", "Profilo", nome utente)
  heading2: {
    fontFamily: fontFamily.serifSemiBold,
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: -0.1
  },
  // Sotto-titoli card ("Potresti fare tutto in un'uscita",
  // "Il percorso migliore")
  heading3: {
    fontFamily: fontFamily.serifMedium,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: 0
  },
  // Sezioni ("Oggi", "Prossimamente", "Note", "Preferenze")
  sectionLabel: {
    fontFamily: fontFamily.sansSemiBold,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0
  },
  // Testo corpo standard
  body: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 15,
    lineHeight: 21,
    letterSpacing: 0
  },
  // Titolo riga (es. "Restituire pacco" nella lista commissioni)
  bodyMedium: {
    fontFamily: fontFamily.sansSemiBold,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0
  },
  // Sottotitolo riga (es. "Poste · entro oggi")
  bodySmall: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0
  },
  // Helper text, timestamp, micro-copy
  caption: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.1
  },
  // Testo dei bottoni
  button: {
    fontFamily: fontFamily.sansSemiBold,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0
  }
};

export type TypographyToken = keyof typeof typography;
