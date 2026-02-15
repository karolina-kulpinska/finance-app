import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
  }
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  @media (max-width: 480px) {
    width: 100%;
    font-size: 15px;
  }
`;

export const SaveButton = styled.button`
  padding: 10px 16px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    background: #5568d3;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 480px) {
    width: 100%;
    font-size: 15px;
  }
`;
