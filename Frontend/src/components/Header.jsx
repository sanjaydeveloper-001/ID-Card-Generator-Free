import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";

function Header({ user , setShowProfile}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex justify-between items-center h-20 px-6 sm:px-10 md:px-16">
        {/* Logo */}
        <Logo />

        {/* Navbar (Desktop) */}
        <nav className="hidden md:flex gap-8 text-[17px] font-medium text-gray-700">
          <Link className="hover:text-blue-500 transition" to="/">Home</Link>
          <Link className="hover:text-blue-500 transition" to="/IDCreation">ID Creation</Link>
          {user && <Link className="hover:text-blue-500 transition" to="/MyCreations">My Creations</Link>}
        </nav>

        {/* Desktop Buttons / Profile */}
        <div className="hidden md:flex items-center gap-5">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-2xl shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                { user?.profilePhoto ? <img draggable={false} src={user?.profilePhoto} className="h-6 w-6 rounded-full" alt="" /> : <CgProfile className="text-2xl" /> }
                <span className="font-medium text-white">{user?.firstname}</span>
                <FiChevronDown className={`transition-transform ${profileOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Desktop Dropdown Menu */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-35">
                  <button 
                    onClick={() => {setShowProfile(true); setProfileOpen(false)}}
                    className="w-full block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    My Profile
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-500 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/Login"
                className="px-5 py-2 rounded-3xl bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition shadow-md"
              >
                Login
              </Link>
              <Link
                to="/Register"
                className="px-5 py-2 rounded-3xl bg-gray-200 text-black text-sm font-medium hover:bg-gray-300 transition shadow-md"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IoClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-3 py-6 bg-white border-t border-gray-200 animate-slideDown">
          <Link onClick={() => setMenuOpen(false)} className="hover:text-blue-500 transition w-full text-center py-2" to="/">Home</Link>
          <Link onClick={() => setMenuOpen(false)} className="hover:text-blue-500 transition w-full text-center py-2" to="/IDCreation">ID Creation</Link>
          {user && (
            <Link onClick={() => setMenuOpen(false)} className="hover:text-blue-500 transition w-full text-center py-2" to="/MyCreations">My Creations</Link>
          )}

          {user ? (
            <div className="flex flex-col w-full items-center gap-3 mt-3">
              <button
                onClick={() => {setShowProfile(true); setMenuOpen(false)}}
                className="flex items-center justify-center w-48 px-4 py-2 bg-blue-500 text-white rounded-3xl shadow-md hover:bg-blue-600 transition"
              >
                <CgProfile className="text-2xl" />
                {user?.firstname}
              </button>
              <button
                onClick={handleLogout}
                className=" cursor-pointer flex items-center justify-center w-48 px-4 py-2 bg-red-50 text-red-500 rounded-3xl shadow-md hover:bg-red-100 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 mt-3">
              <Link
                to="/Login"
                onClick={() => setMenuOpen(false)}
                className="w-48 text-center px-5 py-2 rounded-3xl bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition shadow-md"
              >
                Login
              </Link>
              <Link
                to="/Register"
                onClick={() => setMenuOpen(false)}
                className="w-48 text-center px-5 py-2 rounded-3xl bg-gray-200 text-black text-sm font-medium hover:bg-gray-300 transition shadow-md"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
