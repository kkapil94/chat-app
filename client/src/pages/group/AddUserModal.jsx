import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from "@mui/material/Modal";

import { useDispatch } from "react-redux";
import { searchUser } from "../../actions/usersActions";

export default function ({ open, setOpen, chat}) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const [add, setAdd] = useState([]);
  const { allUsers } = useSelector((state) => state.users);
  const users = allUsers.filter(user=>{
    console.log(user,"iam");
    chat.users.forEach(memb=>{
        if(memb==user){
            console.log(memb,user);
            return false
        }return true
    })
  })
  const removeAdd = (member) => {
    setAdd(add.filter((memb) => memb !== member));
  };
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
        <div className="bg-[#27374D] w-4/12 max-h-[80vh] flex flex-col">
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
                  src="./img/search.png"
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
            <div className="ml-10 max-h-44 overflow-auto mt-4">
              {add.length
                ? add.map((mem) => (
                    <div
                      className="inline-flex items-center mr-4"
                      key={mem._id}
                    >
                      <div>
                        <img
                          src={mem.avatar}
                          className="h-7 w-7 object-contain mr-2 rounded-full"
                        />
                      </div>
                      <div className="mr-2">
                        <span>{mem.name}</span>
                      </div>
                      <div>
                        <img
                          src="./img/close.png"
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
              <div className="h-[1px] bg-slate-600 mx-9 mb-4"></div>
            </div>
          ) : (
            ""
          )}

          {users && users.length ? (
            <div className="overflow-auto">
              <div>
                {users &&
                  users.map((user) => (
                    <div key={user._id} onClick={() => setAdd([...add, user])}>
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
                <span className="rounded-full flex items-center justify-center bg-slate-400 h-14 w-14 absolute bottom-14 right-12">
                <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" className="h-8 fill-[#06172f]">
                    <path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z"/>
                </svg>
                </span>
            </div>:''}

        </div>
      </Modal>
    </>
  );
}

