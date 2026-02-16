import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
  backdrop-filter: blur(4px);

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    padding: 10px;
  }
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    border-radius: 16px;
    max-height: 95vh;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 24px 24px 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors?.border || "#e8e8ea"};

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    padding: 16px 16px 12px 16px;
  }
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors?.text || "#333"};
  margin: 0;
  flex: 1;
  line-height: 1.4;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    font-size: 16px;
    gap: 6px;
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
  color: ${({ theme }) => theme.colors?.secondary || "#999"};
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s ease;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    font-size: 20px;
    width: 28px;
    height: 28px;
  }

  &:hover {
    background: #f0f0f0;
    color: #333;
  }
`;

export const ModalBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    padding: 16px;
    gap: 16px;
  }
`;

export const AmountSection = styled.div`
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    padding: 16px;
    border-radius: 10px;
  }
`;

export const AmountLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.secondary || "#666"};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    font-size: 10px;
    margin-bottom: 6px;
  }
`;

export const AmountValue = styled.div`
  font-size: 32px;
  font-weight: 900;
  color: ${({ $paid, theme }) =>
    $paid ? "#2e7d32" : theme.colors?.text || "#333"};

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    font-size: 24px;
  }
`;

export const DetailsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    gap: 12px;
  }
`;

export const DetailRow = styled.div`
  display: ${({ $fullWidth }) => ($fullWidth ? "flex" : "grid")};
  ${({ $fullWidth }) =>
    $fullWidth ? "flex-direction: column;" : "grid-template-columns: 140px 1fr;"}
  gap: 12px;
  align-items: ${({ $fullWidth }) => ($fullWidth ? "flex-start" : "center")};

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    ${({ $fullWidth }) =>
      $fullWidth
        ? ""
        : "grid-template-columns: 100px 1fr;"}
    gap: 8px;
  }
`;

export const DetailLabel = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.secondary || "#666"};
  text-transform: uppercase;
  letter-spacing: 0.3px;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    font-size: 11px;
    letter-spacing: 0.2px;
  }
`;

export const DetailValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.text || "#333"};
  word-break: break-word;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    font-size: 12px;
  }
`;

export const PriorityBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  background: ${({ $priority }) => {
    switch ($priority) {
      case "high":
        return "#fff5f5";
      case "low":
        return "#f0f9ff";
      default:
        return "#fffbf0";
    }
  }};
  color: ${({ $priority }) => {
    switch ($priority) {
      case "high":
        return "#c62828";
      case "low":
        return "#0277bd";
      default:
        return "#f57c00";
    }
  }};

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    padding: 3px 10px;
    font-size: 10px;
    border-radius: 10px;
  }
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  background: ${({ $paid }) => ($paid ? "#e8f5e9" : "#fff3e0")};
  color: ${({ $paid }) => ($paid ? "#2e7d32" : "#e65100")};

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    padding: 3px 10px;
    font-size: 10px;
    border-radius: 10px;
  }
`;

export const BankIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ $color }) => $color || "#333"};
  font-size: 14px;
  font-weight: 600;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    font-size: 12px;
    gap: 6px;
  }
`;

export const OverdueWarning = styled.div`
  width: 100%;
  color: #c62828;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    font-size: 12px;
    margin-bottom: 6px;
  }
`;

export const InstallmentBadge = styled.span`
  display: inline-block;
  padding: 4px 10px;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    padding: 3px 8px;
    font-size: 9px;
    border-radius: 6px;
  }
`;

export const FamilyBadge = styled.span`
  font-size: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    font-size: 14px;
  }
`;

export const NotesText = styled.div`
  font-size: 14px;
  font-style: italic;
  color: ${({ theme }) => theme.colors?.secondary || "#666"};
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 3px solid #667eea;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    font-size: 12px;
    padding: 10px;
    border-radius: 6px;
  }
`;

export const ActionsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors?.border || "#e8e8ea"};

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    gap: 10px;
    padding-top: 12px;
  }
`;

export const ActionButton = styled.button`
  padding: 14px 20px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: inherit;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    padding: 12px 16px;
    font-size: 12px;
    border-radius: 10px;
    gap: 6px;
  }

  ${({ $variant }) => {
    switch ($variant) {
      case "status":
        return `
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          &:hover {
            background: linear-gradient(135deg, #5568d3 0%, #764ba2 100%);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
          }
        `;
      case "edit":
        return `
          background: #fffbf0;
          color: #f57c00;
          border: 1px solid #ffe0b2;
          &:hover {
            background: #fff8e1;
          }
        `;
      case "download":
        return `
          background: #e3f2fd;
          color: #0277bd;
          border: 1px solid #90caf9;
          &:hover {
            background: #bbdefb;
          }
        `;
      case "delete":
        return `
          background: #fff5f5;
          color: #c62828;
          border: 1px solid #ffcdd2;
          &:hover {
            background: #ffebee;
          }
        `;
      default:
        return `
          background: #f0f0f0;
          color: #333;
          &:hover {
            background: #e0e0e0;
          }
        `;
    }
  }}

  &:active {
    transform: translateY(0);
  }
`;
