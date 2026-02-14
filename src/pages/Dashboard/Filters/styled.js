import styled from "styled-components";

export const FiltersContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 12px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 16px;
`;

export const FilterRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
`;

export const QuickFilters = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  flex: 1;
  min-width: 0;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    flex-wrap: wrap;
    gap: 8px;
  }
`;

export const QuickChip = styled.button`
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid
    ${({ $active, theme }) => ($active ? "#667eea" : theme.colors.border)};
  background: ${({ $active }) => ($active ? "#667eea" : "white")};
  color: ${({ $active, theme }) => ($active ? "white" : theme.colors.text)};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const AdvancedToggle = styled.button`
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: white;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  white-space: nowrap;
  margin-left: 8px;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-left: 0;
    width: 100%;
  }
  &:hover {
    background: #f8f9fa;
  }
`;

export const AdvancedSection = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FilterLabel = styled.label`
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const FilterButtons = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

export const FilterChip = styled.button`
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid
    ${({ $active, theme }) => ($active ? "#667eea" : theme.colors.border)};
  background: ${({ $active }) => ($active ? "#667eea" : "white")};
  color: ${({ $active, theme }) => ($active ? "white" : theme.colors.text)};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const AmountInputs = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const AmountInput = styled.input`
  flex: 1;
  padding: 8px 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 13px;
  font-family: inherit;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const AmountSeparator = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 700;
`;

export const ClearButton = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background: white;
  color: #9e9e9e;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    border-color: #f44336;
    color: #f44336;
    background: #fff5f5;
  }

  &:active {
    transform: scale(0.98);
  }
`;
