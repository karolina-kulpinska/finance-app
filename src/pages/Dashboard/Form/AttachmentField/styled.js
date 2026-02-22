import styled from "styled-components";

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  grid-column: ${({ $fullWidth }) => ($fullWidth ? "1 / -1" : "auto")};
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const Input = styled.input`
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
    border-color: #3182ce;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
  }

  &[type="file"] {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    cursor: pointer;
  }
`;

export const FileInputWrapper = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  background: white;
  transition: all 0.2s ease;

  &:hover {
    border-color: #3182ce;
    background: rgba(49, 130, 206, 0.04);
  }
`;

export const FileInputLabel = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 12px;
`;

export const ChooseFileButton = styled.span`
  flex-shrink: 0;
  padding: 4px 10px;
  background: #3182ce;
  color: white;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
`;

export const FileInfo = styled.div`
  margin-top: 8px;
  padding: 8px;
  background: rgba(102, 126, 234, 0.05);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 6px;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
`;

export const CompressionInfo = styled.span`
  color: #38a169;
  font-weight: 600;
  display: block;
  margin-top: 4px;
  font-size: 10px;
`;

export const ProUpsell = styled.div`
  padding: 10px 12px;
  background: rgba(102, 126, 234, 0.08);
  border: 1px dashed rgba(102, 126, 234, 0.4);
  border-radius: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.4;
`;
