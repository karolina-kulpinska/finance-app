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

export const AddButton = styled.button`
  padding: 8px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const ListsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 0 2px;
  }
`;
