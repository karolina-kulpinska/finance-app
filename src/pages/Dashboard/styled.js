import styled, { keyframes } from "styled-components";

const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const Wrapper = styled.main`
  min-height: 100vh;
  background: linear-gradient(-45deg, #f5f7fa, #c3cfe2, #e0c3fc, #8ec5fc);
  background-size: 400% 400%;
  animation: ${gradient} 15s ease infinite;
  padding: 40px 30px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 25px 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileL}) {
    padding: 20px 15px;
  }
`;

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (min-width: 1600px) {
    max-width: 1500px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 24px;
  }
`;
