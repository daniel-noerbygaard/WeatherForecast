import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Home } from "./pages/Home.tsx";
import { ThemeProvider } from "@emotion/react";
import theme from "./assets/theme.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </StrictMode>
  </QueryClientProvider>
);
