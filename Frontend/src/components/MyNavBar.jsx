import { Link, useNavigate } from "react-router-dom";
import { IoHomeOutline, IoAlbumsOutline , IoPersonOutline , IoArrowBack , IoCreateOutline } from "react-icons/io5";
import { HiOutlineTrash } from "react-icons/hi2";

function MyNavBar({ setProTrash }) {

    const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between h-[100vh] w-[4.5%] py-5 border-r-1 border-gray-400">

        <div className="flex flex-col w-full h-max py-2 gap-10 text-[12px] items-center">

          <h1 className="flex flex-col-reverse items-center hover:text-blue-400 cursor-pointer" onClick={()=> navigate(-1)}>
            Back
            <IoArrowBack className="text-2xl cursor-pointer" />
          </h1>
          <Link className="flex flex-col-reverse items-center hover:text-blue-400 cursor-pointer" to="/">
            Home <IoHomeOutline className="text-xl" />
          </Link>
          <Link className="flex flex-col-reverse items-center hover:text-blue-400 cursor-pointer" to="/IDCreation">
            Create <IoCreateOutline className="text-xl" />
          </Link>
          <h1 onClick={()=> setProTrash(false)} className="flex flex-col-reverse items-center hover:text-blue-400 cursor-pointer">
            Projects <IoAlbumsOutline className="text-xl" />
          </h1>
          <h1 onClick={()=> setProTrash(true)} className="flex flex-col-reverse items-center hover:text-blue-400 cursor-pointer">
            Trash <HiOutlineTrash className="text-xl" />
          </h1>
        </div>
        <div className="w-full h-max py-2 items-center flex flex-col">
          <Link className="flex justify-center items-center border-1 rounded-[50%] h-9 w-9 hover:bg-gray-200" to="/Profile" ><IoPersonOutline className="text-xl flex justify-center w-full"/></Link>
        </div>
      </div>
  )
}

export default MyNavBar