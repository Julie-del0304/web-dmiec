import { useState } from 'react';

interface AcademicDetailsStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function AcademicDetailsStep({ formData, updateFormData, onNext, onPrev }: AcademicDetailsStepProps) {
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.tenth_marks) newErrors.tenth_marks = '10th marks are required';
    else if (parseFloat(formData.tenth_marks) < 0 || parseFloat(formData.tenth_marks) > 100) {
      newErrors.tenth_marks = 'Marks must be between 0 and 100';
    }
    if (!formData.tenth_board?.trim()) newErrors.tenth_board = '10th board is required';
    
    if (!formData.twelfth_marks) newErrors.twelfth_marks = '12th marks are required';
    else if (parseFloat(formData.twelfth_marks) < 0 || parseFloat(formData.twelfth_marks) > 100) {
      newErrors.twelfth_marks = 'Marks must be between 0 and 100';
    }
    if (!formData.twelfth_board?.trim()) newErrors.twelfth_board = '12th board is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Academic Details</h2>
        <p className="text-gray-600">Please provide your academic qualifications</p>
      </div>

      <div className="space-y-8">
        {/* 10th Standard Details */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="ri-book-line text-blue-600 mr-2"></i>
            10th Standard Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Percentage/CGPA <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="tenth_marks"
                value={formData.tenth_marks || ''}
                onChange={handleChange}
                step="0.01"
                min="0"
                max="100"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter marks (0-100)"
              />
              {errors.tenth_marks && <p className="mt-1 text-sm text-red-500">{errors.tenth_marks}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Board <span className="text-red-500">*</span>
              </label>
              <select
                name="tenth_board"
                value={formData.tenth_board || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Board</option>
                <option value="CBSE">CBSE</option>
                <option value="State Board">State Board</option>
                <option value="ICSE">ICSE</option>
                <option value="Other">Other</option>
              </select>
              {errors.tenth_board && <p className="mt-1 text-sm text-red-500">{errors.tenth_board}</p>}
            </div>
          </div>
        </div>

        {/* 12th Standard Details */}
        <div className="bg-emerald-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="ri-graduation-cap-line text-emerald-600 mr-2"></i>
            12th Standard Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Percentage/CGPA <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="twelfth_marks"
                value={formData.twelfth_marks || ''}
                onChange={handleChange}
                step="0.01"
                min="0"
                max="100"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter marks (0-100)"
              />
              {errors.twelfth_marks && <p className="mt-1 text-sm text-red-500">{errors.twelfth_marks}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Board <span className="text-red-500">*</span>
              </label>
              <select
                name="twelfth_board"
                value={formData.twelfth_board || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Board</option>
                <option value="CBSE">CBSE</option>
                <option value="State Board">State Board</option>
                <option value="ICSE">ICSE</option>
                <option value="Other">Other</option>
              </select>
              {errors.twelfth_board && <p className="mt-1 text-sm text-red-500">{errors.twelfth_board}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={onPrev}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors whitespace-nowrap"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}