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
  padding: 6px 10px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors?.border || "#e0e0e0"};
  border-radius: 6px;
  font-size: 16px;
  font-weight: 800;
  color: #000;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: #f8f9fa;
  }
`;

export const InviteCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  border: 1px solid ${({ theme }) => theme.colors.border};
  max-width: 360px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 20px;
    margin-top: 20px;
  }
`;

export const InviteTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 8px 0;
`;

export const InviteHint = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.5;
  margin: 0 0 16px 0;
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
    border-color: #2c5282;
    box-shadow: 0 0 0 3px rgba(44, 82, 130, 0.1);
  }
`;

export const InviteButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #2c5282 0%, #2c5282 100%);
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
    box-shadow: 0 6px 16px rgba(44, 82, 130, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
