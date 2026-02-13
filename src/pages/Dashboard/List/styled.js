import styled from "styled-components";

export const TableWrapper = styled.div`
  margin-top: 20px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 15px;
  padding: 8px;
  box-shadow: ${({ theme }) => theme.shadows.tile};
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 25px;
    margin-top: 40px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  th,
  td {
    padding: 10px 4px;
    text-align: left;
    font-size: 11px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    word-break: break-all;
    vertical-align: middle;

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      padding: 15px;
      font-size: 15px;
      word-break: normal;
    }
  }

  th:nth-child(1),
  td:nth-child(1) {
    width: 40%;
  }
  th:nth-child(2),
  td:nth-child(2) {
    width: 25%;
  }
  th:nth-child(3),
  td:nth-child(3) {
    width: 25%;
  }
  th:nth-child(4),
  td:nth-child(4) {
    width: 10%;
    text-align: center;
  }
`;

export const StatusIcon = styled.div`
  display: flex;
  justify-content: center;
  font-size: 14px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 18px;
  }
`;

export const NoData = styled.p`
  text-align: center;
  margin-top: 40px;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 4px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.2);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 18px;
  }
`;
