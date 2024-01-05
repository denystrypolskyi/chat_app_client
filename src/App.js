import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import SettingsPage from "./components/SettingsPage/SettingsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/settings" element={<SettingsPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
      </Routes>
    </Router>
  );
};

export default App;