import styled from "styled-components";

export const FiltersContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 10px 12px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    padding: 8px 10px;
  }
`;

export const FilterRow = styled.div`
  display: flex;
  align-items: stretch;
  gap: 0;
  flex-wrap: nowrap;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const QuickFilters = styled.div`
  display: flex;
  gap: 0;
  flex-wrap: nowrap;
  flex: 1;
  min-width: 0;
`;

export const QuickChip = styled.button`
  padding: 6px 10px;
  border: none;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0;
  background: ${({ $active }) => ($active ? "#667eea" : "white")};
  color: ${({ $active, theme }) => ($active ? "white" : theme.colors.text)};
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  white-space: nowrap;
  flex: 1;
  min-width: 0;

  &:last-child {
    border-right: none;
  }

  &:hover {
    background: ${({ $active }) => ($active ? "#5568d3" : "#f8f9fa")};
  }

  &:active {
    transform: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    padding: 5px 6px;
    font-size: 10px;
  }
`;

export const AdvancedToggle = styled.button`
  padding: 6px 10px;
  border: none;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0;
  background: white;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background: #f8f9fa;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    padding: 5px 8px;
    font-size: 10px;
  }
`;

export const AdvancedSection = styled.div`
  margin-top: 0;
  padding-top: 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
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
  gap: 5px;
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
  white-space: nowrap;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    padding: 5px 10px;
    font-size: 11px;
  }
`;

export const AmountInputs = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    gap: 4px;
  }
`;

export const AmountInput = styled.input`
  flex: 1;
  min-width: 0;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    padding: 6px 8px;
    font-size: 12px;
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
