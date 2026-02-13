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
    transform: translate(-50%, -60%);
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
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  padding: 40px;
  min-width: 320px;
  max-width: 500px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: ${slideIn} 0.3s ease-out;
  z-index: 10000;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    min-width: 280px;
    max-width: 90%;
    padding: 30px 25px;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  svg {
    width: 64px;
    height: 64px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    margin-bottom: 16px;

    svg {
      width: 52px;
      height: 52px;
    }
  }
`;

export const Title = styled.h3`
  text-align: center;
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    font-size: 20px;
  }
`;

export const Message = styled.p`
  text-align: center;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.6;
  margin-bottom: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    font-size: 15px;
    margin-bottom: 28px;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 14px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 123, 255, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    padding: 13px;
    font-size: 15px;
  }
`;
