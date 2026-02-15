import styled from "styled-components";

export const CollapsibleSection = styled.div`
  margin-bottom: 12px;
  background: white;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
`;

export const CollapsibleHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: ${({ $open }) => ($open ? "rgba(102, 126, 234, 0.08)" : "white")};
  border: none;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.06);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    cursor: default;
    &:hover {
      background: ${({ $open }) => ($open ? "rgba(102, 126, 234, 0.08)" : "white")};
    }
  }
`;

export const CollapsibleTitle = styled.span`
  font-size: 14px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const CollapsibleChevron = styled.span`
  font-size: 18px;
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
  padding: ${({ $open }) => ($open ? "16px" : "0 16px")};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
    padding: 0 16px 16px 16px;
    border-top: none;
  }
`;
