import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  background: white;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const AddButton = styled.button`
  padding: 8px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    width: 100%;
  }
`;

export const AddForm = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Input = styled.input`
  padding: 10px 14px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 14px;
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

export const SaveButton = styled.button`
  padding: 10px 16px;
  background: #43e97b;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;

  &:hover {
    background: #38d96a;
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const ListsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const ListCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 2px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #667eea;
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.99);
  }
`;

export const ListIcon = styled.div`
  font-size: 32px;
  margin-bottom: 10px;
`;

export const ListName = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 6px 0;
`;

export const ListInfo = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 4px;
`;

export const ListDate = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const EmptyState = styled.div`
  background: white;
  border-radius: 12px;
  padding: 60px 20px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
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

export const InfoBox = styled.div`
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  border-radius: 12px;
  padding: 16px;
  border: 2px solid #66bb6a;
`;

export const InfoTitle = styled.h4`
  font-size: 14px;
  font-weight: 700;
  color: #2e7d32;
  margin: 0 0 10px 0;
`;

export const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const InfoItem = styled.li`
  font-size: 12px;
  color: #2e7d32;
  padding-left: 8px;
`;

export const BackButton = styled.button`
  padding: 8px 16px;
  background: #f0f0f5;
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;

  &:hover {
    background: #e5e5ea;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const DeleteButton = styled.button`
  padding: 8px 12px;
  background: #ffebee;
  color: #c62828;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ef5350;
    color: white;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const TotalCard = styled.div`
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 12px rgba(67, 233, 123, 0.3);
`;

export const TotalLabel = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: white;
`;

export const TotalAmount = styled.div`
  font-size: 24px;
  font-weight: 900;
  color: white;
`;

export const AddItemForm = styled.div`
  background: white;
  border-radius: 12px;
  padding: 12px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  gap: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    flex-direction: column;
  }
`;

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ItemCard = styled.div`
  background: ${({ $purchased }) => ($purchased ? "#f5f5f7" : "white")};
  border-radius: 8px;
  padding: 10px 12px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme, $purchased }) => 
    $purchased ? "#e5e5ea" : theme.colors.border};
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(2px);
  }
`;

export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #43e97b;
  flex-shrink: 0;
`;

export const ItemInfo = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const ItemName = styled.div`
  flex: 1;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme, $purchased }) => 
    $purchased ? theme.colors.secondary : theme.colors.text};
  text-decoration: ${({ $purchased }) => ($purchased ? "line-through" : "none")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ItemPrice = styled.div`
  font-size: 13px;
  font-weight: 900;
  color: ${({ $purchased }) => ($purchased ? "#a0a0a0" : "#43e97b")};
  text-decoration: ${({ $purchased }) => ($purchased ? "line-through" : "none")};
  white-space: nowrap;
`;

export const DeleteItemButton = styled.button`
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
  transition: all 0.2s ease;
  flex-shrink: 0;
  opacity: 0.6;

  &:hover {
    opacity: 1;
    transform: scale(1.15);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const ReceiptSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ReceiptTitle = styled.h4`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 12px 0;
`;

export const ReceiptInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background: #e8f5e9;
  border-radius: 8px;
`;

export const ReceiptName = styled.div`
  font-size: 13px;
  color: #2e7d32;
  font-weight: 600;
`;

export const FileInput = styled.div`
  input[type="file"] {
    display: none;
  }
`;

export const FileLabel = styled.label`
  display: block;
  padding: 12px;
  background: #f0f0f5;
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  text-align: center;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e5e5ea;
    border-color: #667eea;
    color: #667eea;
  }
`;

export const ListPrice = styled.div`
  font-size: 14px;
  font-weight: 900;
  color: #43e97b;
  margin-top: 4px;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 10px;
`;

export const CheckboxLabel = styled.label`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  user-select: none;
`;

export const SharedBadge = styled.span`
  margin-left: 8px;
  font-size: 14px;
`;
