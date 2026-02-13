import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPayments,
  updatePaymentStatusRequest,
} from "../../../features/payments/paymentSlice";
import { showConfirm } from "../../../features/notification/confirmSlice";
import * as S from "./styled";

const PaymentsList = () => {
  const dispatch = useDispatch();
  const payments = useSelector(selectPayments);

  if (!payments || payments.length === 0) {
    return <S.NoData>Brak płatności.</S.NoData>;
  }

  return (
    <S.TableWrapper>
      <S.Table>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Kwota</th>
            <th>Termin</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.name}</td>
              <td>{Number(payment.amount).toFixed(2)} zł</td>
              <td>{payment.date}</td>
              <td>
                <S.ActionGroup>
                  <S.IconButton
                    $type="status"
                    onClick={() =>
                      dispatch(
                        updatePaymentStatusRequest({
                          id: payment.id,
                          currentStatus: payment.paid,
                        }),
                      )
                    }
                  >
                    {payment.paid ? "✅" : "⏳"}
                  </S.IconButton>
                  <S.IconButton
                    $type="delete"
                    onClick={() => {
                      dispatch(
                        showConfirm({
                          message: "Czy na pewno chcesz usunąć tę płatność?",
                          paymentId: payment.id,
                        }),
                      );
                    }}
                  >
                    🗑️
                  </S.IconButton>
                </S.ActionGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </S.Table>
    </S.TableWrapper>
  );
};

export default PaymentsList;
