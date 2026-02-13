import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  selectUser,
  selectAuthLoading,
  loginWithGoogleRequest,
} from "../../features/auth/authSlice";
import { registerRequest } from "../../features/auth/registrationSlice";
import { toDashboard, toLogin } from "../../routes";
import { GoogleIcon } from "../../components/Icons";
import * as S from "./styled";

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectAuthLoading);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  const onSubmit = (data) => {
    dispatch(registerRequest(data));
  };

  const handleGoogleRegister = () => {
    dispatch(loginWithGoogleRequest());
  };

  useEffect(() => {
    if (user) navigate(toDashboard());
  }, [user, navigate]);

  return (
    <S.Wrapper>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Title>Stwórz konto</S.Title>
        <S.Subtitle>Rozpocznij zarządzanie swoimi finansami</S.Subtitle>

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
            placeholder="Hasło (min. 6 znaków)"
            {...register("password", {
              required: "Hasło jest wymagane",
              minLength: { value: 6, message: "Min. 6 znaków" },
            })}
          />
          {errors.password && (
            <S.ErrorMessage>{errors.password.message}</S.ErrorMessage>
          )}
        </S.InputWrapper>

        <S.InputWrapper>
          <S.Input
            type="password"
            placeholder="Powtórz hasło"
            {...register("confirmPassword", {
              validate: (value) =>
                value === password || "Hasła nie są identyczne",
            })}
          />
          {errors.confirmPassword && (
            <S.ErrorMessage>{errors.confirmPassword.message}</S.ErrorMessage>
          )}
        </S.InputWrapper>

        <S.StyledButton type="submit" disabled={isLoading}>
          {isLoading ? "Tworzenie konta..." : "Zarejestruj się"}
        </S.StyledButton>

        <S.Divider>lub</S.Divider>

        <S.GoogleButton
          type="button"
          onClick={handleGoogleRegister}
          disabled={isLoading}
        >
          <GoogleIcon width={22} height={22} />
          <span>Kontynuuj przez Google</span>
        </S.GoogleButton>

        <S.LinkContainer>
          Masz już konto?<Link to={toLogin()}>Zaloguj się</Link>
        </S.LinkContainer>
      </S.Form>
    </S.Wrapper>
  );
};

export default RegistrationPage;
