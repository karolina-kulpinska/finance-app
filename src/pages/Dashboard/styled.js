import styled, { keyframes } from "styled-components";

const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const Wrapper = styled.main`
  min-height: 100vh;
  background: linear-gradient(-45deg, #f5f7fa, #c3cfe2, #e0c3fc, #8ec5fc);
  background-size: 400% 400%;
  animation: ${gradient} 15s ease infinite;
  padding: 20px 16px 80px 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 16px 12px 80px 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    padding: 12px 12px 80px 12px;
  }
`;

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    max-width: 800px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 12px;
  }
`;

export const ProfileSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  text-align: center;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ProfileTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 12px 0;
`;

export const ProfileText = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0;
`;

export const PaymentsHeader = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

export const PaymentsHeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
`;

export const PaymentsTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const FilterToggleButton = styled.button`
  padding: 6px 14px;
  background: white;
  color: ${({ theme }) => theme.colors.text};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;

  &:hover {
    background: #f8f9fa;
    border-color: #667eea;
    color: #667eea;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    width: 100%;
  }
`;

export const FiltersWrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 12px 16px;
  background: #f8f9fa;
`;

export const DashboardFiltersWrapper = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;
