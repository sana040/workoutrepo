import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Layout from "./pages/layout";
import Login from "./pages/login";
import Register from "./pages/register";
import { AuthContext } from "./context/authcontext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <div className="pages">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={user ? <Home /> : <Navigate to="/login" />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
