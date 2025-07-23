import purple1 from '../assets/Templetes/Purple 1.png' 
import purple2 from '../assets/Templetes/Purple 2.png' 
// import SampleID from '../components/SampleID' 


function Templete1() {
  return (
    <div className='w-90 h-158 bg-center bg-cover rounded-3xl flex flex-col items-center py-5 relative' style={{backgroundImage:`url(${purple1})`}}>
      <img className='w-15' src={SampleID.collogo} alt="" />
      <h1 className='font-bold'>{SampleID.college}</h1>
      <img className='rounded-[50%] w-45.5 absolute left-22.5 top-31 ' src={SampleID.profile} alt="" />
    </div>
  )
}

export default Templete1