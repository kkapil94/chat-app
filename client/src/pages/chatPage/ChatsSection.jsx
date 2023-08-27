import React from "react";
import GroupChat from "./GroupChat";
import { useSelector } from "react-redux";
import SingleChat from "./SingleChat";

export default function ChatsSection() {
  const {selectedChat} = useSelector(state=>state.chats)
  return (
    <>
      <div id="chatSection" className={`bg-[#526D82] w-[70%] ${selectedChat?'xs:max-sm:w-full sm:max-xl:w-[60%]':'xs:max-sm:hidden'}`}>
      {selectedChat&&selectedChat.isGroupChat?
        <GroupChat/>:
        <SingleChat/>
      }
      </div>
    </>
  );
}
