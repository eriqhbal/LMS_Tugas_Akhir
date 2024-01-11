import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// Icons
import { AiOutlineArrowLeft } from "react-icons/ai";

// context Hooks
import { UseUserContext } from '../../Hooks/UseUserContext';
import { useActContext } from '../../Context/ActContextProvider';


const ChangeDataPage = () => {
  const [emailUser, setEmailUser] = useState("");
  const [namaDepan, setnamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [passwordUser, setPasswordUser] = useState("");

  const { id } = useParams();
  const { user,dispatch } = UseUserContext();
  const { activeMenu } = useActContext();
  const userString = JSON.stringify(user);
  const navigateTo = useNavigate();

  const handleChangeData = async (e) => {
    e.preventDefault();

    if (userString.includes("gmail")) {
      const response = await fetch(`/api/user/admin/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ emailUser, namaDepan, namaBelakang, passwordUser })
      });
      const dataJson = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(dataJson));
        dispatch({type: "LOGIN", payload: dataJson});
        navigateTo("/home");
      } else {
        console.log(dataJson.err);
      }

    } else if (userString.includes("student")) {
      const response = await fetch(`/api/user/student/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ emailUser, namaDepan, namaBelakang, passwordUser })
      })

      const dataJson = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(dataJson));
        dispatch({type: "LOGIN", payload: dataJson})
        navigateTo("/home");
      } else {
        console.log(dataJson.err);
      }
    }

  }

  return (
    <div className='relative p-5'>
      <button type="button" onClick={() => navigateTo("/home")} className={activeMenu ? 'absolute ml-16 mt-1 p-1 rounded-sm bg-green-700 text-white flex items-center px-4 hover:bg-green-800' : 'rounded-sm bg-green-700 text-white flex items-center hover:bg-green-800 p-1 ml-20'}><AiOutlineArrowLeft /><p className='ml-1'>Back Home</p></button>

      <div className={activeMenu ? 'p-3 w-1/2 mx-auto rounded-md overflow-hidden shadow-xl' : 'mt-[30px]'}>
        <h2 className='mb-3 text-center text-third text-2xl'>Ubah Data</h2>

        <form onSubmit={handleChangeData}>
          <div className='grid content-around'>
            {/* Masukkan Email */}
            <div className='flex flex-col mb-1'>
              <label className='text-third'>Masukkan Email <span className='text-red-700'>*</span></label>
              <input type="text" value={emailUser} onChange={(e) => setEmailUser(e.target.value)} placeholder='Email' className='p-2 border-2 focus:outline-none focus:border-green-700 focus:ring-1 border-slate-200 placeholder-slate-400 rounded-md' required />
            </div>

            {/* Ubah Nama Depan */}
            <div className='flex flex-col mb-1'>
              <label className='text-third'>Ganti nama Depan <span className='text-slate-400'>(optional)</span></label>
              <input type="text" value={namaDepan} onChange={(e) => setnamaDepan(e.target.value)} placeholder='Nama Depan' className='p-2 border-2 focus:outline-none focus:border-green-700 focus:ring-1 rounded-md' />
            </div>

            {/* Ubah Nama Belakang */}
            <div className='flex flex-col mb-1'>
              <label className='text-third'>Ganti nama Belakang <span className='text-slate-400'>(optional)</span></label>
              <input type="text" value={namaBelakang} onChange={(e) => setNamaBelakang(e.target.value)} placeholder='Nama Belakang' className='p-2 border-2 focus:outline-none focus:border-green-700 focus:ring-1 rounded-md' />
            </div>

            {/* Ganti Password */}
            <div className='flex flex-col mb-1'>
              <label className='text-third'>Ganti Password <span className='text-slate-400'>(optional)</span></label>
              <input type="text" value={passwordUser} onChange={(e) => setPasswordUser(e.target.value)} placeholder='Password' className='p-2 border-2 focus:outline-none focus:border-green-700 focus:ring-1 rounded-md' />
            </div>
            <button type="submit" className='my-2 w-1/3 mx-auto rounded-sm p-2 bg-emerald-600 text-white uppercase text-third hover:bg-emerald-700'>Enter</button>
          </div>
        </form>

      </div>
    </div>
  )

}

export default ChangeDataPage