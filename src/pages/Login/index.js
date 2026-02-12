import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest, selectAuthLoading } from "../../features/auth/authSlice";
import * as S from "./styled";

const LoginPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(loginRequest(data));
  };

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

        <S.Button type="submit" disabled={isLoading}>
          {isLoading ? "Logowanie..." : "Wejdź"}
        </S.Button>
      </S.Form>
    </S.Wrapper>
  );
};

export default LoginPage;
