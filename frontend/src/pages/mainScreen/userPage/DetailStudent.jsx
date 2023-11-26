import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import axios from "axios";

// Icons
import {IoIosCheckmarkCircle} from "react-icons/io";

const DetailStudent = () => {
  const [studentData, setStudentData] = useState([]);
  const [fileTaskStudent, setFileTaskStudent] = useState([]);

  const [nilaiStudent, setNilaiStudent] = useState("");
  const [alasanNilai, setAlasanNilai] = useState("");
  const [loading, setLoading] = useState(true);
  const [resultResponseError, setResultResponseError] = useState([]);
  const [resultResponseSuccess, setResultResponseSuccess] = useState([]);
  const [resultSuccess, setResultSuccess] = useState(false);
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
    const response = await axios.get(`/api/file/taskDownload/${id}`, {
      responseType: "blob",
    });
    const blob = new Blob([response.data], { type: response.data.type });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "application/pdf";
    link.click();
  };

  const handleNilaiStudent = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/nilaiStudent/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nilaiStudent, alasanNilai }),
    });

    const dataJson = await response.json();

    if (!response.ok) {
      setResultResponseError(dataJson.err);
    } else {
      console.log(dataJson);
      setResultResponseSuccess(dataJson.message);
      setResultSuccess(true);
      setResultResponseError("");
    }
  };

  const doneSuccess = () => {
    setResultSuccess(false);
    setNilaiStudent("");
    setAlasanNilai("");
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
      <div className="flex justify-between content-center mt-2">
        <div className="mt-14  w-1/3 p-2 rounded-md bg-emerald-700 text-white text-third">
          <p className="mb-1">
            Nama Pelajar : {studentData.namaDepan} {studentData.namaBelakang}
          </p>
          <p>Email Pelajar : {studentData.email}</p>
        </div>
        <div className="mr-28 px-5 border-2 box-border rounded-md border-gray-900">
          <h2 className="text-center text-third p-2">Input Nilai Student</h2>
          <form onSubmit={handleNilaiStudent} className="mt-2 grid">
            <input
              type="text"
              name="nilai-Siswa"
              value={nilaiStudent}
              onChange={(e) => setNilaiStudent(e.target.value)}
              className="w-1/2 px-2 py-3 text-xl text-center mx-auto focus:outline-none border-2 border-gray-900 rounded-md"
              placeholder="0-100"
            />

            <input
              type="text"
              className="focus:outline-none rounded-sm border-2 p-2 border-gray-900 mx-auto mt-2 placeholder:text-center"
              placeholder="Reason"
              value={alasanNilai}
              onChange={(e) => setAlasanNilai(e.target.value)}
            />
            <button
              type="submit"
              className="mt-3 mb-2 mx-5 p-2 rounded-sm bg-gray-900 text-white hover:bg-green-700 active:bg-green-800"
            >
              Enter
            </button>
            {resultResponseError && <p>{resultResponseError}</p>}
          </form>
        </div>
      </div>
      {resultSuccess && (
        <div className="absolute z-50 bg-white p-2 md:left-[15rem] md:top-4 shadow-2xl rounded-md border border-green-800">
          <p className="text-black text-third px-7 text-3xl">
            {resultResponseSuccess}
          </p>
          <p className="my-3">{<IoIosCheckmarkCircle className="text-4xl mx-auto"/>}</p>
          <div className="text-center mt-3">
            <button
              type="button"
              onClick={doneSuccess}
              className="px-10 py-2 rounded-sm bg-green-700 active:bg-green-800 text-white"
            >
              Done
            </button>
          </div>
        </div>
      )}

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
                <p>
                  {formatDistanceToNow(new Date(dataTask.createdAt), {
                    addSuffix: true,
                  })}
                </p>
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
