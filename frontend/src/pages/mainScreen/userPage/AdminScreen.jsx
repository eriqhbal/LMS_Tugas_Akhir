import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Icon
import { FaUser, FaRegTrashAlt } from "react-icons/fa";

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

  const deleteUser = (id, emailUser) => {
    if (emailUser.includes("student")) {
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
  }

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
          <div>Student Display</div>
        </div>
      </div>
      {isRegister && (
        <div
          className={
            isRegister
              ? "absolute md:w-[43%] md:top-10 md:left-80 bg-white rounded-sm shadow-xl overflow-hidden"
              : ""
          }
        >
          <h2 className="text-center p-1 text-third mb-2">
            Register Pengajar Baru
          </h2>
          <div className="m-1">
            <form onSubmit={submitNewTeacher} className="">
              <div className="flex justify-between">
                <input
                  type="text"
                  className="p-2 mr-1"
                  value={namaDepanPengajar}
                  onChange={(e) => setNamaDepanPengajar(e.target.value)}
                  placeholder="Nama Depan"
                />
                <input
                  type="text"
                  className="p-2"
                  value={namaBelakangPengajar}
                  onChange={(e) => setNamaBelakangPengajar(e.target.value)}
                  placeholder="Nama Belakang"
                />
              </div>
              <input
                type="email"
                className="p-2 mt-1 w-full"
                value={email}
                placeholder="Email"
              />
              <input
                type="text"
                className="mt-1 w-full p-2"
                value={passwordPengajar}
                placeholder="Password"
              />
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
