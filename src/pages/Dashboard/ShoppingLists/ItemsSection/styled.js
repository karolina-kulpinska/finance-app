import styled from "styled-components";

export const Block = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Header = styled.div`
  font-size: 14px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
  letter-spacing: 0.3px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
