import styled from "styled-components";

export const ContentWrapper = styled.div`
  line-height: 1.7;
  color: ${({ theme }) => theme.colors?.text || "#333"};
`;

export const Section = styled.section`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobileL || "768px"}) {
    margin-bottom: 14px;
  }

  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.primary || "#667eea"};
  margin-bottom: 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid #e0e0e0;

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobileL || "768px"}) {
    font-size: 14px;
    margin-bottom: 6px;
    padding-bottom: 4px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 5px;
    padding-bottom: 3px;
  }
`;

export const Paragraph = styled.p`
  margin-bottom: 8px;
  font-size: 13px;
  text-align: justify;

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobileL || "768px"}) {
    font-size: 13px;
    margin-bottom: 6px;
    text-align: left;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 5px;
  }
`;

export const List = styled.ul`
  margin: 8px 0;
  padding-left: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobileL || "768px"}) {
    margin: 6px 0;
    padding-left: 20px;
  }

  @media (max-width: 480px) {
    margin: 5px 0;
    padding-left: 18px;
  }
`;

export const ListItem = styled.li`
  margin-bottom: 5px;
  font-size: 13px;
  line-height: 1.6;

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobileL || "768px"}) {
    font-size: 13px;
    margin-bottom: 4px;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 3px;
  }
`;

export const Warning = styled.div`
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  font-size: 12px;
  line-height: 1.6;

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobileL || "768px"}) {
    margin: 8px 0;
    padding: 10px;
  }

  @media (max-width: 480px) {
    margin: 6px 0;
    padding: 8px;
  }
`;

export const ContactInfo = styled.div`
  background: transparent;
  padding: 0;
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.6;

  div {
    margin-bottom: 4px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobileL || "768px"}) {
    font-size: 12px;
    margin-top: 6px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
    margin-top: 5px;
    
    div {
      margin-bottom: 3px;
    }
  }
`;
