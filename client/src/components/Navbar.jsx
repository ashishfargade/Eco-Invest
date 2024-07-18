import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../authSlice';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="bg-gray-800 p-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="navbar-left">
                    <img src="your-image-url.jpg" alt="Logo" className="h-10 w-auto" />
                </div>
                <div className="hidden md:flex space-x-4">
                    <Link to="/" className="text-white hover:text-blue-300">Home</Link>
                    <Link to="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
                    <Link to="/esg" className="text-white hover:text-gray-300">What is ESG</Link>
                    {location.pathname === '/dashboard' && (
                        <Link to="/edit-portfolio" className="text-white hover:text-gray-300">Edit Portfolio</Link>
                    )}
                    {user && (
                        <button
                            onClick={handleLogout}
                            className="text-white hover:text-red-300"
                        >
                            Logout
                        </button>
                    )}
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden mt-2 space-y-2">
                    <Link to="/" className="block text-white hover:text-blue-300">Home</Link>
                    <Link to="/dashboard" className="block text-white hover:text-gray-300">Dashboard</Link>
                    <Link to="/esg" className="block text-white hover:text-gray-300">What is ESG</Link>
                    <Link to="/contact" className="block text-white hover:text-gray-300">Contact</Link>
                    {location.pathname === '/dashboard' && (
                        <Link to="/edit-portfolio" className="block text-white hover:text-gray-300">Edit Portfolio</Link>
                    )}
                    {user && (
                        <button
                            onClick={handleLogout}
                            className="block text-white hover:text-red-300"
                        >
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
