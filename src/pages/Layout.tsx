import { useCognito } from '@/context/AuthContext';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { GiBookshelf } from 'react-icons/gi';
import clsx from 'clsx';
import { Auth } from 'aws-amplify';

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
    name: 'Signup',
    path: '/signup',
    private: false,
    authRoute: true,
  },
  {
    name: 'Signin',
    path: '/signin',
    private: false,
    authRoute: true,
  },
];

export default function Layout() {
  const { user, setUser } = useCognito();
  const navigate = useNavigate();

  const onSignOut = async () =>
    Auth.signOut()
      .then(() => {
        setUser(null);
        navigate('/');
      })
      .catch((err) => console.log(err));

  return (
    <div>
      <div className="w-full bg-primary">
        <div className="px-4 md:px-8">
          <div className="mx-auto flex h-10 max-w-xl items-center justify-between md:h-14 md:max-w-[1440px]">
            <NavLink to="/">
              <GiBookshelf className="h-10 w-10 text-white md:h-10 md:w-10" />
            </NavLink>
            <div className="flex items-center gap-5 text-white">
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
                        clsx(isActive && 'font-bold')
                      }
                    >
                      {link.name}
                    </NavLink>
                  );
                }
              })}
              {user && <button onClick={onSignOut}>Logout</button>}
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
