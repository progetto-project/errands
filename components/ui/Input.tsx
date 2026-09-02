import { useState } from "react";
import {
  TextInput as RNTextInput,
  TextInputProps,
  View,
  StyleSheet,
  Pressable,
  ViewStyle,
  StyleProp
} from "react-native";
import { colors, radii, spacing, typography, icons } from "@constants/theme";
import { Text } from "./Text";
import { Chip } from "./Chip";
import type { ErrandPriority } from "../../types/errand";

interface TextFieldProps extends TextInputProps {
  helperText?: string;
  error?: string;
  disabled?: boolean;
}

/**
 * Text input multi-riga usato in "Nuova commissione" ("Restituire il
 * pacco Amazon" — grande, senza bordo visibile, con helper text sotto).
 */
export function TextField({ helperText, error, disabled, style, ...props }: TextFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View>
      <RNTextInput
        editable={!disabled}
        placeholderTextColor={colors.textMuted}
        style={[
          styles.textField,
          typography.heading3,
          { color: colors.textPrimary },
          focused && styles.textFieldFocused,
          error && styles.textFieldError,
          disabled && styles.disabled,
          style
        ]}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        accessibilityState={{ disabled }}
        {...props}
      />
      {error ? (
        <Text variant="caption" color={colors.error} style={styles.helper}>
          {error}
        </Text>
      ) : helperText ? (
        <Text variant="caption" color={colors.textMuted} style={styles.helper}>
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}

/** Barra di ricerca ("Cerca un luogo o una commissione"). */
export function SearchInput(props: TextInputProps) {
  const SearchIcon = icons.ui.search;
  return (
    <View style={styles.searchWrapper}>
      <SearchIcon size={18} color={colors.textMuted} style={styles.searchIcon} />
      <RNTextInput
        placeholderTextColor={colors.textMuted}
        style={[styles.searchInput, typography.body, { color: colors.textPrimary }]}
        {...props}
      />
    </View>
  );
}

/** Riga "Dove?" con pin + nome luogo + indirizzo, tap per aprire selezione luogo. */
interface LocationInputProps {
  placeName?: string;
  address?: string;
  placeholder?: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function LocationInput({
  placeName,
  address,
  placeholder = "Aggiungi un luogo",
  onPress,
  disabled,
  style
}: LocationInputProps) {
  const PinIcon = icons.ui.location;
  const ChevronIcon = icons.ui.chevronRight;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.locationRow,
        style,
        pressed && !disabled && styles.pressed
      ]}
    >
      <View style={styles.locationIconWrap}>
        <PinIcon size={18} color={colors.primary} />
      </View>
      <View style={styles.locationTextWrap}>
        {placeName ? (
          <>
            <Text variant="bodyMedium">{placeName}</Text>
            {address ? (
              <Text variant="bodySmall" color={colors.textSecondary}>
                {address}
              </Text>
            ) : null}
          </>
        ) : (
          <Text variant="body" color={colors.textMuted}>
            {placeholder}
          </Text>
        )}
      </View>
      <ChevronIcon size={18} color={colors.textMuted} />
    </Pressable>
  );
}

/** Selettore "Quando?" — chip multiple, singola selezione. */
const dateOptions = [
  { key: "today", label: "Oggi" },
  { key: "tomorrow", label: "Domani" },
  { key: "week", label: "Questa settimana" },
  { key: "none", label: "Nessuna scadenza" }
] as const;

export type DateOptionKey = (typeof dateOptions)[number]["key"];

export function DateSelector({
  value,
  onChange
}: {
  value: DateOptionKey;
  onChange: (key: DateOptionKey) => void;
}) {
  return (
    <View style={styles.chipRow}>
      {dateOptions.map((option) => (
        <Chip
          key={option.key}
          label={option.label}
          selected={value === option.key}
          onPress={() => onChange(option.key)}
        />
      ))}
    </View>
  );
}

/** Selettore "Priorità" — chip multiple, singola selezione. */
const priorityOptions: { key: ErrandPriority; label: string }[] = [
  { key: "low", label: "Bassa" },
  { key: "normal", label: "Normale" },
  { key: "high", label: "Alta" }
];

export function PrioritySelector({
  value,
  onChange
}: {
  value: ErrandPriority;
  onChange: (priority: ErrandPriority) => void;
}) {
  return (
    <View style={styles.chipRow}>
      {priorityOptions.map((option) => (
        <Chip
          key={option.key}
          label={option.label}
          selected={value === option.key}
          onPress={() => onChange(option.key)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  textField: {
    minHeight: 56,
    paddingVertical: spacing.sm,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  textFieldFocused: {
    borderBottomColor: colors.primary
  },
  textFieldError: {
    borderBottomColor: colors.error
  },
  helper: {
    marginTop: spacing.xs
  },
  disabled: {
    color: colors.disabledText
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    height: 44
  },
  searchIcon: {
    marginRight: spacing.sm
  },
  searchInput: {
    flex: 1,
    height: "100%"
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.md,
    minHeight: 60
  },
  locationIconWrap: {
    marginRight: spacing.sm
  },
  locationTextWrap: {
    flex: 1
  },
  pressed: {
    opacity: 0.7
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  }
});
