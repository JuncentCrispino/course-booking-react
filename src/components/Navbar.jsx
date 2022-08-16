import React from 'react'
import { Link } from 'react-router-dom'
import userStore from '../store/userStore'

export default function Navbar() {
  const user = userStore(state => state.user);
  const setUser = userStore(state => state.setUser);

  function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  }

  return (
    <header className='absolute inset-x-0 max-w-full bg-primary shadow-shadow-1'>
      <div className='flex justify-between max-w-screen-lg m-auto py-3'>
        <nav>
          <Link to='/' className='font-bold text-2xl text-hb'>
            CourseB
          </Link>
        </nav>
        <nav className='font-bold text-lg text-hb'>
          <Link to='/' className='mr-4'>
            Home
          </Link>

          <Link to='/about' className='mr-4'>
            About
          </Link>
          {user ? (
            <>
              <Link to='/courses' className='mr-4'>
                Courses
              </Link>
              <Link to='/profile' className='mr-4'>
                Profile
              </Link>
              <button className='mr-4' onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to='/register' className='mr-4'>
                Register
              </Link>
              <Link to='/login' className='mr-4'>
                Login
              </Link>
            </>
          )}
        </nav>
      </div>

    </header>
  )
}
