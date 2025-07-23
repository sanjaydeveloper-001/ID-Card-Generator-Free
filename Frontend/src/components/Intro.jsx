import { Link } from 'react-router-dom'
import IDCard2 from '../assets/patterns/ID Card2.mp4'


function Intro() {
  return (
    <div className=' relative w-full h-170 flex justify-between items-center px-30 pt-20'>

        <div className='w-[50%] h-[55%] flex flex-col justify-between text-[#021024] font-bold gap-5'>
            <div className="flex flex-col gap-5">
                <h1 style={{fontFamily: "Montserrat ,sans-serif"}} className='text-6xl'>College ID Card Generator</h1>
                <h2 className='text-xl'>100% <span className='text-[#0497e5]'>free</span></h2>
            </div>
            {/* <h1 className='h-20 w-120 flex justify-center items-center text-xl text-white rounded-2xl bg-[#0497e5]'>Create</h1> */}
            <div>
              <p className="text-gray-700 font-medium">Start creating your personalized college ID card with just a few clicks!</p>
              <Link to="/GenerateID" className="inline-block mt-6 bg-blue-500 text-white px-6 py-3 rounded-xl shadow-[2px_2px_5px_#939393] hover:bg-blue-600 transition">Get Started Now </Link>
            </div>
        </div>
        <video className=' absolute bottom-0 right-30 w-max h-130 flex flex-col justify-center items-center' autoPlay muted loop playsInline src={IDCard2} />
      </div>
  )
}

export default Intro