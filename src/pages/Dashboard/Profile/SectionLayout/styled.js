import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Header = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const BackButton = styled.button`
  background: #f0f0f5;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;

  &:hover {
    background: #e5e5ea;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  flex: 1;
`;
