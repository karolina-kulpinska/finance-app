import styled from "styled-components";

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  grid-column: ${({ $fullWidth }) => ($fullWidth ? "1 / -1" : "auto")};
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const Select = styled.select`
  padding: 8px 12px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 13px;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
  }
`;

export const Input = styled.input`
  padding: 8px 12px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 13px;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  background: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
    opacity: 0.6;
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 11px;
  margin: 0;
  font-weight: 600;
  margin-top: -2px;
`;

export const TotalAmountBox = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #3182ce 0%, #764ba2 100%);
  border-radius: 10px;
  padding: 14px 16px;
  margin: 8px 0;
`;

export const TotalLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const TotalValue = styled.div`
  font-size: 20px;
  font-weight: 900;
  color: white;
`;
