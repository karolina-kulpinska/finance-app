import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: #007bff;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 123, 255, 0.2);

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    box-shadow: none;
  }

  ${({ $secondary }) =>
    $secondary &&
    css`
      background-color: #6c757d;
      &:hover {
        box-shadow: 0 4px 8px rgba(108, 117, 125, 0.3);
      }
    `}
`;
