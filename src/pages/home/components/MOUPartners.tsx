import { useEffect, useRef, useState } from 'react';

export default function MOUPartners() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDept, setSelectedDept] = useState<string>('CSE');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const current = sectionRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  const mouData = [
    // ECE Department
    {
      dept: 'ECE',
      organization: 'KELTRON',
      location: 'Thiruvannanthapuram - 695033',
      date: '10-01-2024',
      validity: '2 years',
      logo: 'https://readdy.ai/api/search-image?query=KELTRON%20Kerala%20State%20Electronics%20Development%20Corporation%20official%20company%20logo%20on%20clean%20white%20background%20high%20resolution%20corporate%20branding%20professional%20electronics%20manufacturing%20emblem&width=200&height=100&seq=keltron2024&orientation=landscape',
    },
    {
      dept: 'ECE',
      organization: 'DEWDAS TECHNOLOGY PVT LTD',
      location: 'Electronic City, Bangalore-560100',
      date: '08-11-2018',
      validity: '3 years',
      logo: 'https://readdy.ai/api/search-image?query=Modern%20technology%20startup%20company%20logo%20minimalist%20design%20on%20white%20background%20high%20resolution%20corporate%20brand%20identity%20clean%20professional%20software%20development%20firm%20emblem&width=200&height=100&seq=dewdas2024&orientation=landscape',
    },
    {
      dept: 'ECE',
      organization: 'MATT Engineering Equipments',
      location: 'K.K.Dist-629003',
      date: '11-09-2023',
      validity: '3 Years',
      logo: 'https://readdy.ai/api/search-image?query=Engineering%20equipment%20manufacturing%20company%20logo%20professional%20industrial%20design%20on%20white%20background%20high%20resolution%20corporate%20branding%20technical%20instruments%20emblem&width=200&height=100&seq=matt2024&orientation=landscape',
    },
    {
      dept: 'ECE',
      organization: 'JCLICK SOLUTION',
      location: 'Kanyakumari dist.',
      date: '11-09-2022',
      validity: '3 years',
      logo: 'https://readdy.ai/api/search-image?query=Digital%20solutions%20technology%20company%20logo%20modern%20minimalist%20design%20on%20white%20background%20high%20resolution%20corporate%20brand%20identity%20professional%20IT%20services%20emblem&width=200&height=100&seq=jclick2024&orientation=landscape',
    },

    // EEE Department
    {
      dept: 'EEE',
      organization: 'State Institute of Rural Development & Panchayat Raj',
      location: 'Maraimalainagar, Chengalpattu',
      date: '05-04-2024',
      validity: '2 years',
      logo: 'https://readdy.ai/api/search-image?query=Tamil%20Nadu%20government%20institute%20official%20logo%20emblem%20on%20white%20background%20high%20resolution%20state%20government%20branding%20rural%20development%20panchayat%20raj%20symbol&width=200&height=100&seq=sird2024&orientation=landscape',
    },
    {
      dept: 'EEE',
      organization: 'Sai Ram Educational and Social Welfare Trust',
      location: 'Virudhunagar',
      date: '20-03-2024',
      validity: '3 years',
      logo: 'https://readdy.ai/api/search-image?query=Educational%20trust%20foundation%20logo%20professional%20design%20on%20white%20background%20high%20resolution%20institutional%20branding%20social%20welfare%20organization%20emblem&width=200&height=100&seq=sairam2024&orientation=landscape',
    },
    {
      dept: 'EEE',
      organization: 'BHAIRAVI GREEN ENERGY PVT.LTD',
      location: 'Tirunelveli-627105',
      date: '22-09-2023',
      validity: '3 Years',
      logo: 'https://readdy.ai/api/search-image?query=Green%20energy%20renewable%20power%20company%20logo%20eco-friendly%20design%20on%20white%20background%20high%20resolution%20corporate%20branding%20sustainable%20energy%20emblem&width=200&height=100&seq=bhairavi2024&orientation=landscape',
    },
    {
      dept: 'EEE',
      organization: 'AB TECHNOLOGIES',
      location: 'Chennai',
      date: '07-10-2024',
      validity: '3 years',
      logo: 'https://readdy.ai/api/search-image?query=Technology%20solutions%20company%20logo%20modern%20professional%20design%20on%20white%20background%20high%20resolution%20corporate%20brand%20identity%20tech%20firm%20emblem&width=200&height=100&seq=abtech2024&orientation=landscape',
    },
    {
      dept: 'EEE',
      organization: 'VINTECH Systems',
      location: 'Nagercoil',
      date: '17-10-2024',
      validity: '3 Years',
      logo: 'https://readdy.ai/api/search-image?query=Systems%20technology%20company%20logo%20professional%20minimalist%20design%20on%20white%20background%20high%20resolution%20corporate%20branding%20technical%20solutions%20emblem&width=200&height=100&seq=vintech2024&orientation=landscape',
    },
    {
      dept: 'EEE',
      organization: 'SURABI WIND FARMS TECHNOLOGIES PVT LTD',
      location: 'Nagercoil-629302',
      date: '06-11-2019',
      validity: '3 Years',
      logo: 'https://readdy.ai/api/search-image?query=Wind%20energy%20farm%20technology%20company%20logo%20renewable%20power%20design%20on%20white%20background%20high%20resolution%20corporate%20branding%20wind%20turbine%20emblem&width=200&height=100&seq=surabi2024&orientation=landscape',
    },

    // IT Department
    {
      dept: 'IT',
      organization: 'Capestart Software Pvt Ltd',
      location: 'Nagercoil',
      date: '05-04-2024',
      validity: '2 years',
      logo: 'https://readdy.ai/api/search-image?query=Software%20development%20company%20logo%20modern%20tech%20design%20on%20white%20background%20high%20resolution%20corporate%20brand%20identity%20professional%20IT%20services%20emblem&width=200&height=100&seq=capestart2024&orientation=landscape',
    },
    {
      dept: 'IT',
      organization: 'AK INFOPARK PVT LTD',
      location: 'Nagercoil-629003',
      date: '20-03-2024',
      validity: '3 years',
      logo: 'https://readdy.ai/api/search-image?query=IT%20park%20technology%20hub%20company%20logo%20professional%20design%20on%20white%20background%20high%20resolution%20corporate%20branding%20information%20technology%20emblem&width=200&height=100&seq=akinfopark2024&orientation=landscape',
    },
    {
      dept: 'IT',
      organization: 'INFOSYS LIMITED',
      location: 'Electronic City, Bangalore-560100',
      date: '22-09-2023',
      validity: '3 Years',
      logo: 'https://readdy.ai/api/search-image?query=Infosys%20official%20company%20logo%20blue%20corporate%20branding%20on%20white%20background%20high%20resolution%20multinational%20IT%20services%20consulting%20emblem&width=200&height=100&seq=infosys2024&orientation=landscape',
    },
    {
      dept: 'IT',
      organization: 'Technopark',
      location: 'Thiruvananthapuram',
      date: '07-10-2024',
      validity: '3 years',
      logo: 'https://readdy.ai/api/search-image?query=Technopark%20Kerala%20official%20logo%20technology%20park%20emblem%20on%20white%20background%20high%20resolution%20IT%20hub%20branding%20professional%20design&width=200&height=100&seq=technopark2024&orientation=landscape',
    },
    {
      dept: 'IT',
      organization: 'ICT Academy',
      location: 'Tamil Nadu',
      date: '17-10-2024',
      validity: '3 Years',
      logo: 'https://readdy.ai/api/search-image?query=ICT%20Academy%20official%20logo%20information%20communication%20technology%20education%20on%20white%20background%20high%20resolution%20institutional%20branding%20professional%20emblem&width=200&height=100&seq=ictacademy2024&orientation=landscape',
    },

    // Mechanical Department
    {
      dept: 'Mech',
      organization: 'Entudio (Pvt) Ltd',
      location: 'Tirunelveli',
      date: '10-01-2024',
      validity: '2 years',
      logo: 'https://readdy.ai/api/search-image?query=Engineering%20design%20studio%20company%20logo%20professional%20minimalist%20on%20white%20background%20high%20resolution%20corporate%20branding%20technical%20services%20emblem&width=200&height=100&seq=entudio2024&orientation=landscape',
    },
    {
      dept: 'Mech',
      organization: 'Garuda Aerospace',
      location: 'Chennai',
      date: '23-06-2024',
      validity: '3 years',
      logo: 'https://readdy.ai/api/search-image?query=Garuda%20Aerospace%20drone%20technology%20company%20logo%20aviation%20design%20on%20white%20background%20high%20resolution%20corporate%20branding%20UAV%20manufacturer%20emblem&width=200&height=100&seq=garuda2024&orientation=landscape',
    },
    {
      dept: 'Mech',
      organization: 'G NETS',
      location: 'Nagercoil-629002',
      date: '11-09-2023',
      validity: '3 Years',
      logo: 'https://readdy.ai/api/search-image?query=Engineering%20networks%20company%20logo%20professional%20technical%20design%20on%20white%20background%20high%20resolution%20corporate%20branding%20industrial%20solutions%20emblem&width=200&height=100&seq=gnets2024&orientation=landscape',
    },
    {
      dept: 'Mech',
      organization: 'SAINATH POWER PVT LTD',
      location: 'Aralvaimozhi',
      date: '21-01-2023',
      validity: '3 years',
      logo: 'https://readdy.ai/api/search-image?query=Power%20generation%20company%20logo%20energy%20sector%20design%20on%20white%20background%20high%20resolution%20corporate%20branding%20electrical%20power%20emblem&width=200&height=100&seq=sainath2024&orientation=landscape',
    },
    {
      dept: 'Mech',
      organization: 'CAD DESK',
      location: 'Nagercoil',
      date: '17-10-2024',
      validity: '3 Years',
      logo: 'https://readdy.ai/api/search-image?query=CAD%20design%20training%20center%20logo%20computer%20aided%20design%20on%20white%20background%20high%20resolution%20educational%20branding%20professional%20emblem&width=200&height=100&seq=caddesk2024&orientation=landscape',
    },
    {
      dept: 'Mech',
      organization: 'FORD INDIA PVT LTD',
      location: 'Chennai',
      date: '11-08-2018',
      validity: '5 Years',
      logo: 'https://readdy.ai/api/search-image?query=Ford%20Motor%20Company%20official%20logo%20blue%20oval%20automotive%20brand%20on%20white%20background%20high%20resolution%20corporate%20branding%20automobile%20manufacturer%20emblem&width=200&height=100&seq=ford2024&orientation=landscape',
    },
    {
      dept: 'Mech',
      organization: 'TUV RHEINLAND NIFE ACADEMY PVT LTD',
      location: 'Bangalore',
      date: '11-01-2021',
      validity: '3 Years',
      logo: 'https://readdy.ai/api/search-image?query=TUV%20Rheinland%20official%20logo%20certification%20testing%20inspection%20on%20white%20background%20high%20resolution%20corporate%20branding%20quality%20assurance%20emblem&width=200&height=100&seq=tuv2024&orientation=landscape',
    },

    // CSE Department
    {
      dept: 'CSE',
      organization: 'IRNARSOFT EDUCATION SERVICES PVT LTD',
      location: 'Tirunelveli',
      date: '14-02-2024',
      validity: '3 years',
      logo: 'https://readdy.ai/api/search-image?query=Education%20technology%20software%20company%20logo%20modern%20design%20on%20white%20background%20high%20resolution%20corporate%20branding%20professional%20IT%20training%20emblem&width=200&height=100&seq=irnarsoft2024&orientation=landscape',
    },
    {
      dept: 'CSE',
      organization: 'INNOVATIVE Computer System PVT LTD',
      location: 'Tamil Nadu',
      date: '27-05-2024',
      validity: '3 years',
      logo: 'https://readdy.ai/api/search-image?query=Innovative%20computer%20systems%20company%20logo%20technology%20design%20on%20white%20background%20high%20resolution%20corporate%20branding%20IT%20solutions%20emblem&width=200&height=100&seq=innovative2024&orientation=landscape',
    },
    {
      dept: 'CSE',
      organization: 'CAPECOM SOLUTIONS PVT LTD',
      location: 'Nagercoil-629001',
      date: '11-09-2023',
      validity: '3 Years',
      logo: 'https://readdy.ai/api/search-image?query=Communication%20solutions%20technology%20company%20logo%20professional%20design%20on%20white%20background%20high%20resolution%20corporate%20branding%20IT%20services%20emblem&width=200&height=100&seq=capecom2024&orientation=landscape',
    },
    {
      dept: 'CSE',
      organization: 'JCLICK SOLUTION',
      location: 'Kanyakumari dist.',
      date: '11-09-2022',
      validity: '2 years',
      logo: 'https://readdy.ai/api/search-image?query=Digital%20solutions%20technology%20company%20logo%20modern%20minimalist%20design%20on%20white%20background%20high%20resolution%20corporate%20brand%20identity%20professional%20IT%20services%20emblem&width=200&height=100&seq=jclickcse2024&orientation=landscape',
    },
    {
      dept: 'CSE',
      organization: 'FEATHER SOFTWARES',
      location: 'Tamil Nadu',
      date: '28-11-2023',
      validity: '3 Years',
      logo: 'https://readdy.ai/api/search-image?query=Software%20development%20company%20logo%20feather%20design%20element%20on%20white%20background%20high%20resolution%20corporate%20branding%20professional%20IT%20services%20emblem&width=200&height=100&seq=feather2024&orientation=landscape',
    },
  ];

  const departments = ['CSE', 'IT', 'ECE', 'EEE', 'Mech'];

  const filteredData = mouData.filter((item) => item.dept === selectedDept);

  const deptColors: Record<string, string> = {
    CSE: 'bg-emerald-100 text-emerald-700',
    IT: 'bg-amber-100 text-amber-700',
    ECE: 'bg-rose-100 text-rose-700',
    EEE: 'bg-cyan-100 text-cyan-700',
    Mech: 'bg-orange-100 text-orange-700',
  };

  const cardBgColors: Record<string, string> = {
    CSE: 'bg-emerald-50/40 border-emerald-100/50',
    IT: 'bg-amber-50/40 border-amber-100/50',
    ECE: 'bg-rose-50/40 border-rose-100/50',
    EEE: 'bg-cyan-50/40 border-cyan-100/50',
    Mech: 'bg-orange-50/40 border-orange-100/50',
  };

  const sectionBgColors: Record<string, string> = {
    CSE: 'bg-emerald-100/50',
    IT: 'bg-amber-100/50',
    ECE: 'bg-rose-100/50',
    EEE: 'bg-cyan-100/50',
    Mech: 'bg-orange-100/50',
  };

  const headerBgColors: Record<string, string> = {
    CSE: 'bg-emerald-600 text-white shadow-emerald-200',
    IT: 'bg-amber-600 text-white shadow-amber-200',
    ECE: 'bg-rose-600 text-white shadow-rose-200',
    EEE: 'bg-cyan-600 text-white shadow-cyan-200',
    Mech: 'bg-orange-600 text-white shadow-orange-200',
  };

  const panelBgColors: Record<string, string> = {
    CSE: 'bg-emerald-100/40 border border-emerald-200/30',
    IT: 'bg-amber-100/40 border border-amber-200/30',
    ECE: 'bg-rose-100/40 border border-rose-200/30',
    EEE: 'bg-cyan-100/40 border border-cyan-200/30',
    Mech: 'bg-orange-100/40 border border-orange-200/30',
  };

  const companyNameColors: Record<string, string> = {
    CSE: 'text-emerald-900',
    IT: 'text-amber-900',
    ECE: 'text-rose-900',
    EEE: 'text-cyan-900',
    Mech: 'text-orange-900',
  };

  return (
    <section
      ref={sectionRef}
      className={`py-20 transition-colors duration-700 ${sectionBgColors[selectedDept] || 'bg-gradient-to-b from-white to-slate-50'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="mb-8">
            <h2 className={`inline-block px-10 py-4 rounded-3xl text-4xl font-black shadow-2xl transition-all duration-700 ${headerBgColors[selectedDept] || 'bg-white text-gray-900 border border-gray-100'}`}>
              Our MOU Partners
            </h2>
          </div>
          
          <p className="text-base text-gray-600 max-w-3xl mx-auto mb-10">
            Strategic collaborations with industry leaders to provide exceptional
            opportunities for our students
          </p>

          {/* Header Banner Image */}
          <div className="w-full mx-auto rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 transition-all duration-1000 delay-300">
            <img
              src="https://image2url.com/r2/default/images/1774289685565-1e98b56a-ced8-4332-b182-ac3f7ecea597.jpg"
              alt="Strategic MOU Partnerships"
              className="w-full h-auto hover:scale-[1.02] transition-transform duration-1000"
              loading="lazy"
            />
          </div>
        </div>

        {/* Logo Grid Panel */}
        <div className={`mt-10 p-8 md:p-12 rounded-[3.5rem] transition-all duration-700 ${panelBgColors[selectedDept] || 'bg-white/50 border border-white/50'}`}>
          {/* Department Filter */}
          <div className="flex justify-center mb-12 flex-wrap gap-4">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-8 py-3 rounded-full font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${selectedDept === dept
                    ? 'bg-white text-gray-900 shadow-xl scale-110'
                    : 'bg-white/40 text-gray-600 border border-white/50 hover:bg-white/60 hover:text-gray-900'
                  }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Logo Grid */}
          <div
            className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            {filteredData.map((partner, index) => (
              <div
                key={`${partner.dept}-${partner.organization}-${index}`}
                className={`${cardBgColors[partner.dept] || 'bg-white'} border border-white/40 rounded-3xl p-6 flex flex-col items-center shadow-sm hover:shadow-2xl hover:scale-[1.05] transition-all duration-300 hover:border-white group cursor-pointer relative overflow-hidden`}
                style={{
                  transitionDelay: isVisible ? `${index * 40}ms` : '0ms',
                }}
              >
              {/* Department Badge */}
              <span
                className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${deptColors[partner.dept] || 'bg-gray-100 text-gray-600'
                  }`}
              >
                {partner.dept}
              </span>

              {/* Logo */}
              <div className="w-full h-20 flex items-center justify-center mb-4">
                <img
                  src={partner.logo}
                  alt={`${partner.organization} logo`}
                  className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </div>

              {/* Details */}
              <div className="text-center w-full">
                <h4 className={`text-sm font-extrabold leading-tight mb-2 line-clamp-2 transition-colors ${companyNameColors[partner.dept] || 'text-gray-900'}`}>
                  <a
                    href="#mou-partners"
                    className="hover:opacity-70 transition-opacity"
                  >
                    {partner.organization}
                  </a>
                </h4>
                {partner.location && (
                  <p className="text-[10px] text-gray-400 mb-2 line-clamp-1">
                    <i className="ri-map-pin-line mr-0.5" />
                    {partner.location}
                  </p>
                )}
                <div className="flex items-center justify-center gap-3 text-[10px] text-gray-500 border-t border-gray-50 pt-2 mt-1">
                  <span className="flex items-center gap-0.5">
                    <i className="ri-calendar-line" />
                    {partner.date}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <i className="ri-time-line" />
                    {partner.validity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Counter */}
      <div
        className={`mt-12 text-center transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
      >
        <p className="text-gray-500 text-sm flex items-center justify-center gap-2 bg-white/50 backdrop-blur-sm inline-flex px-6 py-2 rounded-full border border-gray-100 shadow-sm mx-auto">
          <i className="ri-building-line w-4 h-4 flex items-center justify-center text-teal-600" />
          <span className="font-bold text-teal-600">{mouData.length}+</span>{' '}
          active partnerships across all departments
        </p>
      </div>
    </div>
    </section>
  );
}