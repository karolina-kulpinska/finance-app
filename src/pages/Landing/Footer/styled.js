import styled from "styled-components";
import { Link } from "react-router-dom";

export const Footer = styled.footer`
  margin-top: 80px;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  margin: 0;
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: 24px;
`;

export const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;

  &:hover {
    color: white;
    text-decoration: underline;
  }
`;
