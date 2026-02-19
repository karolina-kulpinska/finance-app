import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

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

export const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #4facfe);
  background-size: 400% 400%;
  animation: ${gradient} 15s ease infinite;
  padding: 20px;
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
      rgba(255, 255, 255, 0.05) 1px,
      transparent 1px
    );
    background-size: 50px 50px;
  }
`;

export const Form = styled.form`
  width: 100%;
  max-width: 480px;
  padding: 50px 45px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: 28px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.5);
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    padding: 40px 30px;
    border-radius: 24px;
    max-width: 100%;
  }

  @media (max-width: 380px) {
    padding: 30px 20px;
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 900;
  text-align: center;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.text};
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    font-size: 28px;
  }

  @media (max-width: 380px) {
    font-size: 24px;
  }
`;

export const Subtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 15px;
  margin-bottom: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    font-size: 14px;
    margin-bottom: 28px;
  }
`;

export const InputWrapper = styled.div`
  margin-bottom: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    margin-bottom: 18px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  font-size: 16px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    transform: translateY(-2px);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
    opacity: 0.7;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    padding: 14px 18px;
    font-size: 16px;
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 13px;
  margin-top: 8px;
  padding-left: 4px;
  font-weight: 500;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    font-size: 12px;
  }
`;

export const StyledButton = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);

  &:disabled {
    background: ${({ theme }) => theme.colors.secondary};
    cursor: not-allowed;
    opacity: 0.6;
    box-shadow: none;
  }

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(-1px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    padding: 15px;
    font-size: 16px;
  }
`;

export const Divider = styled.div`
  margin: 32px 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 14px;
  font-weight: 500;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 40%;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
  }

  &::before {
    left: 0;
  }
  &::after {
    right: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    margin: 28px 0;
    font-size: 13px;
  }
`;

export const GoogleButton = styled.button`
  width: 100%;
  padding: 15px 20px;
  background: white;
  color: ${({ theme }) => theme.colors.text};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  font-size: 16px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  line-height: 1;

  svg {
    flex-shrink: 0;
    display: block;
  }

  span {
    display: block;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #f8f9fa;
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    padding: 14px 18px;
    font-size: 15px;
  }
`;

export const LinkContainer = styled.div`
  margin-top: 28px;
  text-align: center;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.secondary};

  a {
    color: #667eea;
    text-decoration: none;
    font-weight: 700;
    margin-left: 5px;
    transition: all 0.2s ease;

    &:hover {
      text-decoration: underline;
      color: #764ba2;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    font-size: 14px;
    margin-top: 24px;
  }
`;

export const InviteInfo = styled.div`
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  border: 2px solid #66bb6a;
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 20px;
  font-size: 13px;
  color: #2e7d32;
  font-weight: 600;
  text-align: center;
  
  strong {
    color: #1b5e20;
    font-weight: 900;
  }
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 8px;
  margin-top: 4px;
`;

export const Checkbox = styled.input`
  margin-top: 4px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #667eea;
  flex-shrink: 0;
`;

export const CheckboxLabel = styled.label`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.6;
  cursor: pointer;
  user-select: none;
  display: block;
  flex: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    font-size: 11px;
    line-height: 1.5;
  }

  @media (max-width: 380px) {
    font-size: 10px;
  }
`;

export const TermsLink = styled(Link)`
  color: #667eea;
  text-decoration: underline;
  font-weight: 600;
  transition: color 0.2s ease;

  &:hover {
    color: #764ba2;
  }
`;
