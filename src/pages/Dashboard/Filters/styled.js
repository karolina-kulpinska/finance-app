import styled from "styled-components";

export const FiltersContainer = styled.div`
  background: transparent;
  padding: 0;
  position: relative;
`;

export const FiltersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    flex-direction: row;
    gap: 8px;
  }
`;

export const FiltersTitle = styled.h3`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ActiveBadge = styled.span`
  color: #667eea;
  font-size: 16px;
  line-height: 1;
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 24px;
  background: #f5576c;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  &:hover {
    background: #d84456;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const FiltersGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  grid-column: ${({ $fullWidth }) => ($fullWidth ? "1 / -1" : "auto")};
`;

export const FilterLabel = styled.label`
  font-size: 9px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.7;
`;

export const FilterButtons = styled.div`
  display: flex;
  gap: 3px;
  flex-wrap: wrap;
`;

export const FilterChip = styled.button`
  padding: 3px 8px;
  background: ${({ $active }) =>
    $active ? "#667eea" : "#f8f8fa"};
  color: ${({ $active }) =>
    $active ? "white" : "#8b8b8b"};
  border: none;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: inherit;
  white-space: nowrap;
  line-height: 1;

  &:hover {
    background: ${({ $active }) =>
      $active ? "#5568d3" : "#ebebed"};
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const DateInputs = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const DateInput = styled.input`
  flex: 1;
  padding: 5px 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  font-size: 11px;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  background: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
  }
`;
