import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  background: ${({ $purchased }) => ($purchased ? "#f5f5f5" : "white")};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Name = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: ${({ $purchased }) =>
    $purchased ? "line-through" : "none"};
  opacity: ${({ $purchased }) => ($purchased ? 0.6 : 1)};
`;

export const Price = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #3182ce;
  text-decoration: ${({ $purchased }) =>
    $purchased ? "line-through" : "none"};
  opacity: ${({ $purchased }) => ($purchased ? 0.6 : 1)};
`;

export const DeleteButton = styled.button`
  padding: 6px 10px;
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }

  &:active {
    transform: scale(0.9);
  }
`;
