import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ProfileCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 32px 20px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  text-align: center;
  color: white;
`;

export const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 900;
  margin: 0 auto 16px;
  border: 4px solid rgba(255, 255, 255, 0.5);
`;

export const UserName = styled.h2`
  font-size: 22px;
  font-weight: 900;
  margin: 0 0 6px 0;
`;

export const UserEmail = styled.p`
  font-size: 14px;
  opacity: 0.9;
  margin: 0;
`;

export const SettingsSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 12px 0;
`;

export const SettingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SettingItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;

  &:hover {
    background: #f8f9fa;
  }

  &:active {
    transform: scale(0.99);
  }
`;

export const SettingIcon = styled.div`
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f5;
  border-radius: 10px;
  flex-shrink: 0;
`;

export const SettingInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const SettingLabel = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2px;
`;

export const SettingDesc = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const SettingArrow = styled.div`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.secondary};
  flex-shrink: 0;
`;

export const AppVersion = styled.div`
  text-align: center;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondary};
  padding: 16px;
`;
