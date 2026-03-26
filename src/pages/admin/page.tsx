import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { logout, username } = useAuth();

  // Fix: use sessionStorage with correct key
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('adminAuth') === 'true';
    if (!isAuthenticated) {
      navigate('/admin/login', { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const adminCards = [
    {
      title: 'Event Gallery Management',
      description: 'Manage event folders, upload photos, and organize gallery content',
      icon: 'ri-gallery-line',
      path: '/admin/events',
      color: 'from-blue-500 to-blue-600',
      stats: 'Folders & Photos',
    },
    {
      title: 'Faculty Management',
      description: 'Add, edit, and manage faculty profiles across all departments',
      icon: 'ri-user-star-line',
      path: '/admin/faculty',
      color: 'from-teal-500 to-teal-600',
      stats: 'Faculty Directory',
    },
    {
      title: 'Facilities Management',
      description: 'Upload photos and manage content for all campus facilities',
      icon: 'ri-building-line',
      path: '/admin/facilities',
      color: 'from-emerald-500 to-emerald-600',
      stats: 'Campus Facilities',
    },
    {
      title: 'Laboratory Management',
      description: 'Manage laboratories, equipment details, and lab photos by department',
      icon: 'ri-flask-line',
      path: '/admin/laboratories',
      color: 'from-cyan-500 to-cyan-600',
      stats: 'Labs & Equipment',
    },
    {
      title: 'Clubs Management',
      description: 'Manage student clubs, activities, coordinators, and club photo galleries',
      icon: 'ri-team-line',
      path: '/admin/clubs',
      color: 'from-indigo-500 to-indigo-600',
      stats: 'Student Clubs',
    },
    {
      title: 'Campus News Management',
      description: 'Create, edit, and manage campus news and updates with images',
      icon: 'ri-newspaper-line',
      path: '/admin/news',
      color: 'from-purple-500 to-purple-600',
      stats: 'News & Updates',
    },
     {
      title: 'News & Events Management',
      description: 'Create, edit, and manage  news and events with images',
      icon: 'ri-newspaper-line',
      path: '/admin/news-events',
      color: 'from-purple-500 to-purple-600',
      stats: 'News & Events',
    },
    {
      title: 'Announcements Management',
      description: 'Manage campus announcements displayed on the homepage banner',
      icon: 'ri-megaphone-line',
      path: '/admin/announcements',
      color: 'from-amber-500 to-amber-600',
      stats: 'Announcements',
    },
    {
      title: 'Placement Records',
      description: 'Manage year-wise placement statistics, packages, and company data',
      icon: 'ri-bar-chart-box-line',
      path: '/admin/placement-records',
      color: 'from-green-500 to-green-600',
      stats: 'Placement Stats',
    },
    {
      title: 'Placement Team',
      description: 'Manage placement cell team members, coordinators, and their profiles',
      icon: 'ri-user-settings-line',
      path: '/admin/placement-team',
      color: 'from-orange-500 to-orange-600',
      stats: 'Team Members',
    },
    {
      title: 'Recruiters Management',
      description: 'Add and manage recruiting companies with logos and categories',
      icon: 'ri-building-2-line',
      path: '/admin/recruiters',
      color: 'from-pink-500 to-pink-600',
      stats: 'Company Logos',
    },
    {
      title: 'Gallery Management',
      description: 'Upload images and videos, organize by category for gallery pages',
      icon: 'ri-image-2-line',
      path: '/admin/gallery',
      color: 'from-rose-500 to-rose-600',
      stats: 'Images & Videos',
    },
    {
      title: 'Alumni Management',
      description: 'Manage alumni profiles, distinguished alumni, and alumni meet events',
      icon: 'ri-graduation-cap-line',
      path: '/admin/alumni',
      color: 'from-violet-500 to-violet-600',
      stats: 'Alumni Network',
    },
    {
      title: 'Contact Info Management',
      description: 'Update college address, phone numbers, emails, and social media links',
      icon: 'ri-contacts-line',
      path: '/admin/contact',
      color: 'from-sky-500 to-sky-600',
      stats: 'Contact Details',
    },
    {
      title: 'Sports Facility',
      description: 'Manage sports facility content, achievements, and photo gallery',
      icon: 'ri-football-line',
      path: '/admin/sports',
      color: 'from-lime-500 to-lime-600',
      stats: 'Sports Content',
    },
    {
      title: 'Page Content',
      description: 'Manage dynamic content for all pages',
      icon: 'ri-file-list-3-line',
      path: '/admin/page-content',
      color: 'from-indigo-500 to-purple-600',
      stats: 'Page Content',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-xl">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="https://static.readdy.ai/image/aed2a83e7960c786dd7bda1b18d3e021/03378c8fff0e87b1630499bbdd646dab.jpeg"
                alt="DMI Engineering College Logo"
                className="h-16 w-16 object-contain bg-white rounded-lg p-1"
              />
              <div>
                <h1 className="text-4xl font-bold">Admin Control</h1>
                <p className="text-white/80 text-sm">Welcome back, {username}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <i className="ri-home-line"></i>
                Home
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-500/90 hover:bg-red-600 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <i className="ri-logout-box-line"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Dashboard Overview</h2>
          <p className="text-gray-600 text-lg">Manage your college website content from one central location</p>
        </div>

        {/* Admin Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adminCards.map((card) => (
            <div
              key={card.path}
              onClick={() => navigate(card.path)}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border-2 border-transparent hover:border-blue-200"
            >
              {/* Card Header with Gradient */}
              <div className={`bg-gradient-to-r ${card.color} p-6 text-white`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <i className={`${card.icon} text-4xl`}></i>
                  </div>
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium whitespace-nowrap">
                    {card.stats}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-gray-600 mb-6 leading-relaxed text-sm">{card.description}</p>
                <div className="flex items-center text-blue-900 font-semibold group-hover:gap-3 gap-2 transition-all whitespace-nowrap">
                  <span>Open Dashboard</span>
                  <i className="ri-arrow-right-line text-xl group-hover:translate-x-1 transition-transform"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Access</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center">
                <i className="ri-image-line text-2xl text-white"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Event Gallery</p>
                <p className="text-xl font-bold text-gray-900">Manage Photos</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-teal-50 rounded-xl">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
                <i className="ri-team-line text-2xl text-white"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Faculty Profiles</p>
                <p className="text-xl font-bold text-gray-900">Add Members</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <i className="ri-briefcase-line text-2xl text-white"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Placement Data</p>
                <p className="text-xl font-bold text-gray-900">Update Records</p>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl shadow-lg p-8 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
              <i className="ri-information-line text-2xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Need Help?</h3>
              <p className="text-white/80 leading-relaxed">
                Use the admin panels to manage your website content. Event Gallery lets you organize photos by folders, 
                Faculty Management helps maintain profiles, and Placement modules let you track records, team members, and recruiters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}