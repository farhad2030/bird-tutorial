import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { supabase } from "../../supabaseClint";
import { useNavigate } from "react-router-dom";
const LoginRegisterForm = ({ from }) => {
  const [formType, setformType] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [resetPasswordFormState, setResetPasswordFormState] = useState(false);

  // react-router-dom
  const navigate = useNavigate();

  // register handler
  const registerHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      let user, session, error;
      if (formType == "login") {
        ({ user, session, error } = await supabase.auth.signIn({
          email,
          password,
        }));
      } else {
        ({ user, session, error } = await supabase.auth.signUp({
          email,
          password,
        }));
      }
      if (!error) {
        console.log("register :", from);
        navigate(from);
      }
      if (error) throw error;
      console.log(user);
      console.log(session);
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.api.resetPasswordForEmail(
        email
      );
      console.log("reset data", data);
      console.log("reset data", email);
      if (error) throw error;
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // toggle loginform and register form
  const toggleForm = () => {
    console.log(formType);
    if (formType == "login") setformType("register");
    if (formType == "register") setformType("login");
  };

  return (
    <div>
      <div className="text-3xl font-bold mb-5">
        {!resetPasswordFormState
          ? formType == "login"
            ? "Login Your Account "
            : "Create an account "
          : "Reset Password"}
      </div>

      {!resetPasswordFormState ? (
        formType == "login" ? (
          <div className="text-xl font-bold mb-5">
            Don't have an account ?{" "}
            <span className="underline cursor-pointer " onClick={toggleForm}>
              create an account{" "}
            </span>
          </div>
        ) : (
          <div className="text-xl font-bold mb-5">
            Already have an account?{" "}
            <span className="underline cursor-pointer " onClick={toggleForm}>
              Login your account
            </span>
          </div>
        )
      ) : (
        ""
      )}
      {/* show form */}
      {resetPasswordFormState ? (
        // reset password form
        <form onSubmit={resetPasswordHandler}>
          <div class="form-control w-full ">
            <label class="label">
              <span class="label-text">What is your email</span>
            </label>
            <input
              type="text"
              placeholder="Type your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
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
      ) : (
        // login register form
        <form onSubmit={registerHandler}>
          <div class="form-control w-full ">
            <label class="label">
              <span class="label-text">What is your email</span>
            </label>
            <input
              type="text"
              placeholder="Type your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                console.log(e.target.value);
              }}
              class="input input-bordered  rounded-full w-full "
            />
          </div>
          <div class="form-control w-full ">
            <label class="label">
              <span class="label-text">What is your password</span>
            </label>
            <input
              type="password"
              value={password}
              placeholder="Type your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              class="input input-bordered rounded-full w-full "
            />
          </div>

          <div className="text-center">
            {!loading ? (
              <input
                type="submit"
                value={formType == "login" ? "Sign in" : "Register"}
                className="btn btn-primary my-3 "
              />
            ) : (
              `loading..`
            )}
          </div>
        </form>
      )}

      <p
        className="underline cursor-pointer text-center my-3 "
        onClick={() => {
          setResetPasswordFormState(!resetPasswordFormState);
        }}
      >
        {!resetPasswordFormState
          ? "  Forgot password ?"
          : "Login with email and password"}
      </p>
      <div class="divider mt-0">Continue with </div>
      <div className="flex justify-center mb-5">
        <div className="btn btn-primary bg-transparent border-none">
          <FcGoogle className="text-4xl mx-2" />
        </div>
        <div className="btn btn-primary bg-transparent border-none">
          <FaFacebook className="text-4xl mx-2 text-blue-600" />
        </div>
      </div>
    </div>
  );

  // login and register form
  function LoginRegisterForm() {
    return (
      <form onSubmit={registerHandler}>
        <div class="form-control w-full ">
          <label class="label">
            <span class="label-text">What is your email</span>
          </label>
          <input
            type="text"
            placeholder="Type your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              console.log(e.target.value);
            }}
            class="input input-bordered  rounded-full w-full "
          />
        </div>
        <div class="form-control w-full ">
          <label class="label">
            <span class="label-text">What is your password</span>
          </label>
          <input
            type="password"
            value={password}
            placeholder="Type your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            class="input input-bordered rounded-full w-full "
          />
        </div>

        <div className="text-center">
          {!loading ? (
            <input
              type="submit"
              value={formType == "login" ? "Sign in" : "Register"}
              className="btn btn-primary my-3 "
            />
          ) : (
            `loading..`
          )}
        </div>
      </form>
    );
  }

  function ResetPasswordForm() {
    return (
      <form onSubmit={resetPasswordHandler}>
        <div class="form-control w-full ">
          <label class="label">
            <span class="label-text">What is your email</span>
          </label>
          <input
            type="text"
            placeholder="Type your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
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

export default LoginRegisterForm;
