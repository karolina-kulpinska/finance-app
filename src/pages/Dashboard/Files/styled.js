import styled from "styled-components";

export const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8e8ea;

  @media (min-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    flex-direction: row;
    align-items: center;
    gap: 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    padding: 8px;
    gap: 6px;
  }
`;

export const FiltersChipsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  @media (min-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    flex: 1;
    flex-wrap: nowrap;
  }
`;

export const DateInputs = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  @media (min-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    flex-shrink: 0;
  }
`;

export const DateInput = styled.input`
  padding: 6px 10px;
  border: 1px solid ${({ theme }) => theme.colors?.border || "#e0e0e0"};
  border-radius: 8px;
  font-size: 12px;
  font-family: inherit;
  transition: all 0.2s ease;
  background: #f8f8fa;
  color: ${({ theme }) => theme.colors?.text || "#333"};

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    padding: 4px 6px;
    font-size: 11px;
    flex: 1;
    min-width: 0;
  }
`;

export const DateSeparator = styled.span`
  color: ${({ theme }) => theme.colors?.secondary || "#999"};
  font-weight: 700;
  font-size: 14px;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    font-size: 12px;
  }
`;
export const FilesActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    gap: 8px;
    margin-bottom: 6px;
  }
`;

export const SelectAllCheckbox = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 4px;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    width: 16px;
    height: 16px;
  }
`;

export const SelectAllLabel = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors?.secondary || "#888"};
  margin-right: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    font-size: 11px;
    margin-right: 8px;
  }
`;

export const DownloadSelectedButton = styled.button`
  padding: 8px 16px;
  background: ${({ $variant }) =>
    $variant === "pdf"
      ? "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    padding: 5px 10px;
    font-size: 11px;
    font-weight: 600;
    border-radius: 6px;
  }
`;

export const FileCheckbox = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 8px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
  overflow: hidden;
`;

export const FilterChip = styled.button`
  padding: 6px 12px;
  background: ${({ $active }) => ($active ? "#667eea" : "#f8f8fa")};
  color: ${({ $active }) => ($active ? "white" : "#8b8b8b")};
  border: none;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background: ${({ $active }) => ($active ? "#5568d3" : "#ebebed")};
  }

  &:active {
    transform: scale(0.96);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    padding: 4px 8px;
    font-size: 10px;
    font-weight: 600;
    border-radius: 8px;
  }
`;

export const FilesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  min-width: 0;
  overflow: hidden;
`;

export const FileCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8e8ea;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 0;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }

  &:active {
    transform: scale(0.99);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || "768px"}) {
    padding: 10px;
    gap: 8px;
  }
`;

export const FileIcon = styled.div`
  font-size: 32px;
  flex-shrink: 0;
`;

export const FileInfo = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const FileName = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const FileDetails = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.secondary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const FileDate = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const FileActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

export const DownloadIcon = styled.div`
  font-size: 20px;
  opacity: 0.6;
  cursor: pointer;
`;

export const DeleteIcon = styled.button`
  font-size: 18px;
  padding: 4px;
  border: none;
  background: none;
  cursor: pointer;
  opacity: 0.7;
  border-radius: 4px;

  &:hover:not(:disabled) {
    opacity: 1;
    background: #ffebee;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const FileFromListLabel = styled.span`
  font-size: 20px;
  flex-shrink: 0;
  opacity: 0.7;
`;

export const EmptyState = styled.div`
  background: white;
  border-radius: 12px;
  padding: 60px 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  text-align: center;
`;

export const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

export const EmptyTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 8px 0;
`;

export const EmptyText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0;
`;

export const ConfirmOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const ConfirmModalBox = styled.div`
  background: ${({ theme }) => theme.colors?.white || "#fff"};
  border-radius: 16px;
  padding: 24px;
  min-width: 280px;
  max-width: 90vw;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  text-align: center;
`;

export const ConfirmTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: ${({ theme }) => theme.colors?.text || "#333"};
`;

export const ConfirmMessage = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors?.secondary || "#666"};
  line-height: 1.5;
  margin: 0 0 20px 0;
`;

export const ConfirmButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

export const ConfirmCancelBtn = styled.button`
  padding: 10px 20px;
  background: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #e0e0e0;
  }
`;

export const ConfirmDeleteBtn = styled.button`
  padding: 10px 20px;
  background: #d9534f;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: #c9302c;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
