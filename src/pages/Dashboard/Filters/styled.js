import styled from "styled-components";

export const FiltersContainer = styled.div`
  background: transparent;
  padding: 0;
`;

export const FiltersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
`;

export const FiltersTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ActiveBadge = styled.span`
  color: #667eea;
  font-size: 20px;
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
  padding: 4px 12px;
  background: transparent;
  color: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  font-size: 12px;
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
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  grid-column: ${({ $fullWidth }) => ($fullWidth ? "1 / -1" : "auto")};
`;

export const FilterLabel = styled.label`
  font-size: 11px;
  font-weight: 600;
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
  background: ${({ $active }) =>
    $active ? "#667eea" : "#f0f0f5"};
  color: ${({ $active }) =>
    $active ? "white" : "#6b7280"};
  border: none;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  white-space: nowrap;

  &:hover {
    background: ${({ $active }) =>
      $active ? "#5568d3" : "#e5e5ea"};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
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
  padding: 8px 12px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 13px;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  background: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    padding: 7px 10px;
    font-size: 12px;
  }
`;
