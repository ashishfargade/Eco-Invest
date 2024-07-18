// src/components/ESG.js
import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import esgLogo from '../assets/esg-logo.png';
import environmentalLogo from '../assets/environmental-logo.png';
import socialLogo from '../assets/social-logo.png';
import governanceLogo from '../assets/governance-logo.png';

const ESG = () => {
  const fadeIn = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 200 });
  const slideInLeft = useSpring({ from: { transform: 'translateX(-100%)' }, to: { transform: 'translateX(0)' }, delay: 200 });
  const slideInRight = useSpring({ from: { transform: 'translateX(100%)' }, to: { transform: 'translateX(0)' }, delay: 200 });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <animated.h1 style={fadeIn} className="text-4xl font-bold text-center mb-12 text-gray-800">
        What is ESG?
      </animated.h1>
      <div className="text-center mb-12">
        <p className="text-lg mb-6 text-gray-600">
          ESG stands for Environmental, Social, and Governance. It refers to the three central factors in measuring the sustainability and societal impact of an investment in a company or business.
        </p>
        {/* <animated.img src={esgLogo} alt="ESG Logo" className="mx-auto w-32 h-32 mb-8" style={fadeIn} /> */}
      </div>

      <animated.h2 style={fadeIn} className="text-3xl font-bold mb-10 text-center text-gray-800">
        The Three Dimensions of ESG
      </animated.h2>
      <div className="flex flex-col md:flex-row justify-around mb-16">
        <animated.div style={slideInLeft} className="w-full md:w-1/3 text-center p-6 bg-white rounded-lg shadow-lg mb-8 md:mb-0">
          <img src={environmentalLogo} alt="Environmental" className="mx-auto w-24 h-24 mb-4" />
          <h3 className="text-2xl font-semibold mb-2 text-gray-700">Environmental</h3>
          <p className="text-gray-600">
            This dimension includes factors such as climate change, resource depletion, waste, and pollution.
          </p>
        </animated.div>
        <animated.div style={fadeIn} className="w-full md:w-1/3 text-center p-6 bg-white rounded-lg shadow-lg mb-8 md:mb-0">
          <img src={socialLogo} alt="Social" className="mx-auto w-24 h-24 mb-4" />
          <h3 className="text-2xl font-semibold mb-2 text-gray-700">Social</h3>
          <p className="text-gray-600">
            This dimension includes factors such as working conditions, community impact, and employee relations.
          </p>
        </animated.div>
        <animated.div style={slideInRight} className="w-full md:w-1/3 text-center p-6 bg-white rounded-lg shadow-lg">
          <img src={governanceLogo} alt="Governance" className="mx-auto w-24 h-24 mb-4" />
          <h3 className="text-2xl font-semibold mb-2 text-gray-700">Governance</h3>
          <p className="text-gray-600">
            This dimension includes factors such as executive pay, board diversity, and shareholder rights.
          </p>
        </animated.div>
      </div>

      <animated.div style={fadeIn} className="mb-16 p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4 text-gray-700">Why ESG Matters</h3>
        <p className="text-gray-600">
          Integrating ESG factors into investment decisions can help identify risks and opportunities that traditional financial analysis might overlook. It also aligns investments with personal values and societal goals.
        </p>
      </animated.div>

      <animated.div style={fadeIn} className="text-center">
        <h3 className="text-2xl font-bold mb-6 text-gray-700">Join the ESG Movement</h3>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300 shadow-lg">
          Learn More
        </button>
      </animated.div>
    </div>
  );
};

export default ESG;
