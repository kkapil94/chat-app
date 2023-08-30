import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
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
      <ToastContainer className='xs:max-sm:w-4/5 xs:max-sm:h-8 xs:max-sm:absolute xs:max-sm:top-4 xs:max-sm:left-[11%]'
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
