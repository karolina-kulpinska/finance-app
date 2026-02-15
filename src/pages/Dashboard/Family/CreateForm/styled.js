import styled from "styled-components";

export const Container = styled.div`
  padding: 0;
  padding-bottom: 80px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const BackButton = styled.button`
  background: white;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    background: #f8f9fa;
  }
`;

export const CreateCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  text-align: center;
  max-width: 400px;
  margin: 40px auto;
`;

export const CreateIcon = styled.div`
  font-size: 60px;
  margin-bottom: 16px;
`;

export const CreateTitle = styled.h3`
  font-size: 20px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 8px 0;
`;

export const CreateDesc = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.5;
  margin: 0 0 20px 0;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  font-size: 14px;
  font-family: inherit;
  margin-bottom: 16px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

export const CreateButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 10px;
  padding: 12px;
  font-size: 14px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
