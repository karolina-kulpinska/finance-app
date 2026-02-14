import styled from "styled-components";

export const SelectorContainer = styled.div`
  width: 100%;
`;

export const BankGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

export const BankTile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 10px;
  border: 2px solid
    ${({ $color, $selected }) => ($selected ? $color : `${$color}30`)};
  border-radius: 10px;
  background: ${({ $color, $selected }) =>
    $selected ? `${$color}15` : "white"};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    border-color: ${({ $color }) => $color};
    background: ${({ $color }) => `${$color}10`};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color }) => $color};
  width: 40px;
  height: 40px;

  svg {
    color: inherit;
  }
`;

export const BankLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  word-break: break-word;
`;

export const SelectionCheckmark = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
`;
