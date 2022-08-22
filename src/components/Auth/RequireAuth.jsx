import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { sessionContext } from "../../context/sessionContext";
import { supabase } from "../../supabaseClint";

const RequireAuth = ({ children }) => {
  // sessionContext
  const { session } = useContext(sessionContext);
  const location = useLocation();

  if (session) {
    console.log("session", session);

    return children;
  }
  return (
    <Navigate to="/login" state={{ from: location, Islogin: true }} replace />
  );
};

export default RequireAuth;
