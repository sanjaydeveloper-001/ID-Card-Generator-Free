import React from 'react'

function DummyCard() {
  return (
    <div className="flex-1 min-w-[250px] h-50  flex flex-col items-center gap-3">

        <div className='w-full h-[85%] rounded-xl shadow-lg
             bg-gradient-to-r from-gray-50 to-gray-100
            bg-[length:200%_100%] bg-[position:100%_center] bg-no-repeat animate-shine'>
        </div>

        <div className='w-full h-5 flex justify-between'>
            <div className='w-25 h-full bg-gradient-to-r from-gray-200 bg-[length:200%_100%] bg-[position:-200%_center] to-gray-100'></div>
            <div className='w-15 h-full bg-gradient-to-r from-gray-200 bg-[length:200%_100%] bg-[position:-200%_center] to-gray-100'></div>
        </div>
    </div>
  )
}

export default DummyCard