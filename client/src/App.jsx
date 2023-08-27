import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import "./index.css";
import SignUp from "./pages/SignUp";
import ChatsPage from "./pages/ChatsPage";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ChatsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
