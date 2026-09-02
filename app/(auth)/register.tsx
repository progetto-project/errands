import { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Link, router } from "expo-router";

import { colors, spacing, radii } from "@constants/theme";
import { Text } from "@components/ui/Text";
import { Button } from "@components/ui/Button";
import { TextField } from "@components/ui/Input";
import { Screen } from "@components/ui/Screen";
import { ScreenHeader } from "@components/ui/ScreenHeader";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_.-]+$/;
const MIN_PASSWORD_LENGTH = 6;

type Gender = "male" | "female" | "other";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [gender, setGender] = useState<Gender | undefined>();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [nameError, setNameError] = useState<string | undefined>();
  const [surnameError, setSurnameError] = useState<string | undefined>();
  const [birthDateError, setBirthDateError] = useState<string | undefined>();
  const [birthPlaceError, setBirthPlaceError] = useState<string | undefined>();
  const [genderError, setGenderError] = useState<string | undefined>();
  const [usernameError, setUsernameError] = useState<string | undefined>();
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | undefined
  >();

  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    let isValid = true;

    if (!name.trim()) {
      setNameError("Inserisci il tuo nome.");
      isValid = false;
    } else {
      setNameError(undefined);
    }

    if (!surname.trim()) {
      setSurnameError("Inserisci il tuo cognome.");
      isValid = false;
    } else {
      setSurnameError(undefined);
    }

    if (!birthDate.trim()) {
      setBirthDateError("Inserisci la tua data di nascita.");
      isValid = false;
    } else {
      setBirthDateError(undefined);
    }

    if (!birthPlace.trim()) {
      setBirthPlaceError("Inserisci il tuo luogo di nascita.");
      isValid = false;
    } else {
      setBirthPlaceError(undefined);
    }

    if (!gender) {
      setGenderError("Seleziona un'opzione.");
      isValid = false;
    } else {
      setGenderError(undefined);
    }

    if (!username.trim()) {
      setUsernameError("Inserisci un nome utente.");
      isValid = false;
    } else if (!USERNAME_REGEX.test(username.trim())) {
      setUsernameError(
        "Usa solo lettere, numeri, punto, trattino o underscore."
      );
      isValid = false;
    } else {
      setUsernameError(undefined);
    }

    if (!email.trim()) {
      setEmailError("Inserisci la tua email.");
      isValid = false;
    } else if (!EMAIL_REGEX.test(email.trim())) {
      setEmailError("Inserisci un'email valida.");
      isValid = false;
    } else {
      setEmailError(undefined);
    }

    if (!password) {
      setPasswordError("Inserisci una password.");
      isValid = false;
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      setPasswordError(
        `La password deve avere almeno ${MIN_PASSWORD_LENGTH} caratteri.`
      );
      isValid = false;
    } else {
      setPasswordError(undefined);
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Conferma la tua password.");
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Le password non coincidono.");
      isValid = false;
    } else {
      setConfirmPasswordError(undefined);
    }

    return isValid;
  }

  async function handleRegister() {
    if (!validate()) return;

    setLoading(true);

    try {
      // TODO(Fase Auth):
      //
      // Collegare Supabase Auth.
      //
      // const { data, error } = await supabase.auth.signUp({
      //   email: email.trim(),
      //   password,
      //   options: {
      //     data: {
      //       name: name.trim(),
      //       surname: surname.trim(),
      //       birth_date: birthDate,
      //       birth_place: birthPlace.trim(),
      //       gender,
      //       username: username.trim()
      //     }
      //   }
      // });
      //
      // if (error) {
      //   setEmailError(error.message);
      //   return;
      // }

      await new Promise((resolve) => setTimeout(resolve, 900));

      router.replace("/(onboarding)/location");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen
      edges={["top", "bottom"]}
      avoidKeyboard
      contentContainerStyle={styles.content}
    >
      <ScreenHeader
        title="Crea il tuo account"
        subtitle="Inserisci i tuoi dati per iniziare a usare Errands."
        onBackPress={() => router.back()}
      />

      <View style={styles.form}>
        <Text variant="bodyMedium" style={styles.label}>
          Nome
        </Text>

        <TextField
          placeholder="Il tuo nome"
          value={name}
          onChangeText={(value) => {
            setName(value);
            if (nameError) setNameError(undefined);
          }}
          error={nameError}
          autoCapitalize="words"
          autoCorrect={false}
          textContentType="givenName"
          returnKeyType="next"
          style={styles.input}
        />

        <Text variant="bodyMedium" style={styles.label}>
          Cognome
        </Text>

        <TextField
          placeholder="Il tuo cognome"
          value={surname}
          onChangeText={(value) => {
            setSurname(value);
            if (surnameError) setSurnameError(undefined);
          }}
          error={surnameError}
          autoCapitalize="words"
          autoCorrect={false}
          textContentType="familyName"
          returnKeyType="next"
          style={styles.input}
        />

        <Text variant="bodyMedium" style={styles.label}>
          Data di nascita
        </Text>

        <TextField
          placeholder="GG/MM/AAAA"
          value={birthDate}
          onChangeText={(value) => {
            setBirthDate(value);
            if (birthDateError) setBirthDateError(undefined);
          }}
          error={birthDateError}
          keyboardType="number-pad"
          returnKeyType="next"
          style={styles.input}
        />

        <Text variant="bodyMedium" style={styles.label}>
          Luogo di nascita
        </Text>

        <TextField
          placeholder="Città di nascita"
          value={birthPlace}
          onChangeText={(value) => {
            setBirthPlace(value);
            if (birthPlaceError) setBirthPlaceError(undefined);
          }}
          error={birthPlaceError}
          autoCapitalize="words"
          returnKeyType="next"
          style={styles.input}
        />

        <Text variant="bodyMedium" style={styles.label}>
          Sesso
        </Text>

        <View style={styles.genderRow}>
          <GenderOption
            label="Uomo"
            selected={gender === "male"}
            onPress={() => {
              setGender("male");
              setGenderError(undefined);
            }}
          />

          <GenderOption
            label="Donna"
            selected={gender === "female"}
            onPress={() => {
              setGender("female");
              setGenderError(undefined);
            }}
          />

          <GenderOption
            label="Altro"
            selected={gender === "other"}
            onPress={() => {
              setGender("other");
              setGenderError(undefined);
            }}
          />
        </View>

        {genderError ? (
          <Text
            variant="caption"
            color={colors.error}
            style={styles.genderError}
          >
            {genderError}
          </Text>
        ) : null}

        <Text variant="bodyMedium" style={styles.labelLarge}>
          Nome utente
        </Text>

        <TextField
          placeholder="es. mario.rossi"
          value={username}
          onChangeText={(value) => {
            setUsername(value);
            if (usernameError) setUsernameError(undefined);
          }}
          error={usernameError}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="username"
          textContentType="username"
          returnKeyType="next"
          style={styles.input}
        />

        <Text variant="caption" color={colors.textMuted} style={styles.helper}>
          Può contenere lettere, numeri, punto, trattino e underscore.
        </Text>

        <Text variant="bodyMedium" style={styles.labelLarge}>
          Email
        </Text>

        <TextField
          placeholder="tuo@email.com"
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            if (emailError) setEmailError(undefined);
          }}
          error={emailError}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
          style={styles.input}
        />

        <Text variant="bodyMedium" style={styles.labelLarge}>
          Password
        </Text>

        <View style={styles.passwordWrapper}>
          <TextField
            placeholder="Crea una password"
            value={password}
            onChangeText={(value) => {
              setPassword(value);
              if (passwordError) setPasswordError(undefined);
            }}
            error={passwordError}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="new-password"
            textContentType="newPassword"
            returnKeyType="next"
            style={styles.passwordInput}
          />

          <Pressable
            onPress={() => setShowPassword((current) => !current)}
            style={styles.showPasswordButton}
            accessibilityRole="button"
            accessibilityLabel={
              showPassword ? "Nascondi password" : "Mostra password"
            }
          >
            <Text variant="bodySmall" color={colors.primary}>
              {showPassword ? "Nascondi" : "Mostra"}
            </Text>
          </Pressable>
        </View>

        <Text variant="caption" color={colors.textMuted} style={styles.helper}>
          Almeno {MIN_PASSWORD_LENGTH} caratteri.
        </Text>

        <Text variant="bodyMedium" style={styles.labelLarge}>
          Conferma password
        </Text>

        <View style={styles.passwordWrapper}>
          <TextField
            placeholder="Ripeti la tua password"
            value={confirmPassword}
            onChangeText={(value) => {
              setConfirmPassword(value);
              if (confirmPasswordError) {
                setConfirmPasswordError(undefined);
              }
            }}
            error={confirmPasswordError}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="new-password"
            textContentType="newPassword"
            returnKeyType="done"
            onSubmitEditing={handleRegister}
            style={styles.passwordInput}
          />

          <Pressable
            onPress={() =>
              setShowConfirmPassword((current) => !current)
            }
            style={styles.showPasswordButton}
            accessibilityRole="button"
            accessibilityLabel={
              showConfirmPassword
                ? "Nascondi password"
                : "Mostra password"
            }
          >
            <Text variant="bodySmall" color={colors.primary}>
              {showConfirmPassword ? "Nascondi" : "Mostra"}
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.bottom}>
        <Button
          label="Crea account"
          variant="primary"
          loading={loading}
          onPress={handleRegister}
          style={styles.registerButton}
        />

        <View style={styles.loginRow}>
          <Text variant="body" color={colors.textSecondary}>
            Hai già un account?{" "}
          </Text>

          <Link href="/(auth)/login" asChild>
            <Text variant="body" color={colors.primary}>
              Accedi
            </Text>
          </Link>
        </View>
      </View>
    </Screen>
  );
}

