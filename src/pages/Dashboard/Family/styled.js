import styled from "styled-components";

export const Container = styled.div`
  padding: 0;
  padding-bottom: 80px;
`;

export const LoadingText = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.secondary};
`;
