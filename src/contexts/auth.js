import { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConnection';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  // const [loading, setLoading] = useState(true);

  return (
    <AuthContext.Provider value={{ signed: !!user, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;