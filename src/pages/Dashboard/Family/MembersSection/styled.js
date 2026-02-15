import styled from "styled-components";

export const MembersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 4px;
  }
`;

export const MemberCard = styled.div`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 8px 10px;
    gap: 8px;
  }
`;

export const MemberAvatar = styled.div`
  width: 38px;
  height: 38px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 34px;
    height: 34px;
  }
  border-radius: 50%;
  background: ${({ $isOwner }) =>
    $isOwner
      ? "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)"
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: ${({ $isOwner }) => ($isOwner ? "#333" : "white")};
  flex-shrink: 0;
`;

export const MemberInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const MemberName = styled.div`
  font-size: 13px;
  font-weight: 600;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 12px;
  }
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2px;
`;

export const MemberEmail = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const OwnerBadge = styled.span`
  display: inline-block;
  padding: 2px 6px;
  background: rgba(255, 215, 0, 0.2);
  border-radius: 4px;
  font-size: 9px;
  font-weight: 600;
  color: #b8860b;
  margin-top: 2px;
`;

export const RemoveButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #ffebee;
  color: #f44336;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover {
    background: #f44336;
    color: white;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const PendingDivider = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 16px 0 8px 0;
`;

export const PendingCard = styled.div`
  background: #fffbf0;
  border: 1px dashed rgba(255, 167, 38, 0.5);
  border-radius: 8px;
  padding: 8px 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 6px 8px;
  }
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PendingIcon = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ffa726;
  flex-shrink: 0;
`;

export const PendingEmail = styled.div`
  flex: 1;
  font-size: 13px;
  font-weight: 600;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
