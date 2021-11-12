import { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConnection';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    function loadStorage() {
      const storageUser = localStorage.getItem('SistemaUsuario')

      if(storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
      setLoading(false);
    }
    
    loadStorage();
  }, [])

  async function signIn(email, password){
    setLoadingAuth(true);

    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then( async (value) => {
      let uid = value.user.uid;

      const userProfile = await firebase.firestore().collection('users')
      .doc(uid).get();

      let data = {
        uid: uid,
        nome: userProfile.data().nome,
        avatarUrl: userProfile.data().avatarUrl,
        email: value.user.email
      };

      setUser(data);
      storageUser(data);
      setLoadingAuth(false);

    })
    .catch((error) => {
      console.log(error);
      setLoadingAuth(false);
    })
  }

  async function signUp(email, password, nome) {
    setLoadingAuth(true);
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( async (value) => {
      let uid = value.user.uid;

      await firebase.firestore().collection('users')
      .doc(uid).set({
        nome: nome,
        avatarUrl: null,
      })
      .then( () => {

        let data = {
          uid: uid,
          nome: nome,
          email: value.user.email,
          avatarUrl: null
        };

        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
      })
    })
      .catch((error) => {
        console.log(error);
        setLoadingAuth(false);

    })
  }

  function storageUser(data) {
    localStorage.setItem('SistemaUsuario', JSON.stringify(data));
  }

  async function signOut() {
    await firebase.auth().signOut();
    localStorage.removeItem('SistemaUsuario')
    setUser(null);
  }

  return(
    <AuthContext.Provider 
      value={{ 
        signed: !!user, 
        user, 
        loading, 
        signUp,
        signOut,
        signIn,
        loadingAuth,
        setUser,
        storageUser 
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;