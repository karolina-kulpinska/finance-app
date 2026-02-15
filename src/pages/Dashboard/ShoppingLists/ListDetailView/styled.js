import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  background: white;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const BackButton = styled.button`
  padding: 6px 12px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    background: #f8f9fa;
  }
`;

export const DeleteButton = styled.button`
  padding: 6px 12px;
  background: #fff5f5;
  border: 1px solid #ffcdd2;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f44336;
    border-color: #f44336;
  }
`;

export const GroupToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: white;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 16px;
  cursor: pointer;

  label {
    cursor: pointer;
    margin: 0;
  }
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const CheckboxLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const TotalCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const TotalLabel = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: white;
`;

export const TotalAmount = styled.div`
  font-size: 24px;
  font-weight: 900;
  color: white;
`;
