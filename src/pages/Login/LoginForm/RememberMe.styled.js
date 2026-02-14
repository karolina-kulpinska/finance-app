import styled from "styled-components";

export const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
  cursor: pointer;
  user-select: none;
`;

export const Checkbox = styled.input`
  accent-color: #667eea;
  width: 18px;
  height: 18px;
  margin: 0;
`;

export const CheckboxLabel = styled.span`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text};
`;
