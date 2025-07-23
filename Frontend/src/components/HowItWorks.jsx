import howitworks from '../assets/how it workds.png';

function HowItWorks() {
  return (
    <div className='h-120 w-full flex items-center justify-between py-20 px-50 bg-blue-200/70'>
        <div className='text-xl '>
            <h1 style={{fontFamily: "Montserrat ,sans-serif"}} className='font-bold text-4xl mb-5'>ID Card Creation: Fully ready in 30 seconds with just a few clicks</h1>
            <p className='pr-10'> 
                Thanks to our smart ID generator, you can auto-fetch logos, fill in details, and generate professional ID cards — fast and hassle-free!
                Whether you need a student, staff, or admin ID, just enter the college name, upload a photo, and fill in the fields — our tool instantly 
                previews and lets you download the card in high quality. It’s the easiest way to create stunning ID cards without design skills!
            </p>
        </div>
        <img className='w-80' src={howitworks} alt="" />

    </div>
  )
}

export default HowItWorks