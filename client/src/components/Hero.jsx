import React from 'react';

const Hero = () => {
  return (
    <div className="hero bg-blue-100 min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Eco-Invest</h1>
      <p className="text-lg md:text-xl lg:text-2xl mb-8">
        Analyze and optimize your stock portfolio for a sustainable future.
      </p>
      <button className="bg-white text-green-600 font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition duration-300">
        Get Started
      </button>
    </div>
  );
}

export default Hero;
