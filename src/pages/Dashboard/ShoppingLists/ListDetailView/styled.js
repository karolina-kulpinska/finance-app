import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: white;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Title = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  text-align: right;
`;

export const BackButton = styled.button`
  padding: 4px 8px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #000;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    background: #f8f9fa;
    color: #000;
  }
`;

export const DeleteButton = styled.button`
  padding: 6px 12px;
  background: #fff5f5;
  border: 1px solid #ffcdd2;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f44336;
    border-color: #f44336;
  }
`;

export const GroupToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: white;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 16px;
  cursor: pointer;

  label {
    cursor: pointer;
    margin: 0;
  }
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const CheckboxLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const TotalCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TotalLabel = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: white;
`;

export const TotalAmount = styled.div`
  font-size: 24px;
  font-weight: 900;
  color: white;
`;

export const BottomButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL || "480px"}) {
    flex-direction: column;
  }
`;

export const BottomButton = styled.button`
  flex: 1;
  min-width: 100px;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  border: 1px solid transparent;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  ${({ $variant }) =>
    $variant === "danger" &&
    `
    background: #fff5f5;
    color: #c62828;
    border-color: #ffcdd2;
    &:hover { background: #ffebee; }
  `}

  ${({ $variant, $active, theme }) =>
    $variant === "family" &&
    `
    background: ${$active ? "#e8f5e9" : "white"};
    color: ${$active ? "#2e7d32" : "#333"};
    border-color: ${theme?.colors?.border || "#e0e0e0"};
    &:hover { background: #f1f8e9; }
  `}

  ${({ $variant }) =>
    $variant === "receipt" &&
    `
    background: #e3f2fd;
    color: #1565c0;
    border-color: #90caf9;
    &:hover { background: #bbdefb; }
  `}
`;

export const ReceiptInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #e3f2fd;
  border-radius: 8px;
  border: 1px solid #90caf9;
  gap: 8px;
`;

export const ReceiptName = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #1565c0;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ReceiptActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
`;

export const ReceiptDownload = styled.button`
  padding: 4px 8px;
  background: #1565c0;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #0d47a1;
  }
`;

export const ReceiptRemove = styled.button`
  padding: 4px 8px;
  background: transparent;
  border: none;
  color: #1565c0;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    color: #0d47a1;
  }
`;
