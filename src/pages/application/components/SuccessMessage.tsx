interface SuccessMessageProps {
  applicationId: string;
  onNewApplication: () => void;
}

export default function SuccessMessage({ applicationId, onNewApplication }: SuccessMessageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <i className="ri-checkbox-circle-fill text-6xl text-emerald-600"></i>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Application Submitted Successfully!
          </h1>
          <p className="text-slate-600 text-base mb-8">
            Thank you for applying to DMI Engineering College. Your application has been received and is under review.
          </p>

          {/* Application ID */}
          <div className="bg-slate-50 rounded-lg p-6 mb-8">
            <p className="text-sm text-slate-600 mb-2">Your Application ID</p>
            <p className="text-2xl font-bold text-navy-900 tracking-wider">{applicationId}</p>
            <p className="text-xs text-slate-500 mt-2">
              Please save this ID for future reference
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-navy-900 mb-3 flex items-center">
              <i className="ri-information-line text-blue-600 mr-2"></i>
              What Happens Next?
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start">
                <i className="ri-check-line text-emerald-600 mr-2 mt-0.5 flex-shrink-0"></i>
                <span>You will receive a confirmation email within 24 hours</span>
              </li>
              <li className="flex items-start">
                <i className="ri-check-line text-emerald-600 mr-2 mt-0.5 flex-shrink-0"></i>
                <span>Our admissions team will review your application within 3-5 business days</span>
              </li>
              <li className="flex items-start">
                <i className="ri-check-line text-emerald-600 mr-2 mt-0.5 flex-shrink-0"></i>
                <span>You will be notified about the admission decision via email and phone</span>
              </li>
              <li className="flex items-start">
                <i className="ri-check-line text-emerald-600 mr-2 mt-0.5 flex-shrink-0"></i>
                <span>Keep checking your email for updates and further instructions</span>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="bg-slate-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-navy-900 mb-3 flex items-center">
              <i className="ri-customer-service-line text-navy-600 mr-2"></i>
              Need Help?
            </h3>
            <div className="space-y-2 text-sm text-slate-700">
              <p className="flex items-center">
                <i className="ri-phone-line text-navy-600 mr-2"></i>
                <span>+91 4651 289 000</span>
              </p>
              <p className="flex items-center">
                <i className="ri-mail-line text-navy-600 mr-2"></i>
                <span>admissions@dmi.ac.in</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="px-8 py-3 bg-navy-600 text-white rounded-lg font-semibold hover:bg-navy-700 transition-all hover:scale-105 whitespace-nowrap flex items-center justify-center"
            >
              <i className="ri-home-line mr-2"></i>
              Back to Home
            </a>
            <button
              onClick={onNewApplication}
              className="px-8 py-3 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition-all hover:scale-105 whitespace-nowrap flex items-center justify-center"
            >
              <i className="ri-file-add-line mr-2"></i>
              New Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
