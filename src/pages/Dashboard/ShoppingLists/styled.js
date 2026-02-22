import styled from "styled-components";

export const ConfirmOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const ConfirmModalBox = styled.div`
  background: ${({ theme }) => theme.colors?.white || "#fff"};
  border-radius: 16px;
  padding: 24px;
  min-width: 280px;
  max-width: 90vw;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  text-align: center;
`;

export const ConfirmTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: ${({ theme }) => theme.colors?.text || "#333"};
`;

export const ConfirmMessage = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors?.secondary || "#666"};
  line-height: 1.5;
  margin: 0 0 20px 0;
`;

export const ConfirmButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

export const ConfirmCancelBtn = styled.button`
  padding: 10px 20px;
  background: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #e0e0e0;
  }
`;

export const ConfirmDeleteBtn = styled.button`
  padding: 10px 20px;
  background: #d9534f;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #c9302c;
  }
`;
