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
import ClassScheduleTable from "./components/home/ClassScheduleTable";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NewPassword from "./pages/NewPassword.jsx";

function App() {
  // session track
  const [session, setSession] = useState(null);

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
    });
  }, []);

  return (
    <div
      data-theme={`${darkToggle ? "myDark" : "mytheme"}`}
      className="App bg-base-100 "
    >
      <sessionContext.Provider value={{ session, setSession }}>
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
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
          </Routes>

          <Footer />
        </div>
      </sessionContext.Provider>
    </div>
  );
}

export default App;
