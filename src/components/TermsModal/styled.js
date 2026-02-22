import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const fadeInOnly = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 9999;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.colors.white || "#ffffff"};
  border-radius: 16px;
  width: 90%;
  max-width: 700px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: ${slideIn} 0.3s ease-out;
  z-index: 10000;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobileL || "768px"}) {
    width: 98%;
    max-width: 98%;
    max-height: 95vh;
    border-radius: 12px;
    top: 50%;
    left: 50%;
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 100%;
    max-height: 100vh;
    border-radius: 0;
    top: 0;
    left: 0;
    transform: none;
    height: 100vh;
    animation: ${fadeInOnly} 0.15s ease-out;
  }
`;

export const Header = styled.div`
  padding: 24px 24px 16px;
  border-bottom: 2px solid #f0f0f0;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobileL || "768px"}) {
    padding: 16px 16px 12px;
  }

  @media (max-width: 480px) {
    padding: 12px 12px 10px;
  }
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.text || "#333"};
  margin-bottom: 8px;
  text-align: center;
  line-height: 1.3;

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobileL || "768px"}) {
    font-size: 16px;
    margin-bottom: 6px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    margin-bottom: 4px;
  }
`;

export const Subtitle = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors?.secondary || "#666"};
  text-align: center;
  margin-bottom: 8px;
`;

export const AcceptedDate = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors?.success || "#0f7d4a"};
  text-align: center;
  margin-top: 8px;
  padding: 8px;
  background: rgba(15, 125, 74, 0.1);
  border-radius: 8px;

  strong {
    font-weight: 700;
  }
`;

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
  -webkit-overflow-scrolling: touch;

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobileL || "768px"}) {
    padding: 12px 16px;
  }

  @media (max-width: 480px) {
    padding: 10px 12px;
  }

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;

    &:hover {
      background: #a8a8a8;
    }
  }
`;

export const Footer = styled.div`
  padding: 16px 24px 24px;
  border-top: 2px solid #f0f0f0;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobileL || "768px"}) {
    padding: 12px 16px 16px;
  }

  @media (max-width: 480px) {
    padding: 10px 12px 12px;
  }
`;

export const ScrollHint = styled.div`
  background: linear-gradient(135deg, #fff3cd 0%, #ffe69c 100%);
  border: 2px solid #ffc107;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #856404;
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobileL || "768px"}) {
    font-size: 11px;
    padding: 8px;
    margin-bottom: 10px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 6px;
    margin-bottom: 8px;
  }
`;

export const ScrollButton = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobileL || "768px"}) {
    padding: 10px;
    font-size: 12px;
    margin-bottom: 10px;
  }

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 11px;
    margin-bottom: 8px;
  }
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 16px;
  padding: 12px;
  background: ${({ $disabled }) => ($disabled ? "#f0f0f0" : "#f8f9fa")};
  border-radius: 8px;
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  transition: all 0.3s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobileL || "768px"}) {
    padding: 10px;
    gap: 8px;
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    padding: 8px;
    gap: 6px;
    margin-bottom: 10px;
  }
`;

export const Checkbox = styled.input`
  margin-top: 2px;
  width: 18px;
  height: 18px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  accent-color: #667eea;
  flex-shrink: 0;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobileL || "768px"}) {
    width: 16px;
    height: 16px;
    margin-top: 1px;
  }

  @media (max-width: 480px) {
    width: 14px;
    height: 14px;
    margin-top: 0;
  }
`;

export const CheckboxLabel = styled.label`
  font-size: 12px;
  color: ${({ theme, $disabled }) => 
    $disabled ? "#999" : theme.colors?.text || "#333"};
  line-height: 1.5;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  user-select: none;
  flex: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobileL || "768px"}) {
    font-size: 11px;
    line-height: 1.4;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    line-height: 1.3;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

export const AcceptButton = styled.button`
  flex: 1;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobileL || "768px"}) {
    padding: 13px;
    font-size: 14px;
  }
`;

export const CloseButton = styled.button`
  flex: 1;
  padding: 14px;
  background: ${({ theme }) => theme.colors?.white || "#ffffff"};
  color: ${({ theme }) => theme.colors?.text || "#333"};
  border: 2px solid ${({ theme }) => theme.colors?.border || "#e0e0e0"};
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
    border-color: #667eea;
    transform: translateY(-2px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobileL || "768px"}) {
    padding: 13px;
    font-size: 14px;
  }
`;
