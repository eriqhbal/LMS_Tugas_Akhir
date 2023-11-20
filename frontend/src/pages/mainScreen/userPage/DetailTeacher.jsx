import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetailTeacher = () => {
  const {id} = useParams();
  const [dataTeacher, setDataTeacher] = useState([]);
  const navigateTo = useNavigate();

  useEffect(() => {
    fetch(`/api/user/admin/${id}`).then(res => {
      return res.json();
    }).then(dataTeacher => {
      setDataTeacher(dataTeacher);
    })
  },[id])


  return (
    <div className="p-2 relative">
      <h1 className="text-center text-2xl text-third">Profile Teacher</h1>
      <button type="button" className="absolute md:left-32 md:top-[60px] px-4 py-1 rounded-sm bg-green-700 hover:bg-green-800 text-white text-third" onClick={() => navigateTo(-1)}>Back</button>
      <div className="p-1 my-5 w-1/3 mx-auto rounded-sm shadow-md hover:shadow-lg transition-all">
        <div className="p-1">
          <p className="uppercase text-third">Nama Lengkap</p>
          <p className="">
            {dataTeacher.namaDepan} {dataTeacher.namaBelakang}
          </p>
        </div>
        <div className="p-1 mt-2">
          <p className="uppercase text-third">Email</p>
          <p className="">{dataTeacher.email}</p>
        </div>
        <div className="p-1 mt-2">
          <p className="uppercase text-third">Password</p>
          <p className="">{dataTeacher.password}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailTeacher;
