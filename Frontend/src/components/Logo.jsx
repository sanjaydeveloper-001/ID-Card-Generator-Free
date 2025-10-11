import { Link } from "react-router-dom";
import logo from "../assets/LOGOOO.png";

function Logo() {
  return (
    <div className="flex items-center gap-3 sm:gap-5">
      <img className="h-10 sm:h-12" src={logo} alt="LOGO" />
      <Link
        to="/"
        style={{ fontFamily: "Montserrat, sans-serif" }}
        className="text-xl sm:text-2xl md:text-3xl font-bold text-[#161616]"
      >
        ID <span className="text-[#0497e5]">Generator</span>
      </Link>
    </div>
  );
}

export default Logo;
