import styled from "styled-components";

export const TableWrapper = styled.div`
  margin-top: 40px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  padding: 20px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  th {
    color: ${({ theme }) => theme.colors.secondary};
    padding: 15px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.border};
    font-size: 14px;
    text-transform: uppercase;
  }

  td {
    padding: 15px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Status = styled.span`
  font-weight: 600;
  color: ${({ $paid, theme }) =>
    $paid ? theme.colors.success : theme.colors.error};
`;

export const NoData = styled.p`
  text-align: center;
  margin-top: 40px;
  color: ${({ theme }) => theme.colors.secondary};
  font-style: italic;
`;
