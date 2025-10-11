import Logofetching from '../assets/logofetching.png';
import fast from '../assets/fast.png';
import customizable from '../assets/customizeable.png';
import layout from '../assets/Layouts.png';

const feature = [
  { img: Logofetching, name: 'Smart College Logo Fetcher', describe: 'Simply type in your college name — our system will instantly fetch and display the official logo without needing you to upload anything manually.' },
  { img: customizable, name: 'Fully Customizable', describe: 'Easily personalize your ID card by adding your name, profile photo, department, unique ID number, and more.' },
  { img: fast, name: 'Fast and Simple', describe: 'No account needed, no long process. Just fill in details, preview your ID instantly, and download it in seconds.' },
  { img: layout, name: 'Separate Layouts', describe: 'Choose from multiple templates tailored for students, staff, and admin roles — all professionally designed.' }
];

function Features() {
  return (
    <section className="w-full py-20 px-6 sm:px-10 md:px-16 bg-blue-200/70 flex flex-col items-center text-center">
      <h1 style={{ fontFamily: "Montserrat, sans-serif" }} className="text-3xl sm:text-4xl font-bold text-[#021024] mb-2">Why Use Our ID Card Generator?</h1>
      <p className="text-gray-700 mb-10 text-sm sm:text-base">Packed with smart features to make ID creation effortless and professional.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full">
        {feature.map((list, i) => (
          <div key={i} className="flex flex-col items-center bg-white/70 rounded-2xl p-5 shadow hover:shadow-lg transition">
            <img className="w-20 mb-4" src={list.img} alt={list.name} />
            <h2 className="underline text-lg font-semibold mb-2">{list.name}</h2>
            <p className="text-gray-700 text-sm sm:text-base">{list.describe}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
