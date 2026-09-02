import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { colors, radii } from "@constants/theme";
import { Text } from "@components/ui/Text";
import { smoothPath } from "@utils/svgPath";
import type { IconComponent } from "@constants/theme";

export interface RouteIllustrationStop {
  key: string;
  icon: IconComponent;
  /** Etichetta testuale. Stringa vuota = nessuna etichetta mostrata. */
  label: string;
  /** Posizione orizzontale/verticale come frazione 0-1 del contenitore. */
  x: number;
  y: number;
  /** Lato in cui mostrare l'etichetta rispetto al marker. Default "right". */
  labelPosition?: "top" | "bottom" | "left" | "right";
  /** Icona piccola sovrapposta all'angolo del marker (es. lucchetto in "Sei vicino alla farmacia"). */
  badgeIcon?: IconComponent;
}

interface RouteIllustrationProps {
  stops: RouteIllustrationStop[];
  width?: number;
  height?: number;
}

const MARKER_SIZE = 26;

/**
 * Illustrazione "disegnata a mano" osservata nell'onboarding: una linea
 * curva continua che collega una sequenza di tappe (casa, poste, farmacia,
 * supermercato...), ciascuna rappresentata da un piccolo marker con icona
 * e etichetta testuale.
 *
 * NOTA DI FEDELTÀ: la curva esatta del mockup è disegnata a mano libera,
 * quindi qui è approssimata con una spline che passa per gli stessi punti
 * (nello stesso ordine) — la forma è molto vicina ma non un tracciato
 * pixel-per-pixel. Le coordinate di ogni tappa sono riutilizzabili per
 * comporre percorsi diversi in altre schermate (es. Home, Percorso
 * ottimizzato) senza duplicare la logica di disegno.
 */
export function RouteIllustration({ stops, width = 260, height = 130 }: RouteIllustrationProps) {
  const points = stops.map((stop) => ({ x: stop.x * width, y: stop.y * height }));
  const d = smoothPath(points);

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
        <Path d={d} stroke={colors.primary} strokeWidth={1.5} fill="none" strokeLinecap="round" />
      </Svg>
      {stops.map((stop) => (
        <Marker key={stop.key} stop={stop} width={width} height={height} />
      ))}
    </View>
  );
}

function Marker({
  stop,
  width,
  height
}: {
  stop: RouteIllustrationStop;
  width: number;
  height: number;
}) {
  const position = stop.labelPosition ?? "right";
  const isRow = position === "left" || position === "right";

  return (
    <View
      style={[
        styles.markerWrap,
        {
          left: stop.x * width - MARKER_SIZE / 2,
          top: stop.y * height - MARKER_SIZE / 2
        },
        isRow && styles.markerWrapRow,
        position === "left" && styles.reverseRow
      ]}
    >
      <View style={styles.markerCircle}>
        <stop.icon size={13} color={colors.primary} />
        {stop.badgeIcon ? (
          <View style={styles.badge}>
            <stop.badgeIcon size={8} color={colors.textOnPrimary} />
          </View>
        ) : null}
      </View>
      {stop.label ? (
        <Text
          variant="caption"
          color={colors.textSecondary}
          style={[
            isRow ? styles.labelInline : styles.labelStacked,
            position === "top" && styles.labelAbove
          ]}
          numberOfLines={1}
        >
          {stop.label}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  markerWrap: {
    position: "absolute",
    alignItems: "center"
  },
  markerWrapRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  reverseRow: {
    flexDirection: "row-reverse"
  },
  markerCircle: {
    width: MARKER_SIZE,
    height: MARKER_SIZE,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center"
  },
  badge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
    borderWidth: 1.5,
    borderColor: colors.surface,
    alignItems: "center",
    justifyContent: "center"
  },
  labelInline: {
    marginHorizontal: 4
  },
  labelStacked: {
    marginTop: 2
  },
  labelAbove: {
    marginTop: 0,
    marginBottom: 2
  }
});
