import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { selectUser, selectAuthLoading } from "../../features/auth/authSlice";
import { toDashboard, toLogin } from "../../routes";
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
    dispatch({ type: "auth/registerRequest", payload: data });
  };

  useEffect(() => {
    if (user) navigate(toDashboard());
  }, [user, navigate]);

  return (
    <S.Wrapper>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Title>Stwórz konto Premium</S.Title>

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
            minLength: { value: 6, message: "Min. 6 znaków" },
          })}
        />
        {errors.password && (
          <S.ErrorMessage>{errors.password.message}</S.ErrorMessage>
        )}

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

        <S.StyledButton type="submit" disabled={isLoading}>
          {isLoading ? "Tworzenie konta..." : "Zarejestruj się"}
        </S.StyledButton>

        <S.LinkContainer>
          Masz już konto? <Link to={toLogin()}>Zaloguj się</Link>
        </S.LinkContainer>
      </S.Form>
    </S.Wrapper>
  );
};

export default RegistrationPage;
