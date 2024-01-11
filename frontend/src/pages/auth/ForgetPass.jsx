import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import context
import { useActContext } from "../../Context/ActContextProvider";

const ForgetPass = () => {
  const [emailUser, setEmailUser] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { screenSize, setScreenSize } = useActContext();
  const navigate = useNavigate();

  useEffect(() => {
    const resizeS = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', resizeS);
    resizeS();
    return () => window.removeEventListener('resize', resizeS);
  },[setScreenSize])

  const handleSendPasswordToEmailUser = (e) => {
    setLoading(true);
    e.preventDefault();
    fetch("/api/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailUser }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSuccessMessage(data.msg);
      })
      .catch((err) => {
        setErrorMessage(err);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="py-10 h-screen w-full bg-emerald-100">
      <div className={screenSize >= 900 ? "mx-auto w-1/3 my-12 bg-gray-700 pb-3 px-10 rounded-md overflow-hidden" : 'bg-gray-700 rounded-md p-2 overflow-hidden'}>
        <h1 className="mt-2 text-xl text-white text-third">Lupa Password</h1>

        <form onSubmit={handleSendPasswordToEmailUser} className="my-4">
          <input
            type="text"
            name="emailUser"
            className="p-2 w-full"
            value={emailUser}
            onChange={(e) => setEmailUser(e.target.value)}
            placeholder="Masukkan Email Anda"
          />
          <button
            type="submit"
            className="bg-lime-400 mt-2 p-1 px-10 rounded-md"
          >
            Enter
          </button>
        </form>
        {loading ? (
          <p className="text-third text-white">Loading...</p>
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          <p className="text-third text-white text-center mb-2">{successMessage}</p>
        )}

        <div className="mt-2 text-center">
          <button
            type="button"
            className="px-4 py-1 bg- bg-rose-600 text-white rounded-sm"
            onClick={() => navigate("/login")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
