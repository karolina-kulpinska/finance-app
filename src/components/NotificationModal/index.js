import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "styled-components";
import {
  selectNotification,
  hideNotification,
} from "../../features/notification/notificationSlice";
import {
  SuccessIcon,
  ErrorIcon,
  WarningIcon,
  InfoIcon,
} from "../Icons";
import * as S from "./styled";

const getIconAndTitle = (type, theme) => {
  switch (type) {
    case "success":
      return {
        IconComponent: SuccessIcon,
        title: "Sukces!",
        color: theme.colors.success,
      };
    case "error":
      return {
        IconComponent: ErrorIcon,
        title: "Błąd",
        color: theme.colors.error,
      };
    case "warning":
      return {
        IconComponent: WarningIcon,
        title: "Uwaga",
        color: theme.colors.warning,
      };
    default:
      return {
        IconComponent: InfoIcon,
        title: "Informacja",
        color: theme.colors.primary,
      };
  }
};

const NotificationModal = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { open, message, type } = useSelector(selectNotification);

  const handleClose = () => {
    dispatch(hideNotification());
  };

  if (!open) return null;

  const { IconComponent, title, color } = getIconAndTitle(type, theme);

  return (
    <>
      <S.Overlay onClick={handleClose} />
      <S.Modal>
        <S.IconWrapper>
          <IconComponent size={64} color={color} />
        </S.IconWrapper>
        <S.Title>{title}</S.Title>
        <S.Message>{message}</S.Message>
        <S.Button onClick={handleClose}>OK</S.Button>
      </S.Modal>
    </>
  );
};

export default NotificationModal;
