import { useState } from "react";
import { IoClose , IoEyeOffOutline , IoEyeOutline  } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Login_Img from '../assets/Login-Img.png';
import { ToastContainer , toast , Bounce } from "react-toastify";
import { loginUser } from "../api/api";

function Login({ setToken }) {

      const navigate = useNavigate();
      const [passEye , setPassEye] = useState('password');
      const [email , setEmail] = useState('');
      const [password , setPassword] = useState('');

      const handleLogin = async (e) => {

        e.preventDefault();
        const res = await loginUser({ email , password });
        if(res.token){
          console.log(res);
          localStorage.setItem("token" , res.token);
          setToken(res.token);
          navigate("/");
          window.location.reload();
        }
        else{
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
        }
      }
    
      return (
        <div className="fixed w-full h-[100vh] bg-black/80 flex items-center justify-center z-5">
          <ToastContainer/>
            <div className='w-[800px] h-[550px] bg-white rounded-2xl flex relative'>
                <h1 onClick={()=> navigate('/')} className="absolute -right-10 text-2xl hover:text-white cursor-pointer text-gray-200 p-1 top-0 bg-black rounded-[50%]"><IoClose/></h1>
    
                <div  className='w-[45%] h-full rounded-l-2xl bg-gradient-to-b from-[#F3CFE9] to-[#8B47B6] flex justify-center items-center'>
                    <img src={Login_Img} className='h-120 w-max flex-shrink-0 scale-x-[-1] ' alt="" />
                </div>


                <div className='w-[55%] h-full p-10 flex flex-col  justify-between'>
                    <div>
                      <h1 className='text-[28px] font-bold tracking-tigher'>Good to See You Again💫</h1>
                      <p className='text-[18px] tracking-wide'>Access Your Dashboard</p>
                    </div>
    
                    <form onSubmit={handleLogin} className='flex flex-col relative gap-5'>
                      <div>
                        <label htmlFor="">Email</label>
                        <input className='w-full h-10 px-2 border-2 rounded-[5px]' required type="text" placeholder='Enter Email' onChange={(e)=> setEmail(e.target.value)} />
                      </div>

                      <div>
                        <label htmlFor="">Password</label>
                        <div className='flex items-center w-full h-max relative'>

                          <input className='w-full h-10 px-2 pr-12 border-2 rounded-[5px]' required type={passEye} placeholder='Create Password' onChange={(e)=>setPassword(e.target.value)} />
                          { passEye === 'password' ?
                            <IoEyeOffOutline onClick={()=> setPassEye('text')} className='absolute right-5 text-xl top-[25%]'/> :
                            <IoEyeOutline onClick={()=> setPassEye('password')} className='absolute right-5 text-xl top-[25%]' />
                          }
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="check"/>
                        <label htmlFor="check">Remember me ?</label>
                      </div>

                      <div className='w-full flex justify-between items-center'>
                        <Link to="/Register"  className="hover:text-[#a05acb] cursor-pointer">Don't Have account?</Link>
                        <span className="hover:text-[#8B47B6] cursor-pointer">Forgot Password!</span>
                      </div>

                      <button className='w-full h-10 bg-[#8B47B6] hover:bg-[#9e68bf] rounded-[5px] text-white'>Let Start</button>
                    </form>
    
                </div>
    
                
    
            </div>
        </div>
      )
}

export default Login