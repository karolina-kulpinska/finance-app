import styled from "styled-components";

export const BottomNavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  padding-bottom: env(safe-area-inset-bottom);
`;

export const NavWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 8px 0;
`;

export const NavItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  transition: all 0.3s ease;
  flex: 1;
  gap: 4px;

  &:active {
    transform: scale(0.95);
  }
`;

export const NavIcon = styled.span`
  font-size: 24px;
  transition: all 0.3s ease;
  transform: ${({ $active }) => ($active ? "scale(1.2)" : "scale(1)")};
  filter: ${({ $active }) =>
    $active ? "drop-shadow(0 2px 4px rgba(102, 126, 234, 0.3))" : "none"};
`;

export const NavLabel = styled.span`
  font-size: 11px;
  font-weight: ${({ $active }) => ($active ? "700" : "500")};
  color: ${({ $active, $isLogout, theme }) =>
    $isLogout ? "#f5576c" : $active ? "#667eea" : theme.colors.secondary};
  transition: all 0.3s ease;
`;
