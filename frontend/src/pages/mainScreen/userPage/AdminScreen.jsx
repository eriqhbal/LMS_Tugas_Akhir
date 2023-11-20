import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Icon
import { FaUser, FaRegTrashAlt } from "react-icons/fa";

const AdminScreen = () => {
  const [dataPengajar, setDataPengajar] = useState([]);
  const [dataPelajar, setDataPelajar] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const navigateTo = useNavigate();

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
  }

  const deleteUser = (id, emailUser) => {

    if(emailUser.includes("student")){

    }else {
      fetch(`/api/user/removeTeacher/${id}`, {
        method: 'DELETE'
      }).then(res => res.json()).then(succ => {
        setDataPengajar(prevData => {
          prevData.filter(pengajar => pengajar._id !== id);
        });
        setIsChange(prevChange => !prevChange);
      });
    }
  }

  return (
    <div className="p-2">
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
        </div>
        <div>Student Display</div>
      </div>
    </div>
  );
};

export default AdminScreen;
