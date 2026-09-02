/**
 * Dimensioni fisse ricorrenti, ricavate dai mockup e dai componenti già
 * implementati (Button, Fab, BottomNavigation, Input). Centralizzate qui
 * per evitare che le stesse misure vengano riscritte in più file.
 */
export const sizes = {
  icon: {
    sm: 16,
    md: 20,
    lg: 24
  },
  button: {
    height: 52,
    heightCompact: 44
  },
  input: {
    height: 44,
    locationRowMinHeight: 60
  },
  fab: {
    size: 56
  },
  bottomNav: {
    barHeight: 56
  },
  header: {
    height: 56
  },
  avatar: {
    sm: 32,
    md: 44
  },
  touchTargetMin: 44
} as const;
