import styled from "styled-components";

export const Container = styled.div`
  padding: 0;
  padding-bottom: 80px;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 32px 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 24px 16px;
  }
`;

export const EmptyIcon = styled.div`
  color: #3182ce;
  margin-bottom: 16px;
  opacity: 0.9;

  svg {
    display: block;
    margin: 0 auto;
  }
`;

export const EmptyTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 8px 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 16px;
  }
`;

export const EmptyText = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.5;
  margin: 0 0 20px 0;
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 12px;
    margin-bottom: 16px;
  }
`;

export const CreateFamilyButton = styled.button`
  background: linear-gradient(135deg, #3182ce 0%, #764ba2 100%);
  border: none;
  border-radius: 10px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(44, 82, 130, 0.35);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled,
  &[data-demo="true"] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
