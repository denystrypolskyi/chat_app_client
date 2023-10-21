import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import LoginForm from "../LoginForm/LoginForm";
import MainPage from "../MainPage/MainPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<MainPage />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/register" element={<RegistrationForm />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
