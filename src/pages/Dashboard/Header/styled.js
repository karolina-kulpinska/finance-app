import styled from "styled-components";

export const Header = styled.header`
  margin-bottom: 8px;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
  min-width: 0;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

export const Logo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  flex-shrink: 0;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 20px;
  }
`;

export const ProCorner = styled.div`
  display: none;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    margin-left: auto;
  }
`;

export const ProDesktop = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const Subtitle = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0;
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    width: 100%;
  }
`;

export const FilterToggleButton = styled.button`
  padding: 8px 16px;
  background: white;
  color: ${({ theme }) => theme.colors.text};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;

  &:hover {
    background: #f8f9fa;
    border-color: #3182ce;
    color: #3182ce;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

export const AddButton = styled.button`
  padding: 10px 20px;
  background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  box-shadow: 0 3px 10px rgba(44, 82, 130, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(44, 82, 130, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

export const ProBadge = styled.span`
  padding: 6px 12px;
  background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
  color: #1a1a1a;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 5px 10px;
    font-size: 10px;
  }
`;

export const UpgradeButton = styled.button`
  padding: 6px 12px;
  background: transparent;
  color: #3182ce;
  border: 1.5px solid #3182ce;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  white-space: nowrap;

  &:hover {
    background: rgba(44, 82, 130, 0.1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 5px 10px;
    font-size: 10px;
  }
`;

export const UpgradeTip = styled.div`
  margin-top: 10px;
  padding: 10px 12px;
  background: rgba(44, 82, 130, 0.08);
  border: 1px dashed #3182ce;
  border-radius: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;

export const ProGrantLink = styled.button`
  margin-top: 8px;
  padding: 6px 0;
  background: none;
  border: none;
  font-size: 12px;
  color: #3182ce;
  text-decoration: underline;
  cursor: pointer;
  font-family: inherit;
  display: block;

  &:hover {
    color: #3182ce;
  }

  &:disabled {
    opacity: 0.7;
    cursor: wait;
  }
`;
