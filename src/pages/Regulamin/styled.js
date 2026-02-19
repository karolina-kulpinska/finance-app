import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 2px solid #f0f0f0;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: #667eea;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 8px 16px;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: #f5f5f5;
  }
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const Subtitle = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 10px;
`;

export const Date = styled.p`
  font-size: 14px;
  color: #999;
`;

export const Content = styled.div`
  line-height: 1.8;
  color: #333;
`;

export const Section = styled.section`
  margin-bottom: 40px;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e0e0e0;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const Paragraph = styled.p`
  margin-bottom: 16px;
  font-size: 16px;
  text-align: justify;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const List = styled.ul`
  margin: 16px 0;
  padding-left: 30px;
`;

export const ListItem = styled.li`
  margin-bottom: 12px;
  font-size: 16px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const Warning = styled.div`
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  padding: 16px;
  margin: 20px 0;
  border-radius: 8px;
  font-size: 15px;
  line-height: 1.6;
`;

export const ContactInfo = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-top: 16px;
  font-size: 16px;
  line-height: 1.8;

  div {
    margin-bottom: 8px;
  }
`;
