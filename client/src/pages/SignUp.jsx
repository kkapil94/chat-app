import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";


export default function SignUp() {
  const baseUrl = import.meta.env.VITE_BASE_URL
  const formRef = useRef();
  const [pre,setPre] = useState(null)
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false);
  const notify = toast
  const handleSetFile = (e)=>{
    setPre(URL.createObjectURL(e.target.files[0]))
    console.log(pre);
  }
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    avatar:'',
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(formRef.current);
    try {
      const {data} = await axios.post(`${baseUrl}/api/v1/auth/register`, formData, {
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
      <div className="min-h-screen w-screen xs:max-sm:p-2 sm:max-md:p-8 flex items-center justify-center bg-gray-900">
        <div className="flex xs:max-md:flex-col min-h-[80vh] xs:max-sm:w-full xs:max-md:w-11/12 w-4/5 items-center justify-center border-2 border-gray-400 rounded-3xl">
          <div className="w-1/2 xs:max-md:w-full xs:max-md:mb-8 h-full flex justify-center items-center xs:max-md:mt-8">
            <img src="/img/whats.png" className="w-80 xs:max-md:w-40 object-cover"/>
          </div>
          <div className="w-1/2 xs:max-md:w-full backdrop:blur-3xl flex flex-col justify-center space-y-10 h-full  xs:max-md:mb-8 xs:max-lg:p-0 pl-12">
            <h1 className="text-4xl xs:max-md:text-2xl md:max-lg:text-3xl text-white xs:max-md:text-center mb-8 ">Create Your Account</h1>
            <div>
              <form
                className="flex flex-col h-full xs:max-lg:w-full xs:max-md:items-center space-y-14 xs:max-md:space-y-20"
                onSubmit={handleSubmit}
                ref={formRef}
              >
                <div className="flex flex-col justify-around xs:max-md:items-center h-[10rem] w-full xs:max-md:space-y-3">
                  <div className="xs:max-md:w-4/5">
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
                      min="5"
                      className="w-3/5  md:max-lg:w-4/5 xs:max-md:w-full rounded-2xl h-8 bg-transparent border-white border-2 outline-none text-white p-4"
                    />
                  </div>
                  <div className="xs:max-md:w-4/5">
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
                      className="w-3/5  md:max-lg:w-4/5 xs:max-md:w-full rounded-2xl h-8 bg-transparent border-white border-2 outline-none text-white p-4"
                    />
                  </div>
                  <div className="xs:max-md:w-4/5">
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
                      min="8"
                      onChange={handleChange}
                      required
                      className="w-3/5 md:max-lg:w-4/5 xs:max-md:w-full rounded-2xl h-8 bg-transparent border-white border-2 outline-none text-white p-4"
                    />
                  </div>
                  <div className="xs:max-md:w-4/5 ">
                    <label htmlFor="avatar" className="text-md text-white block">Avatar</label>
                    <div className="flex items-center mt-2">

                    <div className="inline-block mr-4 ">
                      <img src={pre?pre:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"} alt="" className='h-10 w-10 rounded-full object-cover'/>
                    </div>
                    
                    <input
                      name="file"
                      type="file"
                      id="avatar"
                      value={user.avatar}
                      onChange={(e)=>{handleChange(e);handleSetFile(e);}}
                      required
                      className="file:bg-transparent xs:max-md:text-sm w-3/5 md:max-lg:w-4/5 xs:max-md:w-4/5 file:border-2 file:rounded-2xl file:border-white text-white file:text-white"
                      />
                      </div>
                  </div>
                </div>
                <div className="xs:max-md:w-4/5">
                  <button
                    type="submit"
                    className="text-green-500 font-semibold h-8 bg-white md:max-lg:w-4/5 xs:max-md:w-full  w-3/5 rounded-2xl block mb-1"
                  >
                    SignUp
                  </button>
                  <Link
                    to="/login"
                    className="text-sm flex md:max-lg:w-4/5 justify-end w-3/5 xs:max-md:text-xs xs:max-md:w-full text-white"
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
