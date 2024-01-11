import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Context
import { useActContext } from "../../../Context/ActContextProvider";

// Icons
import { AiOutlineCloudDownload } from "react-icons/ai";
import { BsChatLeftText } from "react-icons/bs";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

const PengajarScreen = () => {
  const [titleFile, setTitleFile] = useState("");
  const [descFile, setDescFile] = useState("");
  const [countData, setCountData] = useState(10);
  const [dataStudent, setDataStudent] = useState([]);
  const [categoryFile, setCategoryFile] = useState("html-dasar");
  const [linkGithubTask, setLinkGithubTask] = useState("");
  const [loading, setLoading] = useState(false);
  const { activeMenu } = useActContext();
  const [loadingTask, setLoadinTask] = useState(false);
  const fileRef = useRef(null);
  const taskRef = useRef(null);
  const navigateTo = useNavigate();

  useEffect(() => {
    fetch("/api/user/students")
      .then((res) => {
        return res.json();
      })
      .then((dataJson) => {
        setDataStudent(dataJson);
        setCountData(10);
      });
  }, []);

  useEffect(() => {
    setTitleFile("");
    setDescFile("");
  }, [loading]);

  useEffect(() => {
    setLinkGithubTask("");
  }, [loadingTask]);

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("titleFile", titleFile);
      formData.append("descFile", descFile);
      formData.append("categoryFile", categoryFile);
      formData.append("file", fileRef.current.files[0]);
      await axios.post("http://localhost:4000/api/file/upload", formData);
    } catch (err) {
      setLoading(true);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const submitDetailStudent = (id) => {
    navigateTo(`/student/${id}`);
  };

  const submitTask = async (e) => {
    e.preventDefault();
    try {
      setLoadinTask(true);
      const formData = new FormData();
      formData.append("linkProjectGithub", linkGithubTask);
      formData.append("fileTask", taskRef.current.files[0]);
      await axios.post("http://localhost:4000/api/file/taskStudent", formData);
    } catch (err) {
      setLoadinTask(true);
      console.log(err);
    } finally {
      setLoadinTask(false);
    }
  };

  const moveToChat = () => {
    navigateTo("/communication-group-login");
  };

  const handleSort = async (whatSort) => {
    const manyData = dataStudent.length;

    if(whatSort === "ASC"){
      const response = await fetch("/api/user/ascendingData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ manyData, sortData: "1"})
      });

      const parseData = await response.json();

      if(response.ok){
        setDataStudent(parseData);
      }
    } else if(whatSort === "DESC"){
      const response = await fetch("/api/user/ascendingData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ manyData, sortData: "-1"})
      });

      const parseData = await response.json();

      if(response.ok){
        setDataStudent(parseData);
      }
    }

  }

  const loadDatas = async () => {
    setCountData((prev) => prev + 5);
    console.log(countData)
    const getData = await fetch("/api/user/loadData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ countData }),
    });

    const response = await getData.json();

    if (getData.ok) {
      setDataStudent(response);
    }
  };
  return (
    <div>
      <div
        className={
          activeMenu === false
            ? "md:flex md:justify-around md:py-5 md:px-6"
            : "md:flex md:py-5 md:px-6"
        }
      >
        <div
          className={
            activeMenu
              ? "input-file mr-15 md:mr-10 rounded-md transition ease-in-out delay-100 hover:shadow-2xl bg-emerald-500"
              : "input-file mr-15  rounded-md transition ease-in-out delay-100 hover:shadow-2xl bg-emerald-500"
          }
        >
          <h3 className="my-3 text-center text-white pt-2 pb-1 text-third w-2/3 mx-auto">
            Masukkan Materi Terbaru
          </h3>
          <form onSubmit={submitHandle} className="p-2">
            <div className="flex flex-col px-3 py-2">
              <div className="mb-2 rounded-md">
                <input
                  type="text"
                  name="title"
                  placeholder="Judul"
                  value={titleFile}
                  onChange={(e) => setTitleFile(e.target.value)}
                  className="p-3 w-full rounded-md"
                  required
                />
              </div>
              <div className="mb-2 rounded-md">
                <textarea
                  placeholder="Deskripsi"
                  value={descFile}
                  onChange={(e) => setDescFile(e.target.value)}
                  className="mb-0 p-3 rounded-md w-full"
                  required
                ></textarea>
              </div>
              <div className="rounded-md p-[0.5px]">
                <select
                  className="w-full p-2 rounded-md"
                  onChange={(e) => setCategoryFile(e.target.value)}
                  required
                >
                  <option value="html-dasar">HTML - DASAR</option>
                  <option value="html-lanjut">HTML - LANJUTAN</option>
                  <option value="css-dasar">CSS - DASAR</option>
                  <option value="css-lanjut">CSS - LANJUTAN</option>
                  <option value="js-dasar">JAVASCRIPT - DASAR</option>
                  <option value="js-lanjut">JAVASCRIPT - LANJUTAN</option>
                  <option value="github">GIT & GITHUB</option>
                  <option value="nodejs">NODE JS</option>
                  <option value="reactjs">REACT JS</option>
                  <option value="vuejs">VUE JS</option>
                  <option value="angularjs">Angular JS</option>
                </select>
              </div>
              <div className="mt-2">
                <input
                  type="file"
                  ref={fileRef}
                  className="block w-full text-sm text-slate-800
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-full file:border-0
                           file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-emerald-700
                        hover:file:bg-violet-100
                     "
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-8 w-40 p-2 mx-auto rounded-full text-white bg-emerald-700 hover:bg-emerald-800 active:outline-2 active:bg-emerald-900 uppercase"
              >
                Enter
              </button>
            </div>
          </form>
          {loading && <p className="text-center text-first">loading...</p>}
        </div>

        <div className="daftar-student rounded-md overflow-hidden transition ease-in-out delay-100 shadow-lg hover:shadow-2xl">
          <h3 className="my-2 text-black text-center text-third pt-2 pb-1 w-2/3 mx-auto">
            Daftar Pelajar
          </h3>

          <div className="px-3 py-2 mx-10  h-40 overflow-hidden hover:overflow-auto border-dashed border-l-2 border-emerald-700 rounded-lg">
            {dataStudent.map((data) => {
              return (
                <div
                  key={data._id}
                  className="flex relative rounded-lg my-3 overflow-hidden shadow-xl text-third"
                >
                  <div className="mr-10 ml-3 my-2">
                    <p className="pr-5">{data.email}</p>
                    <p className="pr-5">
                      {data.namaDepan} {data.namaBelakang}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="absolute right-2 top-5 p-1 rounded-full shadow-lg hover:bg-black hover:text-white"
                    onClick={() => submitDetailStudent(data._id)}
                  >
                    {<AiOutlineCloudDownload />}
                  </button>
                </div>
              );
            })}
            {countData >= dataStudent.length + 6 ? (
              ""
            ) : (
              <div className="w-1/3 mx-auto hover:bg-black hover:text-white transition-all rounded-sm overflow-hidden">
                <button type="button" className="w-full" onClick={loadDatas}>
                  More
                </button>
              </div>
            )}
          </div>
          <div className="w-1/3 mt-2 mx-auto flex justify-evenly">
            <div className="w-[20px]">
              <button
                type="button"
                className="w-full"
                onClick={() => handleSort("ASC")}
              >
                {<FaSortAlphaDown />}
              </button>
            </div>
            <div className="w-[20px]">
              <button
                type="button"
                className="w-full"
                onClick={() => handleSort("DESC")}
              >
                {<FaSortAlphaUp />}
              </button>
            </div>
          </div>
          <div className="Total-pelajar flex mt-3 p-3 justify-evenly">
            <div className="p-2 rounded-md shadow-md">
              <h3 className="px-2 text-third">Jumlah Pelajar</h3>
              <p className=" w-10 text-center mx-auto mt-1 text-zinc-800 text-3xl text-third">
                {dataStudent.length}
              </p>
            </div>
            <div className="p-2 shadow-md rounded-md text-center">
              <h3 className="px-2 text-third">Pesan</h3>
              <button
                type="button"
                onClick={moveToChat}
                className="p-2 mt-1 rounded-xl mx-auto text-2xl hover:bg-emerald-600 active:bg-emerald-700 hover:text-white transition delay-100 ease-in-out outline-2 focus:outline-none focus:ring focus:ring-emerald-800"
              >
                {<BsChatLeftText />}
              </button>
            </div>
          </div>
        </div>

        {activeMenu === false && (
          <div className=" p-2 shadow-lg hover:shadow-2xl rounded-md transition-all">
            <h2 className="text-center mb-2 text-third text-xl">
              Masukkan Tugas Akhir
            </h2>
            <form onSubmit={submitTask}>
              <div className="grid w-full overflow-hidden">
                <label className="text-third">
                  Masukkan Tugas Project Github
                </label>
                <input
                  type="text"
                  className="p-2 outline-none border border-gray-900 rounded-sm"
                  value={linkGithubTask}
                  onChange={(e) => setLinkGithubTask(e.target.value)}
                  placeholder="Link Project Github"
                  required
                />
              </div>
              <div className="grid w-full mt-3 overflow-hidden">
                <label className="text-third">Masukkan File Tugas</label>
                <input
                  type="file"
                  className="block w-full text-sm text-slate-800
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-full file:border-0
                           file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-emerald-700
                        hover:file:bg-violet-100"
                  ref={taskRef}
                />
              </div>
              <div className="mx-auto w-[45%] mt-2 rounded-t-md overflow-hidden bg-emerald-700 hover:bg-emerald-800 text-white">
                <button type="submit" className="w-full p-2">
                  Enter
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {activeMenu && (
        <div className="p-2 w-1/2 mx-auto my-2 shadow-lg hover:shadow-2xl rounded-md transition-all">
          <h2 className="text-center mb-2 text-third text-xl">
            Masukkan Tugas Akhir
          </h2>
          <form onSubmit={submitTask}>
            <div className="grid w-[65%] overflow-hidden">
              <label className="text-third">
                Masukkan Tugas Project Github
              </label>
              <input
                type="text"
                className="p-2 outline-none border border-gray-900 rounded-sm"
                value={linkGithubTask}
                onChange={(e) => setLinkGithubTask(e.target.value)}
                placeholder="Link Project Github"
                required
              />
            </div>
            <div className="grid w-[65%] mt-3 overflow-hidden">
              <label className="text-third">Masukkan File Tugas</label>
              <input
                type="file"
                className="block w-full text-sm text-slate-800
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-full file:border-0
                           file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-emerald-700
                        hover:file:bg-violet-100"
                ref={taskRef}
              />
            </div>
            <div className="mx-auto w-[45%] mt-2 rounded-t-md overflow-hidden bg-emerald-700 hover:bg-emerald-800 text-white">
              <button type="submit" className="w-full p-2">
                Enter
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PengajarScreen;
