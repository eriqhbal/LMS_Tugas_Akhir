import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

// Icons
import { AiOutlineDownload, AiFillEdit, AiFillDelete } from "react-icons/ai";

// Hooks
import { UseUserContext } from "../Hooks/UseUserContext";

const ItemMaterial = ({ category_file }) => {
  const [dataMateri, setDataMateri] = useState([]);
  const navigateTo = useNavigate();
  const { user } = UseUserContext();
  const userString = JSON.stringify(user);

  useEffect(() => {
    fetch("/api/file/material")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDataMateri(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDownloadMateri = async (id) => {
    const response = await axios.get(`/api/file/download/${id}`, {responseType: "blob"});
    const blob = new Blob([response.data], {type: response.data.type});
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = "file/pdf";
    link.click();
  }

  const handleEditMateri = async (id) => {
    navigateTo(`/materi/${id}`);
  }

  const handleDeleteMateri = (id) => {
    fetch(`/api/file/material/${id}`, {
      method: "DELETE",
    }).then(response => {
      if(response.ok){
        navigateTo("/home")
      }
    })
  }

  return (
    <>
      {category_file === "html-dasar" ? (
        <div className="p-2">
          <h1 className="w-1/2 mb-8 text-third text-3xl">
            Materi {"<"}HTML{"/>"} Dasar
          </h1>
          <div className="grid grid-cols-3 grid-rows-2 gap-4">
            {dataMateri.map((dataM) => {
              return (
                dataM.categoryFile === "html-dasar" && (
                  <div
                    key={dataM._id}
                    className="w-62 relative rounded-md overflow-hidden shadow-md hover:bg-sky-900 hover:text-white hover:shadow-xl transition ease-in-out duration-150"
                  >
                    <h2 className="mb-1 p-1 text-xl text-third">
                      {dataM.titleFile}
                    </h2>
                    <div className="mb-20">
                      <p className="p-1 text-sm">{dataM.descFile}</p>
                    </div>
                    {/* Button  */}
                    <div className="button-edit w-full absolute bottom-1 flex justify-between p-2">
                      {userString.includes("gmail") && (
                        <div className="p-1 px-4 mr-14 bg-slate-300 rounded-sm">
                          <button
                            type="button"
                            onClick={() => handleEditMateri(dataM._id)}
                            className="mr-4 text-red-700 hover:text-black"
                          >
                            <AiFillEdit />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMateri(dataM._id)}
                            className="hover:text-black text-blue-700"
                          >
                            <AiFillDelete />
                          </button>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDownloadMateri(dataM._id)}
                        className="text-xl h-6 w-6 mt-1 pl-[2px] rounded-sm hover:bg-black hover:text-white"
                      >
                        <AiOutlineDownload />
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      ) : category_file === "html-lanjut" ? (
        <div className="p-2">
          <h1 className="w-1/2 mb-8 text-third text-3xl">
            Materi {"<"}HTML{"/>"} Lanjutan
          </h1>
          <div className="grid grid-cols-3 grid-rows-2 gap-4">
            {dataMateri.map((dataM) => {
              return (
                dataM.categoryFile === "html-lanjut" && (
                  <div
                    key={dataM._id}
                    className="w-62 relative rounded-md overflow-hidden shadow-md hover:bg-sky-900 hover:text-white hover:shadow-xl transition ease-in-out duration-150"
                  >
                    <h2 className="mb-1 p-1 text-xl text-third">
                      {dataM.titleFile}
                    </h2>
                    <div className="mb-20">
                      <p className="p-1 text-sm">{dataM.descFile}</p>
                    </div>
                    {/* Button */}
                    <div className="button-edit w-full absolute bottom-1 flex justify-between p-2">
                      {userString.includes("gmail") && (
                        <div className="p-1 px-4 mr-14 bg-slate-300 rounded-sm">
                          <button
                            type="button"
                            onClick={() => handleEditMateri(dataM._id)}
                            className="mr-4 text-red-700 hover:text-black"
                          >
                            <AiFillEdit />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMateri(dataM._id)}
                            className="hover:text-black text-blue-700"
                          >
                            <AiFillDelete />
                          </button>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDownloadMateri(dataM._id)}
                        className="text-xl h-6 w-6 mt-1 pl-[2px] rounded-sm hover:bg-black hover:text-white"
                      >
                        <AiOutlineDownload />
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      ) : category_file === "css-dasar" ? (
        <div className="p-2">
          <h1 className="w-1/2 mb-8 text-third text-3xl">
            Materi {"<"}CSS{"/>"} Dasar
          </h1>
          <div className="grid grid-cols-3 grid-rows-2 gap-4">
            {dataMateri.map((dataM) => {
              return (
                dataM.categoryFile === "css-dasar" && (
                  <div
                    key={dataM._id}
                    className="w-62 relative rounded-md overflow-hidden shadow-md hover:bg-sky-900 hover:text-white hover:shadow-xl transition ease-in-out duration-150"
                  >
                    <h2 className="mb-1 p-1 text-xl text-third">
                      {dataM.titleFile}
                    </h2>
                    <div className="mb-20">
                      <p className="p-1 text-sm">{dataM.descFile}</p>
                    </div>
                    {/* Button */}
                    <div className="button-edit w-full absolute bottom-1 flex justify-between p-2">
                      {userString.includes("gmail") && (
                        <div className="p-1 px-4 mr-14 bg-slate-300 rounded-sm">
                          <button
                            type="button"
                            onClick={() => handleEditMateri(dataM._id)}
                            className="mr-4 text-red-700 hover:text-black"
                          >
                            <AiFillEdit />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMateri(dataM._id)}
                            className="hover:text-black text-blue-700"
                          >
                            <AiFillDelete />
                          </button>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDownloadMateri(dataM._id)}
                        className="text-xl h-6 w-6 mt-1 pl-[2px] rounded-sm hover:bg-black hover:text-white"
                      >
                        <AiOutlineDownload />
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      ) : category_file === "css-lanjut" ? (
        <div className="p-2">
          <h1 className="w-1/2 mb-8 text-third text-3xl">
            Materi {"<"}CSS{"/>"} Lanjut
          </h1>
          <div className="grid grid-cols-3 grid-rows-2 gap-4">
            {dataMateri.map((dataM) => {
              return (
                dataM.categoryFile === "css-lanjut" && (
                  <div
                    key={dataM._id}
                    className="w-62 relative rounded-md overflow-hidden shadow-md hover:bg-sky-900 hover:text-white hover:shadow-xl transition ease-in-out duration-150"
                  >
                    <h2 className="mb-1 p-1 text-xl text-third">
                      {dataM.titleFile}
                    </h2>
                    <div className="mb-20">
                      <p className="p-1 text-sm">{dataM.descFile}</p>
                    </div>
                    {/* Button */}
                    <div className="button-edit w-full absolute bottom-1 flex justify-between p-2">
                      {userString.includes("gmail") && (
                        <div className="p-1 px-4 mr-14 bg-slate-300 rounded-sm">
                          <button
                            type="button"
                            onClick={() => handleEditMateri(dataM._id)}
                            className="mr-4 text-red-700 hover:text-black"
                          >
                            <AiFillEdit />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMateri(dataM._id)}
                            className="hover:text-black text-blue-700"
                          >
                            <AiFillDelete />
                          </button>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDownloadMateri(dataM._id)}
                        className="text-xl h-6 w-6 mt-1 pl-[2px] rounded-sm hover:bg-black hover:text-white"
                      >
                        <AiOutlineDownload />
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      ) : category_file === "js-dasar" ? (
        <div className="p-2">
          <h1 className="w-1/2 mb-8 text-third text-3xl">
            Materi {"<"}JS{"/>"} Dasar
          </h1>
          <div className="grid grid-cols-3 grid-rows-2 gap-4">
            {dataMateri.map((dataM) => {
              return (
                dataM.categoryFile === "js-dasar" && (
                  <div
                    key={dataM._id}
                    className="w-62 relative rounded-md overflow-hidden shadow-md hover:bg-sky-900 hover:text-white hover:shadow-xl transition ease-in-out duration-150"
                  >
                    <h2 className="mb-1 p-1 text-xl text-third">
                      {dataM.titleFile}
                    </h2>
                    <div className="mb-20">
                      <p className="p-1 text-sm">{dataM.descFile}</p>
                    </div>
                    {/* Button */}
                    <div className="button-edit w-full absolute bottom-1 flex justify-between p-2">
                      {userString.includes("gmail") && (
                        <div className="p-1 px-4 mr-14 bg-slate-300 rounded-sm">
                          <button
                            type="button"
                            onClick={() => handleEditMateri(dataM._id)}
                            className="mr-4 text-red-700 hover:text-black"
                          >
                            <AiFillEdit />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMateri(dataM._id)}
                            className="hover:text-black text-blue-700"
                          >
                            <AiFillDelete />
                          </button>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDownloadMateri(dataM._id)}
                        className="text-xl h-6 w-6 mt-1 pl-[2px] rounded-sm hover:bg-black hover:text-white"
                      >
                        <AiOutlineDownload />
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      ) : category_file === "js-lanjut" ? (
        <div className="p-2">
          <h1 className="w-1/2 mb-8 text-third text-3xl">
            Materi {"<"}JS{"/>"} Lanjutan
          </h1>
          <div className="grid grid-cols-3 grid-rows-2 gap-4">
            {dataMateri.map((dataM) => {
              return (
                dataM.categoryFile === "js-lanjut" && (
                  <div
                    key={dataM._id}
                    className="w-62 relative rounded-md overflow-hidden shadow-md hover:bg-sky-900 hover:text-white hover:shadow-xl transition ease-in-out duration-150"
                  >
                    <h2 className="mb-1 p-1 text-xl text-third">
                      {dataM.titleFile}
                    </h2>
                    <div className="mb-20">
                      <p className="p-1 text-sm">{dataM.descFile}</p>
                    </div>
                    {/* Button */}
                    <div className="button-edit w-full absolute bottom-1 flex justify-between p-2">
                      {userString.includes("gmail") && (
                        <div className="p-1 px-4 mr-14 bg-slate-300 rounded-sm">
                          <button
                            type="button"
                            onClick={() => handleEditMateri(dataM._id)}
                            className="mr-4 text-red-700 hover:text-black"
                          >
                            <AiFillEdit />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMateri(dataM._id)}
                            className="hover:text-black text-blue-700"
                          >
                            <AiFillDelete />
                          </button>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDownloadMateri(dataM._id)}
                        className="text-xl h-6 w-6 mt-1 pl-[2px] rounded-sm hover:bg-black hover:text-white"
                      >
                        <AiOutlineDownload />
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      ) : category_file === "github" ? (
        <div className="p-2">
          <h1 className="w-1/2 mb-8 text-third text-3xl">
            Materi Git & Github
          </h1>
          <div className="grid grid-cols-3 grid-rows-2 gap-4">
            {dataMateri.map((dataM) => {
              return (
                dataM.categoryFile === "github" && (
                  <div
                    key={dataM._id}
                    className="w-62 relative rounded-md overflow-hidden shadow-md hover:bg-sky-900 hover:text-white hover:shadow-xl transition ease-in-out duration-150"
                  >
                    <h2 className="mb-1 p-1 text-xl text-third">
                      {dataM.titleFile}
                    </h2>
                    <div className="mb-20">
                      <p className="p-1 text-sm">{dataM.descFile}</p>
                    </div>
                    {/* Button */}
                    <div className="button-edit w-full absolute bottom-1 flex justify-between p-2">
                      {userString.includes("gmail") && (
                        <div className="p-1 px-4 mr-14 bg-slate-300 rounded-sm">
                          <button
                            type="button"
                            onClick={() => handleEditMateri(dataM._id)}
                            className="mr-4 text-red-700 hover:text-black"
                          >
                            <AiFillEdit />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMateri(dataM._id)}
                            className="hover:text-black text-blue-700"
                          >
                            <AiFillDelete />
                          </button>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDownloadMateri(dataM._id)}
                        className="text-xl h-6 w-6 mt-1 pl-[2px] rounded-sm hover:bg-black hover:text-white"
                      >
                        <AiOutlineDownload />
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      ) : category_file === "nodejs" ? (
        <div className="p-2">
          <h1 className="w-1/2 mb-8 text-third text-3xl">Materi Node JS</h1>
          <div className="grid grid-cols-3 grid-rows-2 gap-4">
            {dataMateri.map((dataM) => {
              return (
                dataM.categoryFile === "nodejs" && (
                  <div
                    key={dataM._id}
                    className="w-62 relative rounded-md overflow-hidden shadow-md hover:bg-sky-900 hover:text-white hover:shadow-xl transition ease-in-out duration-150"
                  >
                    <h2 className="mb-1 p-1 text-xl text-third">
                      {dataM.titleFile}
                    </h2>
                    <div className="mb-20">
                      <p className="p-1 text-sm">{dataM.descFile}</p>
                    </div>
                    {/* Button */}
                    <div className="button-edit w-full absolute bottom-1 flex justify-between p-2">
                      {userString.includes("gmail") && (
                        <div className="p-1 px-4 mr-14 bg-slate-300 rounded-sm">
                          <button
                            type="button"
                            onClick={() => handleEditMateri(dataM._id)}
                            className="mr-4 text-red-700 hover:text-black"
                          >
                            <AiFillEdit />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMateri(dataM._id)}
                            className="hover:text-black text-blue-700"
                          >
                            <AiFillDelete />
                          </button>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDownloadMateri(dataM._id)}
                        className="text-xl h-6 w-6 mt-1 pl-[2px] rounded-sm hover:bg-black hover:text-white"
                      >
                        <AiOutlineDownload />
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      ) : category_file === "reactjs" ? (
        <div className="p-2">
          <h1 className="w-1/2 mb-8 text-third text-3xl">Materi React JS</h1>
          <div className="grid grid-cols-3 grid-rows-2 gap-4">
            {dataMateri.map(dataM => {
              return (
                dataM.categoryFile === "reactjs" && (
                  <div
                    key={dataM._id}
                    className="w-62 relative rounded-md overflow-hidden shadow-md hover:bg-sky-900 hover:text-white hover:shadow-xl transition ease-in-out duration-150"
                  >
                    <h2 className="mb-1 p-1 text-xl text-third">
                      {dataM.titleFile}
                    </h2>
                    <div className="mb-20">
                      <p className="p-1 text-sm">{dataM.descFile}</p>
                    </div>
                    {/* Button */}
                    <div className="button-edit w-full absolute bottom-1 flex justify-between p-2">
                      {userString.includes("gmail") && (
                        <div className="p-1 px-4 mr-14 bg-slate-300 rounded-sm">
                          <button
                            type="button"
                            onClick={() => handleEditMateri(dataM._id)}
                            className="mr-4 text-red-700 hover:text-black"
                          >
                            <AiFillEdit />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMateri(dataM._id)}
                            className="hover:text-black text-blue-700"
                          >
                            <AiFillDelete />
                          </button>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDownloadMateri(dataM._id)}
                        className="text-xl h-6 w-6 mt-1 pl-[2px] rounded-sm hover:bg-black hover:text-white"
                      >
                        <AiOutlineDownload />
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ItemMaterial;
