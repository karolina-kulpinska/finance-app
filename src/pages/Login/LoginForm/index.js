import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../api/firebase";
import { GoogleIcon } from "../../../components/Icons";
import { toRegistration, toRegulamin, toPrivacy } from "../../../routes";
import * as S from "./styled";
import * as R from "./RememberMe.styled";

const PASSWORD_RESET_COOLDOWN_KEY = "passwordResetSentAt";
const COOLDOWN_SECONDS = 180; // 3 minuty

function getRemainingCooldownSeconds() {
  try {
    const sentAt = localStorage.getItem(PASSWORD_RESET_COOLDOWN_KEY);
    if (!sentAt) return 0;
    const elapsed = (Date.now() - Number(sentAt)) / 1000;
    return Math.max(0, Math.ceil(COOLDOWN_SECONDS - elapsed));
  } catch {
    return 0;
  }
}

const LoginForm = ({ onSubmit, onGoogleLogin, isLoading }) => {
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(null);
  const [resetError, setResetError] = useState(null);
  const [resetLoading, setResetLoading] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { remember: true } });

  useEffect(() => {
    if (!showResetPassword) return;
    const update = () => setCooldownSeconds(getRemainingCooldownSeconds());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [showResetPassword]);

  const onForgotSubmit = async (data) => {
    const remaining = getRemainingCooldownSeconds();
    if (remaining > 0) return;
    setResetError(null);
    setResetSuccess(null);
    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, data.email);
      localStorage.setItem(PASSWORD_RESET_COOLDOWN_KEY, String(Date.now()));
      setCooldownSeconds(COOLDOWN_SECONDS);
      setResetSuccess(
        "Link do ustawienia nowego hasła został wysłany na podany adres e-mail. Sprawdź skrzynkę (oraz folder spam). Kolejny link możesz wysłać za 3 minuty."
      );
    } catch (err) {
      if (err.code === "auth/user-not-found" || err.code === "auth/invalid-email") {
        setResetError(
          "Jeśli konto z tym adresem istnieje, otrzymasz wiadomość e-mail z linkiem do resetu hasła."
        );
      } else {
        setResetError(err.message || "Wystąpił błąd. Spróbuj ponownie później.");
      }
    } finally {
      setResetLoading(false);
    }
  };

  if (showResetPassword) {
    return (
      <S.Wrapper>
        <S.Form onSubmit={handleSubmit(onForgotSubmit)}>
          <S.Title>Przypomnij hasło</S.Title>
          <S.Subtitle>
            Podaj adres e-mail powiązany z kontem. Wyślemy link do ustawienia nowego hasła.
          </S.Subtitle>

          <S.InputWrapper>
            <S.Input
              type="email"
              placeholder="Adres e-mail"
              {...register("email", { required: "E-mail jest wymagany" })}
            />
            {errors.email && (
              <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>
            )}
          </S.InputWrapper>

          {resetSuccess && <S.SuccessMessage>{resetSuccess}</S.SuccessMessage>}
          {resetError && <S.ErrorMessage>{resetError}</S.ErrorMessage>}
          {cooldownSeconds > 0 && (
            <S.Subtitle style={{ marginTop: 12, marginBottom: 0 }}>
              Kolejny link możesz wysłać za{" "}
              {cooldownSeconds >= 60
                ? `${Math.floor(cooldownSeconds / 60)} min ${cooldownSeconds % 60} s`
                : `${cooldownSeconds} s`}
            </S.Subtitle>
          )}

          <S.StyledButton type="submit" disabled={resetLoading || cooldownSeconds > 0}>
            {resetLoading ? "Wysyłanie..." : cooldownSeconds > 0 ? "Poczekaj..." : "Wyślij link"}
          </S.StyledButton>

          <S.ForgotPasswordRow style={{ justifyContent: "center", marginTop: 20 }}>
            <S.ForgotPasswordLink
              type="button"
              onClick={() => {
                setShowResetPassword(false);
                setResetSuccess(null);
                setResetError(null);
              }}
            >
              ← Wróć do logowania
            </S.ForgotPasswordLink>
          </S.ForgotPasswordRow>
        </S.Form>
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Title>Witaj ponownie</S.Title>
        <S.Subtitle>Zaloguj się do swojego konta</S.Subtitle>

        <S.InputWrapper>
          <S.Input
            type="email"
            placeholder="Adres e-mail"
            {...register("email", { required: "E-mail jest wymagany" })}
          />
          {errors.email && (
            <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>
          )}
        </S.InputWrapper>

        <S.InputWrapper>
          <S.Input
            type="password"
            placeholder="Hasło"
            {...register("password", {
              required: "Hasło jest wymagane",
              minLength: { value: 6, message: "Hasło musi mieć min. 6 znaków" },
            })}
          />
          {errors.password && (
            <S.ErrorMessage>{errors.password.message}</S.ErrorMessage>
          )}
        </S.InputWrapper>

        <S.ForgotPasswordRow>
          <R.CheckboxWrapper style={{ marginBottom: 0 }}>
            <R.Checkbox type="checkbox" {...register("remember")} id="remember" />
            <R.CheckboxLabel htmlFor="remember">Zapamiętaj mnie</R.CheckboxLabel>
          </R.CheckboxWrapper>
          <S.ForgotPasswordLink
            type="button"
            onClick={() => setShowResetPassword(true)}
          >
            Przypomnij hasło
          </S.ForgotPasswordLink>
        </S.ForgotPasswordRow>

        <S.StyledButton type="submit" disabled={isLoading}>
          {isLoading ? "Logowanie..." : "Zaloguj się"}
        </S.StyledButton>

        <S.Divider>lub</S.Divider>

        <S.GoogleButton
          type="button"
          onClick={onGoogleLogin}
          disabled={isLoading}
        >
          <GoogleIcon width={22} height={22} />
          <span>Kontynuuj przez Google</span>
        </S.GoogleButton>

        <S.LinkContainer>
          Nie masz konta?<Link to={toRegistration()}>Zarejestruj się</Link>
        </S.LinkContainer>

        <S.LegalLinks>
          <Link to={toRegulamin()}>Regulamin</Link>
          <span> • </span>
          <Link to={toPrivacy()}>Polityka Prywatności</Link>
        </S.LegalLinks>
      </S.Form>
    </S.Wrapper>
  );
};

export default LoginForm;
