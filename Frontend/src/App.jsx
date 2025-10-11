import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import MyCreations from "./Pages/MyCreations";
import IDCreation from "./Pages/IDCreation";
import { useEffect, useState } from "react";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { jwtDecode } from 'jwt-decode';
import { fetchCreations, fetchTrash, getUser } from "./api/api";
import Loading from "./Pages/Loading";
import ProfileBar from "./Pages/ProfileBar";
import { fetchReviews } from "./api/review";

function App() {    
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [formData, setFormData] = useState({});
  const [creations, setCreations] = useState([]);
  const [trash, setTrash] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [reviews, setReviews] = useState([]);

  // Fetch user + creations + trash
  useEffect(() => {
  const fetchUserData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const userData = await getUser(token);
      setUser(userData);

      const fetchedCreations = await fetchCreations(token);
      const fetchedTrash = await fetchTrash(token);
      setCreations(fetchedCreations);
      setTrash(fetchedTrash);

      // Fetch reviews
      const reviewData = await fetchReviews(); // <-- returns JSON directly
      setReviews(reviewData);

    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchUserData();
}, [token]);

  return (
    <BrowserRouter>
      
      { loading && <Loading/> }
      <Routes >
        <Route path="/" element={<Home reviews={reviews} setReviews={setReviews} token={token} user={user} setShowProfile={setShowProfile} />} />
        {/* <Route path="/GenerateID" element={<GenerateID />} /> */}
        <Route path="/IDCreation" element={<IDCreation creations={creations} setCreations={setCreations} formData={formData} setFormData={setFormData} token={token} user={user} />} />
        <Route path="/MyCreations/*" element={<MyCreations setCreations={setCreations} setTrash={setTrash} user={user} creations={creations} trash={trash} token={token} setShowProfile={setShowProfile} />} />
        {/* <Route path="/Templetes" element={<Templetes />} /> */}
        <Route path="/Register" element={<Register setToken={setToken}/>} />
        <Route path="/Login" element={<Login setToken={setToken} />} />
      </Routes>

      {showProfile && <ProfileBar setShowProfile={setShowProfile} user={user} setUser={setUser} token={token} /> }
    </BrowserRouter>
  );
}

export default App;
