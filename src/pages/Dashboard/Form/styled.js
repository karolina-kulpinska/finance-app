import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

export const Modal = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 40px;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  box-shadow: ${({ theme }) => theme.shadows.hover};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    height: 100%;
    border-radius: 0;
  }
`;

export const FormTitle = styled.h2`
  margin-bottom: 25px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Label = styled.label`
  display: block;
  margin-top: 15px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-top: 5px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 30px;
`;
