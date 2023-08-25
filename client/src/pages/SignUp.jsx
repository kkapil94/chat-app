import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";


export default function SignUp() {
  const formRef = useRef(null);
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false);
  const notify = toast
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(formRef.current);
    try {
      const {data} = await axios.post("/api/v1/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.success) {
        notify.success("Registered successfully");
        navigate("/login")
        setLoading(false);
      }
    } catch (err) {
      setLoading(false)
      const error = err.response.data;
      notify("registration failed");
    }
  };
  return (
    <>{loading&&<Loader/>}
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-[#8360c3] to-[#2ebf91]">
        <div className="flex h-4/5 w-4/5 items-center justify-center border-2 border-gray-400 rounded-3xl">
          <div className="w-1/2">
            <img src="/img/hero.svg" />
          </div>
          <div className="w-1/2 backdrop:blur-3xl flex flex-col justify-center space-y-10 h-full pl-12">
            <h1 className="text-4xl text-white">Create Your Account</h1>
            <div>
              <form
                className="flex flex-col h-full space-y-12 "
                onSubmit={handleSubmit}
                ref={formRef}
              >
                <div className="flex flex-col justify-around h-[13rem] space-y-1">
                  <div>
                    <label htmlFor="name" className="text-md text-white block">
                      Name
                    </label>
                    <input
                      name="name"
                      id="name"
                      value={user.name}
                      type="text"
                      onChange={handleChange}
                      required
                      className="w-3/5 rounded-2xl h-8 bg-transparent border-white border-2 outline-none text-white p-4"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-md text-white block">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      value={user.email}
                      type="email"
                      onChange={handleChange}
                      required
                      className="w-3/5 rounded-2xl h-8 bg-transparent border-white border-2 outline-none text-white p-4"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="text-md text-white block"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      id="password"
                      onChange={handleChange}
                      required
                      className="w-3/5 rounded-2xl h-8 bg-transparent border-white border-2 outline-none text-white p-4"
                    />
                  </div>
                  <div>
                    <label htmlFor="avatar" className="text-md text-white block">Avatar</label>
                    <input
                      name="file"
                      type="file"
                      id="avatar"
                      value={user.avatar}
                      onChange={handleChange}
                      required
                      className="file:bg-transparent file:border-2 file:rounded-2xl file:border-white text-white file:text-white"
                      />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="text-[#4aa0a1] h-8 bg-white w-3/5 rounded-2xl block mb-1"
                  >
                    SignUp
                  </button>
                  <Link
                    to="/login"
                    className="text-sm text-white ml-auto block w-4/5"
                  >
                    Already have an account?SignIn.
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
