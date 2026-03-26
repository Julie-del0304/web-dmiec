import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { placementService } from '../../../services/placementService';
import type { PlacementTeamMember } from '../../../types/placement';

export default function AdminPlacementTeamPage() {
  const { user } = useAuth();
  const [members, setMembers] = useState<PlacementTeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<PlacementTeamMember | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    role: '',
    email: '',
    phone: '',
    image_url: '',
    display_order: 0
  });

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const data = await placementService.getPlacementTeam();
      setMembers(data);
    } catch (error) {
      console.error('Error loading team members:', error);
      alert('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMember) {
        await placementService.updateTeamMember(editingMember.id, formData);
      } else {
        await placementService.createTeamMember(formData);
      }
      await loadMembers();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving member:', error);
      alert('Failed to save team member');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    try {
      await placementService.deleteTeamMember(id);
      await loadMembers();
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('Failed to delete team member');
    }
  };

  const handleEdit = (member: PlacementTeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      designation: member.designation,
      role: member.role,
      email: member.email || '',
      phone: member.phone || '',
      image_url: member.image_url || '',
      display_order: member.display_order
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingMember(null);
    setFormData({
      name: '',
      designation: '',
      role: '',
      email: '',
      phone: '',
      image_url: '',
      display_order: 0
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Placement Team Management</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap"
          >
            <i className="ri-add-line mr-2"></i>
            Add Member
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="aspect-[4/3] bg-gray-100 relative">
                  {member.image_url ? (
                    <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <i className="ri-user-line text-6xl text-gray-300"></i>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-teal-600 font-medium">{member.designation}</p>
                  <p className="text-xs text-gray-500 mt-1">{member.role}</p>
                  {member.email && (
                    <p className="text-xs text-gray-600 mt-2">
                      <i className="ri-mail-line mr-1"></i>
                      {member.email}
                    </p>
                  )}
                  {member.phone && (
                    <p className="text-xs text-gray-600">
                      <i className="ri-phone-line mr-1"></i>
                      {member.phone}
                    </p>
                  )}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(member)}
                      className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm whitespace-nowrap"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors text-sm whitespace-nowrap"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingMember ? 'Edit Team Member' : 'Add Team Member'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="e.g., Assistant Professor"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="e.g., Placement Coordinator, Training Head"
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap"
                >
                  {editingMember ? 'Update Member' : 'Add Member'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
