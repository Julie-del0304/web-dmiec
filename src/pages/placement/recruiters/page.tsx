import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { placementService } from '../../../services/placementService';
import type { Recruiter } from '../../../types/placement';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function RecruitersPage() {
  const [scrolled, setScrolled] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

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
    loadRecruiters();
  }, []);

  const loadRecruiters = async () => {
    try {
      const data = await placementService.getRecruiters();
      setRecruiters(data);
    } catch (error) {
      console.error('Error loading recruiters:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(recruiters.map(r => r.category).filter(Boolean)))];
  const filteredRecruiters = selectedCategory === 'All' 
    ? recruiters 
    : recruiters.filter(r => r.category === selectedCategory);

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
            <span className="text-gray-900 font-medium">Our Recruiters</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 text-white py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Recruiters</h1>
          <p className="text-xl text-teal-50 max-w-3xl mx-auto">
            Leading organizations that trust our talent
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-teal-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recruiters Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading recruiters...</p>
          </div>
        ) : filteredRecruiters.length === 0 ? (
          <div className="text-center py-20">
            <i className="ri-building-2-line text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-600 text-lg">No recruiters found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
              {filteredRecruiters.map((recruiter) => (
                <div key={recruiter.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-teal-300 transition-all duration-300 hover:-translate-y-1 group">
                  <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center mb-3 overflow-hidden">
                    <img 
                      src={recruiter.logo_url} 
                      alt={recruiter.company_name}
                      className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 text-center line-clamp-2 min-h-[2.5rem]">
                    {recruiter.company_name}
                  </h3>
                  {recruiter.category && (
                    <p className="text-xs text-teal-600 text-center mt-2 font-medium">
                      {recruiter.category}
                    </p>
                  )}
                  {recruiter.website_url && (
                    <div className="mt-3 text-center">
                      <a 
                        href={recruiter.website_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-gray-500 hover:text-teal-600 transition-colors inline-flex items-center gap-1"
                      >
                        Visit Website
                        <i className="ri-external-link-line"></i>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Statistics */}
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-8 border border-teal-100">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-teal-600 mb-2">{recruiters.length}+</div>
                  <p className="text-gray-700 font-medium">Recruiting Companies</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-emerald-600 mb-2">500+</div>
                  <p className="text-gray-700 font-medium">Students Placed Annually</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-teal-600 mb-2">95%</div>
                  <p className="text-gray-700 font-medium">Placement Success Rate</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer enquiryOpen={enquiryOpen} setEnquiryOpen={setEnquiryOpen} />
    </div>
  );
}
