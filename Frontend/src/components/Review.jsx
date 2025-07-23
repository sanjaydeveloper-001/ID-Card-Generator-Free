import React, { useEffect } from 'react'

function Review() {
    
     useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.trustindex.io/loader.js?285dae4477e266902d5655463de";
    script.async = true;
    script.defer = true;

    // Target a specific div instead of bottom of body
    const container = document.getElementById("trustindex-widget");
    if (container) {
      container.appendChild(script);

    } else {
      // Fallback to body
      document.body.appendChild(script);
    }

    return () => {
      if (container) container.innerHTML = "";
    };
  }, []);


  return (
    <div className='h-max py-15 w-full flex flex-col gap-5 justify-center items-center px-15'>
        <h1 className='font-bold text-3xl'>What Our Customers Say</h1>
        <div id="trustindex-widget" className="static"></div>
    </div>
  )
}

export default Review