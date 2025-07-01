import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="h-screen w-full bg-[#4AD0D4] relative px-6 py-8 sm:py-12">
      {/* Uber Logo */}
      <h1 className="absolute top-6 left-6 text-5xl italic font-rye text-black font-extrabold">
        Ryde On
      </h1>

      {/* Main Content Area */}
      <div className="w-full h-full flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-12 max-w-6xl w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-10">
          {/* Text Content */}
          <div className="flex-1 text-center sm:text-left -skew-x-12">
            <h2 className="text-3xl sm:text-4xl font-medium italic text-black mb-6">
              Drive Innovation, Move Faster, Ride Smarter
            </h2>
            <Link
              to="/user/login"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-lg px-5 py-2.5 me-2 mb-2"
            >
              Continue
            </Link>
          </div>

          {/* SVG Image */}
          <div className="flex-1 flex justify-center hover:-skew-x-6 hover:scale-105 transition-transform duration-300">
            <img
              src="/ride-8527715.svg"
              alt="Ride Illustration"
              className="max-w-xs sm:max-w-sm md:max-w-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
