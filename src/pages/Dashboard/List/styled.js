import styled from "styled-components";

export const ListContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 28px 32px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 20px;
  }
`;

export const ListHeader = styled.div`
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

export const ListTitle = styled.h2`
  font-size: 24px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 20px;
  }
`;

export const PaymentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
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
  border-radius: 18px;
  padding: 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${({ $priority, $paid }) => {
      if ($paid) return "#66bb6a";
      if ($priority === "high") return "#f5576c";
      if ($priority === "low") return "#43e97b";
      return "#667eea";
    }};
    transform: translateX(-4px);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);

    &::before {
      transform: translateX(0);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 18px;
  }
`;

export const PaymentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 15px;
`;

export const PaymentInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const PaymentName = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 4px 0;
  text-decoration: ${({ $paid }) => ($paid ? "line-through" : "none")};
  opacity: ${({ $paid }) => ($paid ? 0.7 : 1)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    font-size: 16px;
  }
`;

export const PaymentCategory = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const PaymentAmount = styled.div`
  font-size: 22px;
  font-weight: 900;
  color: ${({ $paid }) => ($paid ? "#66bb6a" : "#667eea")};
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    font-size: 18px;
  }
`;

export const PaymentDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DetailLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

export const DetailValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const PaymentNotes = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0 0 12px 0;
  line-height: 1.5;
  font-style: italic;
`;

export const PaymentActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  padding-top: 16px;
  margin-top: 16px;
  border-top: 2px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    gap: 8px;
  }
`;

export const ActionButton = styled.button`
  padding: 10px 18px;
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
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    padding: 8px 14px;
    font-size: 13px;
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
