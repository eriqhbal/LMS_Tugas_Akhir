import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Hooks
import { UseUserContext } from "./Hooks/UseUserContext";

// Component
import { Sidebar, Navbar, LoginChat } from "./Components";

// Pages
import {
  AngularPage,
  ChatGroup,
  CssDasar,
  CssLanjut,
  GithubPage,
  Home,
  HtmlDasar,
  HtmlLanjut,
  JsDasar,
  JsLanjut,
  NodeJsPage,
  NotFoundPage,
  ReactJsPage,
  TugasAkhir,
  VueJsPage,
} from "./pages/mainScreen";
import { DetailStudent, DetailStudentCertificate, DetailTeacher } from "./pages/mainScreen/userPage";
import { Login, ForgetPass } from "./pages";
import ChangeDataPage from "./pages/auth/ChangeDataPage";
import DetailMateriPage from "./pages/DetailMateriPage";

const App = () => {
  const { user } = UseUserContext();

  return (
    <BrowserRouter>
      <div className={user && "flex relative"}>
        {user && (
          <div className="mt-4 fixed sidebar ml-3 shadow-md bg-white">
            <Sidebar />
          </div>
        )}
        <div className={user && "md:ml-80 min-h-screen w-full"}>
          {user && (
            <div className="p-2 w-full">
              <Navbar />
            </div>
          )}
          <div>
            <Routes>
              {/* Default Route */}
              <Route
                path="/"
                element={
                  !user ? <Navigate to="/login" /> : <Navigate to="/home" />
                }
              />

              {/* Login Page */}
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/home" />}
              />
              <Route
                path="/register"
                element={!user ? <Login /> : <Navigate to="/home" />}
              />

              {/* lupa password */}
              <Route
                path="/forget-password"
                element={!user ? <ForgetPass /> : <Navigate to="/home" />}
              />

              {/* Main Application */}
              <Route path="/home">
                <Route
                  index
                  element={user ? <Home /> : <Navigate to="/login" />}
                />
                <Route
                  path=":id"
                  element={user ? <ChangeDataPage /> : <Navigate to="/login" />}
                />
              </Route>

              {/* Detail User */}
              <Route path="/student/:id" element={user && <DetailStudent />} />
              <Route path="/student/certificate/:id" element={user && <DetailStudentCertificate/>}/>
              <Route path="/pengajar/:id" element={user && <DetailTeacher/>}/>

              {/* HTML Page */}
              <Route
                path="/html-dasar"
                element={user ? <HtmlDasar /> : <Navigate to={"/login"} />}
              />
              <Route
                path="/html-lanjutan"
                element={user ? <HtmlLanjut /> : <Navigate to={"/login"} />}
              />

              {/* CSS Page */}
              <Route
                path="/css-dasar"
                element={user ? <CssDasar /> : <Navigate to={"/login"} />}
              />
              <Route
                path="/css-lanjut"
                element={user ? <CssLanjut /> : <Navigate to={"/login"} />}
              />

              {/* JS Page */}
              <Route
                path="/javascript-dasar"
                element={user ? <JsDasar /> : <Navigate to={"/login"} />}
              />
              <Route
                path="/javascript-lanjut"
                element={user ? <JsLanjut /> : <Navigate to={"login"} />}
              />

              {/* Github Page */}
              <Route
                path="/git-github"
                element={user ? <GithubPage /> : <Navigate to={"/login"} />}
              />

              {/* NodeJS Page */}
              <Route
                path="/node-js"
                element={user ? <NodeJsPage /> : <Navigate to={"/login"} />}
              />

              {/* Framework Page */}
              <Route
                path="/react-js"
                element={user ? <ReactJsPage /> : <Navigate to={"/login"} />}
              />
              <Route
                path="/vue-js"
                element={user ? <VueJsPage /> : <Navigate to={"/login"} />}
              />
              <Route
                path="angular-js"
                element={user ? <AngularPage /> : <Navigate to={"/login"} />}
              />

              {/* Detail Materi */}
              <Route
                path="/materi/:id"
                element={
                  user ? <DetailMateriPage /> : <Navigate to={"/login"} />
                }
              />

              {/* Tugas Akhir */}
              <Route path="/quiz/:id" element={user ? <></> : <Navigate to={"/login"}/>} />
              <Route
                path="/final-study"
                element={user ? <TugasAkhir /> : <Navigate to={"/login"} />}
              />

              {/* Chat Pages */}
              <Route
                path="/communication-group-login"
                element={user ? <LoginChat /> : <Navigate to={"/login"} />}
              />
              <Route path="/communication-group" element={localStorage.getItem("username") && <ChatGroup />} />

              <Route path="*" element={<NotFoundPage />} />
              <Route />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
