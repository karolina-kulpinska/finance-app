import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const InviteCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px 32px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

export const FamilyIcon = styled.div`
  font-size: 80px;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 900;
  color: #1a1a1a;
  margin: 0 0 16px 0;
`;

export const FamilyName = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 24px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  border-radius: 12px;
`;

export const Description = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #666;
  margin: 0 0 24px 0;
`;

export const MembersInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 32px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 10px;
`;

export const MembersIcon = styled.div`
  font-size: 20px;
`;

export const MembersText = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #333;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
`;

export const AcceptButton = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  font-size: 16px;
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

export const LoginButton = styled.button`
  width: 100%;
  padding: 16px;
  background: white;
  border: 2px solid #667eea;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  color: #667eea;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;

  &:hover {
    background: #667eea;
    color: white;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid #e8e8ea;
`;

export const FeatureItem = styled.div`
  font-size: 14px;
  color: #666;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 8px;
`;

// Loading state
export const LoadingCard = styled(InviteCard)`
  padding: 60px 32px;
`;

export const LoadingIcon = styled.div`
  font-size: 60px;
  margin-bottom: 20px;
`;

export const LoadingText = styled.div`
  font-size: 16px;
  color: #666;
`;

// Error state
export const ErrorCard = styled(InviteCard)``;

export const ErrorIcon = styled.div`
  font-size: 60px;
  margin-bottom: 20px;
`;

export const ErrorTitle = styled.h2`
  font-size: 24px;
  font-weight: 900;
  color: #f44336;
  margin: 0 0 12px 0;
`;

export const ErrorText = styled.p`
  font-size: 15px;
  color: #666;
  margin: 0 0 24px 0;
`;

export const BackButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #667eea;
  border: none;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 800;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;
