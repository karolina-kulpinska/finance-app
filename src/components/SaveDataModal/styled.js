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
    transform: translate(-50%, -55%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
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
  max-width: 500px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: ${slideIn} 0.3s ease-out;
  z-index: 10000;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 95%;
    max-width: 95%;
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 100%;
    border-radius: 0;
    top: 0;
    left: 0;
    transform: none;
    height: 100vh;
  }
`;

export const Header = styled.div`
  padding: 24px 24px 16px;
  border-bottom: 2px solid #f0f0f0;
  text-align: center;

  @media (max-width: 480px) {
    padding: 20px 16px 12px;
  }
`;

export const Icon = styled.div`
  font-size: 48px;
  margin-bottom: 12px;
`;

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.text || "#333"};
  margin: 0;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const Content = styled.div`
  padding: 24px;
  flex: 1;

  @media (max-width: 480px) {
    padding: 20px 16px;
  }
`;

export const Message = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors?.text || "#333"};
  line-height: 1.6;
  margin-bottom: 16px;
`;

export const Warning = styled.div`
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  color: #856404;
  margin-bottom: 16px;
  line-height: 1.5;
`;

export const Info = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors?.secondary || "#666"};
  line-height: 1.6;
  margin: 0;
`;

export const Footer = styled.div`
  padding: 16px 24px 24px;
  border-top: 2px solid #f0f0f0;

  @media (max-width: 480px) {
    padding: 12px 16px 20px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PrimaryButton = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const SecondaryButton = styled.button`
  width: 100%;
  padding: 14px;
  background: ${({ theme }) => theme.colors?.white || "#ffffff"};
  color: ${({ theme }) => theme.colors?.primary || "#667eea"};
  border: 2px solid ${({ theme }) => theme.colors?.primary || "#667eea"};
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.1);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const CancelButton = styled.button`
  width: 100%;
  padding: 12px;
  background: transparent;
  color: ${({ theme }) => theme.colors?.secondary || "#666"};
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
    color: ${({ theme }) => theme.colors?.text || "#333"};
  }
`;
