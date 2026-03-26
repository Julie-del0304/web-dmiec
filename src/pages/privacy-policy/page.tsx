import { Link } from 'react-router-dom';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="https://static.readdy.ai/image/aed2a83e7960c786dd7bda1b18d3e021/03378c8fff0e87b1630499bbdd646dab.jpeg"
                alt="DMI Engineering College Logo"
                className="h-12 w-12 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">DMI Engineering College</h1>
                <p className="text-xs text-gray-600">Aralvaimozhi, Tamil Nadu</p>
              </div>
            </Link>
            <Link
              to="/"
              className="px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all flex items-center gap-2"
            >
              <i className="ri-home-line"></i>
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: January 2025</p>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              Thank you for visiting DMI Engineering College Website and reviewing our privacy policy. The policy is simple: We collect no personal information about you unless you choose to provide that information to us. We strictly do not share, give, transfer or sell any of your personal information to any third party.
            </p>

            <p className="text-gray-700 leading-relaxed mb-8">
              In case, if you want to know about how we record non-personal information when you visit our site or how we use the information that you voluntarily submit, read further:
            </p>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-information-line text-teal-600"></i>
                Non-Personal Information that we Record
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                On visiting our website, if you just browse through read or download information, our site's operating system will automatically record some general information about your visit.
              </p>
              <div className="bg-slate-50 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">During your visit, the web operating system will record:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-teal-600 mt-1"></i>
                    <span>The Internet domain for your internet service, such as "xyz.net" or "xyz.com" if you are using private internet access account or if you connect from college or university domain.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-teal-600 mt-1"></i>
                    <span>The type of browser (such as "Internet explorer version x" or "netscape version x") that you are using.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-teal-600 mt-1"></i>
                    <span>The operating system that you are currently using (such as Windows, Unix, or Macintosh)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-teal-600 mt-1"></i>
                    <span>The time and date that you visit our site, and the webpages that you visit on our site.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-teal-600 mt-1"></i>
                    <span>The address of the previous website you were visiting, in case you linked us from another website.</span>
                  </li>
                </ul>
              </div>
              <p className="text-gray-700 leading-relaxed">
                This purpose of recording this information is for statistical analysis, to help make our site more useful to visitors. Individual information is not recorded by this tracking system.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-cookie-line text-teal-600"></i>
                Cookies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use "cookies" on certain DMI Engineering College pages to help you use our website interactively. If you are wondering what is a cookie?. It is a small file that a website transfers to your computer's hard disk, usually to keep track of you while you are connected to that site.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookies of DMI Engineering College web pages do not collect information about you, but just the "browser" session. The webpages dynamic features becomes easier for you to use because of the cookie, it prevents the cycle of having to provide the same information again as you browse from one page to another.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Remember in order to protect your privacy, be sure to close your browser entirely after you have finished conducting your business with a website that uses cookies. In case you are concerned about the potential misuse of information gathered by cookies placed in your system, set your browser to prompt you before it accepts a cookie. Almost all internet browsers have settings that help you identify cookies.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-mail-line text-teal-600"></i>
                Email Communication
              </h2>
              <p className="text-gray-700 leading-relaxed">
                When you send us an email, the message usually contains your return email address. Email is not necessarily secure against interception. If you include personally – identifying information in your email because you want to address issues specific to your situation, we may use that information in responding to your request. It is important you send only information necessary to help us process your request.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-file-list-line text-teal-600"></i>
                Information Collected from Interactive Forms
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Some of our web pages have interactive forms that allow you to voluntarily submit personal information (such as your e-mail address, name, or organization). This happens when you are registering for online counseling, seminars, various tests, quizzes, workshops or training sessions offered by DMI Engineering College, downloading admission forms from DMI Engineering College. In those cases, all submitted information is used only for the purposes for which it is intended and is not made available to any third party.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you voluntarily send us electronic mail, we will keep a record of this information so that we can respond to you. We only collect information from you when you register on our site or fill out a form. Also, when filling out a form on our site, you may be asked to enter your: name, e-mail address or phone number. You may, however, visit our site anonymously.
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                <p className="text-gray-800 font-medium">
                  <i className="ri-alert-line text-amber-600 mr-2"></i>
                  In case you have submitted your personal information and contact details, we reserve the rights to Call, SMS, Email or WhatsApp about our products and offers, even if your number has DND activated on it.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-links-line text-teal-600"></i>
                Links to Other Sites
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our policy mentioned above discloses the privacy practices for DMI Engineering College website. However, DMI Engineering College provides links to other websites. When you leave DMI Engineering College website, you will be going to sites that are beyond our control. These websites may send their own cookies to users, collect data or solicit personal information. The privacy policies and procedures described here for DMI Engineering College do not apply to any other external links.
              </p>
              <p className="text-gray-700 leading-relaxed">
                It is advisable to read the privacy policies of any site you link from ours, especially where you share any personal information. Be informed. The best person qualified for your privacy is you.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-file-text-line text-teal-600"></i>
                Mandatory Disclosures
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="#" className="bg-slate-50 hover:bg-slate-100 rounded-lg p-4 transition-colors text-center">
                  <i className="ri-calendar-line text-3xl text-teal-600 mb-2"></i>
                  <p className="text-gray-800 font-medium">Academic Calendar</p>
                </a>
                <a href="#" className="bg-slate-50 hover:bg-slate-100 rounded-lg p-4 transition-colors text-center">
                  <i className="ri-book-open-line text-3xl text-teal-600 mb-2"></i>
                  <p className="text-gray-800 font-medium">E-brochure</p>
                </a>
                <a href="#" className="bg-slate-50 hover:bg-slate-100 rounded-lg p-4 transition-colors text-center">
                  <i className="ri-file-chart-line text-3xl text-teal-600 mb-2"></i>
                  <p className="text-gray-800 font-medium">Audited Document</p>
                </a>
                <a href="#" className="bg-slate-50 hover:bg-slate-100 rounded-lg p-4 transition-colors text-center">
                  <i className="ri-shield-check-line text-3xl text-teal-600 mb-2"></i>
                  <p className="text-gray-800 font-medium">Anti-ragging Committee</p>
                </a>
              </div>
            </section>

            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-6 mt-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Questions or Concerns?</h3>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p className="flex items-center gap-2">
                  <i className="ri-mail-line text-teal-600"></i>
                  <strong>Email:</strong> info@dmiengineering.edu.in
                </p>
                <p className="flex items-center gap-2">
                  <i className="ri-phone-line text-teal-600"></i>
                  <strong>Phone:</strong> +91 4651 234567
                </p>
                <p className="flex items-start gap-2">
                  <i className="ri-map-pin-line text-teal-600 mt-1"></i>
                  <span><strong>Address:</strong> Aralvaimozhi, Kanyakumari District, Tamil Nadu - 629301, India</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
