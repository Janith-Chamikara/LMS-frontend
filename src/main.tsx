import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import theme from "./theme";

const rootElement: HTMLElement | null = document.getElementById("root");
const rootElementAsHTMLElement = rootElement as HTMLElement;
ReactDOM.createRoot(rootElementAsHTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
