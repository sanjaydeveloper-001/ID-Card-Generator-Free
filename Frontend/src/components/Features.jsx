import Logofetching from '../assets/logofetching.png';
import fast from '../assets/fast.png';
import customizable from '../assets/customizeable.png';
import layout from '../assets/Layouts.png';

const feature = [
  {
    img: Logofetching,
    name: 'Smart College Logo Fetcher',
    describe: 'Simply type in your college name — our system will instantly fetch and display the official logo without needing you to upload anything manually. Save time and ensure accuracy!'
  },
  {
    img: customizable,
    name: 'Fully Customizable',
    describe: 'Easily personalize your ID card by adding your name, profile photo, department, unique ID number, and more. Customize the look and details just the way you want.'
  },
  {
    img: fast,
    name: 'Fast and Simple',
    describe: 'No account needed, no long process. Just fill in the details, preview your ID instantly, and download it in seconds — quick, efficient, and stress-free.'
  },
  {
    img: layout,
    name: 'Separate Layouts',
    describe: 'Choose from multiple templates tailored for students, staff, and admin roles. Each layout is professionally designed to match the purpose and identity of the user.'
  }
];



function Features() {
  return (
    <div className='h-150 w-full flex flex-col items-center justify-between py-20 px-15 bg-blue-200/70'>
          <div className='flex flex-col gap-2 items-center'>
            <h1 style={{fontFamily: "Montserrat ,sans-serif"}}  className='text-4xl font-bold text-[#021024]'>Why Use Our ID Card Generator?</h1>
            <p>Packed with smart features to make ID creation effortless and professional.</p>
          </div>
          <div className="flex justify-between items-center w-full h-max ">
            {
              feature.map((list , i)=>{
                return ( 
                <div key={list.id || i} className="h-60 w-80 flex flex-col gap-5 rounded-2xl  p-1">
                  <div className='flex items-center gap-5'> 
                    <img className='w-20' src={list.img} alt="" />
                  <h1 className="underline text-xl">{list.name}</h1>
                  </div>
                  <h1>{list.describe}</h1>
                </div>)
              })
            }
          </div>
      </div>
  )
}

export default Features