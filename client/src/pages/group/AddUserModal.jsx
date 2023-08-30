import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { searchUser } from "../../actions/usersActions";
import { selectChat } from "../../actions/chatsActions";
import axios from "axios";
import { toast } from "react-toastify";

export default function ({ open, setOpen}) {
  const dispatch = useDispatch();
  const baseUrl = import.meta.env.VITE_BASE_URL
  const notify = toast
  const {users} = useSelector(state=>state.users)
  const {selectedChat} = useSelector(state=>state.chats)
  const [search, setSearch] = useState();
  const [add, setAdd] = useState([]);
  const removeAdd = (member) => {
    setAdd(add.filter((memb) => memb !== member));
  };
  const handleSetAdd = (user)=>{
    let present = 0
    if (!add.length) {
      setAdd([...add,user])
    }
    add.length&&add.forEach(memb=>{
      if(memb._id==user._id)
      present = 1;
    })
    if (!present) {
      setAdd([...add,user])
    }
  }
  const addUser = async()=>{
    const ids = add.map(add=>add._id)
    const token = JSON.parse(localStorage.getItem("user")).token
    const data = await axios.put(`${baseUrl}/api/v1/chat/group/add/${selectedChat._id}`,{user:ids},{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    if (data.status===200) {
      notify.success("User added successfully")
    }
    dispatch(selectChat(selectedChat._id))
    setOpen()
    setAdd([]);
  }
  useEffect(() => {
    dispatch(searchUser(search));
  }, [dispatch, search]);
  return (
    <>
      <Modal 
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <div className="bg-[#0f3a50] w-4/12 sm:max-lg:w-3/5 sm:max-2xl:max-h-[80vh] xs:max-sm:w-screen xs:max-sm:h-screen  flex flex-col">
          <div className="flex items-center h-[3.8rem]">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 -960 960 960"
                width="48"
                className="h-6 fill-white cursor-pointer"
                onClick={setOpen}
              >
                <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
              </svg>
            </span>
            <span className="text-white">Add Users</span>
          </div>
          <div>
            <div className="w-full flex justify-center bg-[#27374D]">
              <button className="inline-block mb-4">
                <img
                  src="./img/search.svg"
                  alt=""
                  className="absolute h-4 w-4 ml-2"
                />
              </button>
              <input
                type="text"
                placeholder="Search Contacts"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-11/12 my-2 rounded-md pl-12 h-8 outline-none"
              />
            </div>
          </div>
          <div>
            <div className="sm:max-2xl:ml-10 max-h-44 xs:max-sm:h-15  xs:max-sm:w-screen  xs:max-sm:whitespace-nowrap xs:max-sm:px-2 overflow-auto mt-4">
              {add.length
                ? add.map((mem) => (
                    <div
                      className="inline-flex items-center mr-4"
                      key={mem._id}
                    >
                      <div>
                        <img
                          src={mem.avatar}
                          className="h-7 xs:max-sm:h-10 xs:max-sm:w-10 w-7 object-contain mr-2 rounded-full"
                        />
                      </div>
                      <div className="mr-2 text-slate-300">
                        <span>{mem.name}</span>
                      </div>
                      <div>
                        <img
                          src="./img/close.svg"
                          className="h-4 w-4 cursor-pointer"
                          onClick={() => removeAdd(mem)}
                        />
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          </div>
          {add.length ? (
            <div className="w-full">
              <div className="sm:max-2xl:h-[1px] bg-slate-600 mx-9 sm:max-2xl:mb-4"></div>
            </div>
          ) : (
            ""
          )}

          {users && selectedChat && users.length ? (
            <div className="overflow-auto">
              <div>
                {users && 
                  users.filter(user => !selectedChat.users.map(memb=>memb._id).includes(user._id)).map((user) => (
                    <div key={user._id} onClick={() => handleSetAdd(user)} >
                      <div className="flex items-center justify-start max-w-full h-[4.5rem] hover:bg-slate-600 cursor-pointer">
                        <div>
                          <img
                            src={user.avatar}
                            alt=""
                            className="h-12 w-12 rounded-full m-3 object-contain"
                          />
                        </div>
                        <div className="h-full text-white flex items-center">
                          <span>{user.name}</span>
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="h-[1px] bg-slate-600 ml-[4.5rem] mr-1"></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <span className="text-center block mt-8">
              No results found for '{search}'
            </span>
          )}

           {add.length? <div className="relative">
                <span className="rounded-full flex items-center justify-center bg-slate-400 h-14 w-14 absolute bottom-14 right-12 cursor-pointer" onClick={addUser}>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" className="h-8 fill-[#06172f]" > 
                    <path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z"/>
                </svg>
                </span>
            </div>:''}

        </div>
      </Modal>
    </>
  );
}

