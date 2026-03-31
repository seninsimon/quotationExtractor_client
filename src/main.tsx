import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import "./index.css";
import App from "./App.tsx";
import { Notifications } from "@mantine/notifications";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider
      theme={{
        fontFamily: "Inter, sans-serif",
        primaryColor: "dark",
      }}
    >
      <ModalsProvider>
        <BrowserRouter>
        <Notifications position="top-right"/>
          <App />
     
        </BrowserRouter>
      </ModalsProvider>
    </MantineProvider>
  </StrictMode>
);