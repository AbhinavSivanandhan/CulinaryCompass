// context/AuthContext.js
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedAccessToken = localStorage.getItem('access') ? localStorage.getItem('access') : null;
    const storedRefreshToken = localStorage.getItem('refresh') ? localStorage.getItem('refresh') : null;
    setAccessToken(storedAccessToken);
    setRefreshToken(storedRefreshToken);
    console.log('Access token:', storedAccessToken);
  }, []);

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
      console.log(response.status);
      if (response.status === 400 || response.status === 401 || response.status === 403) {

        // alert("Login Error: "+data);
        return data;
      }
      else if (response.status === 200) {
        setAccessToken(data.access);
        setRefreshToken(data.refresh);
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    router.push('/');
  };

  const register = async (username, first_name, last_name, email, gender, dob, password) => {
    try {
      const response = await fetch('/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, first_name, last_name, email, gender, dob, password }),
      });
      const data = await response.json();
      if (response.ok && response.status === 200) {
        console.log("Registration Successful");
        router.push('/login');
      }
      else {
        console.log("Registration Failed");
        alert(data.message + "\n" + JSON.stringify(data.data));
      }
    }
    catch (error) {
      console.log(error);
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  }

  const getUser = async () => {
    try {
      const response = await fetch('/api/getUser/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
      }
    }
    catch (error) {
      console.error('User data error:', error);
    }
  }


  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout, register,getUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};
