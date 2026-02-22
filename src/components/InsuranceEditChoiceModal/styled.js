import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  padding: 16px;
`;

export const Modal = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
`;

export const Title = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.text || "#333"};
  margin: 0 0 16px 0;
`;

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Separator = styled.span`
  font-size: 14px;
  color: #999;
`;

export const OptionButton = styled.button`
  padding: ${({ $small }) => ($small ? "8px 12px" : "12px 16px")};
  background: #f0f4f8;
  border: 1px solid ${({ theme }) => theme.colors?.border || "#e0e0e0"};
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.text || "#333"};
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  text-align: left;

  &:hover {
    background: #2c5282;
    color: white;
    border-color: #2c5282;
  }
`;

export const RangeSection = styled.div`
  margin-top: 8px;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors?.border || "#e0e0e0"};
`;

export const SectionLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.secondary || "#666"};
  display: block;
  margin-bottom: 8px;
`;

export const NumberRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const NumberInput = styled.input`
  width: 60px;
  padding: 8px 10px;
  border: 1px solid ${({ theme }) => theme.colors?.border || "#e0e0e0"};
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #2c5282;
  }
`;

export const CancelButton = styled.button`
  margin-top: 16px;
  width: 100%;
  padding: 10px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors?.border || "#e0e0e0"};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    background: #f5f5f5;
  }
`;
