import { forwardRef } from "react";
import { Text as RNText, TextProps, StyleSheet } from "react-native";
import { colors, typography, TypographyToken } from "@constants/theme";

interface AppTextProps extends TextProps {
  variant?: TypographyToken;
  color?: string;
}

/**
 * Wrapper tipografico unico dell'app. Ogni testo dovrebbe passare da qui
 * (o dai componenti che lo usano internamente) invece di definire
 * fontFamily/fontSize inline, per garantire coerenza col design system.
 */
export const Text = forwardRef<RNText, AppTextProps>(
  ({ variant = "body", color, style, ...props }, ref) => {
    return (
      <RNText
        ref={ref}
        style={[
          styles.base,
          typography[variant],
          { color: color ?? colors.textPrimary },
          style
        ]}
        {...props}
      />
    );
  }
);

Text.displayName = "Text";

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false
  }
});