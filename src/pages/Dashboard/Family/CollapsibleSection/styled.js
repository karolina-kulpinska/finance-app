import styled from "styled-components";

export const CollapsibleSection = styled.div`
  margin-bottom: 8px;
  background: white;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 6px;
  }
`;

export const CollapsibleHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background: ${({ $open }) => ($open ? "rgba(44, 82, 130, 0.06)" : "white")};
  border: none;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  transition: background 0.2s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 10px 12px;
  }

  &:hover {
    background: rgba(44, 82, 130, 0.05);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    cursor: default;
    &:hover {
      background: ${({ $open }) => ($open ? "rgba(44, 82, 130, 0.06)" : "white")};
    }
  }
`;

export const CollapsibleTitle = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 12px;
  }
`;

export const CollapsibleChevron = styled.span`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.secondary};
  transition: transform 0.2s ease;
  transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0)")};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const CollapsibleContent = styled.div`
  @media (max-width: 767px) {
    display: ${({ $open }) => ($open ? "block" : "none")};
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
  padding: ${({ $open }) => ($open ? "12px 14px" : "0 14px")};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ $open }) => ($open ? "10px 12px" : "0 12px")};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
    padding: 0 14px 14px 14px;
    border-top: none;
  }
`;
