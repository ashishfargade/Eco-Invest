import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero bg-gradient-to-r from-blue-100 to-blue-300 min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-800 shadow-lg">
        Eco-Invest
      </h1>
      <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-700 max-w-3xl">
        Analyze and optimize your stock portfolio for a sustainable future. Make eco-friendly investments with confidence.
      </p>
      <button className="bg-green-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-green-600 transition duration-300 shadow-md">
      <Link to="/dashboard" className="text-white hover:text-blue-300">Get Started</Link>
      </button>
    </div>
  );
}

export default Hero;