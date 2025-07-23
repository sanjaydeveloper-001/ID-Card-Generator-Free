import { Link, useNavigate } from "react-router-dom";
import checkmark from "../assets/patterns/Checkmark.json"
import checkmarkImg from "../assets/patterns/checkmark.png"
import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import { FiDownload , FiEdit , FiSave } from "react-icons/fi";
import confetti from '../assets/patterns/Confetti.json'
import { IoExitOutline } from "react-icons/io5";
import { addCreation, fetchCreations } from "../api/api";


function DisplayID({ setDone , setFormData , formData , token , user , setCreations}) {
      
  const [isComplete , setIsComplete] = useState(false);
  const lottieRef = useRef();
  const [saved , setSaved] = useState(false);
  const [isSaving , setIsSaving] = useState(false);
  const [IDname , setIDname] = useState("Untitled-01");

  const navigate = useNavigate();

  const today = new Date()
  const formattedDate = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric"
  });

  const handleDownload = () =>{
    const link = document.createElement('a');
    link.href = formData.preview;
    link.download = `${IDname ? IDname : "Untitled-01"}`;
    link.click();
  }

  useEffect(() => {
    lottieRef.current.setSpeed(1.5);
  }, []);

  const HandleShowSave = async () => {
    if(user){
      setIsSaving(true);
      try {
        const res = await addCreation (formData , token);
        window.location.reload();
        setSaved(true);

        const updatedCreations = await fetchCreations(token);
        setCreations(updatedCreations);

      } catch (err) {
        console.error("Failed to add creation:", err);
      }
    }
    else{
      console.log(token)
      alert("Login First !")
      navigate("/Login");
    }

    setTimeout( () =>{
      setIsSaving(false);
    },1000);
    
  };

  return (
    <div className='w-full h-[100vh] bg-black/85 fixed top-0 left-0 flex justify-center items-center'>
      <div className='relative w-[60%] h-[90vh] bg-white rounded-3xl flex flex-col items-center pb-20'>

        <div className="absolute top-5 right-5 w-max h-10 px-5 flex justify-center items-center gap-5 ">
          <Link className=" text-gray-600 hover:text-blue-400 hover:underline" to="/">Home</Link>
          <Link className=" text-gray-600 hover:text-blue-400 hover:underline" to="/MyCreations">My Creations</Link>
          <IoExitOutline onClick={()=>{setDone(false)}} className="text-xl text-gray-600 hover:text-blue-400 cursor-pointer"/>
        </div>

        {
          isComplete ? 
            <img className='w-35 pl-3 my-4' src={checkmarkImg} alt="" />
            :
            <>
            <Lottie
              autoPlay
              lottieRef={lottieRef}
              loop={false}
              animationData={checkmark}
              className='w-40'
              onComplete ={ ()=>{
              setIsComplete(true);
              }}
            />
            <Lottie 
              autoPlay
              loop={false}
              animationData={confetti}
              className="fixed z-5 top-0 w-full h-full"
            />
            </>
        }

        <h2 className="text-3xl font-bold text-green-600 text-center">Yes! You did it 🎉</h2>
        <p className="text-lg text-gray-700 text-center">Your ID is ready. Save or Download it below:</p>

        <img src={formData.preview} className='h-[50vh]' alt="Vimage" />
      
        <div className='flex w-max px-5 h-20 items-center justify-center gap-5'>

          <div onClick={()=>{setDone(false)}} className="group flex gap-2 items-center hover:scale-105 transition-all duration-100 cursor-pointer">
            <h1 className=" h-10 w-10 border-3 border-gray-300 rounded-[50%] flex justify-center items-center group-hover:border-gray-400"><FiEdit/></h1>
            <h1 className=" font-medium" style={{fontFamily: "Glory,sans-serif"}}>Edit</h1>
          </div>

          {/* <div className="group flex gap-2 items-center hover:scale-105 transition-all duration-100 cursor-not-allowed">
            <h1 className=" h-10 w-10 border-3 border-gray-300 rounded-[50%] flex justify-center items-center group-hover:border-gray-400 "><FiLayers/></h1>
            <h1 className=" font-medium" style={{fontFamily: "Glory,sans-serif"}}>Templetes</h1>
          </div> */}

          <input onChange={(e)=>{setIDname(e.target.value), setSaved(false) , setFormData((prev) => ({
                                                                                            ...prev, 
                                                                                            fileName : e.target.value,
                                                                                            createdDate : formattedDate
                                                                                          })); }} 
            value={formData.fileName ? formData.fileName : IDname} type="text" className="w-40 h-10 border-gray-300 border-3 px-2 outline-none focus:border-gray-400"  placeholder="Untitled-01"/>

          
            <h1 onClick={handleDownload} className="flex items-center justify-center w-35 rounded-2xl gap-2 h-10 bg-blue-600 hover:bg-blue-500 text-white cursor-pointer">Download <FiDownload/></h1>
          {
            saved ?
            <h1 onClick={HandleShowSave} className={`flex items-center justify-center w-30 rounded-2xl gap-2 h-10 bg-green-600 text-white cursor-not-allowed`}>Saved</h1>
            :
            ( isSaving ?
              <h1 onClick={HandleShowSave} className={`flex items-center justify-center w-30 rounded-2xl gap-2 h-10 bg-black text-white cursor-default`}>Saving...</h1>
              :
              <h1 onClick={HandleShowSave} className={`flex items-center justify-center w-30 rounded-2xl gap-2 h-10 bg-red-600 hover:bg-red-700 text-white cursor-pointer`}>Save <FiSave/></h1>
            )
          }
        </div>


      </div>
    </div>
  )
}

export default DisplayID