import * as React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle``;

const App = () => (
  <>
    <ThemeProvider theme={{}}>
      <GlobalStyle />
      <div className="space-y-5">Hello world</div>
    </ThemeProvider>
  </>
)

export default App;
