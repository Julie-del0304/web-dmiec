import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { placementService } from '../../../services/placementService';
import type { PlacementTeamMember } from '../../../types/placement';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function PlacementTeamsPage() {
  const [scrolled, setScrolled] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState<PlacementTeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<string>('All');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const pageKey = 'reloaded-' + window.location.pathname.replace(/\//g, '-');
    if (!sessionStorage.getItem(pageKey)) {
      sessionStorage.setItem(pageKey, 'true');
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      const data = await placementService.getPlacementTeam();
      setTeamMembers(data);
    } catch (error) {
      console.error('Error loading team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const roles = ['All', ...Array.from(new Set(teamMembers.map(m => m.role)))];
  const filteredMembers = selectedRole === 'All' 
    ? teamMembers 
    : teamMembers.filter(m => m.role === selectedRole);

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-teal-600 transition-colors">Home</Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <Link to="/placement/cell" className="text-gray-600 hover:text-teal-600 transition-colors">Placement Cell</Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <span className="text-gray-900 font-medium">Our Team</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 text-white py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Placement Team</h1>
          <p className="text-xl text-teal-50 max-w-3xl mx-auto">
            Meet the dedicated professionals working to shape your career
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Role Filter */}
        {roles.length > 1 && (
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedRole === role
                      ? 'bg-teal-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Team Members Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading team members...</p>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="text-center py-20">
            <i className="ri-team-line text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-600 text-lg">No team members found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-[4/3] bg-gradient-to-br from-teal-100 to-emerald-100 relative overflow-hidden">
                  {member.image_url ? (
                    <img 
                      src={member.image_url} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <i className="ri-user-line text-6xl text-teal-600"></i>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className="bg-teal-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {member.role}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-teal-600 font-medium mb-4">{member.designation}</p>
                  <div className="space-y-2">
                    {member.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <i className="ri-mail-line text-teal-600"></i>
                        <a href={`mailto:${member.email}`} className="hover:text-teal-600 transition-colors">
                          {member.email}
                        </a>
                      </div>
                    )}
                    {member.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <i className="ri-phone-line text-teal-600"></i>
                        <a href={`tel:${member.phone}`} className="hover:text-teal-600 transition-colors">
                          {member.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer enquiryOpen={enquiryOpen} setEnquiryOpen={setEnquiryOpen} />
    </div>
  );
}
