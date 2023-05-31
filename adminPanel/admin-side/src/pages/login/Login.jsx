import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const credentials = { username: username, password: password };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:8800/api/v1/auth/login",
        credentials,
        { withCredentials: true }
      );

      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4 bg-gray-400 ">
      <div className="max-w-sm w-full text-gray-600 shadow-2xl bg-white shadow-gray-800 px-10 py-8 rounded-2xl">
        <div className="text-center ">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSdj0zbn-1d0dJbVLL9EUFAX67byLEhnfQFA&usqp=CAU"
            width={150}
            className="mx-auto rounded-full "
          />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
            <p className="">
              Don't have an account?{" "}
              <a
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
        <form className="mt-8 space-y-5">
          <div>
            <label className="font-medium">Username</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            onClick={handleClick}
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            Sign in
          </button>
          {error && <span>{error.message}</span>}
          <div className="text-center">
            <a href="/forgot-password" className="hover:text-indigo-600">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
