import styled from "styled-components";

export const FiltersContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 28px 32px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme }) => theme.colors.border};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 20px;
  }
`;

export const FiltersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

export const FiltersTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const ClearButton = styled.button`
  padding: 6px 14px;
  background: transparent;
  color: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    background: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  grid-column: ${({ $fullWidth }) => ($fullWidth ? "1 / -1" : "auto")};
`;

export const FilterLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const FilterButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const FilterButton = styled.button`
  padding: 10px 20px;
  background: ${({ $active, theme }) =>
    $active ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "white"};
  color: ${({ $active, theme }) =>
    $active ? "white" : theme.colors.secondary};
  border: 2px solid
    ${({ $active, theme }) =>
      $active ? "transparent" : theme.colors.border};
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;
  white-space: nowrap;
  box-shadow: ${({ $active }) =>
    $active ? "0 4px 15px rgba(102, 126, 234, 0.3)" : "none"};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ $active }) =>
      $active
        ? "0 6px 20px rgba(102, 126, 234, 0.4)"
        : "0 2px 8px rgba(0, 0, 0, 0.1)"};
    background: ${({ $active }) =>
      $active
        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        : "#f8f9fa"};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;

export const DateInputs = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    flex-direction: column;
  }
`;

export const DateInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  font-size: 15px;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  background: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    padding: 10px 14px;
    font-size: 14px;
  }
`;
