import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    gap: 16px;
  }
`;

export const StatusCard = styled.div`
  background: ${({ $isPro }) =>
    $isPro
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "#f8f9fa"};
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: ${({ $isPro }) => ($isPro ? "none" : "1px solid #e8e8ea")};

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    padding: 16px;
    gap: 12px;
    border-radius: 10px;
  }
`;

export const StatusIcon = styled.div`
  font-size: 48px;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    font-size: 36px;
  }
`;

export const StatusInfo = styled.div`
  flex: 1;
`;

export const StatusTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme, $isPro }) =>
    $isPro ? theme.colors?.white || "#fff" : theme.colors?.text || "#333"};
  margin: 0 0 4px 0;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    font-size: 18px;
  }
`;

export const StatusDesc = styled.p`
  font-size: 14px;
  color: ${({ theme, $isPro }) =>
    $isPro
      ? theme.colors?.white || "#fff"
      : theme.colors?.secondary || "#666"};
  opacity: ${({ $isPro }) => ($isPro ? 0.9 : 1)};
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    font-size: 12px;
  }
`;

export const InfoSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid ${({ theme }) => theme.colors?.border || "#e8e8ea"};

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    padding: 16px;
    border-radius: 10px;
  }
`;

export const InfoTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.text || "#333"};
  margin: 0 0 16px 0;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    font-size: 14px;
    margin: 0 0 12px 0;
  }
`;

export const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    gap: 10px;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors?.border || "#e8e8ea"};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    padding-bottom: 10px;
    flex-wrap: wrap;
    gap: 4px;
  }
`;

export const InfoLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.secondary || "#666"};

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    font-size: 12px;
  }
`;

export const InfoValue = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme, $status }) =>
    $status === "active"
      ? "#2e7d32"
      : $status === "canceled"
        ? "#c62828"
        : theme.colors?.text || "#333"};
  ${({ $small }) => $small && "font-size: 12px; font-family: monospace;"}

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    font-size: ${({ $small }) => ($small ? "10px" : "12px")};
  }
`;

export const ActionsSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid ${({ theme }) => theme.colors?.border || "#e8e8ea"};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    padding: 16px;
    border-radius: 10px;
  }
`;

export const ActionButton = styled.button`
  width: 100%;
  padding: 14px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    padding: 12px 16px;
    font-size: 13px;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  &:hover {
    background: linear-gradient(135deg, #5568d3 0%, #764ba2 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ActionHint = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors?.secondary || "#666"};
  margin: 0;
  line-height: 1.5;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    font-size: 11px;
    line-height: 1.4;
  }
`;

export const UpgradeSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid ${({ theme }) => theme.colors?.border || "#e8e8ea"};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    padding: 16px;
    border-radius: 10px;
  }
`;

export const UpgradeTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.text || "#333"};
  margin: 0 0 16px 0;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    font-size: 16px;
    margin: 0 0 12px 0;
  }
`;

export const UpgradeFeatures = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    gap: 6px;
    margin-bottom: 16px;
  }
`;

export const FeatureItem = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors?.text || "#333"};
  padding: 4px 0;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    font-size: 12px;
    padding: 3px 0;
  }
`;

export const UpgradeButton = styled.button`
  width: 100%;
  padding: 14px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    padding: 12px 16px;
    font-size: 13px;
    border-radius: 8px;
  }

  &:hover {
    background: linear-gradient(135deg, #5568d3 0%, #764ba2 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const OwnerLink = styled.button`
  display: block;
  width: 100%;
  margin-top: 12px;
  padding: 8px;
  background: none;
  border: none;
  font-size: 12px;
  color: ${({ theme }) => theme.colors?.secondary || "#666"};
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors?.text || "#333"};
  }
`;
