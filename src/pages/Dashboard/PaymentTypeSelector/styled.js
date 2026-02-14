import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease;
  padding: 16px;
`;

export const Container = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 500px;
  animation: ${slideUp} 0.4s ease;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 20px 0;
  text-align: center;
`;

export const TypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    grid-template-columns: 1fr;
  }
`;

export const TypeCard = styled.button`
  background: white;
  border: 2px solid ${({ $color }) => $color};
  border-radius: 12px;
  padding: 20px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;

  &:hover {
    background: ${({ $color }) => `${$color}10`};
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(-2px);
  }
`;

export const TypeIcon = styled.div`
  font-size: 40px;
`;

export const TypeTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const TypeDesc = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.4;
`;

export const CancelButton = styled.button`
  width: 100%;
  padding: 10px;
  background: transparent;
  color: ${({ theme }) => theme.colors.secondary};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;

  &:hover {
    background: #f8f9fa;
  }

  &:active {
    transform: scale(0.98);
  }
`;
