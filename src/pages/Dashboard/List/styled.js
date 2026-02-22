import styled from "styled-components";

export const ListContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px 16px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 16px 12px;
  }
`;

export const ListHeader = styled.div`
  margin-bottom: 16px;
  padding-bottom: 12px;
  padding-top: 4px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 50;
  background: white;
  border-radius: 16px 16px 0 0;
  flex-wrap: wrap;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const SelectAllWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.text || "#333"};
`;

export const SelectAllCheckbox = styled.input`
  width: 18px;
  height: 18px;
`;

export const SelectAllLabel = styled.span`
  white-space: nowrap;
`;

export const BulkDeleteButton = styled.button`
  padding: 6px 10px;
  background: #fff5f5;
  color: #c62828;
  border: 1px solid #ffcdd2;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #ffebee;
  }
`;

export const ListTitle = styled.h2`
  font-size: 18px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 16px;
  }
`;

export const CollapseButton = styled.button`
  margin: 0;
  padding: 8px 16px;
  background: linear-gradient(135deg, #3182ce 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  box-shadow: 0 2px 12px rgba(102, 126, 234, 0.4);

  &:hover {
    background: linear-gradient(135deg, #1e4976 0%, #764ba2 100%);
  }
`;

export const PaymentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    grid-template-columns: 1fr;
  }
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

  &:hover {
    background: #c9302c;
  }
`;
