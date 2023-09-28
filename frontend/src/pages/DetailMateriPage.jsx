import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Icons
import { AiOutlineArrowLeft } from "react-icons/ai";

const DetailMateriPage = () => {
  const [changeTitle, setChangeTitle] = useState("");
  const [changeDescFile, setChangeDestFile] = useState("");
  const [changeCategoryFile, setChangeCategoryFile] = useState("");
  const navigateTo = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/file/material/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setChangeTitle(data.titleFile);
        setChangeDestFile(data.descFile);
        setChangeCategoryFile(data.categoryFile);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleSubmitChangeMateri = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/file/download/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ changeTitle, changeDescFile, changeCategoryFile }),
    });

    const dataJson = await response.json();
    
    if(!response.ok){
      console.log(dataJson.err);
    } else {
      navigateTo(-1);
    }
    
  };

  return (
    <div className="p-5 relative">
      <button
        type="button"
        onClick={() => navigateTo(-1)}
        className="absolute flex p-1 px-4 left-20 rounded-sm bg bg-green-700 hover:bg-green-800 text-white items-center"
      >
        <AiOutlineArrowLeft />
        <p className="ml-1">Back Home</p>
      </button>
      <div className="w-1/2 mx-auto p-3 rounded-md shadow-md">
        <h2 className="w-1/2 mx-auto text-center mb-5 text-2xl text-third">
          Ubah Data Materi
        </h2>

        <form onSubmit={handleSubmitChangeMateri}>
          <div className="grid content-around">
            <div className="flex flex-col mb-2">
              <label className="text-third">
                Ubah Title Materi{" "}
                <span className="text-slate-400">(optional)</span>
              </label>
              <input
                type="text"
                value={changeTitle}
                onChange={(e) => setChangeTitle(e.target.value)}
                className="p-2 border-2 focus:outline-none focus:border-green-700 focus:ring-1 rounded-md"
                placeholder="Title"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-third">
                Description File{" "}
                <span className="text-slate-400">(optional)</span>
              </label>
              <textarea
                rows="5"
                cols="45"
                value={changeDescFile}
                onChange={(e) => setChangeDestFile(e.target.value)}
                className="mt-2 p-3 rounded-md border-2"
              ></textarea>
              <div className="rounded-md p-[0.5px]">
                <select
                  className="w-full p-2 rounded-md mt-1 shadow-md"
                  onChange={(e) => setChangeCategoryFile(e.target.value)}
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
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="mt-3 p-2 w-1/3 rounded-sm bg-emerald-700 hover:bg-emerald-800 uppercase mx-auto text-white"
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailMateriPage;
