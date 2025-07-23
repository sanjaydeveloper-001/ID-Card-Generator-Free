import { MdAddAPhoto , MdDeleteOutline } from "react-icons/md";
import { IoClose } from 'react-icons/io5'
import photo from '../assets/profileImg.jpg';
import { useState } from "react";
import { updatProfile , removeProfilePhoto } from "../api/api";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

function ProfileBar({user , setUser , setShowProfile ,token }) {
            
  const [img, setImg] = useState(null);
  const userImg  = user?.profilePhoto;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImg(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const addProfile = async(data) => {
    try {
      const res = await updatProfile(data , token);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  const removeProfPhoto = async() => {
    try {
      const res = await removeProfilePhoto(token);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className='w-full h-[100vh] bg-black/80 top-0 right-0 fixed flex justify-center items-center'>

      <div className='w-max h-[450px] bg-white rounded-xl relative flex'>
        <h1 onClick={() => setShowProfile(false)} className="absolute -right-10 text-2xl hover:text-white cursor-pointer text-gray-200 p-1 bg-black rounded-[50%]" ><IoClose/></h1>

         { !(userImg || img) ?
          <div className='h-full w-[300px] bg-blue-400 rounded-l-xl flex flex-col justify-center items-center'>
            <img src={photo} className='rounded-[50%] w-50'/>
            <div className='w-full h-15 items-center px-5 flex justify-center gap-3'>
              <label htmlFor="image" className="flex px-4 py-1 bg-gray-50 items-center gap-1 rounded-2xl hover:bg-gray-200 cursor-pointer">Add <MdAddAPhoto/></label>
              <input style={{display:'none'}} type="file" accept="image/*" id="image" onChange={handleImageChange }/>
            </div>
          </div>
          :
          <div className='h-full w-[300px] bg-blue-400 rounded-l-xl flex flex-col justify-center items-center'>
            <img src={userImg || img} className='rounded-[50%] w-50 h-50'/>
            <div className='w-full h-15 items-center px-5 flex justify-center gap-3'>
              {
                !userImg ?
                <h1 className="flex px-4 py-1 bg-gray-50 items-center gap-1 rounded-2xl hover:bg-gray-200 cursor-pointer" onClick={()=> addProfile(img)}>Set <IoMdCheckmarkCircleOutline/></h1>
                : '' 
              }
              <h1 className="flex px-4 py-1 bg-gray-50 items-center gap-1 rounded-2xl hover:bg-gray-200 cursor-pointer" onClick={removeProfPhoto}>Delete <MdDeleteOutline/></h1>
            </div>
          </div>}

          <div className="w-max h-full flex flex-col p-10 gap-10 justify-between">

            <h1 className="text-4xl font-bold">Profile</h1>

              <div className="flex flex-col gap-5">
                
                <div className="flex">
                  <div className="w-24 font-medium">Name :</div>
                  <div className="bg-gray-100 px-4 py-2 rounded-md flex-1">
                    {user?.firstname} {user?.lastname}
                  </div>
                </div>

                
                <div className="flex">
                  <div className="w-24 font-medium">Email :</div>
                  <div className="bg-gray-100 px-4 py-2 rounded-md flex-1">
                    {user?.email}
                  </div>
                </div>

      
                <div className="flex">
                  <div className="w-24 font-medium">Password :</div>
                  <input type="password" className="bg-gray-100 px-4 py-2 rounded-md flex-1 focus:outline-none cursor-not-allowed focus:cursor-not-allowed" value={12341234} readOnly/>
                </div>
              </div>


              <div className="w-full h-15 bg-red-500 hover:bg-red-400 cursor-pointer border-1 rounded flex justify-center items-center text-xl font-semibold text-white"
                onClick={()=>{
                  setUser(null);
                  localStorage.removeItem("token");
                  setShowProfile(false);
                  window.location.reload();
                }}
              >
                Logout
              </div>
          </div>

      </div>


    </div>
  )
}

export default ProfileBar