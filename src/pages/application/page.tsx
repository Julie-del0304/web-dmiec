import { useState, useEffect } from 'react';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';
import PersonalInfoStep from './components/PersonalInfoStep';
import AcademicDetailsStep from './components/AcademicDetailsStep';
import ProgramSelectionStep from './components/ProgramSelectionStep';
import DocumentUploadStep from './components/DocumentUploadStep';
import ReviewStep from './components/ReviewStep';
import SuccessMessage from './components/SuccessMessage';
import { submitApplication } from '../../services/applicationService';

export interface ApplicationFormData {
  // Personal Information
  full_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  street_address: string;
  city: string;
  state: string;
  pincode: string;

  // Academic Details
  tenth_marks: string;
  tenth_board: string;
  twelfth_marks: string;
  twelfth_board: string;

  // Program Selection
  program_type: string;
  specialization: string;
  tnea_rank: string;
  category: string;

  // Document Upload
  tenth_certificate_url: string;
  twelfth_certificate_url: string;
  photo_url: string;

  // Terms
  terms_accepted: boolean;
}

export default function ApplicationPage() {
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
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [applicationId, setApplicationId] = useState('');

  const [formData, setFormData] = useState<ApplicationFormData>({
    full_name: '',
    email: '',
    phone_number: '',
    date_of_birth: '',
    gender: '',
    street_address: '',
    city: '',
    state: '',
    pincode: '',
    tenth_marks: '',
    tenth_board: '',
    twelfth_marks: '',
    twelfth_board: '',
    program_type: '',
    specialization: '',
    tnea_rank: '',
    category: '',
    tenth_certificate_url: '',
    twelfth_certificate_url: '',
    photo_url: '',
    terms_accepted: false,
  });

  const totalSteps = 5;

  // Update only the fields that have changed – type‑safe
  const updateFormData = (data: Partial<ApplicationFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Transform form data to match API expectations
      const applicationData = {
        fullName: formData.full_name,
        email: formData.email,
        phone: formData.phone_number,
        dateOfBirth: formData.date_of_birth,
        gender: formData.gender,
        streetAddress: formData.street_address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        tenthMarks: formData.tenth_marks,
        tenthBoard: formData.tenth_board,
        twelfthMarks: formData.twelfth_marks,
        twelfthBoard: formData.twelfth_board,
        programType: formData.program_type,
        specialization: formData.specialization,
        tneaRank: formData.tnea_rank,
        category: formData.category,
        tenthCertificateUrl: formData.tenth_certificate_url,
        twelfthCertificateUrl: formData.twelfth_certificate_url,
        photoUrl: formData.photo_url,
      };

      const result = await submitApplication(applicationData);

      if (result.success && result.applicationId) {
        setApplicationId(result.applicationId);
        setSubmitSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSubmitError(result.error || 'Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('An unexpected error occurred. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      full_name: '',
      email: '',
      phone_number: '',
      date_of_birth: '',
      gender: '',
      street_address: '',
      city: '',
      state: '',
      pincode: '',
      tenth_marks: '',
      tenth_board: '',
      twelfth_marks: '',
      twelfth_board: '',
      program_type: '',
      specialization: '',
      tnea_rank: '',
      category: '',
      tenth_certificate_url: '',
      twelfth_certificate_url: '',
      photo_url: '',
      terms_accepted: false,
    });
    setCurrentStep(1);
    setSubmitSuccess(false);
    setSubmitError('');
    setApplicationId('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitSuccess) {
    return (
      <>
        <Navbar scrolled={scrolled} />
        <SuccessMessage applicationId={applicationId} onNewApplication={resetForm} />
        <Footer enquiryOpen={enquiryOpen} setEnquiryOpen={setEnquiryOpen} />
      </>
    );
  }

  return (
    <>
      <Navbar scrolled={scrolled} />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-navy-900 mb-3">
              <strong>Application Form 2026-27</strong>
            </h1>
            <p className="text-slate-600 text-base">
              Complete all steps to submit your application to DMI Engineering College
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${currentStep === step
                      ? 'bg-navy-600 text-white scale-110'
                      : currentStep > step
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200 text-slate-500'
                      }`}
                  >
                    {currentStep > step ? (
                      <i className="ri-check-line text-xl" />
                    ) : (
                      step
                    )}
                  </div>
                  {step < 5 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-all ${currentStep > step ? 'bg-emerald-500' : 'bg-slate-200'
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-600 mt-2">
              <span className={currentStep === 1 ? 'font-semibold text-navy-600' : ''}>
                Personal Info
              </span>
              <span className={currentStep === 2 ? 'font-semibold text-navy-600' : ''}>
                Academic
              </span>
              <span className={currentStep === 3 ? 'font-semibold text-navy-600' : ''}>
                Program
              </span>
              <span className={currentStep === 4 ? 'font-semibold text-navy-600' : ''}>
                Documents
              </span>
              <span className={currentStep === 5 ? 'font-semibold text-navy-600' : ''}>
                Review
              </span>
            </div>
          </div>

          {/* Error Message */}
          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start">
              <i className="ri-error-warning-line text-red-600 text-xl mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-900 mb-1">Submission Failed</h4>
                <p className="text-red-700 text-sm">{submitError}</p>
              </div>
            </div>
          )}

          {/* Form Steps */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {currentStep === 1 && (
              <PersonalInfoStep
                formData={formData}
                updateFormData={updateFormData}
                onNext={nextStep}
              />
            )}
            {currentStep === 2 && (
              <AcademicDetailsStep
                formData={formData}
                updateFormData={updateFormData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            {currentStep === 3 && (
              <ProgramSelectionStep
                formData={formData}
                updateFormData={updateFormData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            {currentStep === 4 && (
              <DocumentUploadStep
                formData={formData}
                updateFormData={updateFormData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            {currentStep === 5 && (
              <ReviewStep
                formData={formData}
                updateFormData={updateFormData}
                onPrev={prevStep}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        </div>
      </div>
      <Footer enquiryOpen={enquiryOpen} setEnquiryOpen={setEnquiryOpen} />
    </>
  );
}