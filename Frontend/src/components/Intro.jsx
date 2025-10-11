import { Link } from "react-router-dom";
import IDCard2 from "../assets/patterns/ID Card2.mp4";

function Intro() {
  return (
    <div className="relative w-full flex flex-col lg:flex-row justify-between items-center px-6 sm:px-10 md:px-16 lg:px-20 xl:px-30 pt-30 pb-20 overflow-hidden">
      
      {/* --- Left Text Section --- */}
      <div className="relative z-10 w-full lg:w-1/2 flex flex-col justify-between text-[#021024] font-bold gap-6 text-center lg:text-left">
        <div className="flex flex-col gap-4">
          <h1
            style={{ fontFamily: "Montserrat, sans-serif" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight"
          >
            College ID Card Generator
          </h1>
          <h2 className="text-lg sm:text-xl">
            100% <span className="text-[#0497e5]">free</span>
          </h2>
        </div>

        <div className="flex flex-col items-center lg:items-start mt-4">
          <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg max-w-md">
            Start creating your personalized college ID card with just a few clicks!
          </p>
          <Link
            to="/IDCreation"
            className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-xl shadow-[2px_2px_5px_#939393] hover:bg-blue-600 transition text-sm sm:text-base"
          >
            Get Started Now
          </Link>
        </div>
      </div>

      {/* --- Right Video Section --- */}
      <div className="relative w-full lg:w-1/2 flex justify-center mt-10 lg:mt-0 ">
        <video
          className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[85%] xl:w-[75%] h-auto"
          autoPlay
          muted
          loop
          playsInline
          src={IDCard2}
        />
      </div>
    </div>
  );
}

export default Intro;
