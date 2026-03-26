import type { ApplicationFormData } from '../page';

interface ReviewStepProps {
  formData: ApplicationFormData;
  updateFormData: (data: Partial<ApplicationFormData>) => void;
  onPrev: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function ReviewStep({ formData, updateFormData, onPrev, onSubmit, isSubmitting }: ReviewStepProps) {
  const handleSubmit = () => {
    if (formData.terms_accepted) {
      onSubmit();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-navy-900 mb-6">Review Your Application</h2>

      <div className="space-y-6">
        {/* Personal Information */}
        <div className="bg-slate-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-navy-800 mb-4 flex items-center">
            <i className="ri-user-line mr-2 text-navy-600"></i>
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-600">Full Name:</span>
              <p className="font-semibold text-slate-900">{formData.full_name}</p>
            </div>
            <div>
              <span className="text-slate-600">Email:</span>
              <p className="font-semibold text-slate-900">{formData.email}</p>
            </div>
            <div>
              <span className="text-slate-600">Phone:</span>
              <p className="font-semibold text-slate-900">{formData.phone_number}</p>
            </div>
            <div>
              <span className="text-slate-600">Date of Birth:</span>
              <p className="font-semibold text-slate-900">{formData.date_of_birth}</p>
            </div>
            <div>
              <span className="text-slate-600">Gender:</span>
              <p className="font-semibold text-slate-900">{formData.gender}</p>
            </div>
            <div className="md:col-span-2">
              <span className="text-slate-600">Address:</span>
              <p className="font-semibold text-slate-900">
                {formData.street_address}, {formData.city}, {formData.state} - {formData.pincode}
              </p>
            </div>
          </div>
        </div>

        {/* Academic Details */}
        <div className="bg-slate-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-navy-800 mb-4 flex items-center">
            <i className="ri-book-line mr-2 text-navy-600"></i>
            Academic Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-600">10th Marks:</span>
              <p className="font-semibold text-slate-900">{formData.tenth_marks}%</p>
            </div>
            <div>
              <span className="text-slate-600">10th Board:</span>
              <p className="font-semibold text-slate-900">{formData.tenth_board}</p>
            </div>
            <div>
              <span className="text-slate-600">12th Marks:</span>
              <p className="font-semibold text-slate-900">{formData.twelfth_marks}%</p>
            </div>
            <div>
              <span className="text-slate-600">12th Board:</span>
              <p className="font-semibold text-slate-900">{formData.twelfth_board}</p>
            </div>
          </div>
        </div>

        {/* Program Selection */}
        <div className="bg-slate-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-navy-800 mb-4 flex items-center">
            <i className="ri-graduation-cap-line mr-2 text-navy-600"></i>
            Program Selection
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-600">Program Type:</span>
              <p className="font-semibold text-slate-900">{formData.program_type}</p>
            </div>
            <div>
              <span className="text-slate-600">Specialization:</span>
              <p className="font-semibold text-slate-900">{formData.specialization}</p>
            </div>
            <div>
              <span className="text-slate-600">Category:</span>
              <p className="font-semibold text-slate-900">{formData.category}</p>
            </div>
            {formData.tnea_rank && (
              <div>
                <span className="text-slate-600">TNEA Rank:</span>
                <p className="font-semibold text-slate-900">{formData.tnea_rank}</p>
              </div>
            )}
          </div>
        </div>

        {/* Documents */}
        <div className="bg-slate-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-navy-800 mb-4 flex items-center">
            <i className="ri-file-list-line mr-2 text-navy-600"></i>
            Uploaded Documents
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-emerald-600">
              <i className="ri-checkbox-circle-fill mr-2"></i>
              <span>10th Standard Certificate</span>
            </div>
            <div className="flex items-center text-emerald-600">
              <i className="ri-checkbox-circle-fill mr-2"></i>
              <span>12th Standard Certificate</span>
            </div>
            <div className="flex items-center text-emerald-600">
              <i className="ri-checkbox-circle-fill mr-2"></i>
              <span>Passport Size Photo</span>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={formData.terms_accepted}
              onChange={(e) => updateFormData({ terms_accepted: e.target.checked })}
              className="mt-1 w-5 h-5 text-navy-600 border-slate-300 rounded focus:ring-navy-500 cursor-pointer"
            />
            <span className="ml-3 text-sm text-slate-700 leading-relaxed">
              I hereby declare that all the information provided above is true and correct to the best of my knowledge. I understand that any false information may lead to the cancellation of my admission. I agree to abide by the rules and regulations of DMI Engineering College.
            </span>
          </label>
        </div>

        {!formData.terms_accepted && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start">
            <i className="ri-alert-line text-amber-600 text-xl mr-3 flex-shrink-0 mt-0.5"></i>
            <p className="text-amber-800 text-sm">
              Please accept the terms and conditions to submit your application.
            </p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onPrev}
          disabled={isSubmitting}
          className="px-8 py-3 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition-all hover:scale-105 whitespace-nowrap flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i className="ri-arrow-left-line mr-2"></i>
          Previous
        </button>
        <button
          onClick={handleSubmit}
          disabled={!formData.terms_accepted || isSubmitting}
          className="px-8 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-all hover:scale-105 whitespace-nowrap flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <i className="ri-loader-4-line animate-spin mr-2"></i>
              Submitting...
            </>
          ) : (
            <>
              <i className="ri-send-plane-fill mr-2"></i>
              Submit Application
            </>
          )}
        </button>
      </div>
    </div>
  );
}
