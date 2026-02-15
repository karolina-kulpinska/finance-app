import styled from "styled-components";

export const ListContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px 16px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 16px 12px;
  }
`;

export const ListHeader = styled.div`
  margin-bottom: 16px;
  padding-bottom: 12px;
  padding-top: 4px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 50;
  background: white;
  border-radius: 16px 16px 0 0;
`;

export const ListTitle = styled.h2`
  font-size: 18px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 16px;
  }
`;

export const CollapseButton = styled.button`
  margin: 0 0 12px 0;
  padding: 8px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  box-shadow: 0 2px 12px rgba(102, 126, 234, 0.4);

  &:hover {
    background: linear-gradient(135deg, #5568d3 0%, #764ba2 100%);
  }
`;

export const PaymentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    grid-template-columns: 1fr;
  }
`;
