import { Link } from "react-router-dom";

function NavBar({user}) {
  return (
    <div style={{fontFamily:'Glory'}} className="flex w-max gap-10 justify-between text-xl items-center">
      <Link className="hover:text-blue-400 " to="/">Home</Link>
      <Link className="hover:text-blue-400 " to="/GenerateID">Generate ID</Link>
      {user && <Link className="hover:text-blue-400 " to="/MyCreations">My Creations</Link>}
      {/* <Link className="hover:text-blue-400 " to="/Templetes">Templetes</Link> */}
    </div>
  );
}

export default NavBar;
