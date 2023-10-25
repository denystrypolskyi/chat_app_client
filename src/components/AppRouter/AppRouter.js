import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import MainPage from "../MainPage/MainPage";
import RegisterPage from "../RegisterPage/RegisterPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<MainPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
