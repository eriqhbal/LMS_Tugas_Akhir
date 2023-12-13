import React from 'react';
import { useNavigate } from 'react-router-dom';
import {ChatEngine} from "react-chat-engine";
import { LoginChat } from '../../Components';

const ChatGroup = () => {
  const navigateTo = useNavigate();
   if(!localStorage.getItem("username")) return <LoginChat/>

   const handleCloseChat = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");

    navigateTo(-1);
   }
  return (
    <div>
      <ChatEngine
        height="100vh"
        projectID="4d62a489-194c-4352-bad7-095b8f9d4451"
        userName={localStorage.getItem("username")}
        userSecret={localStorage.getItem("password")}
      />
      <div className="text-center p-2">
        <button
          type="button"
          onClick={handleCloseChat}
          className="px-5 py-2 bg-slate-700 text-white"
        >
          back
        </button>
      </div>
    </div>
  );
}

export default ChatGroup;