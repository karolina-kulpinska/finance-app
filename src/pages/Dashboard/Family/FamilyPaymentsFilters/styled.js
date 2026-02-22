import styled from "styled-components";

export const Container = styled.div`
  background: white;
  border-radius: 12px;
  padding: 10px 12px;
  box-shadow: ${({ theme }) => theme.shadows?.tile || "0 1px 4px rgba(0,0,0,0.08)"};
  border: 1px solid ${({ theme }) => theme.colors?.border || "#e0e0e0"};
  margin-bottom: 12px;
`;

export const QuickFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
`;

export const Chip = styled.button`
  padding: 6px 10px;
  border: 1px solid ${({ theme }) => theme.colors?.border || "#e0e0e0"};
  border-radius: 8px;
  background: ${({ $active }) => ($active ? "#2c5282" : "white")};
  color: ${({ $active }) => ($active ? "white" : "#333")};
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    background: ${({ $active }) => ($active ? "#234a72" : "#f8f9fa")};
    border-color: #2c5282;
  }
`;

export const CustomSection = styled.div`
  margin-bottom: 10px;
  padding-top: 8px;
  border-top: 1px solid ${({ theme }) => theme.colors?.border || "#e0e0e0"};
`;

export const Label = styled.label`
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.secondary || "#666"};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: 6px;
`;

export const DateRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DateWrap = styled.div`
  flex: 1;
  min-width: 0;

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container input {
    width: 100%;
    padding: 8px 10px;
    border: 1px solid ${({ theme }) => theme.colors?.border || "#e0e0e0"};
    border-radius: 8px;
    font-size: 12px;
    font-family: inherit;
  }

  .react-datepicker__input-container input:focus {
    outline: none;
    border-color: #2c5282;
  }
`;

export const Separator = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors?.secondary || "#999"};
`;

export const SearchRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 10px;
  font-size: 14px;
  pointer-events: none;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 8px 32px 8px 32px;
  border: 1px solid ${({ theme }) => theme.colors?.border || "#e0e0e0"};
  border-radius: 8px;
  font-size: 13px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #2c5282;
  }
`;

export const ClearBtn = styled.button`
  position: absolute;
  right: 8px;
  background: none;
  border: none;
  font-size: 14px;
  color: #999;
  cursor: pointer;
  padding: 2px;

  &:hover {
    color: #333;
  }
`;
