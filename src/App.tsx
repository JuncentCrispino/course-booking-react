import { createBrowserRouter } from 'react-router-dom';
import Signin from './pages/Singin';
import Singup from './pages/Singup';
import Layout from './pages/Layout';
import ProtectedRoute from './pages/ProtectedRoute';
import UserDetails from './pages/UserDetails';
import Home from './pages/Home';
import ConfirmSignup from './pages/ConfirmSignup';
import Courses from './pages/Courses';
import EnrolledCourses from './pages/EnrolledCourses';
import AuthRoute from './pages/AuthRoute';
import Course from './pages/Course';

const app = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <Home />,
        index: true,
      },

      {
        path: '/courses',
        element: <Courses />,
      },
      {
        path: '/courses/:instructor/:course_id',
        element: <Course />,
      },
      {
        path: '/',
        element: <ProtectedRoute />,
        children: [
          {
            path: '/user',
            element: <UserDetails />,
          },
          {
            path: '/enrolled-courses',
            element: <EnrolledCourses />,
          },
        ],
      },
      {
        path: '/',
        element: <AuthRoute />,
        children: [
          {
            path: '/signin',
            element: <Signin />,
          },
          {
            path: '/signup',
            element: <Singup />,
          },
          {
            path: '/signup/confirm',
            element: <ConfirmSignup />,
          },
        ],
      },
    ],
  },
]);

export default app;
