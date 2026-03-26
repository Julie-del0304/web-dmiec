import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = sessionStorage.getItem('adminAuth') === 'true';
      const email = sessionStorage.getItem('adminEmail');
      setIsAuthenticated(authStatus);
      setUsername(email);
      setLoading(false);
    };

    checkAuth();

    // Remove the aggressive interval check that was causing redirects
    // Only check on mount and when storage changes
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const logout = () => {
    sessionStorage.removeItem('adminAuth');
    sessionStorage.removeItem('adminEmail');
    setIsAuthenticated(false);
    setUsername(null);
    navigate('/admin/login');
  };

  return {
    isAuthenticated,
    user: username ? { email: username } : null,
    username,
    loading,
    logout
  };
}
