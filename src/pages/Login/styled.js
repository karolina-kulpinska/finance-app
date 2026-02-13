import styled from "styled-components";
import Button from "../../components/Button";

export const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background || "#f4f7f6"};
`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.colors.text || "#333"};
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 15px;
  border: 1px solid ${({ theme }) => theme.colors.border || "#eee"};
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const ErrorMessage = styled.p`
  color: #ff4d4f;
  font-size: 12px;
  margin-top: -10px;
  margin-bottom: 15px;
`;

export const StyledButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;

export const Divider = styled.div`
  margin: 30px 0;
  text-align: center;
  color: #aaa;
  font-size: 14px;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 40%;
    height: 1px;
    background: #eee;
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
  background: #ffffff;
  color: #444444;
  border: 1px solid #dddddd;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background: #f8f8f8;
    filter: none;
  }
`;
