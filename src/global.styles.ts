import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body, #root{
    
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  
    font-family: monospace !important;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

`;

export default GlobalStyle;
