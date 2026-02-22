import styled from "styled-components";

export const Container = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;

export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  accent-color: #3182ce;
  cursor: pointer;
`;

export const NumberInput = styled.input`
  padding: 12px 16px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  max-width: 100px;

  &:focus {
    outline: none;
    border-color: #3182ce;
  }
`;

export const Hint = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const SaveButton = styled.button`
  padding: 12px 20px;
  background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  align-self: flex-start;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(44, 82, 130, 0.4);
  }
`;
