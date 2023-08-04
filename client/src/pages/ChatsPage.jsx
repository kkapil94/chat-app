import React, { useEffect } from "react";
import Chats from "./chatPage/Chats";
import ChatsSection from "./chatPage/ChatsSection";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, getChats } from "../actions/chatsActions";

export default function ChatsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, chats } = useSelector((state) => state.chats);
  console.log(error);
  useEffect(() => {
    dispatch(getChats());
    if (error && error.response.statusText == "Unauthorized") {
      navigate("/login");
    }
  }, [dispatch, error]);
  return (
    <>
      {
        <div>
          <div className="flex min-h-screen max-w-screen overflow-hidden">
            <Chats chats={chats} />
            <ChatsSection />
          </div>
        </div>
      }
    </>
  );
}
