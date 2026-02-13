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

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

export const BenefitsSection = styled.div`
  margin-top: 80px;
  animation: ${fadeIn} 0.8s ease-out 0.4s both;
`;

export const SectionTitle = styled.h2`
  font-size: 42px;
  font-weight: 900;
  color: white;
  text-align: center;
  margin-bottom: 60px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 32px;
    margin-bottom: 40px;
  }
`;

export const Benefits = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const Benefit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 50px 40px;
  border-radius: 24px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;

  &:hover {
    background: white;
    transform: translateY(-8px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  }
`;

export const BenefitIcon = styled.div`
  font-size: 56px;
  flex-shrink: 0;
  animation: ${float} 3s ease-in-out infinite;
`;

export const BenefitContent = styled.div`
  color: ${({ theme }) => theme.colors.text};
`;

export const BenefitTitle = styled.h4`
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.text};
`;

export const BenefitDescription = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.6;
`;
