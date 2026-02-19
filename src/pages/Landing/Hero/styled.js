import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Hero = styled.div`
  text-align: center;
  margin-bottom: 80px;
  animation: ${fadeIn} 0.8s ease-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 60px;
  }
`;

export const Logo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  margin-bottom: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    width: 64px;
    height: 64px;
    margin-bottom: 20px;
  }
`;

export const Title = styled.h1`
  font-size: 64px;
  font-weight: 900;
  margin-bottom: 24px;
  color: white;
  line-height: 1.1;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 42px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    font-size: 36px;
  }
`;

export const Subtitle = styled.p`
  font-size: 22px;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 48px;
  line-height: 1.6;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 18px;
    margin-bottom: 36px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    font-size: 16px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    flex-direction: column;
  }
`;

export const PrimaryButton = styled.button`
  padding: 18px 48px;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(102, 126, 234, 0.1);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:hover::before {
    width: 300px;
    height: 300px;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    width: 100%;
    padding: 16px 32px;
  }
`;

export const SecondaryButton = styled.button`
  padding: 18px 48px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: white;
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    width: 100%;
    padding: 16px 32px;
  }
`;

export const DemoButton = styled.button`
  padding: 14px 32px;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #333;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(255, 215, 0, 0.3);
  margin-top: 12px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(255, 215, 0, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    width: 100%;
    padding: 14px 28px;
    font-size: 15px;
  }
`;
