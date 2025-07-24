import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import LogBar from "./LogBar";

function Header({ user , setUser , token}) {

  const location = useLocation();
  const [showHeader , setShowHeader] = useState(true);
  const [showProfile , setShowProfile] = useState(false);

  useEffect (() => {
    if(location.pathname === '/MyCreations' || location.pathname === '/Profile'){
      setShowHeader(false);
    }
    else{
      setShowHeader(true);
    }
  },[location]);

  return (
    <>{ showHeader ?
        <div className="h-20 w-full z-5 flex justify-between items-center px-15 shadow-[2px_0_8px_gray] fixed bg-white/95 top-0">
          
          <div className="flex gap-20">
            <Logo/>
            <NavBar user={user}/>
          </div>
  
            <LogBar user={user} setUser={setUser}/>

        </div> 
        :
        ''
    }
    </>
    
  );
}

export default Header;
