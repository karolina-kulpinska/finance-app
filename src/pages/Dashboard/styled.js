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
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 14px 16px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 12px;
  gap: 12px;
`;

export const PaymentsTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const CollapseButton = styled.button`
  padding: 8px 16px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  white-space: nowrap;

  &:hover {
    background: #f8f9fa;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const CategoryBackBar = styled.div`
  background: white;
  border-radius: 12px;
  padding: 10px 16px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const CategoryBackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 700;
  color: #667eea;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    color: #5568d3;
  }
`;

export const FiltersBox = styled.div`
  background: white;
  border-radius: 10px;
  padding: 8px 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8e8ea;
  margin-bottom: 10px;
`;

export const DemoBanner = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  margin-bottom: 8px;

  @media (max-width: 480px) {
    padding: 10px 12px;
    flex-wrap: wrap;
  }
`;

export const DemoBannerText = styled.div`
  font-size: 14px;
  line-height: 1.5;
  flex: 1;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const DemoBannerLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
  font-weight: 700;
  margin-left: 4px;

  &:hover {
    opacity: 0.9;
  }
`;

export const DemoBannerClose = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  flex-shrink: 0;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;
