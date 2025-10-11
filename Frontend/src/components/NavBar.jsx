import { Link } from "react-router-dom";

function NavBar({ user }) {
  return (
    <div
      style={{ fontFamily: "Glory" }}
      className="flex flex-col lg:flex-row lg:gap-10 gap-3 text-base sm:text-lg items-center"
    >
      <Link className="hover:text-blue-400" to="/">
        Home
      </Link>
      <Link className="hover:text-blue-400" to="/GenerateID">
        Generate ID
      </Link>
      {user && (
        <Link className="hover:text-blue-400" to="/MyCreations">
          My Creations
        </Link>
      )}
    </div>
  );
}

export default NavBar;
