import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { WorkoutsContexProvider } from "./context/context";
import { AuthContextProvider } from "./context/authcontext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <WorkoutsContexProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WorkoutsContexProvider>
    </AuthContextProvider>
  </StrictMode>
);
