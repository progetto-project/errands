import { Platform } from "react-native";

/**
 * I mockup usano ombre quasi impercettibili — le card si distinguono
 * soprattutto tramite bordo sottile (colors.border), non tramite shadow.
 * L'ombra è riservata a elementi realmente "sollevati": FAB e modali/bottom
 * sheet.
 */
interface ShadowToken {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

const create = (opacity: number, radius: number, offsetY: number, elevation: number): ShadowToken => ({
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: offsetY },
  shadowOpacity: Platform.OS === "ios" ? opacity : 0,
  shadowRadius: radius,
  elevation
});

export const shadows = {
  none: create(0, 0, 0, 0),
  // Card standard: quasi nulla, il bordo fa il lavoro principale
  card: create(0.04, 6, 1, 1),
  // FAB e elementi flottanti sopra la bottom nav
  floating: create(0.15, 12, 4, 6),
  // Bottom sheet / modali ("4 commissioni entro 2 km")
  modal: create(0.12, 20, -2, 8)
} as const;

export type ShadowToken2 = keyof typeof shadows;
