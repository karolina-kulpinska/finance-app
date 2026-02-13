import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  loginRequest,
  loginWithGoogleRequest,
  selectAuthLoading,
  selectUser,
} from "../../features/auth/authSlice";
import { toDashboard, toRegistration } from "../../routes";
import { GoogleIcon } from "../../components/Icons";
import * as S from "./styled";

const LoginPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthLoading);
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(loginRequest(data));
  };

  const handleGoogleLogin = () => {
    dispatch(loginWithGoogleRequest());
  };

  useEffect(() => {
    if (user) {
      navigate(toDashboard());
    }
  }, [user, navigate]);

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

        <S.StyledButton type="submit" disabled={isLoading}>
          {isLoading ? "Logowanie..." : "Zaloguj się"}
        </S.StyledButton>

        <S.Divider>lub</S.Divider>

        <S.GoogleButton
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <GoogleIcon width={22} height={22} />
          <span>Kontynuuj przez Google</span>
        </S.GoogleButton>

        <S.LinkContainer>
          Nie masz konta?<Link to={toRegistration()}>Zarejestruj się</Link>
        </S.LinkContainer>
      </S.Form>
    </S.Wrapper>
  );
};

export default LoginPage;
