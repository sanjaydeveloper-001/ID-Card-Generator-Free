import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

function LogBar({ user }) {
  return (
    <>
      {user ? (
        <div className="flex items-center gap-2 sm:gap-3 text-blue-600 text-sm sm:text-base">
          <CgProfile className="text-xl sm:text-2xl" />
          <Link
            to="/Profile"
            className="hover:text-blue-400 hover:underline cursor-pointer"
          >
            {user?.firstname} {user?.lastname}
          </Link>
        </div>
      ) : (
        // 👇 Hidden on mobile, visible on sm and above
        <div className="hidden sm:flex gap-2 sm:gap-5 text-sm sm:text-base">
          <Link
            to="/Login"
            className="px-4 sm:px-6 py-1 sm:py-2 rounded-3xl bg-[#0497e5] text-white"
          >
            Login
          </Link>
          <Link
            to="/Register"
            className="px-4 sm:px-6 py-1 sm:py-2 rounded-3xl bg-gray-300/50 text-black"
          >
            Get Started
          </Link>
        </div>
      )}
    </>
  );
}

export default LogBar;
