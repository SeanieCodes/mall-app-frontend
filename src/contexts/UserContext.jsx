import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        const tokenExpiration = JSON.parse(atob(token.split('.')[1])).exp;
        const isTokenExpired = Date.now() >= tokenExpiration * 1000;
        
        if (isTokenExpired) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          setUser(null);
        } else {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error parsing user data or checking token:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
      }
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};