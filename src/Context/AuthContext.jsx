import React, { createContext, useState } from 'react';

export const authContext = createContext();

export default function AuthContext({ children }) { 

  const [token, settoken] = useState(localStorage.getItem('tkn'));

  return <authContext.Provider value={{ token, settoken }}>
      {children}
    </authContext.Provider>
  
}
