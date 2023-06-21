import React, { useEffect } from "react";
import Chats from "./chatPage/Chats";
import ChatsSection from "./chatPage/ChatsSection";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import { getChats } from "../actions/chatsActions";

export default function ChatsPage(){
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {chats,loading,error }= useSelector((state) => state.chats);
    console.log("iam ",chats,loading,error);
    useEffect(() => {
        dispatch(getChats());
        if(chats&&!chats.length){
            navigate("/login")
        }
    }, [dispatch]);
    return(<>
        {<div>
            <div className="flex min-h-screen max-w-screen">
               <Chats chats={chats}/>
               <ChatsSection/>
            </div>
        </div>}
    </>)
}