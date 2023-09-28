import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DetailStudent = () => {
   const [studentData, setStudentData] = useState([]);
   const { id } = useParams();
   const navigateTo = useNavigate();

   useEffect(() => {
      fetch(`/api/user/student/${id}`).then(response => {
         return response.json();
      }).then(data => {
         setStudentData(data);
      }).catch(err => {
         console.log(err);
      })
   }, [id])

   return (
      <div className='relative p-2'>
         <h2 className='text-center text-third text-2xl'>Data Detail Student</h2>
         <button type="button" onClick={() => navigateTo("/home")} className='absolute top-12 left-3 px-7 rounded-sm bg-green-700 hover:bg-green-800 text-third text-white'>Back</button>
         <div className='mt-14  w-1/3 p-2 rounded-md bg-emerald-700 text-white text-third'>
            <p className='mb-1'>Nama Pelajar : {studentData.namaDepan} {studentData.namaBelakang}</p>
            <p>Email Pelajar : {studentData.email}</p>
         </div>
         <div className='mt-2 w-1/2 border border-x-2 border-emerald-900'>
            
         </div>
      </div>
   )
}

export default DetailStudent;