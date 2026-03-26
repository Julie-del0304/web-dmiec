import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSubmitSuccess(false);

    // Validate fields
    if (!email || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    // Check credentials
    if (email !== 'abinsam0607@gmail.com' || password !== 'DMIEC@DMI7') {
      setError('Invalid email or password');
      setLoading(false);
      return;
    }

    try {
      // Store authentication in sessionStorage
      sessionStorage.setItem('adminAuth', 'true');
      sessionStorage.setItem('adminEmail', email);

      // Submit form data
      const formData = new URLSearchParams();
      formData.append('email', email);
      formData.append('password', password);

      await fetch('https://readdy.ai/api/form/d65ahmk5l058qvghfuvg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
    } catch (err) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
            <i className="ri-shield-user-line text-5xl text-white"></i>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Admin Control</h1>
          <p className="text-white/80">Sign in to access the admin dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form id="admin-login-form" data-readdy-form onSubmit={handleSubmit} className="space-y-6">
            {/* Success Message */}
            {submitSuccess && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <i className="ri-checkbox-circle-line text-2xl text-green-600"></i>
                <span className="text-green-800 font-medium">Login successful! Redirecting...</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <i className="ri-error-warning-line text-2xl text-red-600"></i>
                <span className="text-red-800 font-medium">{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="ri-mail-line text-gray-400 text-xl"></i>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="ri-lock-line text-gray-400 text-xl"></i>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {loading ? (
                <>
                  <i className="ri-loader-4-line animate-spin text-xl"></i>
                  Signing in...
                </>
              ) : (
                <>
                  <i className="ri-login-box-line text-xl"></i>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Back to Home */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => navigate('/')}
              className="w-full py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <i className="ri-arrow-left-line"></i>
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
