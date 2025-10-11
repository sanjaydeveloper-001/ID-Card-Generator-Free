import Admin from '../assets/Admin.png';
import Student from '../assets/Student.png';
import Staff from '../assets/Staff.png';
import { useState } from 'react';
import IDCard from '../assets/patterns/ID Card.mp4';

function Quality() {
  const types = [
    { name: 'Student', img: Student },
    { name: 'Staff', img: Staff },
    { name: 'Admin', img: Admin }
  ];

  const [changeBg, setChangeBg] = useState(types[0].name);

  return (
    <section className="w-full flex flex-col lg:flex-row justify-center items-center gap-15 lg:gap-60 px-6 sm:px-10 md:px-20 py-16">
      <video className="w-[100%] sm:w-[70%] lg:w-[40%] rounded-2xl" autoPlay loop muted playsInline src={IDCard} />
      <div className="flex flex-col items-center lg:items-start gap-6 text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold">Stunning Quality</h1>
        <div className="flex flex-wrap justify-center lg:justify-start gap-3">
          {types.map((type, i) => (
            <button
              key={i}
              onClick={() => setChangeBg(type.name)}
              className={`px-4 py-1 rounded-2xl border border-gray-300 transition ${
                changeBg === type.name ? 'bg-blue-500 text-white' : 'bg-gray-50 hover:bg-blue-100'
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>
        <img className="w-[80%] sm:w-[60%] md:w-[40%] lg:w-[50%] rounded-2xl shadow-lg" src={types.find(t => t.name === changeBg)?.img} alt={changeBg} />
      </div>
    </section>
  );
}

export default Quality;
