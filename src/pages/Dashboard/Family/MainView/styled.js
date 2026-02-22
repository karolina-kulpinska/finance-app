import styled from "styled-components";

export const Container = styled.div`
  padding: 0;
  padding-bottom: 80px;
`;

export const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: white;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows?.tile || "0 1px 4px rgba(0,0,0,0.08)"};
  border: 1px solid ${({ theme }) => theme.colors?.border || "#e0e0e0"};
  margin-bottom: 12px;
`;

export const BackButton = styled.button`
  padding: 6px 10px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors?.border || "#e0e0e0"};
  border-radius: 6px;
  font-size: 16px;
  font-weight: 800;
  color: #000;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: #f8f9fa;
  }
`;

export const PanelTitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.text || "#333"};
  margin: 0;
`;

export const PanelContent = styled.div`
  min-height: 120px;
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

export const Card = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 12px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors?.border || "#e0e0e0"};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  text-align: left;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);

  &:hover {
    border-color: #2c5282;
    background: rgba(44, 82, 130, 0.04);
    box-shadow: 0 2px 8px rgba(44, 82, 130, 0.15);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const CardLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.text || "#333"};
`;

export const CardChevron = styled.span`
  font-size: 18px;
  color: ${({ theme }) => theme.colors?.secondary || "#999"};
`;

export const FamilyHeader = styled.div`
  background: linear-gradient(135deg, #2c5282 0%, #2c5282 100%);
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 12px;
  box-shadow: 0 2px 12px rgba(44, 82, 130, 0.25);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 14px 16px;
    margin-bottom: 10px;
  }
`;

export const HeaderContent = styled.div``;

export const FamilyTitle = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin: 0 0 2px 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 16px;
  }
`;

export const FamilySubtitle = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
`;

export const AddMemberButton = styled.button`
  width: 100%;
  padding: 12px;
  background: white;
  border: 1px solid #2c5282;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  color: #2c5282;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  font-family: inherit;
  margin-bottom: 12px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  &:hover:not(:disabled) {
    background: #2c5282;
    color: white;
    box-shadow: 0 2px 8px rgba(44, 82, 130, 0.25);
  }

  &:active:not(:disabled) {
    transform: scale(0.99);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const LinkBox = styled.div`
  background: rgba(44, 82, 130, 0.08);
  border: 1px solid rgba(44, 82, 130, 0.3);
  border-radius: 10px;
  padding: 12px 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(44, 82, 130, 0.12);
    border-color: rgba(44, 82, 130, 0.4);
  }

  &:active {
    transform: scale(0.99);
  }
`;

export const LinkContent = styled.div`
  min-width: 0;
`;

export const LinkLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

export const LinkUrl = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.secondary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: "SF Mono", "Monaco", "Consolas", monospace;
`;

export const RenameForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
`;

export const RenameLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.text || "#333"};
`;

export const RenameInput = styled.input`
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors?.border || "#e0e0e0"};
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #2c5282;
    box-shadow: 0 0 0 2px rgba(44, 82, 130, 0.15);
  }
`;

export const RenameButton = styled.button`
  padding: 10px 16px;
  background: #2c5282;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  font-family: inherit;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  &:hover:not(:disabled) {
    background: #234a72;
    box-shadow: 0 2px 8px rgba(44, 82, 130, 0.25);
  }

  &:active:not(:disabled) {
    transform: scale(0.99);
  }
`;

export const DeleteFamilyButton = styled.button`
  background: transparent;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 600;
  color: #9e9e9e;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  font-family: inherit;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  &:hover:not(:disabled) {
    border-color: #f44336;
    color: #f44336;
    background: #fff5f5;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
