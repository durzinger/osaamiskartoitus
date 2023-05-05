import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Header from "./components/Header";
import AnalyticPage from "./pages/AnalyticPage";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/analytics" element={<AnalyticPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
