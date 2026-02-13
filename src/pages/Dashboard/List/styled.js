import styled from "styled-components";

export const TableWrapper = styled.div`
  margin-top: 20px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 15px;
  padding: 8px; // Minimalny odstęp, by nie marnować miejsca
  box-shadow: ${({ theme }) => theme.shadows.tile};
  width: 100%;
  box-sizing: border-box;
  overflow: hidden; // Całkowity zakaz wychodzenia poza ekran

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 25px;
    margin-top: 40px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; // KLUCZ: Wymusza sztywne trzymanie się procentów

  th,
  td {
    padding: 10px 4px; // Ciasno, by wszystko weszło
    text-align: left;
    font-size: 11px; // Mały font na mobile
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    word-break: break-all; // Zawija tekst, jeśli nazwa jest za długa
    vertical-align: middle;

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      padding: 15px;
      font-size: 15px;
      word-break: normal;
    }
  }

  /* Procentowe szerokości kolumn - dopasowane do zawartości */
  th:nth-child(1),
  td:nth-child(1) {
    width: 40%;
  } // Nazwa (najwięcej miejsca)
  th:nth-child(2),
  td:nth-child(2) {
    width: 25%;
  } // Kwota
  th:nth-child(3),
  td:nth-child(3) {
    width: 25%;
  } // Termin
  th:nth-child(4),
  td:nth-child(4) {
    width: 10%;
    text-align: center;
  } // Status
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
