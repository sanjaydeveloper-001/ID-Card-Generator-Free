import { Link } from "react-router-dom";
import logo from "../assets/LOGOOO.png";

function Logo() {
  return (
    <div className="flex items-center gap-5">
        <img className="h-15" src={logo} alt="LOGO" />
        <Link style={{fontFamily: "Montserrat ,sans-serif"}} className="text-3xl font-bold text-[#161616]" to="/">ID <span className="text-[#0497e5]">Generator</span></Link>
    </div>
  )
}

export default Logo