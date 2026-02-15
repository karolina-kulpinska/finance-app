import styled from "styled-components";

export const Card = styled.div`
  background: white;
  border: 2px solid #f44336;
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(244, 67, 54, 0.1);
`;

export const Icon = styled.div`
  font-size: 60px;
  margin-bottom: 16px;
`;

export const Title = styled.h3`
  font-size: 20px;
  font-weight: 900;
  color: #f44336;
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
  padding: 14px;
  background: #f44336;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;

  &:hover {
    background: #d32f2f;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(244, 67, 54, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;
