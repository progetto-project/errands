import { colors, sizes, type IconComponent } from "@constants/theme";

type IconSize = keyof typeof sizes.icon | number;

interface AppIconProps {
  icon: IconComponent;
  size?: IconSize;
  color?: string;
  strokeWidth?: number;
}

/**
 * Punto unico da cui passano tutte le icone dell'app. Garantisce che le
 * dimensioni usate siano sempre una delle 3 previste dal design system
 * (sm/md/lg) invece di numeri liberi sparsi nei componenti, e centralizza
 * il colore di default.
 *
 * Uso: <AppIcon icon={icons.errandCategory.package} size="md" />
 */
export function AppIcon({ icon: Icon, size = "md", color = colors.textPrimary, strokeWidth = 2 }: AppIconProps) {
  const resolvedSize = typeof size === "number" ? size : sizes.icon[size];
  return <Icon size={resolvedSize} color={color} strokeWidth={strokeWidth} />;
}
