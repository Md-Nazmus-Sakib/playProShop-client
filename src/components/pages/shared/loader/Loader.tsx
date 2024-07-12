const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin ease-linear rounded-full w-20 h-20 border-t-4 border-b-4 border-purple-500"></div>
      <div className="animate-spin ease-linear rounded-full w-20 h-20 border-t-4 border-b-4 border-red-500 ml-3"></div>
      <div className="animate-spin ease-linear rounded-full w-20 h-20 border-t-4 border-b-4 border-blue-500 ml-3"></div>
    </div>
  );
};

export default Loader;
