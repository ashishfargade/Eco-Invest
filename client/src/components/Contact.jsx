// src/components/ContactUs.js
import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-semibold">Vishwakarma Institute of Technology</h2>
            <p className="text-gray-400">666, Upper Indiranagar, Bibwewadi, Pune, Maharashtra, INDIA - 411 037.</p>
          </div>
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400 mr-2 hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h4l3 10 4-16h3m3 0h-3m-4 0H4"></path>
              </svg>
              <p className="text-gray-400">Contact: +91 - 8306577352 </p>
            </div>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400 mr-2 hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12h4m0 0v4m0-4h-4m0 0V8m0 4h4M6 12H2m0 0v4m0-4H2m0 0V8m0 4h4M16 8V4m0 0h4M4 4h4"></path>
              </svg>
              <p className="text-gray-400">We're here to help! Contact us </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

