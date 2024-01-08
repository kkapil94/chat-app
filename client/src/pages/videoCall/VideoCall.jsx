import React from "react";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { endStream } from "../../actions/chatsActions";

export default function VideoCall({ stream }) {
  const dispatch = useDispatch()
  const endCall = ()=>{
    dispatch(endStream())
  }
  return (
    <>
      <div className="">
        <ReactPlayer playing height="100vh" width="100vw" muted url={stream} />
        <button onClick={()=>endCall()}>end call</button>
      </div>
    </>
  );
}
