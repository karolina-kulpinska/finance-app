import styled from "styled-components";

export const MiniPaymentsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

export const Section = styled.div`
  background: white;
  border-radius: 12px;
  padding: 12px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const SectionTitle = styled.h3`
  font-size: 11px;
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
  gap: 8px;
  padding: 8px;
  background: ${({ $paid }) => ($paid ? "#f0f9ff" : "#fff8f8")};
  border-radius: 8px;
  border-left: 3px solid ${({ $paid }) => ($paid ? "#3182ce" : "#c53030")};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const PaymentIcon = styled.div`
  font-size: 16px;
`;

export const PaymentInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const PaymentName = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const FamilyBadge = styled.span`
  font-size: 10px;
  flex-shrink: 0;
`;

export const PaymentDate = styled.div`
  font-size: 9px;
  color: ${({ theme }) => theme.colors.secondary};
  margin-top: 2px;
`;

export const PaymentAmount = styled.div`
  font-size: 11px;
  font-weight: 900;
  color: ${({ $paid }) => ($paid ? "#3182ce" : "#c53030")};
  white-space: nowrap;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 16px;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.secondary};
`;
