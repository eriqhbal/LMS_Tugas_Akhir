import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Icon
import { FaUser, FaRegTrashAlt, FaCheck } from "react-icons/fa";

const AdminScreen = () => {
  const [dataPengajar, setDataPengajar] = useState([]);
  const [dataPelajar, setDataPelajar] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const navigateTo = useNavigate();

  // Register Pengajar
  const [namaDepanPengajar, setNamaDepanPengajar] = useState("");
  const [namaBelakangPengajar, setNamaBelakangPengajar] = useState("");
  const [email, setEmail] = useState("");
  const [passwordPengajar, setPasswordPengajar] = useState("");
  const [isOkey, setIsOkey] = useState(false);
  const [textSuccess, setTextSuccess] = useState("");
  const [textFailed, setTextFailed] = useState("");

  useEffect(() => {
    fetch("/api/user/addTeacher")
      .then((res) => {
        return res.json();
      })
      .then((dataTeacher) => setDataPengajar(dataTeacher));

    fetch("/api/user/students")
      .then((res) => {
        return res.json();
      })
      .then((dataStudent) => {
        setDataPelajar(dataStudent.dataStudent);
      });
  }, [isChange]);

  const profilePengajarDetail = (id) => {
    navigateTo(`/pengajar/${id}`);
  };

  const profilePelajarDetail = (id) => {
    navigateTo(`/student/certificate/${id}`);
  }

  const deleteUser = (id, emailUser) => {
    if (emailUser.includes("student")) {
      fetch(`/api/user/student/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((message) => {
          setDataPelajar((prevData) => {
            prevData.filter((dataP) => dataP._id !== id);
          });
          setIsChange((prevChange) => !prevChange);
        });
    } else {
      fetch(`/api/user/removeTeacher/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((succ) => {
          setDataPengajar((prevData) => {
            prevData.filter((pengajar) => pengajar._id !== id);
          });
          setIsChange((prevChange) => !prevChange);
        });
    }
  };

  const submitNewTeacher = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/user/addTeacher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        namaDepan: namaDepanPengajar,
        namaBelakang: namaBelakangPengajar,
        emailRegister: email,
        password: passwordPengajar,
      }),
    });

    const dataJson = await response.json();
    console.log(dataJson);

    if (response.ok) {
      setIsChange((prev) => !prev);
      setIsOkey((prev) => !prev);
      setTextSuccess(dataJson.success);
    } else {
      setTextFailed(dataJson.error);
    }
  };

  const backToDisplay = () => {
    setIsRegister((prev) => !prev);
    setIsOkey(false);
    setNamaDepanPengajar("");
    setNamaBelakangPengajar("");
    setEmail("");
    setPasswordPengajar("");
  };

  const backToRegister = () => {
    setIsRegister(true);
    setIsOkey(false);
    setNamaDepanPengajar("");
    setNamaBelakangPengajar("");
    setEmail("");
    setPasswordPengajar("");
  };
  return (
    <div className="relative">
      <div
        className={isRegister ? "p-2 blur-sm transition-all" : "p-2 relative"}
      >
        <h2 className="text-2xl text-center mb-4 uppercase text-third">
          Admin Dashboard
        </h2>
        <div className="flex justify-evenly">
          <div className="p-2 my-4 rounded-sm shadow-lg hover:shadow-2xl transition-all">
            <h3 className="text-xl px-5 text-third text-center rounded-sm">
              Daftar Pengajar
            </h3>
            <div className="mt-3 px-3 h-40 overflow-hidden hover:overflow-auto hover:overflow-x-hidden">
              {dataPengajar?.map((pengajar, i) => {
                return (
                  <div
                    key={i}
                    className="mt-1 py-2 flex w-64 justify-between border border-black rounded-sm hover:bg-[#D9D9D9]"
                  >
                    <p className="ml-1 text-third">
                      {pengajar.namaDepan} {pengajar.namaBelakang}
                    </p>
                    <div className="mr-1">
                      <button
                        type="button"
                        className="mr-1 p-1 hover:text-[#064e3b] hover:bg-white rounded-sm"
                        onClick={() => profilePengajarDetail(pengajar._id)}
                      >
                        <FaUser className="text-xl hover:text-2xl transition-all" />
                      </button>
                      <button
                        type="button"
                        className="p-1 hover:text-red-700 hover:bg-white rounded-sm"
                        onClick={() => deleteUser(pengajar._id, pengajar.email)}
                      >
                        <FaRegTrashAlt className="text-xl hover:text-2xl transition-all" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-2 rounded-md overflow-hidden shadow-md bg-[#9D4545] text-white hover:bg-red-800 active:bg-red-900">
              <button
                type="button"
                className="w-full p-2 text-third"
                onClick={() => setIsRegister(true)}
                disabled={isRegister}
              >
                Tambah Pengajar
              </button>
            </div>
          </div>
          <div className="p-2 my-4 rounded-sm shadow-lg hover:shadow-2xl transition-all">
            <h2 className="text-xl px-5 text-third text-center rounded-sm">
              Daftar Pelajar
            </h2>
            <div className="mt-3 px-3 h-40 overflow-hidden hover:overflow-auto hover:overflow-x-hidden">
              {dataPelajar?.map((pelajar, i) => {
                return (
                  <div
                    key={i}
                    className="mt-1 py-2 flex w-64 justify-between border border-black rounded-sm hover:bg-[#D9D9D9]"
                  >
                    <p className="ml-1 text-third">
                      {pelajar.namaDepan} {pelajar.namaBelakang}
                    </p>
                    <div className="mr-1">
                      <button
                        type="button"
                        className="mr-1 p-1 hover:text-[#064e3b] hover:bg-white rounded-sm"
                        onClick={() => profilePelajarDetail(pelajar._id)}
                      >
                        {
                          <FaUser className="text-xl hover:text-2xl transition-all" />
                        }
                      </button>
                      <button
                        type="button"
                        className="p-1 hover:text-red-700 hover:bg-white rounded-sm"
                        onClick={() => deleteUser(pelajar._id, pelajar.email)}
                      >
                        {
                          <FaRegTrashAlt className="text-xl hover:text-2xl transition-all" />
                        }
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {isRegister && (
        <div
          className={
            isRegister &&
            "absolute md:w-[43%] md:top-10 md:left-[16rem] bg-white rounded-sm shadow-xl overflow-hidden"
          }
        >
          <h2
            className={isOkey ? "invisible" : "text-center p-1 text-third mb-2"}
          >
            Register Pengajar Baru
          </h2>
          {isOkey && (
            <div className="text-center">
              <p className="text-first text-2xl">{textSuccess}</p>
              <p className="mt-5 w-1/2 mx-auto">
                {<FaCheck className="text-8xl mx-auto" />}
              </p>
              <div className="flex w-[70%] justify-around mx-auto mt-2">
                <button
                  type="button"
                  onClick={backToRegister}
                  className="py-1 px-4 rounded-sm bg-lime-700 hover:bg-lime-800 active:bg-lime-900 text-white text-third "
                >
                  Register Again
                </button>
                <button
                  type="button"
                  onClick={backToDisplay}
                  className="py-1 px-[3rem] rounded-sm bg-slate-600 hover:bg-slate-700 active:bg-slate-800 text-white text-third"
                >
                  Ok
                </button>
              </div>
            </div>
          )}
          <div className={isOkey ? "invisible" : "m-1"}>
            <form onSubmit={submitNewTeacher} className="">
              <div className="flex justify-between">
                <input
                  type="text"
                  className="p-2 mr-1 outline outline-1 outline-black rounded-sm"
                  value={namaDepanPengajar}
                  onChange={(e) => setNamaDepanPengajar(e.target.value)}
                  placeholder="Nama Depan"
                  required
                />
                <input
                  type="text"
                  className="p-2 outline outline-1 outline-black rounded-sm"
                  value={namaBelakangPengajar}
                  onChange={(e) => setNamaBelakangPengajar(e.target.value)}
                  placeholder="Nama Belakang"
                  required
                />
              </div>
              <input
                type="email"
                className="p-2 mt-1 w-full outline outline-1 outline-black rounded-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                type="text"
                className="mt-1 w-full p-2 outline outline-1 outline-black rounded-sm"
                value={passwordPengajar}
                placeholder="Password"
                onChange={(e) => setPasswordPengajar(e.target.value)}
                required
              />
              {textFailed && (
                <p className="text-center my-2 text-first">{textFailed}</p>
              )}
              <div className="w-full mt-4 text-center">
                <button
                  type="submit"
                  className="uppercase px-10 py-1 bg-emerald-700 text-white hover:bg-emerald=800 active:bg-emerald-900"
                >
                  Enter
                </button>
              </div>
            </form>
            <div className="mt-2 text-center w-full">
              <button
                type="button"
                className="uppercase px-[35px] py-1 bg-red-700 text-white hover:bg-red=800 active:bg-red-900"
                onClick={() => setIsRegister(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminScreen;
