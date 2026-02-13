import styled from "styled-components";
import Button from "../../components/Button";

export const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  box-shadow: ${({ theme }) =>
    theme.shadows.tile || "0 10px 25px rgba(0, 0, 0, 0.05)"};
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 15px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error || "#ff4d4f"};
  font-size: 12px;
  margin-top: -10px;
  margin-bottom: 15px;
`;

export const StyledButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition:
    opacity 0.2s,
    background-color 0.2s;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.secondary};
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    filter: brightness(1.1);
  }
`;

export const Divider = styled.div`
  margin: 30px 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 14px;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 35%;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
  }

  &::before {
    left: 0;
  }
  &::after {
    right: 0;
  }
`;

export const GoogleButton = styled(Button)`
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    filter: none;
  }
`;

export const LinkContainer = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.secondary};

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;
