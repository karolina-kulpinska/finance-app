import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease;
  padding: 20px;
`;

export const Modal = styled.div`
  background: white;
  border-radius: 24px;
  padding: 40px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: ${slideUp} 0.4s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 30px 25px;
    max-height: 85vh;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    padding: 25px 20px;
  }
`;

export const FormTitle = styled.h2`
  font-size: 28px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 24px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  grid-column: ${({ $fullWidth }) => ($fullWidth ? "1 / -1" : "auto")};
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const Input = styled.input`
  padding: 14px 16px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  font-size: 15px;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  background: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
    opacity: 0.6;
  }

  &[type="file"] {
    padding: 10px;
    cursor: pointer;
  }
`;

export const Select = styled.select`
  padding: 14px 16px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  font-size: 15px;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

export const TextArea = styled.textarea`
  padding: 14px 16px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  font-size: 15px;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  background: white;
  resize: vertical;
  min-height: 80px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
    opacity: 0.6;
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 13px;
  margin: 0;
  font-weight: 500;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 28px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    flex-direction: column-reverse;
  }
`;

export const SubmitButton = styled.button`
  flex: 1;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: 16px;
  background: white;
  color: ${({ theme }) => theme.colors.text};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;

  &:hover {
    background: ${({ theme }) => theme.colors.border};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const FileInfo = styled.div`
  margin-top: 8px;
  padding: 12px;
  background: rgba(102, 126, 234, 0.05);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
`;

export const CompressionInfo = styled.span`
  color: #43e97b;
  font-weight: 600;
`;
