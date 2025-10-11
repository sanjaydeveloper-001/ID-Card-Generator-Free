import { useState } from "react";
import { IoClose, IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Login_Img from "../assets/Login-Img.jpeg";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { loginUser } from "../api/api";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

function Login({ setToken }) {
  const navigate = useNavigate();
  const [passEye, setPassEye] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); 

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await loginUser({ email, password });

    if (res.token) {
      if (rememberMe) {
        localStorage.setItem("token", res.token);
      } else {
        sessionStorage.setItem("token", res.token);
      }

      setToken(res.token);
      navigate("/");
      window.location.reload();
    } else {
      toast.error(`${res.msg}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-[#defffa] flex items-center justify-center z-50 p-4">
      <ToastContainer />

      <div className="relative w-full max-w-[850px] bg-white rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-xl shadow-gray-500 animate-fadeIn">
        <button
          onClick={() => navigate("/")}
          className="absolute top-3 right-3 text-2xl bg-[#149187] hover:bg-[#107a71] cursor-pointer text-white rounded-full p-1 shadow-sm"
        >
          <IoClose />
        </button>
        <img
            src={Login_Img}
            className="w-100 rounded-l-xl hidden md:flex"
            alt="Login Illustration"
          />
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-1 text-[#0f5c56]">
              Good to See You Again 
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              Access Your Dashboard
            </p>
          </div>

            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const decoded = jwtDecode(credentialResponse.credential);
                console.log("Google User:", decoded);
                
                axios.post(`${import.meta.env.VITE_BACKEND_LINK}/api/user/google-login`, {
                  token: credentialResponse.credential,
                })
                .then(res => {
                  localStorage.setItem("token", res.data.token);
                  setToken(res.data.token);
                  navigate("/");
                })
                .catch(err => console.log(err));
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />

            <br />
            <p className="w-full flex justify-center items-center">or</p>
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-5 text-gray-700"
          >
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                required
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-3 border-2 focus:bg-[#14918710] rounded-md border-[#149187] outline-none transition"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Password</label>
              <div className="relative flex items-center">
                <input
                  required
                  type={passEye}
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 px-3 pr-10 focus:bg-[#14918710] border-2 rounded-md border-[#149187] outline-none transition"
                />
                {passEye === "password" ? (
                  <IoEyeOffOutline
                    onClick={() => setPassEye("text")}
                    className="absolute right-3 text-xl text-gray-500 cursor-pointer hover:text-[#149187]"
                  />
                ) : (
                  <IoEyeOutline
                    onClick={() => setPassEye("password")}
                    className="absolute right-3 text-xl text-gray-500 cursor-pointer hover:text-[#149187]"
                  />
                )}
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                id="check"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-[#149187]"
              />
              <label htmlFor="check" className="cursor-pointer">
                Remember me?
              </label>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm sm:text-base">
              <Link
                to="/Register"
                className="text-[#149187] hover:underline font-medium"
              >
                Don’t have an account?
              </Link>
              <span className="text-[#149187] hover:underline cursor-pointer">
                Forgot Password?
              </span>
            </div>
            <button className="cursor-pointer w-full h-11 bg-[#149187] hover:bg-[#0e635c] text-white font-semibold rounded-md transition-all duration-300">
              Let’s Start
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
