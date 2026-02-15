import styled from "styled-components";

export const MembersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MemberCard = styled.div`
  background: white;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #667eea;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
  }
`;

export const MemberAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ $isOwner }) =>
    $isOwner
      ? "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)"
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 900;
  color: ${({ $isOwner }) => ($isOwner ? "#333" : "white")};
  flex-shrink: 0;
`;

export const MemberInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const MemberName = styled.div`
  font-size: 14px;
  font-weight: 700;
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
  padding: 3px 8px;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  border-radius: 6px;
  font-size: 10px;
  font-weight: 700;
  color: #333;
  margin-top: 4px;
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
  background: #fff8e1;
  border: 1.5px dashed #ffa726;
  border-radius: 10px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PendingIcon = styled.div`
  font-size: 20px;
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
