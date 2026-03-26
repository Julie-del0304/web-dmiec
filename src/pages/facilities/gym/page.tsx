import { useState, useEffect } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function GymPage() {
  const [scrolled, setScrolled] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

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
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
      
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
          <div>
            <h1 className="text-5xl font-bold text-white mb-4">Gymnasium</h1>
            <p className="text-xl text-white/90">Modern Fitness & Wellness Center</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">State-of-the-Art Fitness Facility</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            DMI Engineering College provides a well-equipped gymnasium to promote physical fitness and overall wellness among students and faculty. Our modern fitness center features the latest equipment and facilities to support various workout routines and fitness goals.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            The gymnasium is designed to encourage a healthy lifestyle, reduce stress, and improve physical and mental well-being. Regular fitness activities help students maintain energy levels and focus on their academic pursuits.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Gym Facilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'ri-run-line',
                title: 'Cardio Equipment',
                description: 'Treadmills, elliptical trainers, stationary bikes, and rowing machines for cardiovascular fitness.'
              },
              {
                icon: 'ri-weight-line',
                title: 'Strength Training',
                description: 'Free weights, dumbbells, barbells, and weight machines for muscle building and strength development.'
              },
              {
                icon: 'ri-heart-pulse-line',
                title: 'Functional Training',
                description: 'Kettlebells, resistance bands, medicine balls, and functional training equipment.'
              },
              {
                icon: 'ri-user-heart-line',
                title: 'Personal Training',
                description: 'Qualified fitness instructors available to guide proper form and create personalized workout plans.'
              },
              {
                icon: 'ri-time-line',
                title: 'Flexible Timings',
                description: 'Extended operating hours to accommodate different schedules of students and faculty members.'
              },
              {
                icon: 'ri-shield-check-line',
                title: 'Safety & Hygiene',
                description: 'Regular sanitization, proper ventilation, and safety protocols maintained at all times.'
              }
            ].map((facility, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
                  <i className={`${facility.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{facility.title}</h3>
                <p className="text-gray-600 leading-relaxed">{facility.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment Details */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Equipment</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-emerald-600 mb-4">Cardio Zone</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill text-emerald-500 mt-1"></i>
                  <span className="text-gray-700">Motorized Treadmills (8 units)</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill text-emerald-500 mt-1"></i>
                  <span className="text-gray-700">Elliptical Cross Trainers (6 units)</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill text-emerald-500 mt-1"></i>
                  <span className="text-gray-700">Stationary Exercise Bikes (6 units)</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill text-emerald-500 mt-1"></i>
                  <span className="text-gray-700">Rowing Machines (4 units)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-emerald-600 mb-4">Strength Zone</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill text-emerald-500 mt-1"></i>
                  <span className="text-gray-700">Multi-Station Gym Equipment</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill text-emerald-500 mt-1"></i>
                  <span className="text-gray-700">Adjustable Dumbbells (5kg - 50kg)</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill text-emerald-500 mt-1"></i>
                  <span className="text-gray-700">Olympic Barbells & Weight Plates</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill text-emerald-500 mt-1"></i>
                  <span className="text-gray-700">Bench Press & Squat Racks</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Timings & Rules */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-xl border border-emerald-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Operating Hours</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Monday - Friday</span>
                <span className="text-emerald-600 font-bold">6:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Saturday</span>
                <span className="text-emerald-600 font-bold">7:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Sunday</span>
                <span className="text-red-600 font-bold">Closed</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Gym Rules</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <i className="ri-check-line text-emerald-500 text-xl mt-0.5"></i>
                <span className="text-gray-700">Wear appropriate athletic attire and footwear</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-check-line text-emerald-500 text-xl mt-0.5"></i>
                <span className="text-gray-700">Carry a valid college ID card</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-check-line text-emerald-500 text-xl mt-0.5"></i>
                <span className="text-gray-700">Use equipment properly and return after use</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-check-line text-emerald-500 text-xl mt-0.5"></i>
                <span className="text-gray-700">Maintain cleanliness and hygiene</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer enquiryOpen={enquiryOpen} setEnquiryOpen={setEnquiryOpen} />
    </div>
  );
}


