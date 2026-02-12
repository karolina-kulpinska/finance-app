import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *, ::after, ::before {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    font-family: "Inter", sans-serif;
    background-color: #f4f7f6;
    color: #333333;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button {
    cursor: pointer;
  }
`;
