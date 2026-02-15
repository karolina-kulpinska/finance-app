import styled from "styled-components";

export const Container = styled.div`
  padding: 0;
  padding-bottom: 80px;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
`;

export const EmptyIcon = styled.div`
  font-size: 80px;
  margin-bottom: 20px;
`;

export const EmptyTitle = styled.h3`
  font-size: 20px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 12px 0;
`;

export const EmptyText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.6;
  margin: 0 0 24px 0;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

export const CreateFamilyButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;
