import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// icons
import { TbCircleCheckFilled } from "react-icons/tb";

const DetailStudentSertifikatAdmin = () => {
  const [dataStudent, setDataStudent] = useState({});
  const [gradeStudent, setGradeStudent] = useState([]);
  const sertifikatStudentRef = useRef(null);
  const [handleErrMessage, setHandleErrMessage] = useState("");
  const [handleNoGrade, setHandleNoGrade] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [messageFail, setMessageFail] = useState("");
  const { id } = useParams();
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/user/student/${id}`);
      const parseData = await response.json();

      if (!response.ok) {
        setHandleErrMessage(parseData.err);
        console.log(parseData);
      } else {
        setDataStudent(parseData);
      }
    };

    async function fetchGradeStudent() {
      setLoading(true);
      const responseGrade = await fetch(`/api/nilaiStudent/${id}`);

      const parseData = await responseGrade.json();

      if (parseData?.length === 0) {
        setHandleNoGrade("Pelajar belum memiliki nilai");
        setLoading(false);
      } else {
        const theHigherValue = parseData?.reduce((acc, currentValue) => {
          return currentValue.nilaiStudent > acc.nilaiStudent
            ? currentValue
            : acc;
        });
        setGradeStudent(theHigherValue);
        setLoading(false);
      }
    }

    fetchData();
    fetchGradeStudent();
  }, [id]);

  async function handleSubmitCertificate(e) {
    e.preventDefault();

    const addData = new FormData();
    try {
      addData.append(
        "certificateStudent",
        sertifikatStudentRef.current.files[0]
      );
      const response = await axios.post(
        `/api/nilaiStudent/certificateForStudent/${id}`,
        addData
      );
      if (response.status === 201) {
        console.log(response);
        setMessageSuccess(response.data.success);
        setIsSuccess(true);
        setMessageFail("");
      }
    } catch (e) {
      setMessageFail("Anda Belum menginputkan sertifikat");
    }
  }

  const doneSuccess = () => {
    setIsSuccess(false);
  }

  return handleErrMessage !== "" ? (
    <p className="text-center text-2xl text-third p-2">{handleErrMessage}</p>
  ) : (
    <div className="p-2 relative">
      <h2 className="text-center p-2 text-third text-2xl">Detail Student</h2>
      <button
        type="button"
        onClick={() => navigateTo(-1)}
        className="md:absolute md:top-4 md:left-20 px-6 py-1 rounded-sm  bg-green-700 hover:bg-green-800 text-white text-third"
      >
        Back
      </button>
      <div className="my-3 p-2">
        <div className="mx-auto p-2 w-1/3 rounded-sm shadow-md">
          <p className="border-b-2 border-b-stone-200">
            <span className="font-semibold">Nama Pelajar:</span>{" "}
            {dataStudent.namaDepan} {dataStudent.namaBelakang}
          </p>
          <p className="mt-2 border-b-2 border-b-stone-200">
            <span className="font-semibold">Email Pelajar:</span>{" "}
            {dataStudent.email}
          </p>
          <p className="mt-2 border-b-2 border-b-stone-200">
            <span className="font-semibold">Password Pelajar:</span>{" "}
            {dataStudent.password}
          </p>
        </div>
        {handleNoGrade !== "" ? (
          <p className="text-center text-third py-2 mt-2">{handleNoGrade}</p>
        ) : (
          <>
            {loading ? (
              <p className="text-center text-first p-2 mt-2">Loading...</p>
            ) : (
              <>
                <h2 className="mt-4 text-center text-third text-2xl">Score</h2>
                <div className="w-[55%] mx-auto border border-opacity-40 border-slate-400 rounded-md overflow-hidden hover:shadow-2xl transition">
                  <div className="w-full flex overflow-hidden border border-b-slate-400">
                    <p className="text-center text-2xl text-third py-4 px-8 border border-opacity-40 border-slate-400 shadow-xl">
                      {gradeStudent.nilaiStudent}
                    </p>
                    <p className="w-[36%] text-third pl-2">Alasan Nilai: </p>
                    <p className="w-full pr-1">{gradeStudent.alasanNilai}</p>
                  </div>
                  {gradeStudent.nilaiStudent <= 75 ? (
                    <p className="text-center text-third px-2">
                      Tidak bisa menginputkan sertifikat, nilai kurang dari 75
                    </p>
                  ) : (
                    <div className="text-center w-1/2 mx-auto mt-2">
                      <form onSubmit={handleSubmitCertificate}>
                        <input
                          type="file"
                          id="files"
                          className="hidden"
                          ref={sertifikatStudentRef}
                        />
                        <label
                          htmlFor="files"
                          className="px-16 bg-gray-800 text-white rounded-sm hover:cursor-pointer uppercase"
                        >
                          Kirim Sertifikat
                        </label>
                        <button
                          type="submit"
                          className="mt-2 w-full text-center bg-green-700 text-white text-third hover:bg-green-800 active:bg-green-900"
                        >
                          Enter
                        </button>
                      </form>
                      {messageFail && <p className="mt-2">{messageFail}</p>}
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
      {isSuccess && (
        <div className=" absolute z-50 bg-white top-20 md:left-[16rem] rounded-md shadow-2xl border border-green-800">
          <p className="px-20 text-xl text-third mt-1">{messageSuccess}</p>
          <p className="my-3">
            {<TbCircleCheckFilled className="text-4xl mx-auto" />}
          </p>
          <div className="text-center mt-3 mb-2 transition">
            <button type="button" onClick={doneSuccess} className="px-10 py-2 rounded-sm bg-green-700 active:bg-green-800 text-white">
              Done!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailStudentSertifikatAdmin;
