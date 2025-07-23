import Card from '../components/Card'
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import html2canvas from 'html2canvas';
import NoLogo from '../assets/patterns/No Logo.png'
import FormInputs from "../components/FormInputs";
import DisplayID from '../components/DisplayID';
import { Link, useNavigate } from 'react-router-dom';
import { IoCloseCircleOutline , IoHomeOutline } from "react-icons/io5";


function IDCreation({ setCreations , formData , setFormData , token , user}) {

  const [college , setCollege] = useState('');
  const [collegeLogo , setCollegeLogo] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error , setError] = useState(false);
  const [Done , setDone] = useState(false);
  const navigate = useNavigate();
  const [logoBase64, setLogoBase64] = useState(null);


  const getBase64Image = async (url) => {
    const response = await fetch(`${VITE_BACKEND_LINK}/proxy-image?url=${encodeURIComponent(url)}`);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };



  useEffect(() => {
    const convertLogo = async () => {
      if (collegeLogo) {
        const base64 = await getBase64Image(collegeLogo);
        setLogoBase64(base64);
        console.log("True");
      }
    };
    convertLogo();
  }, [formData.collegeLogo]);

  const handlehtml2Canvas = async () => {
    const element = document.getElementById('id-card') ;
    const canvas = await html2canvas(element, { useCORS: true });
    const dataUrl = canvas.toDataURL('image/png');
    setFormData((prev) => ({
      ...prev ,
      preview : dataUrl
    }))

  };

  const handleChangeFormDetails = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    if(id === 'college'){
      setError(false)
      setCollege(value);
    }
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData((prev) => ({
      ...prev,
      profile : reader.result
    }));;
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelte = () => {
     setFormData((prev) => ({
      ...prev,
      profile : null
     }));
  }


   //Logo Generation
   const fetchLogo = async () => {
    if (college.length < 3) {
      setError(true);
      setCollegeLogo(null);
      return
    }
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERP_LINK}/search-college`, {
        collegeName: college.trim()
      });
      setCollegeLogo(response.data.logo);
    } catch (error) {
      setCollegeLogo(NoLogo)
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const regenerate = () =>{
    setCollegeLogo(null);
    fetchLogo();
  }
  

  return (
    <div className='w-full h-[100vh] bg-white z-10 fixed top-0 left-0 flex justify-between'> 
        {/* <div className='h-10 w-full bg-white fixed'></div> */}
        <div className='flex flex-col h-full w-[60%] bg-[#509fff] px-2 items-center'>
          <div className='flex items-center justify-between w-full px-10'>
            
            <h2 className="text-white p-5 text-2xl font-medium">
              Hello, Designer 👋 Ready to design?
            </h2> 
            <div className='flex gap-5 text-blue-800'>
              <Link to="/" className='hover:text-white hover:underline flex items-center text-[18px] gap-2'>Home <IoHomeOutline/></Link>
              <h1 onClick={()=> navigate(-1)} className='hover:text-red-500 hover:underline flex items-center text-[18px] gap-2 cursor-pointer'>Back <IoCloseCircleOutline/></h1>
            </div>
          </div>          
          <div className='h-[100vh] flex justify-center items-center'>
            <div  id='id-card'>
              <Card formData={formData} logoBase64={logoBase64} />
            </div>
          </div>
        </div>

        <div className='w-[40%] h-full flex flex-col p-10 overflow-x-auto custom2'>
            <h1 className='text-3xl font-bold text-[#021621]'>Customize and Generate Your Digital ID Now</h1>
            <p className='text-[18px] text-blue-900'>Please fill in the required information and custom your ID card.</p>

            <FormInputs
              fetchLogo ={fetchLogo}
              formData = {formData}
              handleChangeFormDetails = {handleChangeFormDetails}
              handleImageDelte = {handleImageDelte}
              handleImageChange = {handleImageChange}
              handlehtml2Canvas = {handlehtml2Canvas}
              collegeLogo = {collegeLogo}
              setCollegeLogo = {setCollegeLogo}
              loading = {loading}
              regenerate = {regenerate}
              setFormData={setFormData}
              college = {college}
              error = {error}
              setDone={setDone}
            />
        </div>
        { 
          Done ?
        <DisplayID 
          formData={formData}
          logoBase64={logoBase64} 
          setDone={setDone}
          setFormData={setFormData}
          token={token}
          user={user}
          setCreations={setCreations}
        /> : ''
        }

    </div>
  )
}

export default IDCreation