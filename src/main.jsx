import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UserProvider } from './contexts/UserContext.jsx';
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
);