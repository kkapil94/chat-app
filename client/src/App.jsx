import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import "./index.css";
import SignUp from "./pages/SignUp";
import ChatsPage from "./pages/ChatsPage";
import { io } from "socket.io-client";

export default function App() {
  const socket = io("http://localhost:4000");
  socket.on('connect',()=>{
    console.log("Connected with",socket.id);
  })
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
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
