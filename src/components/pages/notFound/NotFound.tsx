import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="text-9xl font-extrabold text-red-600 animate-ping">
        4<span className="text-black">0</span>4
      </div>
      <p className="text-2xl mt-4 text-gray-700 animate-bounce">
        Page Not Found
      </p>
      <Link
        to="/"
        className="mt-6 px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
