import React from "react";
import GroupChat from "./GroupChat";
import { useSelector } from "react-redux";
import SingleChat from "./SingleChat";

export default function ChatsSection() {
  const {selectedChat} = useSelector(state=>state.chats)
  console.log(selectedChat);
  return (
    <>
      <div id="chatSection" className="bg-[#526D82] w-[70%]">
      {selectedChat&&selectedChat.isGroupChat?
        <GroupChat/>:
        <SingleChat/>
      }
      </div>
    </>
  );
}
