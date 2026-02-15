import styled from "styled-components";

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    padding: 10px 6px;
  }
`;

export const Name = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 8px 0;
`;

export const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

export const ItemCount = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const TotalPrice = styled.div`
  font-size: 16px;
  font-weight: 900;
  color: #667eea;
`;

export const SharedBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 700;
  margin-top: 8px;
`;
