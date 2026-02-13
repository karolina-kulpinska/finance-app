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
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 16px;
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
  border-radius: 20px;
  padding: 28px 24px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out;
  animation-delay: ${({ $delay }) => $delay || "0s"};
  animation-fill-mode: both;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transform: translate(30%, -30%);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.hover};
  }
`;

export const StatIcon = styled.div`
  font-size: 32px;
  margin-bottom: 12px;
  position: relative;
  z-index: 1;
`;

export const StatLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ $variant }) =>
    $variant ? "rgba(255, 255, 255, 0.9)" : "#7c8db5"};
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 1;
`;

export const StatValue = styled.div`
  font-size: 32px;
  font-weight: 900;
  color: ${({ $variant }) => ($variant ? "white" : "#2d3748")};
  position: relative;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    font-size: 28px;
  }
`;

export const StatSubtext = styled.div`
  font-size: 13px;
  color: ${({ $variant }) =>
    $variant ? "rgba(255, 255, 255, 0.8)" : "#a0aec0"};
  margin-top: 6px;
  position: relative;
  z-index: 1;
`;
