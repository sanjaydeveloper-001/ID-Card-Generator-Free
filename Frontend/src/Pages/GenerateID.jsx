import { useState } from 'react';
import { Link } from 'react-router-dom';
import TempleteList from '../utilities/TempleteList';
import IDCreation from './IDCreation';
import triangle from '../assets/patterns/triangle.png'
import IDcard from '../assets/patterns/ID Card.png'

function GenerateID() {


  return (
    <>
    <div className="w-full h-max pt-25 gap-17 flex flex-col px-15 items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold ">Create Your Professional ID Card</h1>
        <h1 className="text-xl ">Design and generate your customized ID in seconds — no login needed.</h1>
      </div>
     {/* <h1 className='w-full pl-20 text-4xl font-bold text-blue-500'>Select the Templete</h1> */}
      <div className="group relative h-100 w-100 flex flex-col justify-center items-center rounded-2xl shadow-[0_0_25px_gray]">
        <img src={triangle} className='transition-all duration-400 absolute -left-130 rotate-20 bottom-0 group-hover:rotate-0' alt="" />
        <Link to="/IDCreation" className="py-2 px-5 bg-blue-500 text-2xl text-white rounded-3xl font-semibold cursor-pointer hover:bg-blue-600" >Generate ID</Link>
        <h2 className="mt-3">or Select Templetes</h2>
        <img src={IDcard} className='transition-all duration-400 absolute -right-50 w-30 top-0 -rotate-20 group-hover:rotate-0' alt="" />
      </div> 
      {/* <div className=' h-max w-full flex flex-wrap justify-center items-center gap-25 pb-20'>
        {
          TempleteList.map((temp)=>{
            return(
                <div onClick={()=>{setIDnum(temp)}} className='flex w-60 h-110 flex-col items-center group gap-5' >
                  <div className='bg-center bg-cover h-[95%] w-full rounded-2xl shadow-[8px_8px_10px_gray] hover:scale-105 transition-all duration-110 hover:shadow-[8px_8px_10px_gray] ' style={{backgroundImage: `url(${temp.preview})`}}></div>
                  <h1 className='text-[15px] font-medium '>{temp.name}</h1>
                </div>
            )
          })
        }

      </div> */}

      {
        openCreation &&
        <IDCreation />
      }
    </div>
    </>

    
  )
}

export default GenerateID