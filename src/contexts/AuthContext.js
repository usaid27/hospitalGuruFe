import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null); // State to store user information

    const login = (userInfo) => {
        setIsAuthenticated(true);
        setUser(userInfo); // Store user information
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null); // Clear user information
    };

    const value = {
        isAuthenticated,
        user, // Provide user information
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
