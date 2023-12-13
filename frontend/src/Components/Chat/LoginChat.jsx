import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const LoginChat = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = {
      "Project-ID": "4d62a489-194c-4352-bad7-095b8f9d4451",
      "User-Name": username,
      "User-Secret": password,
    };

    if (!username || !password) {
      setError("Form Tidak Boleh Ada Yang Kosong");
    }

    try {
      await axios.get("https://api.chatengine.io/chats", {
        headers: authObject,
      });

      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      navigateTo("/communication-group");
      
    } catch (err) {
      setError("Anda Belum Terdaftar di Grup Diskusi");
    }
  };
  return (
    <div className="wrapper rounded-sm flex flex-col">
      <div className="form">
        <h1 className="title text-third">Masuk Grup Diskusi</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Password"
            required
          />

          <div className="flex justify-center">
            <button type="submit" className="button">
              <span>Start</span>
            </button>
          </div>
        </form>
        {error && <h2 className="error text-center">{error}</h2>}
      </div>

      <div className="flex mt-2 justify-evenly">
        <div className="mt-2 w-1/4 text-center p-1 rounded-sm border border-dashed border-black">
          <button
            type="button"
            className="w-full p-2 mb-1 bg-emerald-700 text-white hover:bg-emerald-800 active:bg-emerald-900"
          >
            <a
              href="mailto:eriqhbal@gmail.com"
              className="px-10 py-5"
              target="blank"
            >
              Daftar
            </a>
          </button>
          <p>Tekan Daftar Jika belum Memiliki akun diskusi.</p>
        </div>
        <div className="p-1 border border-black">
          <h2 className="text-third my-2 px-1">
            Contoh Mengirim Permintaan Daftar Pada Email
          </h2>
          <p>Subject : Meminta Pendaftaran Akun Grup Diskusi</p>
          <div className="border border-black pl-1">
            <p className="font-bold">body email</p>
            <p>Nama : Zuleriqhbal Hendri</p>
            <p>Email Student: zuleriqhbal@student.uir.ac.id</p>
            <p>NPM : 193510245</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginChat;
