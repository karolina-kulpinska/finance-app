import styled from "styled-components";

export const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const Icon = styled.div`
  font-size: 60px;
  margin-bottom: 16px;
`;

export const Title = styled.h3`
  font-size: 20px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 12px 0;
`;

export const Desc = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.6;
  margin: 0 0 24px 0;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px 20px;
  background: ${({ $secondary }) =>
    $secondary ? "transparent" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};
  color: ${({ $secondary }) => ($secondary ? "#667eea" : "white")};
  border: ${({ $secondary }) =>
    $secondary ? "2px solid #667eea" : "none"};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  margin-top: ${({ $secondary }) => ($secondary ? "8px" : "0")};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: scale(0.98);
  }
`;
