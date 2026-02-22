import styled from "styled-components";

export const ProfileCard = styled.div`
  background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%);
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

export const CollapsibleHeader = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 0 12px 0;
  margin: 0;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-align: left;

  &:hover {
    opacity: 0.9;
  }
`;

export const CollapsibleArrow = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondary};
  transition: transform 0.2s ease;
  transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
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
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;
  font-family: inherit;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  &:hover:not(:disabled) {
    background: #f8f9fa;
  }

  &:active:not(:disabled) {
    transform: scale(0.99);
  }

  &:disabled {
    cursor: not-allowed;
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

export const LanguageOption = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: ${({ $active }) => ($active ? "rgba(44, 82, 130, 0.1)" : "transparent")};
  border: 1px solid ${({ $active }) => ($active ? "#2c5282" : "transparent")};
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  width: 100%;
  text-align: left;
  transition: all 0.2s;

  &:hover {
    background: #f8f9fa;
  }
`;

export const AppVersion = styled.div`
  text-align: center;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondary};
  padding: 16px;
`;
