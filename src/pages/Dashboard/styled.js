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
  background: linear-gradient(-35deg, #f7fafc 0%, #edf2f7 50%, #e2e8f0 100%);
  background-size: 400% 400%;
  animation: ${gradient} 15s ease infinite;
  padding: 20px 16px 80px 16px;

  @media (min-width: 768px) {
    padding: 20px 20px 80px 20px;
  }

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

export const HeaderRow = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const HeaderSpacer = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
    width: 280px;
    min-width: 280px;
    flex-shrink: 0;
  }
`;

export const HeaderCenter = styled.div`
  flex: 1;
  min-width: 0;
`;

export const DesktopLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 16px;
    max-width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 12px;
  }
`;

const adAreaBorder = "2px solid rgba(140, 80, 20, 0.5)";

export const LeftAdArea = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
    width: 280px;
    min-width: 280px;
    flex-shrink: 0;
    min-height: 200px;
    border: ${adAreaBorder};
    border-radius: 12px;
    background: ${({ $isEmpty }) =>
      $isEmpty ? "transparent" : "rgba(248, 250, 252, 0.8)"};
  }
`;

export const MainContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    flex: 1;
    max-width: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 12px;
  }
`;

export const RightAdArea = styled.aside`
  @media (min-width: 768px) {
    display: block;
    width: 280px;
    min-width: 280px;
    flex-shrink: 0;
    min-height: 200px;
    border: ${adAreaBorder};
    border-radius: 12px;
    position: sticky;
    top: 20px;
    overflow: hidden;

    & > a {
      border: none;
      margin: 0;
      border-radius: 10px;
    }
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
  font-size: 16px;
  font-weight: 800;
  color: #3182ce;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    color: #1e4976;
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
  background: linear-gradient(135deg, #3182ce 0%, #764ba2 100%);
  color: white;
  padding: 12px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  box-shadow: 0 4px 12px rgba(44, 82, 130, 0.3);
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

export const DemoInfoBar = styled.div`
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 13px;
  color: #856404;
  margin-bottom: 12px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px 12px;
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

export const DemoInfoBox = styled.div`
  background: white;
  border-radius: 16px;
  padding: 40px 24px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  min-height: 400px;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    padding: 32px 20px;
    min-height: 350px;
  }
`;

export const DemoInfoIcon = styled.div`
  font-size: 64px;
  margin-bottom: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    font-size: 56px;
  }
`;

export const DemoInfoTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    font-size: 20px;
  }
`;

export const DemoInfoText = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.6;
  margin: 0;
  max-width: 500px;

  strong {
    color: ${({ theme }) => theme.colors.primary || "#3182ce"};
    font-weight: 700;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    font-size: 14px;
  }
`;

export const DemoInfoButton = styled.button`
  margin-top: 8px;
  padding: 14px 32px;
  background: linear-gradient(135deg, #3182ce 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(44, 82, 130, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(44, 82, 130, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    padding: 12px 24px;
    font-size: 15px;
  }
`;
