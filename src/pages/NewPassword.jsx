import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../supabaseClint";
const NewPassword = () => {
  const [newPassword, setNewPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const NewPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      const { error, data } = await supabase.auth.api.updateUser(
        state.hash?.split("&")[0]?.split("=")[1],
        {
          password: newPassword,
        }
      );
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };

  //
  useEffect(() => {
    // for default modal open
    document.getElementById("newPasswordModal").checked = true;
  }, []);
  return (
    <div>
      {/* <!-- Put this part before </body> tag --> */}
      <input type="checkbox" id="newPasswordModal" class="modal-toggle" />
      {/* New password modal start */}
      <div class="  modal">
        <div class=" modal-box relative hideScroll">
          <label
            for="newPasswordModal"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={NewPasswordHandler}>
            <div class="form-control w-full ">
              <label class="label">
                <span class="label-text">Enter your new password</span>
              </label>
              <input
                type="text"
                placeholder="Type your new password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                class="input input-bordered  rounded-full w-full "
              />
            </div>

            <div className="text-center">
              {!loading ? (
                <input
                  type="submit"
                  value="Reset password"
                  className="btn btn-primary my-3 "
                />
              ) : (
                `loading..`
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  function NewPasswordForm() {
    return (
      <form onSubmit={NewPasswordHandler}>
        <div class="form-control w-full ">
          <label class="label">
            <span class="label-text">Enter your new password</span>
          </label>
          <input
            type="text"
            placeholder="Type your new password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            class="input input-bordered  rounded-full w-full "
          />
        </div>

        <div className="text-center">
          {!loading ? (
            <input
              type="submit"
              value="Reset password"
              className="btn btn-primary my-3 "
            />
          ) : (
            `loading..`
          )}
        </div>
      </form>
    );
  }
};

export default NewPassword;
