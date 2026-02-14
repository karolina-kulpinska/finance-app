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

export const Section = styled.div`
  margin-bottom: 20px;
`;

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

  @media (min-width: 768px) {
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

  @media (min-width: 768px) {
    display: none;
  }
`;

export const CollapsibleContent = styled.div`
  @media (max-width: 767px) {
    display: ${({ $open }) => ($open ? "block" : "none")};
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
  padding: ${({ $open }) => ($open ? "16px" : "0 16px")};

  @media (min-width: 768px) {
    display: block;
    padding: 0 16px 16px 16px;
    border-top: none;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 13px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 12px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

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
  background: ${({ $active }) => ($active ? "rgba(102, 126, 234, 0.12)" : "white")};
  border: 1.5px solid
    ${({ $active, theme }) => ($active ? "#667eea" : theme.colors.border)};
  border-radius: 12px;
  padding: 16px 12px;
  text-align: center;
  transition: all 0.2s ease;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

export const SharedPanel = styled.div`
  background: white;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 16px;
  margin-top: 12px;
`;

export const SharedPanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const SharedPanelTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const SharedPanelClose = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1;

  &:hover {
    color: #f44336;
  }
`;

export const SharedPanelEmpty = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.secondary};
  text-align: center;
  padding: 20px;
`;

export const SharedItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 280px;
  overflow-y: auto;
`;

export const SharedItem = styled.div`
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const SharedItemName = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

export const SharedItemMeta = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 6px;
`;

export const SharedItemLink = styled.a`
  font-size: 12px;
  font-weight: 600;
  color: #667eea;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
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

export const InviteCard = styled(CreateCard)``;
export const InviteIcon = styled(CreateIcon)``;
export const InviteTitle = styled(CreateTitle)``;
export const InviteHint = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.5;
  margin: 0 0 16px 0;
  text-align: center;
`;
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
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const DangerTitle = styled.div`
  font-size: 10px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

export const DeleteFamilyButton = styled.button`
  background: transparent;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 600;
  color: #9e9e9e;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    border-color: #f44336;
    color: #f44336;
    background: #fff5f5;
  }

  &:active {
    transform: scale(0.98);
  }
`;
