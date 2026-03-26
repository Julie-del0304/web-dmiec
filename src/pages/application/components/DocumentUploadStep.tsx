import { useState } from 'react';

interface DocumentUploadStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function DocumentUploadStep({ formData, updateFormData, onNext, onPrev }: DocumentUploadStepProps) {
  const [uploading, setUploading] = useState<string | null>(null);

  const handleFileUpload = async (file: File, field: string) => {
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      alert('Only JPG, PNG, and PDF files are allowed');
      return;
    }

    setUploading(field);

    try {
      // Create a temporary URL for preview
      const fileUrl = URL.createObjectURL(file);
      updateFormData({ [field]: fileUrl, [`${field}_file`]: file });
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setUploading(null);
    }
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#001433] mb-2">Document Upload</h2>
        <p className="text-slate-600">Upload your certificates and photo (Optional - Max 5MB each)</p>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            10th Standard Certificate
          </label>
          <div className="flex items-center gap-4">
            <label className="flex-1 cursor-pointer">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-[#0066ff] transition-all">
                {formData.tenth_certificate_url ? (
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <i className="ri-check-circle-fill text-xl"></i>
                    <span className="text-sm font-medium">File uploaded</span>
                  </div>
                ) : (
                  <div>
                    <i className="ri-upload-cloud-2-line text-3xl text-slate-400 mb-2"></i>
                    <p className="text-sm text-slate-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-500 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'tenth_certificate_url')}
                className="hidden"
                disabled={uploading === 'tenth_certificate_url'}
              />
            </label>
          </div>
          {uploading === 'tenth_certificate_url' && (
            <p className="text-sm text-[#0066ff] mt-2">Uploading...</p>
          )}
        </div>

        <div className="bg-slate-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            12th Standard Certificate
          </label>
          <div className="flex items-center gap-4">
            <label className="flex-1 cursor-pointer">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-[#0066ff] transition-all">
                {formData.twelfth_certificate_url ? (
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <i className="ri-check-circle-fill text-xl"></i>
                    <span className="text-sm font-medium">File uploaded</span>
                  </div>
                ) : (
                  <div>
                    <i className="ri-upload-cloud-2-line text-3xl text-slate-400 mb-2"></i>
                    <p className="text-sm text-slate-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-500 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'twelfth_certificate_url')}
                className="hidden"
                disabled={uploading === 'twelfth_certificate_url'}
              />
            </label>
          </div>
          {uploading === 'twelfth_certificate_url' && (
            <p className="text-sm text-[#0066ff] mt-2">Uploading...</p>
          )}
        </div>

        <div className="bg-slate-50 p-6 rounded-lg">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Passport Size Photo
          </label>
          <div className="flex items-center gap-4">
            <label className="flex-1 cursor-pointer">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-[#0066ff] transition-all">
                {formData.photo_url ? (
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <i className="ri-check-circle-fill text-xl"></i>
                    <span className="text-sm font-medium">Photo uploaded</span>
                  </div>
                ) : (
                  <div>
                    <i className="ri-image-line text-3xl text-slate-400 mb-2"></i>
                    <p className="text-sm text-slate-600">Click to upload your photo</p>
                    <p className="text-xs text-slate-500 mt-1">JPG, PNG (Max 5MB)</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'photo_url')}
                className="hidden"
                disabled={uploading === 'photo_url'}
              />
            </label>
          </div>
          {uploading === 'photo_url' && (
            <p className="text-sm text-[#0066ff] mt-2">Uploading...</p>
          )}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <i className="ri-information-line text-[#0066ff] text-xl"></i>
          <div className="text-sm text-slate-700">
            <p className="font-medium mb-1">Document Upload Guidelines:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Documents are optional but recommended for faster processing</li>
              <li>Ensure documents are clear and readable</li>
              <li>Maximum file size: 5MB per document</li>
              <li>Accepted formats: PDF, JPG, PNG</li>
            </ul>
          </div>
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
          Review Application
        </button>
      </div>
    </div>
  );
}