import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginRequest,
  loginWithGoogleRequest,
  selectAuthLoading,
  selectUser,
} from "../../features/auth/authSlice";
import { toDashboard } from "../../routes";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthLoading);
  const navigate = useNavigate();
  const user = useSelector(selectUser);

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
    <LoginForm
      onSubmit={onSubmit}
      onGoogleLogin={handleGoogleLogin}
      isLoading={isLoading}
    />
  );
};

export default LoginPage;
