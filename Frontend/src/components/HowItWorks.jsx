import howitworks from '../assets/how it workds.png';

function HowItWorks() {
  return (
    <section className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-20 lg:gap-50 py-16 px-6 sm:px-10 md:px-16 lg:px-24 bg-blue-200/70">
      <div className="flex-1 text-center lg:text-left">
        <h1 style={{ fontFamily: "Montserrat, sans-serif" }} className="font-bold text-2xl sm:text-3xl md:text-4xl mb-5">
          ID Card Creation: Fully ready in 30 seconds!
        </h1>
        <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
          Thanks to our smart ID generator, you can auto-fetch logos, fill in details, and generate professional ID cards — fast and hassle-free!
        </p>
      </div>
      <img draggable={false} className="w-[80%] sm:w-[60%] md:w-[45%] lg:w-[30%]" src={howitworks} alt="How It Works" />
    </section>
  );
}

export default HowItWorks;
