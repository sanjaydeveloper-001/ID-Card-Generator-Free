import Admin from '../assets/Admin.png'
import Student from '../assets/Student.png'
import Staff from '../assets/Staff.png'
// import { MdKeyboardArrowLeft , MdKeyboardArrowRight } from "react-icons/md";
import { useState } from 'react';
import IDCard from '../assets/patterns/ID Card.mp4'
                    

function Quality() {

    const types = [
        { name:'Student' , img:Student },
        { name:'Staff' , img:Staff },
        { name:'Admin' , img:Admin }
    ];


    const [changeBg , setChangeBg] = useState(types[0].name);

  return (
    <>
    
    <div className='w-full h-max py-15 flex justify-between items-center px-30'>

        <video className='w-150 h-150' autoPlay loop muted playsInline src={IDCard} type='video/mp4' />
        <div className='flex flex-col items-center gap-5 justify-center'>
            <h1 className='text-5xl font-bold'>Stunning Quality</h1>
            <div className='flex h-15 gap-5 items-center' >
                {types.map((type , i)=>{
                    return(
                    <h1 key={type.id || i} onClick={()=>{setChangeBg(type.name)}} className={`w-25 h-10 flex items-center justify-center rounded-3xl ${changeBg == type.name ? 'bg-gray-300'  :'hover:text-yellow-700'} cursor-pointer`}>{type.name}</h1>)
                })}
            </div>
            <div className='px-20 py-10 rounded-2xl bg-white flex justify-center items-center gap-10 inset-shadow-[3px_3px_10px_gray]'>
                {/* <div onClick={()=>{setChangeBg()}} style={{opacity:changeBg == types[0].name ? '0' : '100'}} className='p-3 bg-amber-400/80 rounded-[50%]' >{<MdKeyboardArrowLeft/>}</div> */}
                <img className='h-100 shadow-[4px_4px_10px_gray] rounded-2xl' src={types.find((type) => type.name === changeBg)?.img} />
                {/* <div onClick={()=>{setChangeBg()}} style={{opacity:changeBg == types[types.length-1].name ? '0' : '100'}} className='p-3 bg-amber-400/80 rounded-[50%]' >{<MdKeyboardArrowRight/>}</div> */}
            </div>

        </div>
    </div>
    </>
  )
}

export default Quality