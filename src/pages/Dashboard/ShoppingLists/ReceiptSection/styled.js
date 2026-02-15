import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Title = styled.h4`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 12px 0;
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 8px;
`;

export const ReceiptName = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
`;

export const DeleteButton = styled.button`
  padding: 6px 10px;
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }

  &:active {
    transform: scale(0.9);
  }
`;

export const FileInput = styled.div`
  input[type="file"] {
    display: none;
  }
`;

export const FileLabel = styled.label`
  display: inline-block;
  padding: 10px 16px;
  background: #667eea;
  color: white;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #5568d3;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }
`;
