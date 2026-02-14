import React, { useEffect, useState } from "react";
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
  const [pendingInvite, setPendingInvite] = useState(null);

  useEffect(() => {
    const invite = localStorage.getItem("pendingFamilyInvite");
    if (invite) {
      try {
        setPendingInvite(JSON.parse(invite));
      } catch (error) {
        console.error("Błąd parsowania zaproszenia:", error);
      }
    }
  }, []);

  const onSubmit = (data) => {
    dispatch(registerRequest({ ...data, pendingInvite }));
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
      pendingInvite={pendingInvite}
    />
  );
};

export default RegistrationPage;
