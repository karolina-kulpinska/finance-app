import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectUser,
  selectAuthLoading,
  loginWithGoogleRequest,
} from "../../features/auth/authSlice";
import { registerRequest } from "../../features/auth/registrationSlice";
import { toDashboard } from "../../routes";
import RegistrationForm from "./RegistrationForm";

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectAuthLoading);

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
    <RegistrationForm
      onSubmit={onSubmit}
      onGoogleLogin={handleGoogleRegister}
      isLoading={isLoading}
    />
  );
};

export default RegistrationPage;
