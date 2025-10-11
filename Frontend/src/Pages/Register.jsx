import { useState } from 'react';
import reg_back from '../assets/Reg_Img_Back.jpeg';
import reg_Img from '../assets/Reg-Img.jpeg';
import { IoClose, IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/api';
import axios from 'axios';
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import { ToastContainer, toast, Bounce } from 'react-toastify';


function Register({setToken}) {
  const navigate = useNavigate();

  const [passEye, setPassEye] = useState('password');
  const [confirmPassEye, setConfirmPassEye] = useState('password');

  const [email, setEmail] = useState('');
  const [firstname, setfirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    const res = await registerUser({ firstname, lastname, email, password });
    if (res.token) {
      localStorage.setItem('token', res.token);
      setToken(res.token);
      navigate('/');
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password Mismatch!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/verifyemail`, { email });
      if (res.data.success) {
        handleRegister();
      } else {
        toast.error('Enter a Valid Email', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.log("Error: " + error);
      toast.error(`${error}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="fixed w-full h-screen flex items-center justify-center bg-[#eefbff] z-50 p-4 ">
      <ToastContainer />
      <div className="w-full max-w-4xl sm:p-0 m-5 h-max sm:h-auto bg-white rounded-2xl flex flex-col md:flex-row relative shadow-xl shadow-gray-500">
        <h1 onClick={() => navigate('/')} className="absolute right-2 text-2xl hover:text-white cursor-pointer text-gray-200 p-1 top-2 bg-[#59bfde] rounded-full"><IoClose /></h1>

        <div className='hidden w-full md:w-2/5 h-60 md:h-auto rounded-t-2xl md:rounded-l-2xl bg-cover bg-center md:flex justify-center items-center'>
          <img src={reg_Img} className='w-full h-full rounded-l-2xl' alt="Register" />
        </div>

        <div className='w-full md:w-3/5 p-6 md:p-10 flex flex-col'>
          <h1 className='text-2xl text-[#448592] md:text-3xl font-bold tracking-tight'>Make It Official ✨</h1>
          <p className='text-sm md:text-[16px] tracking-wide mt-1'>Start saving your designs.</p>
          
          <div className='mt-5'></div>
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

          <form onSubmit={handleVerifyEmail} className='flex flex-col gap-4 mt-6 md:mt-8 relative'>

            <div className='flex flex-col sm:flex-row gap-2'>
              <input className='outline-none border-[#5cdbdb] w-full h-10 px-2 border focus:border-2 rounded-md' required placeholder='First Name' onChange={(e) => setfirstName(e.target.value)} type="text" />
              <input className='outline-none border-[#5cdbdb] w-full h-10 px-2 border focus:border-2 rounded-md' required placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} type="text" />
            </div>

            <input className='outline-none border-[#5cdbdb] w-full h-10 px-2 border focus:border-2 rounded-md' required type="email" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />

            <div className='flex items-center w-full relative'>
              <input className='outline-none border-[#5cdbdb] w-full h-10 px-2 border focus:border-2 rounded-md' required type={passEye} placeholder='Create Password' onChange={(e) => setPassword(e.target.value)} />
              {passEye === 'password' ?
                <IoEyeOffOutline onClick={() => setPassEye('text')} className='absolute right-3 text-xl top-1/4' /> :
                <IoEyeOutline onClick={() => setPassEye('password')} className='absolute right-3 text-xl top-1/4' />}
            </div>

            <div className='flex items-center w-full relative'>
              <input className='outline-none border-[#5cdbdb] w-full h-10 px-2 border focus:border-2 rounded-md' required type={confirmPassEye} placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} />
              {confirmPassEye === 'password' ?
                <IoEyeOffOutline onClick={() => setConfirmPassEye('text')} className='absolute right-3 text-xl top-1/4' /> :
                <IoEyeOutline onClick={() => setConfirmPassEye('password')} className='absolute right-3 text-xl top-1/4' />}
            </div>

            <Link to="/Login" className='hover:text-[#5cdbdb] w-max cursor-pointer'>Already Have an Account?</Link>
            <button className='w-full h-10 bg-[#60bece] rounded-md text-white cursor-pointer hover:bg-[#48acac] transition'>Let's Start</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;
