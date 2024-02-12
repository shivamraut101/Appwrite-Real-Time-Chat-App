import { useState } from "react";
import { Room } from "./pages/Room";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { PrivateRoute } from "./components/PrivateRoute";
import { AuthProvider } from "./utils/AuthContext";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/signup" element={<RegisterPage />}  />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Room />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
