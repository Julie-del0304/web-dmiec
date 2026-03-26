import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchAllFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty,
  uploadFacultyPhoto,
  deleteFacultyPhoto,
  uploadFacultyCV,
  deleteFacultyCV,
  validateFacultyImageFile,
  validateFacultyCVFile,
  type FacultyMember,
  type CreateFacultyData,
  type UpdateFacultyData
} from '../../../services/facultyService';

const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Electronics & Communication Engineering',
  'Electrical & Electronics Engineering',
  'Mechanical Engineering',
  'Information Technology',
  'Artificial Intelligence & Data Science',
  'Science & Humanities'
];

export default function AdminFacultyPage() {
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<FacultyMember | null>(null);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    department: '',
    qualifications: '',
    email: '',
    phone: '',
    linkedin_url: '',
    bio: '',
    experience: '',
    research_area: '',
    image_url: '',
    cv_url: ''
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [cvFile, setCvFile] = useState<File | null>(null);

  useEffect(() => {
    loadFaculty();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const loadFaculty = async () => {
    try {
      setLoading(true);
      const data = await fetchAllFaculty();
      setFaculty(data);
    } catch (error) {
      showToast('Failed to load faculty members', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateFacultyImageFile(file);
    if (error) {
      showToast(error, 'error');
      return;
    }

    setPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateFacultyCVFile(file);
    if (error) {
      showToast(error, 'error');
      return;
    }

    setCvFile(file);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      designation: '',
      department: '',
      qualifications: '',
      email: '',
      phone: '',
      linkedin_url: '',
      bio: '',
      experience: '',
      research_area: '',
      image_url: '',
      cv_url: ''
    });
    setPhotoFile(null);
    setPhotoPreview('');
    setCvFile(null);
    setShowAddForm(false);
    setEditingFaculty(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setUploading(true);

      let imageUrl = formData.image_url;
      let cvUrl = formData.cv_url;

      // Upload new photo if selected
      if (photoFile) {
        imageUrl = await uploadFacultyPhoto(photoFile);
        
        // Delete old photo if updating
        if (editingFaculty && editingFaculty.image_url) {
          await deleteFacultyPhoto(editingFaculty.image_url);
        }
      }

      // Upload new CV if selected
      if (cvFile) {
        cvUrl = await uploadFacultyCV(cvFile);
        
        // Delete old CV if updating
        if (editingFaculty && editingFaculty.cv_url) {
          await deleteFacultyCV(editingFaculty.cv_url);
        }
      }

      const facultyData: CreateFacultyData = {
        name: formData.name || undefined,
        designation: formData.designation || undefined,
        department: formData.department || undefined,
        qualifications: formData.qualifications || undefined,
        email: formData.email || undefined,
        phone: formData.phone || undefined,
        linkedin_url: formData.linkedin_url || undefined,
        bio: formData.bio || undefined,
        experience: formData.experience || undefined,
        research_area: formData.research_area || undefined,
        image_url: imageUrl || undefined,
        cv_url: cvUrl || undefined
      };

      if (editingFaculty) {
        await updateFaculty(editingFaculty.id, facultyData as UpdateFacultyData);
        showToast('Faculty member updated successfully!', 'success');
      } else {
        await createFaculty(facultyData);
        showToast('Faculty member added successfully!', 'success');
      }

      resetForm();
      loadFaculty();
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Operation failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (member: FacultyMember) => {
    setEditingFaculty(member);
    setFormData({
      name: member.name || '',
      designation: member.designation || '',
      department: member.department || '',
      qualifications: member.qualifications || '',
      email: member.email || '',
      phone: member.phone || '',
      linkedin_url: member.linkedin_url || '',
      bio: member.bio || '',
      experience: member.experience || '',
      research_area: member.research_area || '',
      image_url: member.image_url || '',
      cv_url: member.cv_url || ''
    });
    setPhotoPreview(member.image_url || '');
    setShowAddForm(true);
  };

  const handleDelete = async (member: FacultyMember) => {
    if (!confirm(`Are you sure you want to delete ${member.name || 'this faculty member'}?`)) {
      return;
    }

    try {
      await deleteFaculty(member.id);
      if (member.image_url) {
        await deleteFacultyPhoto(member.image_url);
      }
      if (member.cv_url) {
        await deleteFacultyCV(member.cv_url);
      }
      showToast('Faculty member deleted successfully!', 'success');
      loadFaculty();
    } catch (error) {
      showToast('Failed to delete faculty member', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg ${
          toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white font-medium animate-fade-in`}>
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="https://static.readdy.ai/image/aed2a83e7960c786dd7bda1b18d3e021/03378c8fff0e87b1630499bbdd646dab.jpeg"
                alt="DMI Engineering College Logo"
                className="h-14 w-14 object-contain"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Faculty Management</h1>
                <p className="text-gray-600 mt-1">Add, edit, and manage faculty members</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/admin')}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium whitespace-nowrap"
              >
                <i className="ri-arrow-left-line mr-2"></i>
                Back to Dashboard
              </button>
              <button
                onClick={() => {
                  resetForm();
                  setShowAddForm(true);
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md font-medium whitespace-nowrap"
              >
                <i className="ri-add-line mr-2"></i>
                Add Faculty
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingFaculty ? 'Edit Faculty Member' : 'Add New Faculty Member'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <i className="ri-information-line mr-2"></i>
                  All fields are optional. Fill in only the information you have available.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    placeholder="Dr. John Doe"
                  />
                </div>

                {/* Designation */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Designation <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    placeholder="Professor / HOD / Assistant Professor"
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Department <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  >
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    placeholder="faculty@dmicollege.edu"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    placeholder="+91 98765 43210"
                  />
                </div>

                {/* LinkedIn Profile */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    LinkedIn Profile URL <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                {/* Qualifications */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Qualifications <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.qualifications}
                    onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    placeholder="Ph.D., M.Tech, B.Tech"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Experience <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    placeholder="15 years in teaching and research"
                  />
                </div>

                {/* Research Area */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Research Area <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.research_area}
                    onChange={(e) => setFormData({ ...formData, research_area: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    placeholder="Machine Learning, Data Science, AI"
                  />
                </div>

                {/* Bio */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bio <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm resize-none"
                    placeholder="Brief biography and professional background..."
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Faculty Photo <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handlePhotoChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Accepted formats: JPEG, PNG, WebP (Max 5MB)
                    </p>
                  </div>
                  {photoPreview && (
                    <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200 shadow-md">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* CV Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  CV Upload <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleCVChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Accepted formats: PDF, DOC, DOCX (Max 10MB)
                    </p>
                  </div>
                  {(cvFile || formData.cv_url) && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                      <i className="ri-file-text-line text-green-600 text-xl"></i>
                      <span className="text-sm text-green-700 font-medium">
                        {cvFile ? cvFile.name : 'CV Uploaded'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {uploading ? (
                    <>
                      <i className="ri-loader-4-line animate-spin mr-2"></i>
                      {editingFaculty ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    <>
                      <i className={`${editingFaculty ? 'ri-save-line' : 'ri-add-line'} mr-2`}></i>
                      {editingFaculty ? 'Update Faculty Member' : 'Add Faculty Member'}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold whitespace-nowrap"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Faculty List */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              All Faculty Members ({faculty.length})
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <i className="ri-loader-4-line text-4xl text-blue-600 animate-spin"></i>
            </div>
          ) : faculty.length === 0 ? (
            <div className="text-center py-20">
              <i className="ri-user-line text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-500 text-lg">No faculty members added yet</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="mt-4 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
              >
                Add Your First Faculty Member
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Photo
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Designation
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {faculty.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        {member.image_url ? (
                          <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                            <img
                              src={member.image_url}
                              alt={member.name || 'Faculty'}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200">
                            <i className="ri-user-line text-2xl text-gray-400"></i>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{member.name || '-'}</div>
                        {member.qualifications && (
                          <div className="text-xs text-gray-500 mt-1">{member.qualifications}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700">{member.designation || '-'}</div>
                        {member.experience && (
                          <div className="text-xs text-gray-500 mt-1">{member.experience}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700">{member.department || '-'}</div>
                        {member.research_area && (
                          <div className="text-xs text-gray-500 mt-1">{member.research_area}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          {member.email && (
                            <div className="text-xs text-gray-600 flex items-center gap-1">
                              <i className="ri-mail-line"></i>
                              {member.email}
                            </div>
                          )}
                          {member.phone && (
                            <div className="text-xs text-gray-600 flex items-center gap-1">
                              <i className="ri-phone-line"></i>
                              {member.phone}
                            </div>
                          )}
                          {member.linkedin_url && (
                            <a
                              href={member.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                            >
                              <i className="ri-linkedin-box-fill"></i>
                              LinkedIn
                            </a>
                          )}
                          {member.cv_url && (
                            <a
                              href={member.cv_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-green-600 hover:text-green-700 flex items-center gap-1"
                            >
                              <i className="ri-file-text-line"></i>
                              View CV
                            </a>
                          )}
                          {!member.email && !member.phone && !member.linkedin_url && !member.cv_url && (
                            <span className="text-xs text-gray-400">-</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleEdit(member)}
                            className="w-9 h-9 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-sm"
                            title="Edit Faculty"
                          >
                            <i className="ri-pencil-line text-lg"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(member)}
                            className="w-9 h-9 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-sm"
                            title="Delete Faculty"
                          >
                            <i className="ri-delete-bin-5-line text-lg"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
