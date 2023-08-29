import React, { useEffect } from "react";
import Chats from "./chatPage/Chats";
import ChatsSection from "./chatPage/ChatsSection";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, getChats } from "../actions/chatsActions";

export default function ChatsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, chats,loading } = useSelector((state) => state.chats);
  const user = localStorage.getItem("user")
  useEffect(() => {
    if (error && error.response.statusText == "Unauthorized" || localStorage.getItem("user")==null) {
      navigate("/login");
    }
    dispatch(getChats());
  }, [dispatch, error]);
  return (
    <>
      {user&&
        <div>
          <div className="flex min-h-screen max-w-screen overflow-hidden">
            <Chats chats={chats} loading={loading}/>
            <ChatsSection />
          </div>
        </div>
      }
    </>
  );
}
