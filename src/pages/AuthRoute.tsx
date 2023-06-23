import { useCognito } from '@/context/AuthContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function AuthRoute() {
  const { user } = useCognito();
  const location = useLocation();
  if (user) {
    return (
      <Navigate
        to="/"
        state={{ message: 'User is logged-in', from: location.pathname }}
      />
    );
  }
  return <Outlet />;
}
