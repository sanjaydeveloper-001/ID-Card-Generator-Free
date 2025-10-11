import Default from '../utilities/Default';
import barcode from '../assets/barcode.png';
import image from '../assets/profileImg.jpg';
import colLogo from '../assets/collegelogo.png';

function Card({ formData, divRef1 , divRef2 }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-center">

      {/* Front Card */}
      <div ref={divRef1} className="bg-white w-[250px] md:w-[280px] md:h-[400px] rounded-2xl p-5 py-8 flex flex-col items-center text-center shadow-md border border-[rgb(229,231,235)]">
        {/* College Logo + Name */}
        <div className="flex items-center gap-3 mb-3">
          <img
            src={formData.CollegeLogo || colLogo}
            alt="Logo"
            className="w-14 h-14 object-contain"
          />
          <h1 className="font-bold text-base text-[rgb(31,41,55)] leading-tight">
            {formData.college || Default.college}
          </h1>
        </div>

        {/* Profile Image */}
        <img
          src={formData.profile || image}
          alt="Profile"
          className="w-28 h-32 sm:w-32 sm:h-36 rounded-xl object-cover border-2 border-[rgb(107,114,128)] mb-3"
        />

        {/* Name, Roll, Dept */}
        <div className="flex flex-col items-center text-[rgb(55,65,81)] text-sm sm:text-base mt-auto">
          <h1 className="font-semibold">{formData.name || Default.name}</h1>
          <p>{formData.rollNum || Default.roll}</p>
          <p>{formData.dept || Default.Department}</p>
        </div>

        {/* Validity & ID Verified */}
        <div className="flex justify-between w-full text-xs sm:text-sm text-[rgb(75,85,99)] mt-3">
          <span>Valid Till: 2027</span>
          <span>ID Verified</span>
        </div>
      </div>

      {/* Back Card */}
      <div ref={divRef2} className="bg-white w-[250px] md:w-[280px] md:h-[400px] rounded-2xl shadow-md p-5 flex flex-col justify-between text-[rgb(31,41,55)] border border-[rgb(229,231,235)]">
        {/* Personal Info */}
        <div className="space-y-1 mb-3">
          <p><strong>D.O.B:</strong> {formData.DOB || Default.DOB}</p>
          <p><strong>Blood:</strong> {formData.Blood || Default.Blood}</p>
          <p><strong>Phone:</strong> {formData.phone || Default.phone}</p>
          <p><strong>Address:</strong> {formData.Address || Default.address}</p>
        </div>

        {/* Barcode */}
        <div className="flex flex-col items-center mt-3">
          <img src={barcode} className="w-4/5 mb-1" alt="Barcode" />
          <p className="text-xs">{formData.rollNum || Default.roll}</p>
        </div>

        {/* College Details */}
        <div className="text-center mt-3">
          <h3 className="font-semibold">{formData.college || Default.college}</h3>
          <p className="text-xs">{formData.collAdd || Default.colladdress}</p>
          <p className="text-xs">{formData.colltele || Default.collegetelephone}</p>
        </div>
      </div>

    </div>
  );
}

export default Card;
