import image from '../assets/profileImg.jpg'
import colLogo from '../assets/collegelogo.png'
import barcode from '../assets/barcode.png';
import Default from '../utilities/Default';

function Card({formData , logoBase64}) {
  return (

    <div className='flex h-max items-center w-max p-10'>

    <div className='flex w-max gap-20'>
        
        <div className='bg-white w-75 h-105 border-1 flex flex-col justify-between items-center p-5 rounded-2xl shadow-[0_0_20px_gray]'>
            <div className='flex w-full items-center justify-center gap-5 px-3'>
                <img src={ logoBase64 ? logoBase64 : formData.collegeLogo ? formData.collegeLogo : colLogo} className='w-15 ' />
                <h1 className='font-bold text-center'>{formData.college? formData.college : Default.college }</h1>
            </div>
            <img className='w-35 h-40 border-1' src={formData.profile ? formData.profile : image}  />
            <div className="flex flex-col items-center">
                <h1 className='text-xl font-medium'> {formData.name ? formData.name : Default.name} </h1>
                <h2 className='text-[18px]'>{formData.rollNum ? formData.rollNum : Default.roll}</h2>
                <h2>{formData.dept ? formData.dept : Default.Department}</h2>
            </div>
            <div className='flex w-full justify-between'>
                <h3>Valid : 2027</h3>
                <h3>Fake</h3>
            </div>
        </div>

        <div className='bg-white w-75 h-105 border-1 flex flex-col justify-between items-center p-3 rounded-2xl shadow-[0_0_20px_gray]'>
            <div className="flex flex-col w-full">
                <h2>D.O.B : {formData.DOB ? formData.DOB : Default.DOB} </h2>
                <h2>Blood : {formData.Blood ? formData.Blood : Default.Blood} </h2>
                <h2>Phone : {formData.phone ? formData.phone : Default.phone } </h2>
                <h3>Address : {formData.Address ? formData.Address : Default.address}</h3>
            </div>
            <div className='flex flex-col items-center'>
            <img src={barcode} className='w-[80%]' alt="" />
            <h3>{formData.rollNum ? formData.rollNum : Default.roll}</h3>
            </div>
            <div className="flex flex-col items-center">
                <h1 className='text-center'>{formData.college ? formData.college : Default.college}</h1>
                <h4>{formData.collAdd ? formData.collAdd : Default.colladdress}</h4>
                <h4>{formData.colltele ? formData.colltele : Default.collegetelephone}</h4>
            </div>
        </div>
    </div>

    </div>


    
  )
}

export default Card