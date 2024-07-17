// import React, { createContext, useState, useEffect } from 'react';
// import { useCookies } from 'react-cookie';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [cookies, setCookie, removeCookie] = useCookies(['token']);

//     useEffect(() => {
//         const token = cookies.token;
//         // Set isAuthenticated based on token presence
//         setIsAuthenticated(!!token);
//     }, [cookies.token]);

//     const login = (token) => {
//         // const isProduction = window.location.protocol === 'https:';

//         setCookie('token', token, {
//             path: '/',
//             httpOnly: true, // Client-side access
//             // secure: isProduction, // Secure cookies if running over HTTPS
//             sameSite: 'Strict' // Adjust based on your requirements
//         });
//         setIsAuthenticated(true);
//     };

//     const logout = () => {
//         removeCookie('token');
//         setIsAuthenticated(false);
//     };

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
