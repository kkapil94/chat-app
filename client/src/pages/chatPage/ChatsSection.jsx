import React from "react";
import GroupChat from "./GroupChat";
import { useSelector } from "react-redux";
import SingleChat from "./SingleChat";

export default function ChatsSection() {
  const {selectedChat} = useSelector(state=>state.chats)
  console.log(selectedChat);
  return (
    <>
      <div id="chatSection" className={`${selectedChat?'xs:max-sm:w-full':'xs:max-sm:hidden'} bg-[#9aafb9]`}>
      {selectedChat&&selectedChat.isGroupChat?
        <GroupChat/>:
        <SingleChat/>
      }
      </div>
    </>
  );
}