function GenderOption({
  label,
  selected,
  onPress
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      style={({ pressed }) => [
        styles.genderOption,
        selected && styles.genderOptionSelected,
        pressed && styles.genderOptionPressed
      ]}
    >
      <Text
        variant="bodySmall"
        color={selected ? colors.primary : colors.textSecondary}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl
  },

  form: {
    marginTop: spacing.xl
  },

  label: {
    marginBottom: spacing.xs
  },

  labelLarge: {
    marginTop: spacing.lg,
    marginBottom: spacing.xs
  },

  input: {
    marginBottom: spacing.sm
  },

  genderRow: {
    flexDirection: "row",
    gap: spacing.sm
  },

  genderOption: {
    flex: 1,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    backgroundColor: colors.surface
  },

  genderOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceMuted
  },

  genderOptionPressed: {
    opacity: 0.7
  },

  genderError: {
    marginTop: spacing.xs
  },

  helper: {
    marginTop: -spacing.xs
  },

  passwordWrapper: {
    position: "relative"
  },

  passwordInput: {
    paddingRight: 80,
    marginBottom: spacing.sm
  },

  showPasswordButton: {
    position: "absolute",
    right: 0,
    top: 18,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xs
  },

  bottom: {
    marginTop: spacing.xl
  },

  registerButton: {
    marginTop: spacing.lg
  },

  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.lg
  }
});