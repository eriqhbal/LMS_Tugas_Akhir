import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// images or assets
import Images from "../../assets/images/uirlogo.png";

import { FaRegEye, FaEyeSlash } from "react-icons/fa";

// Register Screen
import Register from "./Register";

// Hooks
import { UseUserContext } from "../../Hooks/UseUserContext";
import { useActContext } from "../../Context/ActContextProvider";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const { screenSize, setScreenSize } = useActContext();
  const [error, setError] = useState(null);
  const [blurThemeAndPopUpRegister, setBlurThemeAndPopUpRegister] =
    useState(false);

  const { dispatch } = UseUserContext();

  useEffect(() => {
    const resizeS = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', resizeS);

    resizeS();

    return () => window.removeEventListener("resize", resizeS);
  }, [setScreenSize])

  const inputMail = (e) => {
    setEmail(e.target.value);
  };

  const inputPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const dataJson = await response.json();
    if (!response.ok) {
      setError(dataJson.error);
    } else {
      localStorage.setItem("user", JSON.stringify(dataJson));
      dispatch({ type: "LOGIN", payload: dataJson });
    }
  };

  const handlePasswordType = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    } else {
      setPasswordType('password');
    }
  }

  const moveToRegister = () => {
    navigate("/register");
    setBlurThemeAndPopUpRegister(!blurThemeAndPopUpRegister);
  };
  console.log(screenSize)
  return (
    <div className="">
      {/* Register Screen */}
      <Register
        appearScreen={blurThemeAndPopUpRegister}
        closeScreenComponent={setBlurThemeAndPopUpRegister}
      />

      {/* Main Screen Login */}
      <div
        className={
          blurThemeAndPopUpRegister === true
            ? "blur-sm w-full h-screen p-5 flex transition ease-in duration-500"
            : "w-full h-screen p-5 flex transition ease-out duration-150"
        }
      >
        {/* Title */}
        {screenSize >= 900 ? (
          <div className="grow mx-2 rounded-md">
            <div className="w-3/4 mx-auto text-center mt-20 mb-4">
              <h1 className="text-first text-3xl">
                Welcome a new generation of{" "}
                <span className="underline underline-offset-1 text-teal-900">
                  Frontend Engineer
                </span>
              </h1>
            </div>
            <div className="w-1/2 text-center m-auto">
              <h1 className="text-second text-3xl ">Make it Your Future</h1>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* Form Register */}
        <div className="form w-1/2 my-15 p-2 shadow-md rounded-md">
          <img
            src={Images}
            className="w-1/3 mx-auto mt-5 mb-3"
            alt="logo uir"
          />

          <form
            onSubmit={handleSubmitForm}
            className="flex flex-col items-center py-2"
          >
            <div className="p-7 shadow-xl bg-emerald-700 rounded-md">
              <div>
                <label htmlFor="email" className="text-white">
                  Email :
                </label>

                <div className="mb-4">
                  <input
                    type="email"
                    name="mail"
                    className="p-2 rounded-sm w-full"
                    value={email}
                    onChange={inputMail}
                    placeholder="Your Email"
                    disabled={blurThemeAndPopUpRegister}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="text-white">
                  Password :
                </label>
                <div className="mb-3 flex">
                  <input
                    type={passwordType}
                    name="password"
                    className="p-2 rounded-sm w-full"
                    value={password}
                    onChange={inputPassword}
                    disabled={blurThemeAndPopUpRegister}
                    placeholder="******"
                  />
                  <div className="w-10 h-15 border rounded-sm bg-white">
                    <button type="button" onClick={handlePasswordType} className="w-full h-full flex justify-center items-center">
                      {passwordType === "password" ? (
                        <FaEyeSlash />
                      ) : (
                        <FaRegEye />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-stone-900 rounded-sm text-white disabled:bg-green-700 pb-1"
                disabled={blurThemeAndPopUpRegister}
              >
                Login
              </button>
              {error && <div className="error">{error}</div>}
              <div>
                <p className="text-black">
                  Belum memiliki akun ?{" "}
                  <span className="text-white">
                    <button
                      onClick={moveToRegister}
                      disabled={blurThemeAndPopUpRegister}
                    >
                      daftar.
                    </button>
                  </span>
                </p>
              </div>
              <div className="mt-1 justify-center text-center w-2/3 mx-auto rounded-sm overflow-hidden">
                <button
                  onClick={() => navigate("/forget-password")}
                  className="text-white transition ease-in-out duration-150 hover:bg-gray-200 hover:text-black bg-slate-800 w-full pb-0.5"
                  disabled={blurThemeAndPopUpRegister}
                >
                  Lupa Password?
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
