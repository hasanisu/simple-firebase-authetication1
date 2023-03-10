import './App.css';
import {getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import app from './firebase/firebase.init';
import { useState } from 'react';
const auth = getAuth(app)
function App() {
  const [user, setUser] = useState({})
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


  const handleGoogleSingIn=()=>{
    signInWithPopup(auth, googleProvider)
    .then(result =>{
      const user = result.user;
      setUser(user)
      console.log(user)
    })
    .catch(error =>{
      console.error('error', error)
    })
  };

  const handleSignOut =()=>{
    signOut(auth)
    .then(result=>{
      setUser({});
    })
    .catch(()=>{
      setUser({});
    })
  };


  const handleGithubSignIn = ()=>{
    signInWithPopup(auth, githubProvider)
    .then(result =>{
      const user = result.user;
      setUser(user)
      console.log(user)
    })
    .catch(error=>{
      console.error('error:', error)
    })
  }

  return (
    <div className="App">
      {/* condition ? true : false*/}
      { user.uid ? 
        <button onClick={handleSignOut}>Sing Out</button>
        :
        <>
        <button onClick={handleGoogleSingIn}>Google sing In</button>
        <button onClick={handleGithubSignIn}>Github sign in </button>
        </>
      }

      {user.uid && <div>
        <h3>User Name: {user.displayName}</h3>
        <p>Email Address: {user.email}</p>
        <img src={user.photoURL} alt="" />
      </div>}
    </div>
  );
}

export default App;
