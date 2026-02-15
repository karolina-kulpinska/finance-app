import styled from "styled-components";

export const Card = styled.div`
  background: ${({ $paid, $overdue }) => {
    if ($paid) return "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)";
    if ($overdue) return "#fff5f5";
    return "white";
  }};
  border: 2px solid
    ${({ $priority, $paid, $overdue, theme }) => {
      if ($paid) return "#66bb6a";
      if ($overdue) return "#ffcdd2";
      if ($priority === "high") return "#f5576c";
      if ($priority === "low") return "#43e97b";
      return theme.colors.border;
    }};
  border-radius: 16px;
  padding: ${({ $expanded }) => ($expanded ? "12px" : "10px")};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: ${({ $expanded }) => ($expanded ? "auto" : "120px")};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ $overdue }) =>
      $overdue
        ? "0 4px 12px rgba(244, 67, 54, 0.2)"
        : "0 4px 12px rgba(0, 0, 0, 0.1)"};
  }

  &:active {
    transform: ${({ $expanded }) => ($expanded ? "none" : "scale(0.98)")};
  }
`;

export const CardCheckboxWrapper = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 2;
`;

export const CardCheckbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const PaymentIcon = styled.div`
  font-size: 32px;
  margin-bottom: 6px;
`;

export const CompactInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
`;

export const CompactName = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: ${({ $paid }) => ($paid ? "line-through" : "none")};
  opacity: ${({ $paid }) => ($paid ? 0.7 : 1)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
`;

export const InstallmentBadge = styled.span`
  font-size: 8px;
  font-weight: 700;
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  padding: 2px 6px;
  border-radius: 8px;
  white-space: nowrap;
`;

export const FamilyBadge = styled.span`
  font-size: 10px;
  margin-top: 2px;
  display: inline-block;
`;

export const CompactAmount = styled.div`
  font-size: 14px;
  font-weight: 900;
  color: ${({ $paid }) => ($paid ? "#66bb6a" : "#667eea")};
`;

export const CompactDate = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const ExpandedDetails = styled.div`
  width: 100%;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export const DetailLabel = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

export const DetailValue = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const PaymentNotes = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 8px 0 0 0;
  line-height: 1.4;
  font-style: italic;
  text-align: left;
`;

export const BankIconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: ${({ $color }) => `${$color}15`};
  border: 1px solid ${({ $color }) => `${$color}40`};
  border-radius: 6px;
  color: ${({ $color }) => $color};
  font-size: 11px;
  font-weight: 600;

  svg {
    flex-shrink: 0;
  }
`;

export const PaymentActions = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 10px;
  justify-content: center;
`;

export const ActionButton = styled.button`
  width: 36px;
  height: 36px;
  background: ${({ $variant }) => {
    switch ($variant) {
      case "status":
        return "#4facfe";
      case "edit":
        return "#667eea";
      case "delete":
        return "#f5576c";
      case "download":
        return "#43e97b";
      default:
        return "#e0e0e0";
    }
  }};
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const PriorityBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: ${({ $priority }) => {
    switch ($priority) {
      case "high":
        return "#ffebee";
      case "low":
        return "#e8f5e9";
      default:
        return "#fff3e0";
    }
  }};
  color: ${({ $priority }) => {
    switch ($priority) {
      case "high":
        return "#c62828";
      case "low":
        return "#2e7d32";
      default:
        return "#e65100";
    }
  }};
  border-radius: 6px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;
