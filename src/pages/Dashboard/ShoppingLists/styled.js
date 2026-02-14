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
`;

export const FiltersSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FilterLabel = styled.label`
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const QuickFilters = styled.div`
  display: flex;
  gap: 6px;
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

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const PriceFilter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PriceInputs = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PriceInput = styled.input`
  flex: 1;
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
`;

export const PriceSeparator = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 700;
`;

export const ClearFiltersButton = styled.button`
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

export const AddForm = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme }) => theme.colors.border};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    padding: 8px 4px;
  }
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

export const SaveButton = styled.button`
  padding: 10px 16px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    background: #5568d3;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  cursor: pointer;
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const CheckboxLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const ListsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 0 2px;
  }
`;

export const ListCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 0;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  &:active {
    transform: scale(0.98);
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    padding: 10px 6px;
  }
`;

export const ListName = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 8px 0;
`;

export const ListStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

export const ItemCount = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const TotalPrice = styled.div`
  font-size: 16px;
  font-weight: 900;
  color: #667eea;
`;

export const SharedBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 700;
  margin-top: 8px;
`;

export const BackButton = styled.button`
  padding: 6px 12px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    background: #f8f9fa;
  }
`;

export const DeleteButton = styled.button`
  padding: 6px 12px;
  background: #fff5f5;
  border: 1px solid #ffcdd2;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f44336;
    border-color: #f44336;
  }
`;

export const TotalCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const TotalLabel = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: white;
`;

export const TotalAmount = styled.div`
  font-size: 24px;
  font-weight: 900;
  color: white;
`;

export const AddItemForm = styled.form`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  align-items: center;
`;

export const SectionBlock = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const SectionHeader = styled.div`
  font-size: 14px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
  letter-spacing: 0.3px;
`;

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ItemCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  background: ${({ $purchased }) => ($purchased ? "#f5f5f5" : "white")};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

export const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ItemName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: ${({ $purchased }) =>
    $purchased ? "line-through" : "none"};
  opacity: ${({ $purchased }) => ($purchased ? 0.6 : 1)};
`;

export const ItemPrice = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #667eea;
  text-decoration: ${({ $purchased }) =>
    $purchased ? "line-through" : "none"};
  opacity: ${({ $purchased }) => ($purchased ? 0.6 : 1)};
`;

export const DeleteItemButton = styled.button`
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

export const ReceiptSection = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ReceiptTitle = styled.h4`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 12px 0;
`;

export const ReceiptInfo = styled.div`
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

// Empty state
export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
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
