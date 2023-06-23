import { useCognito } from '@/context/AuthContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute() {
  const { user } = useCognito();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/signin"
        state={{ message: 'You must login first', from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}
