import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginRequest,
  selectAuthLoading,
  selectUser,
} from "../../features/auth/authSlice";
import { toDashboard } from "../../routes";
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
    dispatch({ type: "auth/loginWithGoogleRequest" });
  };

  useEffect(() => {
    if (user) {
      navigate(toDashboard());
    }
  }, [user, navigate]);

  return (
    <S.Wrapper>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Title>Zaloguj się</S.Title>

        <S.Input
          type="email"
          placeholder="E-mail"
          {...register("email", { required: "E-mail jest wymagany" })}
        />
        {errors.email && (
          <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>
        )}

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

        <S.StyledButton type="submit" disabled={isLoading}>
          {isLoading ? "Logowanie..." : "Wejdź"}
        </S.StyledButton>

        <S.Divider>lub</S.Divider>

        <S.GoogleButton
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          🚀 Zaloguj przez Google
        </S.GoogleButton>
      </S.Form>
    </S.Wrapper>
  );
};

export default LoginPage;
