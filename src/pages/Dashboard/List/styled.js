import styled from "styled-components";

export const ListContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px 16px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 16px 12px;
  }
`;

export const ListHeader = styled.div`
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

export const ListTitle = styled.h2`
  font-size: 18px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 16px;
  }
`;

export const PaymentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
`;

export const PaymentCard = styled.div`
  background: ${({ $paid }) =>
    $paid ? "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)" : "white"};
  border: 2px solid
    ${({ $priority, $paid, theme }) => {
      if ($paid) return "#66bb6a";
      if ($priority === "high") return "#f5576c";
      if ($priority === "low") return "#43e97b";
      return theme.colors.border;
    }};
  border-radius: 12px;
  padding: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: ${({ $priority, $paid }) => {
      if ($paid) return "#66bb6a";
      if ($priority === "high") return "#f5576c";
      if ($priority === "low") return "#43e97b";
      return "#667eea";
    }};
  }

  &:active {
    transform: scale(0.99);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 12px;
  }
`;

export const PaymentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
  gap: 10px;
`;

export const PaymentInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const PaymentName = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 4px 0;
  text-decoration: ${({ $paid }) => ($paid ? "line-through" : "none")};
  opacity: ${({ $paid }) => ($paid ? 0.7 : 1)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    font-size: 14px;
  }
`;

export const PaymentCategory = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const PaymentAmount = styled.div`
  font-size: 16px;
  font-weight: 900;
  color: ${({ $paid }) => ($paid ? "#66bb6a" : "#667eea")};
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    font-size: 15px;
  }
`;

export const PaymentDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DetailLabel = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

export const DetailValue = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const PaymentNotes = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0 0 10px 0;
  line-height: 1.5;
  font-style: italic;
`;

export const PaymentActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding-top: 10px;
  margin-top: 10px;
  border-top: 1.5px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    gap: 6px;
  }
`;

export const ActionButton = styled.button`
  padding: 7px 12px;
  background: ${({ $variant }) => {
    switch ($variant) {
      case "status":
        return "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
      case "edit":
        return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      case "delete":
        return "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
      case "download":
        return "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)";
      default:
        return "#e0e0e0";
    }
  }};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    padding: 6px 10px;
    font-size: 11px;
  }
`;

export const PriorityBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
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
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const NoData = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 16px;
  font-weight: 500;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 60px 20px;
  }
`;

export const EmptyIcon = styled.div`
  font-size: 72px;
  margin-bottom: 20px;
  opacity: 0.8;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 64px;
  }
`;

export const EmptyTitle = styled.h3`
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 12px 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 20px;
  }
`;

export const EmptyText = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0;
  max-width: 400px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 15px;
  }
`;
