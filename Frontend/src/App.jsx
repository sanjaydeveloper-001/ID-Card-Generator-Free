import { BrowserRouter, Route, Routes, useAsyncError, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Pages/Home";
import GenerateID from "./Pages/GenerateID";
import MyCreations from "./Pages/MyCreations";
// import Templetes from "./Pages/Templetes";
import IDCreation from "./Pages/IDCreation";
import { useEffect, useState } from "react";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { jwtDecode } from 'jwt-decode';
import { fetchCreations, fetchTrash, getUser } from "./api/api";
import Loading from "./Pages/Loading";
import ProfileBar from "./Pages/ProfileBar";

function App() {    
  
  const [user , setUser] = useState('');
  const [token , setToken ]= useState(localStorage.getItem("token"));

  const [formData , setFormData] = useState({});
  const [creations, setCreations] = useState([]);
  const [trash , setTrash] = useState([]);
  const [proTrash , setProTrash] = useState(false);
  const [loading , setLoading ] = useState(false);

 useEffect( () => {
  if(token){
    const fetchUser = async ()=> {
        try {
        const res = await getUser(token);
        setUser(res);

      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }
  }, [token]);

  useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
    },1000)
  },[])

  useEffect(() => {
    if (user && token) {
      (async () => {
        const fetchedCreations = await fetchCreations(token);
        const fetchedTrash = await fetchTrash(token);
        setCreations(fetchedCreations);
        setTrash(fetchedTrash);
      })();
    }
  }, [user, token]);

  return (
    <BrowserRouter>
      
      { loading ? <Loading/> : ''}
      <Header user={user} setUser={setUser} token={token} />



      
      <Routes >
        <Route path="/" element={<Home token={token} />} />
        <Route path="/Profile" element={<ProfileBar user={user} setUser={setUser} token={token} />} />
        <Route path="/GenerateID" element={<GenerateID />} />
        <Route path="/IDCreation" element={<IDCreation creations={creations} setCreations={setCreations} formData={formData} setFormData={setFormData} token={token} user={user} />} />
        <Route path="/MyCreations" element={<MyCreations user={user} creations={creations} trash={trash} proTrash={proTrash} setProTrash={setProTrash} setCreations={setCreations} setTrash={setTrash} token={token} />} />
        {/* <Route path="/Templetes" element={<Templetes />} /> */}
        <Route path="/Register" element={<Register/>} />
        <Route path="/Login" element={<Login setToken={setToken} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
