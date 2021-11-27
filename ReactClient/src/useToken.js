import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const getRole = () => {
    const roleString = localStorage.getItem('role');
    return roleString;
  };

  const [role, setRole] = useState(getRole());  

  const saveRole =userRole => {
    localStorage.setItem('role',userRole);
    setRole(userRole);
  };

  return {  
    setToken: saveToken,
    setRole: saveRole,
    token,
    role
  }
}