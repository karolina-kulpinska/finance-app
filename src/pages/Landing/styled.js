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

const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const Wrapper = styled.main`
  min-height: 100vh;
  background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #4facfe);
  background-size: 400% 400%;
  animation: ${gradient} 15s ease infinite;
  padding: 80px 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 1px,
      transparent 1px
    );
    background-size: 50px 50px;
    animation: ${float} 20s ease-in-out infinite;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 60px 20px;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

export const Hero = styled.div`
  text-align: center;
  margin-bottom: 80px;
  animation: ${fadeIn} 0.8s ease-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 60px;
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

export const FeaturesSection = styled.div`
  animation: ${fadeIn} 0.8s ease-out 0.2s both;
`;

export const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const Feature = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 40px 30px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.5);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
    background: white;
  }
`;

export const FeatureIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
  animation: ${float} 3s ease-in-out infinite;
`;

export const FeatureTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
`;

export const FeatureDescription = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.6;
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
