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
  font-size: 18px;
  font-weight: 800;
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
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 14px;
  }

  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 8px;
  padding-bottom: 6px;
  border-bottom: 2px solid #e0e0e0;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 6px;
    padding-bottom: 4px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 5px;
    padding-bottom: 3px;
  }
`;

export const Paragraph = styled.p`
  margin-bottom: 8px;
  font-size: 16px;
  text-align: justify;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 6px;
    text-align: left;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 5px;
  }
`;

export const List = styled.ul`
  margin: 8px 0;
  padding-left: 30px;

  @media (max-width: 768px) {
    margin: 6px 0;
    padding-left: 24px;
  }

  @media (max-width: 480px) {
    margin: 5px 0;
    padding-left: 20px;
  }
`;

export const ListItem = styled.li`
  margin-bottom: 5px;
  font-size: 16px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 4px;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 3px;
  }
`;
