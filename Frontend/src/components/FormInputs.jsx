import formInfo from "../utilities/Form";
import LoadingImg from '../assets/patterns/Loading.gif'
import { useRef } from "react";



function FormInputs({setDone , fetchLogo , formData , handleChangeFormDetails , handleImageChange , handlehtml2Canvas , handleImageDelte , collegeLogo , college , error , setFormData , loading , regenerate }) {


  const formRef = useRef(null);
  let i =0;

  const HandleSubmit = (e) => {
    e.preventDefault();
    

    const form = formRef.current;
    const inputs = form.querySelectorAll('input[required]');

    let allFilled = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        allFilled = false;
        input.classList.add('border-red-500');
      } else {
        input.classList.remove('border-red-500');
      }
    });

    if (!formData.profile || !formData.collegeLogo) {
      if(!formData.profile){
        document.getElementById('Profile-photo').classList.add('opacity-100')
      }
      if(!formData.collegeLogo){
        document.getElementById('CollageName').classList.add('text-red-400')
      }
      allFilled = false;
    }

    if (allFilled) {
      handlehtml2Canvas();
      setDone(true);
    } else {
      setDone(false);
    }
    
  }


  return (
            <form ref={formRef} className='w-full h-max pb-10 mt-5 flex flex-col'  >
              {
                formInfo.map((info , index)=>{
                  let inputName = info.id;
                  return (
                    <div key={index} className='mb-5'>
                      <label className='text-xl mb-2 text-blue-950' htmlFor={info.id}>{info.label} <span className="text-red-400">*</span></label>
                      <div className='flex items-center justify-between inputs'>
                        <input onChange={(e) => {
                          handleChangeFormDetails(e);
                          if (e.target.value.trim()) {
                            e.target.classList.remove('border-red-500');
                          } else {
                            e.target.classList.add('border-red-500');
                          }
                        }} 
                        value={formData[inputName] || ''}
                        maxLength={60} className='w-full px-2 border-3 border-blue-200 outline-none focus:border-blue-600 rounded-[5px] py-1.5' type={`${info.type}`} required placeholder={`${info.place}`} name={`${info.id}`} id={`${info.id}`} />
                      </div>
                    </div>
                  )
                })

                
              }
              {/* <input type="text" required /> */}

              <div className="flex h-max w-full gap-5 mt-10 justify-between">
                { formData.profile ?
                  <div  className="relative h-60 w-50">
                    <h1>Profile Photo <span className="text-red-400 h-5">*</span></h1>
                    <img  className="h-full w-full rounded-xl" src={formData.profile} /> 
                    <div className="absolute opacity-0 hover:opacity-100 top-6 h-full w-full bg-black/40 flex justify-center items-center text-white rounded-xl">
                      <h1 onClick={handleImageDelte} className="py-1 px-3 bg-gray-500 rounded-2xl hover:bg-red-500 cursor-pointer">Delete</h1>
                    </div>
                  </div> :
                  <div className="flex flex-col h-65">
                    <h1>Profile Photo <span className="text-red-400">*</span> <span id="Profile-photo" className="text-red-400 opacity-0">Required</span></h1>
                    <label  className="h-full w-50 rounded-xl shadow-[inset_0_0_10px_rgba(0,0,0,0.15)] hover:shadow-[inset_0_0_12px_rgba(0,0,0,.18)] flex justify-center items-center cursor-pointer" htmlFor="profile" >Upload Photo</label>
                  </div> 
                }
                <input type="file" onChange={handleImageChange} accept="image/*" id="profile" style={{display:'none'}}/>
                

                { collegeLogo || loading ?                 
                <div className="h-65 flex flex-col justify-between items-center w-max">
                  <h1>Ensure your college Logo *</h1>
                  { !loading ?
                    <img src={collegeLogo } className=" h-30 w-max " alt="" /> :
                    <img src={LoadingImg} className="h-30" alt="" />
                    }
                  <div className="w-50 flex justify-between">
                    <label htmlFor="college" className="text-black w-24 h-10 flex justify-center items-center rounded-[10px] bg-yellow-400 hover:bg-yellow-500 cursor-pointer">ReEnter</label>
                    <h1 onClick={regenerate} className="text-black w-24 h-10 flex justify-center items-center rounded-[10px] bg-orange-400 hover:bg-orange-500 cursor-pointer">Regenerate</h1>
                  </div>
                  <h1 onClick={()=>{setFormData((prev) => ({
                      ...prev,
                      collegeLogo : collegeLogo
                    }));; }} 
                    className="text-white w-50 h-10 flex justify-center items-center rounded-[10px] bg-green-500 hover:bg-green-600 cursor-pointer">Fetch</h1>
                </div> 
                :
                <div className="w-[50%] h-60 justify-end flex flex-col text-xl ml-10">
                  Your College Name : <br />
                  <label id="CollageName" htmlFor="college" className="text-gray-600 text-2xl">{college ? college : 'Enter College Name' }</label>
                  { error ? <h1 className="text-[13px] text-red-500">* Please enter atleast 3 char to search!</h1> : ''}
                  <h1 onClick={fetchLogo} className="w-50 h-10 flex justify-center items-center rounded-[10px] bg-green-400 cursor-pointer text-white mt-10">Generate Logo</h1>
                </div>

                }
  
              </div>

              <button onClick={HandleSubmit} type='submit' className=" mt-15 w-full h-20 text-xl font-bold bg-green-500 hover:bg-green-600 rounded-[5px] text-white cursor-pointer" >Done</button>

            </form>

  )
}

export default FormInputs