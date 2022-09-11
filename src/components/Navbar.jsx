import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import userStore from '../store/userStore'
import { logout } from '../services/auth';
import { toast } from 'react-toastify';
import { IconAlignRight } from '@tabler/icons';
import { Transition } from "@headlessui/react";
import { Squash as Hamburger } from 'hamburger-react';
import Logo from '../assets/book-svgrepo-com.svg'

export default function Navbar() {
  const user = userStore(state => state.user);
  const setUser = userStore(state => state.setUser);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false)

  async function onLogout() {
    try {
      const logoutRes = await logout();
      console.log(logoutRes)
      if (logoutRes) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/');
        setUser(null);
        setIsOpen(false)
        return toast.success('Logout Successfully');
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const navLinks = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/about',
      name: 'About',
    },
    {
      path: '/courses',
      name: 'Courses',
    }
  ]

  const onClick = () => {
    return setIsOpen(!isOpen)
  }


  // <header className='absolute inset-x-0 max-w-full bg-primary shadow-shadow-1'>
  //   <div className='flex justify-between max-w-screen-lg m-auto py-3'>
  //     <nav className='ml-3'>
  //       <Link to='/' className='font-bold text-2xl text-hb'>
  //         UpBook
  //       </Link>
  //     </nav>
  //     <nav className='font-bold text-lg text-hb hidden md:flex'>
  //       <Link to='/' className='mr-4'>
  //         Home
  //       </Link>

  //       <Link to='/about' className='mr-4'>
  //         About
  //       </Link>
  //       <Link to='/courses' className='mr-4'>
  //         Courses
  //       </Link>
  //       {user ? (
  //         <>
  //           <Link to='/profile' className='mr-4'>
  //             Profile
  //           </Link>
  //           <button className='mr-4' onClick={onClick}>
  //             Logout
  //           </button>
  //         </>
  //       ) : (
  //         <>
  //           <Link to='/register' className='mr-4'>
  //             Register
  //           </Link>
  //           <Link to='/login' className='mr-4'>
  //             Login
  //           </Link>
  //         </>
  //       )}
  //     </nav>

  //   </div>

  // </header>
  return (
    <div className='relative z-50'>
      <nav className="bg-hb fixed inset-x-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 cursor-pointer">
                <img
                  className="h-8 w-8"
                  src={Logo}
                  alt="Workflow"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navLinks.map(item => {
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                  {user ? (
                    <>
                      <Link
                        to='/profile'
                        className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={onLogout}
                        className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to='/register'
                        className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Register
                      </Link>
                      <Link
                        to='/login'
                        className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Login
                      </Link>
                    </>
                  )

                  }
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <Hamburger toggled={isOpen} size={25} onToggle={() => setIsOpen(!isOpen)} color='white'>open</Hamburger>
            </div>
          </div>
        </div>
        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {() => (
            <div className="md:hidden" id="mobile-menu">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map(item => {
                  return (
                    <Link
                      key={item.name}
                      onClick={onClick}
                      to={item.path}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      {item.name}
                    </Link>
                  )
                })

                }
                {user ? (
                  <>
                    <Link
                      onClick={onClick}
                      to="/profile"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={onLogout}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      onClick={onClick}
                      to="/register"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Register
                    </Link>
                    <Link
                      onClick={onClick}
                      to="/login"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </Transition>
      </nav >
    </div >
  );


}
