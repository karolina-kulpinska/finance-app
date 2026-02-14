import styled from "styled-components";

export const MiniPaymentsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const Section = styled.div`
  background: white;
  border-radius: 12px;
  padding: 14px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const SectionTitle = styled.h3`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 10px 0;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const PaymentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MiniPaymentCard = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: ${({ $paid }) => ($paid ? "#f0f9ff" : "#fff8f8")};
  border-radius: 8px;
  border-left: 3px solid ${({ $paid }) => ($paid ? "#4facfe" : "#f5576c")};
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.98);
  }
`;

export const PaymentIcon = styled.div`
  font-size: 20px;
`;

export const PaymentInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const PaymentName = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PaymentDate = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.secondary};
  margin-top: 2px;
`;

export const PaymentAmount = styled.div`
  font-size: 12px;
  font-weight: 900;
  color: ${({ $paid }) => ($paid ? "#4facfe" : "#f5576c")};
  white-space: nowrap;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondary};
`;
