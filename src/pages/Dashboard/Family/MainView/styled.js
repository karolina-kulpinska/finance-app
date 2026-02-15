import styled from "styled-components";

export const Container = styled.div`
  padding: 0;
  padding-bottom: 80px;
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
  font-family: "Courier New", monospace;
`;

export const CopyIcon = styled.div`
  font-size: 24px;
  flex-shrink: 0;
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
