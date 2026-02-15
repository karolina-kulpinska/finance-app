import styled from "styled-components";

export const Wrapper = styled.div`
  text-align: center;
  padding: 60px 20px;
`;

export const Icon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 8px 0;
`;

export const Text = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0;
`;
