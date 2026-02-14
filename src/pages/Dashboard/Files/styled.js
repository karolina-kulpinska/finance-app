import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FiltersRow = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  background: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8e8ea;
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

  &:hover {
    background: ${({ $active }) => ($active ? "#5568d3" : "#ebebed")};
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const FilesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
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

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }

  &:active {
    transform: scale(0.99);
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

export const DownloadIcon = styled.div`
  font-size: 20px;
  flex-shrink: 0;
  opacity: 0.6;
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
