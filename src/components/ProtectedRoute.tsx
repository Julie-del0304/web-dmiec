
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('adminAuth') === 'true';
    if (!isAuthenticated) {
      navigate('/admin/login', { replace: true });
    } else {
      setIsAuthorized(true);
      setIsChecking(false);
    }
  }, [navigate]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) return null;

  return <Outlet />;
}
