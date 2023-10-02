import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

const DetailStudent = () => {
  const [studentData, setStudentData] = useState([]);
  const [fileTaskStudent, setFileTaskStudent] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigateTo = useNavigate();

  useEffect(() => {
    fetch(`/api/user/student/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setStudentData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/file/fileStudent/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((dataFile) => {
        setFileTaskStudent(dataFile);
        setLoading(false);
      });
  }, [id]);

  const handleDownloadFileStudent = async (id) => {
      const response = await axios.get(`/api/file/taskDownload/${id}`, {responseType: 'blob'});
      const blob = new Blob([response.data], {type: response.data.type});
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "application/pdf";
      link.click();
  }

  return (
    <div className="relative p-2">
      <h2 className="text-center text-third text-2xl">Data Detail Student</h2>
      <button
        type="button"
        onClick={() => navigateTo("/home")}
        className="absolute top-12 left-3 px-7 rounded-sm bg-green-700 hover:bg-green-800 text-third text-white"
      >
        Back
      </button>
      <div className="mt-14  w-1/3 p-2 rounded-md bg-emerald-700 text-white text-third">
        <p className="mb-1">
          Nama Pelajar : {studentData.namaDepan} {studentData.namaBelakang}
        </p>
        <p>Email Pelajar : {studentData.email}</p>
      </div>
      <div className="mt-2 w-1/2 border border-x-2 border-emerald-900" />

      {/* File Tugas Akhir Belajar Student */}
      <div
        className={
          loading === false ? "mt-3 grid grid-cols-3 grid-rows-2 gap-3" : "mt-3"
        }
      >
        {loading ? (
          <p className="text-center p-2 text-third text-2xl">Loading...</p>
        ) : fileTaskStudent.length !== 0 ? (
          fileTaskStudent.map((dataTask) => {
            return (
              <div
                key={dataTask._id}
                className="p-1 m-2 rounded-sm shadow-md hover:shadow-xl transition-all border border-black hover:ring-2 ring-green-700"
              >
                <p className="mb-2 text-sm text-third">
                  Github Link:{" "}
                  <a
                    href={dataTask.linkGithub}
                    className=" ml-1 text-first underline hover:text-green-600"
                    target={dataTask.linkGithub !== "" ? "blank" : ""}
                  >
                    Click Here
                  </a>
                </p>
                <button
                  type="button"
                  onClick={() => handleDownloadFileStudent(dataTask._id)}
                  className="pr-3 pl-1 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-sm"
                >
                  File Task
                </button>
                <p>{dataTask.createdAt}</p>
              </div>
            );
          })
        ) : (
          <div className="w-full place-self-center">
            <p className="">Pelajar Belum Mengerjakan Tugas Apapun</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailStudent;
