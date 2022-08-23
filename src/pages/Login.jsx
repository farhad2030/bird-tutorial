import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginRegisterForm from "../components/Auth/LoginRegisterForm";
import { sessionContext } from "../context/sessionContext";

const Login = () => {
  const { session } = useContext(sessionContext);
  useEffect(() => {
    // for default modal open
    if (!session) document.getElementById("loginModal").checked = true;
    if (session) document.getElementById("loginModal").checked = false;

    console.log(document.getElementById("loginModal").checked);
  }, [session]);

  // react-router-dom
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  console.log(from);

  return (
    <div>
      {/* <!-- Put this part before </body> tag --> */}
      <input type="checkbox" id="loginModal" class="modal-toggle" />
      {/* register modal start */}
      <div class="  modal">
        <div class=" modal-box relative hideScroll">
          <label
            for="loginModal"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <LoginRegisterForm from={from} />
        </div>
      </div>
      {/* end register modal */}
    </div>
  );
};

export default Login;
