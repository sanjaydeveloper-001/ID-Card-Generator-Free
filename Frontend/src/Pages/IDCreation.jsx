import Card from '../components/Card';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import NoLogo from '../assets/patterns/No Logo.png';
import FormInputs from '../components/FormInputs';
import DisplayID from '../components/DisplayID';
import { Link, useNavigate } from 'react-router-dom';
import { IoCloseCircleOutline, IoHomeOutline } from 'react-icons/io5';
import { MdMovieCreation } from "react-icons/md";

function IDCreation({ setCreations, formData, setFormData, token, user }) {
  const [college, setCollege] = useState('');
  const [collegeLogo, setCollegeLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [Done, setDone] = useState(false);
  const [logoBase64, setLogoBase64] = useState(null);

  const navigate = useNavigate();

  const getBase64Image = async (url) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_LINK}/proxy-image?url=${encodeURIComponent(url)}`
    );
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  useEffect(() => {
    const convertLogo = async () => {
      if (collegeLogo) {
        const base64 = await getBase64Image(collegeLogo);
        setLogoBase64(base64);
      }
    };
    convertLogo();
  }, [collegeLogo]);

  const handleChangeFormDetails = (e) => {
    const { id, value } = e.target;
    if (id === 'college') {
      setError(false);
      setCollege(value);
    }
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData((prev) => ({ ...prev, profile: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setFormData((prev) => ({ ...prev, profile: null }));
  };

  const fetchLogo = async () => {
    if (college.length < 3) {
      setError(true);
      setCollegeLogo(null);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_LINK}/search-college`,
        { collegeName: college.trim() }
      );
      setCollegeLogo(response.data.logo);
    } catch {
      setCollegeLogo(NoLogo);
    } finally {
      setLoading(false);
    }
  };

  const regenerate = () => {
    setCollegeLogo(null);
    fetchLogo();
  };

  const divRef1 = useRef(null);
  const divRef2 = useRef(null);

const handleCaptureIdCard = async () => {
  if (divRef1.current && divRef2.current) {
    try {
      const [canvas1, canvas2] = await Promise.all([
        html2canvas(divRef1.current),
        html2canvas(divRef2.current),
      ]);
      const prev1 = canvas1.toDataURL("image/png");
      const prev2 = canvas2.toDataURL("image/png");

      const [frontImg, backImg] = await Promise.all([
        loadImage(prev1),
        loadImage(prev2),
      ]);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = frontImg.width + backImg.width;
      canvas.height = Math.max(frontImg.height, backImg.height);

      ctx.drawImage(frontImg, 0, 0);
      ctx.drawImage(backImg, frontImg.width, 0);

      const mergedImageURL = canvas.toDataURL("image/png");

      setFormData((prev) => ({
        ...prev,
        preview: mergedImageURL,
      }));
    } catch (error) {
      console.error("Error generating merged image:", error);
    }
  }
};

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });



  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-[#f0f7ff] to-[#e4ecff]">
      {/* Left: Card Preview Section */}
      <div className="lg:w-2.5/5 w-full bg-[#3b82f6] flex flex-col items-center justify-between py-10 px-6 relative h-max gap-10 md:h-screen">
        
        {/* Top Navigation */}
        <div className="w-full flex flex-col gap-5 sm:flex-row justify-between items-center">
          <h2 className="text-white text-3xl sm:text-2xl font-semibold tracking-wide">
            Hello, Designer 👋
          </h2>
          <div className="flex gap-4">
            <Link
              to="/"
              className="text-white/70 hover:scale-102 hover:text-white flex items-center gap-1 transition"
            >
              <IoHomeOutline size={18} /> Home
            </Link>
            { user && <Link
              to="/MyCreations"
              className="text-white/70 hover:scale-102 hover:text-white flex items-center gap-1 transition"
            >
              <MdMovieCreation size={18}/> My Creations
            </Link>}
            <button
              onClick={() => navigate(-1)}
              className="text-red-100 hover:scale-102 hover:text-red-400 flex items-center gap-1 transition"
            >
              <IoCloseCircleOutline size={18} /> Back
            </button>
          </div>
        </div>

        {/* Card Display */}
        <Card 
          divRef1={divRef1}
          divRef2={divRef2}
          formData={formData} 
          setFormData={setFormData} 
        />

        <p className="text-white/80 text-sm">
          ✨ Preview updates automatically as you edit.
        </p>
      </div>

      {/* Right: Input Form */}
      <div className="lg:w-2.5/5 w-full flex flex-col justify-start p-6 sm:p-10 h-screen overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#021621] mb-2">
            Customize & Generate Your Digital ID 🎨
          </h1>
          <p className="text-blue-700 text-sm sm:text-base leading-relaxed">
            Fill the details below to design your personalized ID card instantly.
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white shadow-lg rounded-3xl p-6 sm:p-8 border border-gray-100">
          <FormInputs
            fetchLogo={fetchLogo}
            formData={formData}
            handleChangeFormDetails={handleChangeFormDetails}
            handleImageDelete={handleImageDelete}
            handleImageChange={handleImageChange}
            collegeLogo={collegeLogo}
            setCollegeLogo={setCollegeLogo}
            loading={loading}
            regenerate={regenerate}
            setFormData={setFormData}
            college={college}
            error={error}
            setDone={setDone}
            handleCaptureIdCard={handleCaptureIdCard}
            logoBase64={logoBase64}
          />
        </div>

        {/* Display ID */}
        {Done && (
          <DisplayID
            formData={formData}
            setDone={setDone}
            setFormData={setFormData}
            token={token}
            user={user}
            setCreations={setCreations}
          />
        )}
      </div>
    </div>
  );
}

export default IDCreation;
