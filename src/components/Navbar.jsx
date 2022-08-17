import React from 'react'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import userStore from '../store/userStore'
import { logout } from '../services/auth';
import { toast } from 'react-toastify';

export default function Navbar() {
  const user = userStore(state => state.user);
  const setUser = userStore(state => state.setUser);
  const navigate = useNavigate();

  async function onClick() {
    try {
      const logoutRes = await logout();
      if (logoutRes) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/');
        setUser(null);
        return toast.success('Logout Successfully');
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header className='absolute inset-x-0 max-w-full bg-primary shadow-shadow-1'>
      <div className='lg:flex justify-between max-w-screen-lg m-auto py-3'>
        <nav>
          <Link to='/' className='font-bold text-2xl text-hb'>
            CourseB
          </Link>
        </nav>
        <nav className='font-bold text-lg text-hb xs:hidden'>
          <Link to='/' className='mr-4'>
            Home
          </Link>

          <Link to='/about' className='mr-4'>
            About
          </Link>
          <Link to='/courses' className='mr-4'>
            Courses
          </Link>
          {user ? (
            <>
              <Link to='/profile' className='mr-4'>
                Profile
              </Link>
              <button className='mr-4' onClick={onClick}>
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
