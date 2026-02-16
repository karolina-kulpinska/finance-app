import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
`;

export const StatCard = styled.div`
  background: ${({ $variant, theme }) => {
    switch ($variant) {
      case "total":
        return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      case "unpaid":
        return "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
      case "paid":
        return "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
      case "count":
        return "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)";
      default:
        return theme.colors.white;
    }
  }};
  border-radius: 16px;
  padding: 20px 16px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out;
  animation-delay: ${({ $delay }) => $delay || "0s"};
  animation-fill-mode: both;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 130px;
`;

export const StatLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: ${({ $variant }) =>
    $variant ? "rgba(255, 255, 255, 0.95)" : "#7c8db5"};
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 1;
  flex-shrink: 0;
`;

export const StatValue = styled.div`
  font-size: 22px;
  font-weight: 900;
  color: ${({ $variant }) => ($variant ? "white" : "#2d3748")};
  position: relative;
  z-index: 1;
  line-height: 1.2;
  margin-bottom: auto;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    font-size: 18px;
  }
`;

export const StatSubtext = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${({ $variant }) =>
    $variant ? "rgba(255, 255, 255, 0.95)" : "#a0aec0"};
  margin-top: 12px;
  position: relative;
  z-index: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
`;
