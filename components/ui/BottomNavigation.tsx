import { View, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, spacing, icons, type IconComponent } from "@constants/theme";
import { Text } from "./Text";
import { Fab } from "./Fab";

export interface NavItem {
  key: string;
  label: string;
  icon: IconComponent;
}

export const bottomNavItems: NavItem[] = [
  { key: "home", label: "Home", icon: icons.errandCategory.home },
  { key: "map", label: "Mappa", icon: icons.ui.map },
  { key: "errands", label: "Commissioni", icon: icons.ui.errandsList },
  { key: "profile", label: "Profilo", icon: icons.ui.user }
];

interface BottomNavigationProps {
  activeKey: string;
  onNavigate?: (key: string) => void;
  onFabPress?: () => void;
}

/**
 * Bottom nav a 4 voci con FAB centrale sovrapposto, come nei mockup.
 * "Sto uscendo" NON è una voce di questa nav (è un'azione contestuale
 * raggiungibile da altre schermate, come da spec).
 *
 * Componente puramente presentazionale: la navigazione reale (Expo Router
 * tabs) verrà cablata in Fase 4 usando questo come custom tabBar.
 */
export function BottomNavigation({ activeKey, onNavigate, onFabPress }: BottomNavigationProps) {
  const insets = useSafeAreaInsets();
  const leftItems = bottomNavItems.slice(0, 2);
  const rightItems = bottomNavItems.slice(2);

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom || spacing.sm }]}>
      <View style={styles.bar}>
        <View style={styles.side}>
          {leftItems.map((item) => (
            <NavButton
              key={item.key}
              item={item}
              active={item.key === activeKey}
              onPress={() => onNavigate?.(item.key)}
            />
          ))}
        </View>
        <View style={styles.fabSlot} />
        <View style={styles.side}>
          {rightItems.map((item) => (
            <NavButton
              key={item.key}
              item={item}
              active={item.key === activeKey}
              onPress={() => onNavigate?.(item.key)}
            />
          ))}
        </View>
      </View>
      <View style={styles.fabOverlay} pointerEvents="box-none">
        <Fab onPress={onFabPress} />
      </View>
    </View>
  );
}

function NavButton({
  item,
  active,
  onPress
}: {
  item: NavItem;
  active: boolean;
  onPress: () => void;
}) {
  const Icon = item.icon;
  const color = active ? colors.primary : colors.textMuted;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={item.label}
      style={styles.navButton}
      hitSlop={4}
    >
      <Icon size={22} color={color} />
      <Text variant="caption" color={color} style={styles.navLabel}>
        {item.label}
      </Text>
    </Pressable>
  );
}

const BAR_HEIGHT = 56;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  bar: {
    height: BAR_HEIGHT,
    flexDirection: "row",
    alignItems: "center"
  },
  side: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  fabSlot: {
    width: 64
  },
  fabOverlay: {
    position: "absolute",
    top: -20,
    left: 0,
    right: 0,
    alignItems: "center"
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 44,
    minHeight: 44
  },
  navLabel: {
    marginTop: 2
  }
});
