import * as React from "react";
import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
} from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import MuiCssBaseline from "@mui/material/CssBaseline";

import Example from "./scenes/Example";
import { CnbProvider } from "./services/cnb";

const StyledCssBaseline = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    height: 100%;
    margin: 0;
    padding: 0;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background: linear-gradient(#e66465, #9198e5);
  }
  div#root {
    height: 100%;
  }
`;
const muiTheme = createTheme();
const scTheme = {};

const App = () => {
  const queryClient = React.useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // suspense: false, // experimental
          },
        },
      }),
    []
  );

  return (
    <>
      <MuiThemeProvider theme={muiTheme}>
        <MuiCssBaseline />
        <StyledThemeProvider theme={scTheme}>
          <StyledCssBaseline />
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <CnbProvider>
              <Example />
            </CnbProvider>
          </QueryClientProvider>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </>
  );
};

export default App;
