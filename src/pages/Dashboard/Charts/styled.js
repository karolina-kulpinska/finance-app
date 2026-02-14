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

export const ChartsContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px 16px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme }) => theme.colors.border};
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 16px 12px;
  }
`;

export const ChartsHeader = styled.div`
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

export const ChartsTitle = styled.h2`
  font-size: 18px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 16px;
  }
`;

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
`;

export const CategoryCard = styled.div`
  background: ${({ $color }) => `${$color}10`};
  border: 2px solid ${({ $color }) => $color};
  border-radius: 12px;
  padding: 12px 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
  text-align: center;

  &:active {
    transform: scale(0.98);
  }
`;

export const CategoryIcon = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
`;

export const CategoryName = styled.h3`
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 6px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const CategoryAmount = styled.div`
  font-size: 16px;
  font-weight: 900;
  color: ${({ $color }) => $color};
  margin-bottom: 4px;
  line-height: 1.2;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    font-size: 14px;
  }
`;

export const CategoryCount = styled.div`
  font-size: 10px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const EmptyChart = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 15px;
  grid-column: 1 / -1;
`;
