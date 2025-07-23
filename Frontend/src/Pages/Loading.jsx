import Lottie from 'lottie-react'
import { useEffect, useRef } from 'react'
import loading from '../assets/patterns/Loading.json'

function Loading() {

    const lottieRef = useRef();

    useEffect(()=>{
        lottieRef.current.setSpeed(1.5);
    },[])

  return (
    <div className='fixed w-full h-[100vh] flex flex-col justify-center items-center z-10 bg-white'>
        <Lottie
            autoPlay
            lottieRef={lottieRef}
            loop={true}
            animationData={loading}
            className='w-100'
        />
        <h1 className='text-xl font-bold text-blue-700'>Loading ...</h1>
    </div>
  )
}

export default Loading