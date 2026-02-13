import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "styled-components";
import {
  selectConfirm,
  hideConfirm,
  confirmAction,
} from "../../features/notification/confirmSlice";
import { deletePaymentRequest } from "../../features/payments/paymentSlice";
import { WarningIcon } from "../Icons";
import * as S from "./styled";

const ConfirmModal = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { open, message, paymentId } = useSelector(selectConfirm);

  const handleConfirm = () => {
    if (paymentId) {
      dispatch(deletePaymentRequest(paymentId));
    }
    dispatch(confirmAction());
  };

  const handleCancel = () => {
    dispatch(hideConfirm());
  };

  if (!open) return null;

  return (
    <>
      <S.Overlay onClick={handleCancel} />
      <S.Modal>
        <S.IconWrapper>
          <WarningIcon size={64} color={theme.colors.warning} />
        </S.IconWrapper>
        <S.Title>Potwierdzenie</S.Title>
        <S.Message>{message}</S.Message>
        <S.ButtonGroup>
          <S.ConfirmButton onClick={handleConfirm}>Usuń</S.ConfirmButton>
          <S.CancelButton onClick={handleCancel}>Anuluj</S.CancelButton>
        </S.ButtonGroup>
      </S.Modal>
    </>
  );
};

export default ConfirmModal;
