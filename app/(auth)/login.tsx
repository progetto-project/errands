import { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Link, router } from "expo-router";

import { colors, spacing } from "@constants/theme";
import { Text } from "@components/ui/Text";
import { Button } from "@components/ui/Button";
import { TextField } from "@components/ui/Input";
import { Screen } from "@components/ui/Screen";
import { ScreenHeader } from "@components/ui/ScreenHeader";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState<string | undefined>(
    undefined
  );

  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined
  );

  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    let isValid = true;

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setEmailError("Inserisci la tua email.");
      isValid = false;
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      setEmailError("Inserisci un'email valida.");
      isValid = false;
    } else {
      setEmailError(undefined);
    }

    if (!password) {
      setPasswordError("Inserisci la tua password.");
      isValid = false;
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      setPasswordError(
        `La password deve avere almeno ${MIN_PASSWORD_LENGTH} caratteri.`
      );
      isValid = false;
    } else {
      setPasswordError(undefined);
    }

    return isValid;
  }

  async function handleLogin() {
    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      // TODO(Fase 6 - Auth):
      // Collegare Supabase Auth.
      //
      // const { error } = await supabase.auth.signInWithPassword({
      //   email: email.trim(),
      //   password
      // });
      //
      // if (error) {
      //   setPasswordError(error.message);
      //   return;
      // }

      await new Promise((resolve) => setTimeout(resolve, 900));

      router.replace("/home");
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
        title="Accedi"
        subtitle="Accedi al tuo account per continuare a organizzare le tue commissioni."
        onBackPress={() => router.back()}
      />

      <View style={styles.form}>
        <Text variant="bodyMedium" style={styles.label}>
          Email
        </Text>

        <TextField
          placeholder="tuo@email.com"
          value={email}
          onChangeText={(value) => {
            setEmail(value);

            if (emailError) {
              setEmailError(undefined);
            }
          }}
          error={emailError}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
          style={styles.input}
        />

        <Text variant="bodyMedium" style={styles.label}>
          Password
        </Text>

        <View style={styles.passwordWrapper}>
          <TextField
            placeholder="La tua password"
            value={password}
            onChangeText={(value) => {
              setPassword(value);

              if (passwordError) {
                setPasswordError(undefined);
              }
            }}
            error={passwordError}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoComplete="password"
            textContentType="password"
            returnKeyType="done"
            onSubmitEditing={handleLogin}
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

        <Text
          variant="bodySmall"
          color={colors.textMuted}
          style={styles.forgotLink}
        >
          Password dimenticata?
        </Text>
      </View>

      <Button
        label="Accedi"
        variant="primary"
        loading={loading}
        onPress={handleLogin}
        style={styles.loginButton}
      />

      <View style={styles.signupRow}>
        <Text variant="body" color={colors.textSecondary}>
          Non hai un account?{" "}
        </Text>
            <Link href="/(auth)/register" asChild>
              <Text variant="body" color={colors.primary}>
                Registrati
              </Text>
            </Link>
      </View>
      
    </Screen>
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

  input: {
    marginBottom: spacing.md
  },

  passwordWrapper: {
    position: "relative"
  },

  passwordInput: {
    paddingRight: 80,
    marginBottom: spacing.md
  },

  showPasswordButton: {
    position: "absolute",
    right: 0,
    top: 18,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xs
  },

  forgotLink: {
    alignSelf: "flex-end",
    marginTop: spacing.xs
  },

  loginButton: {
    marginTop: spacing.xl
  },

  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.lg
  }
});
