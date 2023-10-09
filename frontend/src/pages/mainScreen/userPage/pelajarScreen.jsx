import React, { useRef, useState, useEffect } from "react";

// Packages
import axios from "axios";

// Import hooks
import { UseUserContext } from "../../../Hooks/UseUserContext";

// Icons
import { BiMessageDetail } from "react-icons/bi";

const PelajarScreen = () => {
  const fileRef = useRef(null);
  const [linkGithub, setLinkGithub] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = UseUserContext();

  useEffect(() => {
    setLinkGithub("");
  }, [loading]);

  useEffect(() => {
    fetch(`/api/nilaiStudent/${user.dataUser._id}`)
      .then((res) => res.json())
      .then((result) => setResult(result));
  }, []);

  // Handle Submit File Tugas Student
  async function handleSubmitFileStudent(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("linkGithub", linkGithub);
      formData.append("fileStudent", fileRef.current.files[0]);
      await axios.post(`/api/file/fileStudent/${user.dataUser._id}`, formData);
      setLoading((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="pb-2">
      <div className="flex p-2 pt-5">
        {/* Form Input Tugas */}
        <div className="ml-16 mr-10 p-1 rounded-sm overflow-hidden border shadow-md hover:shadow-2xl transition ease-in-out delay-100">
          <h2 className="text-third text-center text-xl">
            Masukkan Tugas Akhir Anda
          </h2>
          <form onSubmit={handleSubmitFileStudent}>
            <div className="grid content-evenly">
              <label className="mt-4 text-xs w-[65%] p-1 pr-2 ml-1 text-slate-700 border border-black text-third rounded-sm font-normal">
                Pastikan anda sudah menyelesaikan semua course yang disediakan.
              </label>
              <input
                type="text"
                value={linkGithub}
                onChange={(e) => setLinkGithub(e.target.value)}
                className="mt-3 ml-1 mb-1 p-2 outline-none w-[80%] border border-emerald-700 focus:ring-1 rounded-sm placeholder:text-sm"
                placeholder="Masukkan Link Github Projek"
              />
              <div className="mt-2">
                <input
                  type="file"
                  ref={fileRef}
                  required
                  className="w-[60%] block text-sm text-slate-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-emerald-700 hover:file:bg-violet-100"
                />
              </div>
              <button
                type="submit"
                className="mt-5 mb-2 p-1 w-1/2 mx-auto uppercase text-white rounded-sm bg-emerald-700 hover:bg-emerald-800 focus:bg-emerald-900"
              >
                Enter
              </button>
            </div>
          </form>
        </div>

        {/* Table Information Score and Messages */}
        <div className="p-2 rounded-sm shadow-md hover:shadow-2xl transition-all border text-center">
          <h2 className="text-center text-third text-2xl mb-2 px-4">
            Hasil Belajar Anda
          </h2>
          <div className="px-10 bg-emerald-800 text-white bg-opacity-70 rounded-sm">
            <p className="text-third text-xl text-center">Score</p>
            <p className="text-center mt-2 text-third text-4xl">0</p>
          </div>
          <button
            type="button"
            onClick={() => {}}
            className="mt-3 text-center uppercase p-2 mx-auto rounded-sm disabled:bg-zinc-300 disabled:text-black bg-emerald-700 focus:bg-emerald-900 text-white"
            disabled={true}
          >
            Cetak Sertifikat
          </button>
        </div>
      </div>

      <div className=" w-[15%] mx-auto mt-2 text-center rounded-sm shadow-md overflow-hidden transition-all hover:shadow-xl">
        <h2 className="text-center text-third px-5">Pesan</h2>
        <button
          type="button"
          onClick={() => {}}
          className="mt-1 h-10 w-10 font-bold text-2xl rounded-full text-white bg-emerald-600 hover:bg-emerald-700 mb-2"
        >
          <BiMessageDetail className="mx-auto" />
        </button>
      </div>
    </div>
  );
};

export default PelajarScreen;
