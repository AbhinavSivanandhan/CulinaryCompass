// context/AuthContext.js
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const router = useRouter()
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    useEffect(() => {
        const storedAccessToken = localStorage.getItem('access');
    const storedRefreshToken = localStorage.getItem('refresh');
    setAccessToken(storedAccessToken);
    setRefreshToken(storedRefreshToken);
    },[]);

  const login = async (username, password) => {
    try {
      const response = await fetch('/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
        router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  const register = async(username, first_name, last_name, email, gender, dob, password) => {
    try {
      const response = await fetch('/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, first_name, last_name, email, gender, dob, password }),
        });
        const data = await response.json();
        console.log(data);
        setTimeout( function ( ) { alert( "Registration succesful" ); }, 2000 );
        Router.push('/login');
    }
    catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed. Please try again.');
    }
  }

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
