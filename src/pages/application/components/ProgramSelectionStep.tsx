import { useState } from 'react';

interface ProgramSelectionStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const programs = [
  { id: 'cse', name: 'Computer Science and Engineering', code: 'CSE' },
  { id: 'it', name: 'Information Technology', code: 'IT' },
  { id: 'aids', name: 'Artificial Intelligence & Data Science', code: 'AI&DS' },
  { id: 'eee', name: 'Electrical & Electronics Engineering', code: 'EEE' },
  { id: 'ece', name: 'Electronics & Communication Engineering', code: 'ECE' },
  { id: 'mech', name: 'Mechanical Engineering', code: 'MECH' }
];

export default function ProgramSelectionStep({ formData, updateFormData, onNext, onPrev }: ProgramSelectionStepProps) {
  const [errors, setErrors] = useState<any>({});

  const validateStep = () => {
    const newErrors: any = {};
    
    if (!formData.program_type) newErrors.program_type = 'Program type is required';
    if (!formData.specialization) newErrors.specialization = 'Specialization is required';
    if (!formData.category) newErrors.category = 'Category is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#001433] mb-2">Program Selection</h2>
        <p className="text-slate-600">Choose your preferred program and specialization</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Program Type <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.program_type || ''}
            onChange={(e) => {
              updateFormData({ program_type: e.target.value });
              if (errors.program_type) setErrors({ ...errors, program_type: '' });
            }}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0066ff] focus:border-transparent transition-all text-sm"
          >
            <option value="">Select Program Type</option>
            <option value="B.E">B.E (Bachelor of Engineering)</option>
            <option value="B.Tech">B.Tech (Bachelor of Technology)</option>
          </select>
          {errors.program_type && <p className="text-red-500 text-xs mt-1">{errors.program_type}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Specialization <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {programs.map((program) => (
              <div
                key={program.id}
                onClick={() => {
                  updateFormData({ specialization: program.name });
                  if (errors.specialization) setErrors({ ...errors, specialization: '' });
                }}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.specialization === program.name
                    ? 'border-[#0066ff] bg-blue-50'
                    : 'border-slate-300 hover:border-[#0066ff] hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-[#001433] text-sm">{program.code}</h3>
                    <p className="text-xs text-slate-600 mt-1">{program.name}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.specialization === program.name
                      ? 'border-[#0066ff] bg-[#0066ff]'
                      : 'border-slate-300'
                  }`}>
                    {formData.specialization === program.name && (
                      <i className="ri-check-line text-white text-xs"></i>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {errors.specialization && <p className="text-red-500 text-xs mt-1">{errors.specialization}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.category || ''}
            onChange={(e) => {
              updateFormData({ category: e.target.value });
              if (errors.category) setErrors({ ...errors, category: '' });
            }}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0066ff] focus:border-transparent transition-all text-sm"
          >
            <option value="">Select Category</option>
            <option value="General">General</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
          </select>
          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            TNEA Rank (Optional)
          </label>
          <input
            type="text"
            value={formData.tnea_rank || ''}
            onChange={(e) => updateFormData({ tnea_rank: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0066ff] focus:border-transparent transition-all text-sm"
            placeholder="Enter your TNEA rank if applicable"
          />
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={onPrev}
          className="px-8 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all font-medium whitespace-nowrap"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-[#0066ff] text-white rounded-lg hover:bg-[#0052cc] transition-all font-medium whitespace-nowrap"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}