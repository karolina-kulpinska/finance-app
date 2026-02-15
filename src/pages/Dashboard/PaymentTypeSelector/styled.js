import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
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
  border-radius: 12px;
  padding: 16px;
  width: 100%;
  max-width: 340px;
  animation: ${slideUp} 0.4s ease;
`;

export const Title = styled.h2`
  font-size: 15px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 12px 0;
  text-align: center;
`;

export const TypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    grid-template-columns: 1fr;
  }
`;

export const TypeCard = styled.button`
  background: white;
  border: 1.5px solid ${({ $color }) => $color};
  border-radius: 10px;
  padding: 10px 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 4px;
  font-family: inherit;

  &:hover {
    background: ${({ $color }) => `${$color}12`};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const TypeIcon = styled.div`
  font-size: 24px;
`;

export const TypeTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const TypeDesc = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1.3;
`;

export const CancelButton = styled.button`
  width: 100%;
  padding: 8px;
  background: transparent;
  color: ${({ theme }) => theme.colors.secondary};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 13px;
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
