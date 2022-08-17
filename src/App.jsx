import './App.css'
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import userStore from './store/userStore';
import loginStore from './store/loginStore';
import courseStore from './store/courseStore';
import access from './utils/isLoggedIn';
import Navbar from './components/Navbar';
import ProtectedRoutes from './routes/ProtectedRoutes';
import { getCourses } from './services/course';
import Loader from './components/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  // local states
  const [isLoading, setIsLoading] = useState(true);

  // global states
  const user = userStore(state => state.user);
  const setUser = userStore(state => state.setUser);
  const setCourses = courseStore(set => set.setCourses);
  const sortBy = courseStore(state => state.sortBy);
  const limit = courseStore(state => state.limit);
  const page = courseStore(state => state.page);
  const setTotalResults = courseStore(set => set.setTotalResults);
  const setTotalPages = courseStore(set => set.setTotalPages);

  //views
  const Home = lazy(() => import('./views/Home'));
  const Login = lazy(() => import('./views/Login'));
  const Register = lazy(() => import('./views/Register'));
  const Profile = lazy(() => import('./views/Profile'));
  const Courses = lazy(() => import('./views/Courses'));
  const CourseDetails = lazy(() => import('./views/CourseDetails'));
  const About = lazy(() => import('./views/About'));

  // effects
  useEffect(() => {
    (async () => {
      try {
        const [coursesData, userData] = await Promise.all([getCourses(sortBy, limit, page), access()])
        if (coursesData.totalResults > 0) {
          setCourses(coursesData.results)
          setTotalResults(coursesData.totalResults)
          setTotalPages(coursesData.totalPages)
        }
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page]);

  if (isLoading) {
    return <Loader/>
  }

  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/course/:courseId' element={<CourseDetails />} />
          <Route element={<ProtectedRoutes user={user} />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
