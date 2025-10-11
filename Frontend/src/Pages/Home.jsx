import Features from '../components/Features'
import Footer from '../components/Footer'
import HowItWorks from '../components/HowItWorks'
import Intro from '../components/Intro'
import Quality from '../components/Quality'
import Reg_Login_Req from './Register'
import Review from '../components/Review'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Header from '../components/Header'

function Home({user, setShowProfile, reviews, setReviews}) {

  return (
    <>
      <Header user={user} setShowProfile={setShowProfile} />

      <Intro/>

      <Features/>

      <Quality/>
      
      <HowItWorks/>

      {/* <div className='w-full h-80 bg-white'>

      </div> */}

      <Review user={user} reviews={reviews} setReviews={setReviews}  />

      <Footer/>

      <Reg_Login_Req/>
      
    </>
  )
}

export default Home