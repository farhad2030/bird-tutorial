import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import RequireAuth from "./components/Auth/RequireAuth";
import { Routes, Route } from "react-router-dom";
import { supabase } from "./supabaseClint";
import { sessionContext } from "./context/sessionContext";
import { avaterContext } from "./context/avaterContext";
import ClassScheduleTable from "./components/home/ClassScheduleTable";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NewPassword from "./pages/NewPassword.jsx";
import MyProfile from "./components/profile/MyProfile";
import MyCourse from "./components/profile/MyCourse";

function App() {
  // session track
  const [session, setSession] = useState(null);
  const [avaterUrl, setAvaterUrl] = useState("https://place-hold.it/500x500");
  // theme toggle
  const [darkToggle, setDarkToggle] = React.useState(false);
  const toggleTheme = () => {
    setDarkToggle(!darkToggle);
  };

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      console.log("app on event: ", _event);
      console.log("app on session ", session);
      console.log("call onauthstate");
    });
  }, []);

  return (
    <div
      data-theme={`${darkToggle ? "myDark" : "mytheme"}`}
      className="App bg-base-100 "
    >
      <sessionContext.Provider value={{ session, setSession }}>
        <avaterContext.Provider value={{ avaterUrl, setAvaterUrl }}>
          <Navbar toggleTheme={toggleTheme} darkToggle={darkToggle} />
          <div className={` mx-auto max-w-screen-xl `}>
            <Routes>
              <Route path="/" element={<Home />}>
                <Route path="/login" element={<Login />} />
                <Route path="/resetPassword" element={<NewPassword />} />

                <Route
                  path="classSchedule"
                  element={
                    <RequireAuth>
                      <ClassScheduleTable />
                    </RequireAuth>
                  }
                />
              </Route>
              <Route path="/profile" element={<Profile />}>
                <Route
                  // path="myProfile"
                  index
                  element={
                    <RequireAuth>
                      <MyProfile />
                    </RequireAuth>
                  }
                />
                <Route
                  path="myCourses"
                  element={
                    <RequireAuth>
                      <MyCourse />
                    </RequireAuth>
                  }
                />
              </Route>
            </Routes>

            <Footer />
          </div>
        </avaterContext.Provider>
      </sessionContext.Provider>
    </div>
  );
}

export default App;
