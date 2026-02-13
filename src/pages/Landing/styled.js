import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  background: radial-gradient(circle at top right, #fdfbfb 0%, #ebedee 100%);
  overflow-x: hidden;
`;

export const Navbar = styled.nav`
  padding: 30px 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: #1a1a1a;
  letter-spacing: -1px;
`;

export const Hero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 80px 20px;
`;

export const Title = styled.h1`
  font-size: clamp(32px, 8vw, 64px);
  font-weight: 900;
  color: #1a1a1a;
  line-height: 1.1;
  max-width: 800px;
  margin-bottom: 20px;
`;

export const Subtitle = styled.p`
  font-size: 18px;
  color: #666;
  max-width: 600px;
  margin-bottom: 40px;
  line-height: 1.6;
`;

export const PremiumButton = styled.button`
  padding: 18px 40px;
  background: #1a1a1a;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
    background: #333;
  }
`;

export const MockupContainer = styled.div`
  margin-top: 60px;
  width: 90%;
  max-width: 1000px;
  height: 500px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
`;

export const CtaGroup = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 15px;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    width: 100%;
    padding: 0 20px;
  }
`;

export const MockupImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"); // Przykładowy obrazek, później zmienie
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  opacity: 0.8;
`;
