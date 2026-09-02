/**
 * Scala di spacing derivata dai mockup (padding card ~16-20px, gap sezioni
 * ~24-32px, gap interno elementi ~8-12px). 4px come unità base.
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
} as const;

export type SpacingToken = keyof typeof spacing;
