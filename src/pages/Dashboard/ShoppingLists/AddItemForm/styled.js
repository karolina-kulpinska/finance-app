import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  align-items: center;
`;

export const Input = styled.input`
  flex: 1;
  min-width: 0;
  padding: 8px 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(44, 82, 130, 0.1);
  }
`;

export const PriceInput = styled(Input)`
  flex: 0 0 72px;
  width: 72px;
`;

export const SaveButton = styled.button`
  padding: 8px 12px;
  background: #3182ce;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  white-space: nowrap;

  &:hover {
    background: #5568d3;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }
`;
