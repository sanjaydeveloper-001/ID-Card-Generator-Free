import { useState } from 'react';
import reg_back from '../assets/Reg-Background.jpeg';
import reg_Img from '../assets/Reg-Img.png';
import { IoClose , IoEyeOffOutline , IoEyeOutline  } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/api';
import axios from 'axios';
import {ToastContainer , toast , Bounce} from 'react-toastify'

function Register() {

  const navigate = useNavigate();

  const [passEye , setPassEye] = useState('password');
  const [confirmPassEye , setConfirmPassEye] = useState('password');
  const [vibrate , setVibrate] = useState(false);
  // const [emailverifyed , setEmailVerified] = useState(false);

  const [email , setEmail] = useState('');
  const [firstname , setfirstName] = useState('');
  const [lastname , setLastName] = useState('');
  const [password , setPassword] = useState('');
  const [confirmPassword , setConfirmPassword] = useState('');

  const tiggerVibrate = () => {
    setVibrate(true);
    setTimeout(() => setVibrate(false), 2000);
  };


  const handleRegister = async () => {

    const res = await registerUser({ firstname , lastname , email , password });
    if (res.token) {
        toast.error(`Registered`, {
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
      navigate("/Login");
    } else {
      toast.error(`${res.msg}`, {
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
      tiggerVibrate();
    }
  };

  const handleVerifyEmail = async (e) =>{
    e.preventDefault();
    if(password != confirmPassword){
      toast.error('Password Mismatch!',{
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
      })
      return;
    }
    try {
      console.log(email)
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/verifyemail` ,{
        email : email
      });
      if(res.data.success){
        handleRegister();
      }
      else{
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
      console.log("Error: "+ error) 
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

  }
  

  return (
    <div className="fixed w-full h-[100vh] flex items-center justify-center z-5 bg-black/70 ">
      <ToastContainer/>
        <div className={`w-[800px] h-[550px] bg-white rounded-2xl flex relative shadow-[0_0_20px_gray] ${vibrate ? "animate-vibrate" : ""}`}>
            <h1 onClick={()=> navigate('/')} className="absolute -right-10 text-2xl hover:text-white cursor-pointer text-gray-200 p-1 top-0 bg-black rounded-[50%]"><IoClose/></h1>

            <div style={{backgroundImage : `url(${reg_back})`}} className='w-[45%] h-full rounded-l-2xl bg-cover bg-center flex justify-center items-center'>
                <img src={reg_Img} className='h-70' alt="" />
            </div>
            <div className='w-[55%] h-full p-10 flex flex-col'>
                <h1 className='text-3xl font-bold tracking-tigher'>Make It Official ✨</h1>
                <p className='text-[16px] tracking-wider'>Start saving your designs.</p>

                <form onSubmit={handleVerifyEmail} className='flex flex-col gap-5 mt-20 relative'>

                  <div className='flex gap-2'>
                    <input className='w-full h-10 px-2 border-2 rounded-[5px]' required placeholder='First Name' onChange={(e)=> setfirstName(e.target.value)} type="text" />
                    <input className='w-full h-10 px-2 border-2 rounded-[5px]' required placeholder='Last Name' onChange={(e)=> setLastName(e.target.value)} type="text" />
                  </div>

                  <input className='w-full h-10 px-2 border-2 rounded-[5px]' required type="text" placeholder='Enter Email' onChange={(e)=> {setEmail(e.target.value)}} />

                  <div className='flex items-center w-full h-max relative'>
                    <input className='w-full h-10 px-2 border-2 rounded-[5px]' required type={passEye} placeholder='Create Password' onChange={(e)=> {setPassword(e.target.value);}} />
                    { passEye === 'password' ?
                      <IoEyeOffOutline onClick={()=> setPassEye('text')} className='absolute right-5 text-xl top-[25%]'/> :
                      <IoEyeOutline onClick={()=> setPassEye('password')} className='absolute right-5 text-xl top-[25%]' />
                    }
                  </div>
                  <div className='flex items-center w-full h-max relative'>
                    <input className='w-full h-10 px-2 border-2 rounded-[5px]' required type={confirmPassEye} placeholder='Confirm Password' onChange={(e)=> {setConfirmPassword(e.target.value);}} />
                    { confirmPassEye === 'password' ?
                      <IoEyeOffOutline onClick={()=> setConfirmPassEye('text')} className='absolute right-5 text-xl top-[25%]'/> :
                      <IoEyeOutline onClick={()=> setConfirmPassEye('password')} className='absolute right-5 text-xl top-[25%]' />
                    }
                  </div>
                  <Link to="/Login" className='hover:text-purple-500 w-max cursor-pointer'>Already Have ?</Link>
                  <button className='w-full h-10 bg-purple-500 rounded-[5px] text-white cursor-pointer hover:bg-purple-600'>Let Start</button>
                </form>

            </div>

            

        </div>
    </div>
  )
}

export default Register