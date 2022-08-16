import './App.css'
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import userStore from './store/userStore';
import loginStore from './store/loginStore';
import access from './utils/isLoggedIn';
import Navbar from './components/Navbar';
import ProtectedRoutes from './routes/ProtectedRoutes';

function App() {
  // local states
  const [isLoading, setIsLoading] = useState(true);

  // global states
  const user = userStore(state => state.user);
  const setUser = userStore(state => state.setUser);

  //views
  const Home = lazy(() => import('./views/Home'));
  const Login = lazy(() => import('./views/Login'));
  const Register = lazy(() => import('./views/Register'));
  const Profile = lazy(() => import('./views/Profile'));
  const Courses = lazy(() => import('./views/Courses'));
  const About = lazy(() => import('./views/About'));

  // effects
  useEffect(() => {
    (async () => {
      const user = await access();
      console.log(user)
      if (user) {
        setUser(user);
      }
      const validAccessToken = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      console.log(validAccessToken)
      // console.log('response', await validAccessToken.json())
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar/>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route element={<ProtectedRoutes user={user} />}>
            <Route path='/profile' element={<Profile/>} />
            <Route path='/courses' element={<Courses/>} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
