import styled from "styled-components";

export const Container = styled.div`
  padding: 0;
  padding-bottom: 80px;
`;

export const LoadingText = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.secondary};
`;

// Family Header - Hero section
export const FamilyHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 28px 20px;
  text-align: center;
  margin-bottom: 16px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
`;

export const HeaderIcon = styled.div`
  font-size: 48px;
  margin-bottom: 12px;
`;

export const FamilyTitle = styled.h1`
  font-size: 22px;
  font-weight: 900;
  color: white;
  margin: 0 0 4px 0;
`;

export const FamilySubtitle = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
`;

export const AddMemberButton = styled.button`
  width: 100%;
  padding: 14px;
  background: white;
  border: 2px solid #667eea;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  color: #667eea;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  margin-bottom: 16px;

  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Section
export const Section = styled.div`
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h3`
  font-size: 13px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 12px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Members List
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
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  };
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

export const SharedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 12px;
`;

export const SharedCard = styled.div`
  background: white;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 16px 12px;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

export const SharedIcon = styled.div`
  font-size: 28px;
  margin-bottom: 8px;
`;

export const SharedCount = styled.div`
  font-size: 24px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

export const SharedLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

export const HintBox = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondary};
  padding: 10px;
  background: #f8f9fa;
  border-radius: 8px;
  text-align: center;
  font-style: italic;
`;

// Link Section - na dole
export const LinkSection = styled.div`
  margin-top: 24px;
  padding-top: 20px;
  border-top: 2px dashed ${({ theme }) => theme.colors.border};
`;

export const LinkTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
  text-align: center;
`;

export const LinkBox = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const LinkIcon = styled.div`
  font-size: 24px;
  flex-shrink: 0;
`;

export const LinkContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const LinkLabel = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: white;
  margin-bottom: 4px;
`;

export const LinkUrl = styled.div`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.85);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: 'Courier New', monospace;
`;

export const CopyIcon = styled.div`
  font-size: 24px;
  flex-shrink: 0;
`;

// Empty State
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

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const BackButton = styled.button`
  background: white;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    background: #f8f9fa;
  }
`;

export const CreateCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  text-align: center;
  max-width: 400px;
  margin: 40px auto;
`;

export const CreateIcon = styled.div`
  font-size: 60px;
  margin-bottom: 16px;
`;

export const CreateTitle = styled.h3`
  font-size: 20px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 8px 0;
`;

export const CreateDesc = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.5;
  margin: 0 0 20px 0;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  font-size: 14px;
  font-family: inherit;
  margin-bottom: 16px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

export const CreateButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 10px;
  padding: 12px;
  font-size: 14px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Invite views
export const InviteCard = styled(CreateCard)``;
export const InviteIcon = styled(CreateIcon)``;
export const InviteTitle = styled(CreateTitle)``;
export const InviteButton = styled(CreateButton)``;

export const PendingBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  background: #ffa726;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 700;
  color: white;
  margin-top: 4px;
`;

export const DangerZone = styled.div`
  margin-top: 32px;
  padding: 20px;
  background: #fff5f5;
  border: 2px dashed #f44336;
  border-radius: 12px;
`;

export const DangerTitle = styled.div`
  font-size: 12px;
  font-weight: 900;
  color: #f44336;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
  text-align: center;
`;

export const DeleteFamilyButton = styled.button`
  width: 100%;
  background: #f44336;
  border: none;
  border-radius: 10px;
  padding: 12px;
  font-size: 14px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;

  &:hover {
    background: #d32f2f;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(244, 67, 54, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;
