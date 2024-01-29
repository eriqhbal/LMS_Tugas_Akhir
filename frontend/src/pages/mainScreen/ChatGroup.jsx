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
        projectID="9f143648-a953-4a69-9db6-a59ef5c7311d"
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