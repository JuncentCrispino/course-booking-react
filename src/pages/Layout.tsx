import { Suspense, useState } from 'react';
import { useCognito } from '@/context/AuthContext';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { GiBookshelf } from 'react-icons/gi';
import clsx from 'clsx';
import { Auth } from 'aws-amplify';
import { Squash as Hamburger } from 'hamburger-react';
import { Transition } from '@headlessui/react';
import { CircleLoader } from '@/components/CircleLoader';

const navLinks = [
  {
    name: 'Home',
    path: '/',
    private: false,
    authRoute: false,
  },
  {
    name: 'Courses',
    path: '/courses',
    private: false,
    authRoute: false,
  },
  {
    name: 'Enrolled Courses',
    path: '/enrolled-courses',
    private: true,
    authRoute: false,
  },
  {
    name: 'Sign Up',
    path: '/signup',
    private: false,
    authRoute: true,
  },
  {
    name: 'Sign In',
    path: '/signin',
    private: false,
    authRoute: true,
  },
];

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useCognito();
  const navigate = useNavigate();

  const onSignOut = async () =>
    Auth.signOut()
      .then(() => {
        setUser(null);
        setIsOpen(false);
        navigate('/');
      })
      .catch((err) => console.log(err));

  const onClick = () => {
    return setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="relative z-50">
        <nav className="fixed inset-x-0 bg-primary">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 cursor-pointer">
                  <NavLink to="/">
                    <GiBookshelf className="h-10 w-10 text-white md:h-10 md:w-10" />
                  </NavLink>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navLinks.map((link) => {
                      if (link.private === true && !user) {
                        return null;
                      } else if (user && link.authRoute === true) {
                        return null;
                      } else {
                        return (
                          <NavLink
                            to={link.path}
                            key={link.path}
                            className={({ isActive }) =>
                              clsx(
                                isActive && 'bg-secondary font-bold',
                                'rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-secondary',
                              )
                            }
                          >
                            {link.name}
                          </NavLink>
                        );
                      }
                    })}
                    {user && (
                      <button
                        onClick={onSignOut}
                        className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-secondary"
                      >
                        Logout
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex md:hidden">
                <Hamburger
                  toggled={isOpen}
                  size={25}
                  onToggle={() => setIsOpen(!isOpen)}
                  color="white"
                />
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
              <div className="md:hidden">
                <div className="space-y-5 px-2 pb-3 pt-2 sm:px-3">
                  {navLinks.map((link) => {
                    if (link.private === true && !user) {
                      return null;
                    } else if (user && link.authRoute === true) {
                      return null;
                    } else {
                      return (
                        <NavLink
                          to={link.path}
                          key={link.path}
                          onClick={onClick}
                          className={({ isActive }) =>
                            clsx(
                              isActive && 'bg-secondary font-bold',
                              'block rounded-md px-3 py-2 text-base font-medium text-white',
                            )
                          }
                        >
                          {link.name}
                        </NavLink>
                      );
                    }
                  })}
                  {user && (
                    <button
                      onClick={onSignOut}
                      className="block rounded-md px-3 py-2 text-base font-medium text-white"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            )}
          </Transition>
        </nav>
      </div>
      <Suspense fallback={<CircleLoader />}>
        <Outlet />
      </Suspense>
    </>
  );
}
