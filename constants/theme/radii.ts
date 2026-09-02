/**
 * Radius osservati nei mockup:
 * - card: angoli morbidi ma non estremi (~14-16px) — es. card "Oggi",
 *   "Dettaglio commissione", card suggerimento gold.
 * - bottoni pieni: completamente pill (bordo totalmente arrotondato).
 * - input/chip: pill anch'essi (Quando/Priorità, search bar).
 * - badge piccoli ("Apri in Maps"): pill.
 * - modale/bottom sheet inferiore ("4 commissioni entro 2 km"): angoli
 *   superiori più larghi (~24px), tipico bottom sheet.
 */
export const radii = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 24,
  pill: 999
} as const;

export type RadiusToken = keyof typeof radii;
