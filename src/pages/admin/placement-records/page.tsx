import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { placementService } from '../../../services/placementService';
import type { PlacementRecord } from '../../../types/placement';

export default function AdminPlacementRecordsPage() {
  const { user } = useAuth();
  const [records, setRecords] = useState<PlacementRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<PlacementRecord | null>(null);
  const [formData, setFormData] = useState({
    academic_year: '',
    total_students: 0,
    placed_students: 0,
    highest_package: 0,
    average_package: 0,
    companies_visited: 0,
    display_order: 0
  });

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const data = await placementService.getPlacementRecords();
      setRecords(data);
    } catch (error) {
      console.error('Error loading records:', error);
      alert('Failed to load placement records');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingRecord) {
        await placementService.updatePlacementRecord(editingRecord.id, formData);
      } else {
        await placementService.createPlacementRecord(formData);
      }
      await loadRecords();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving record:', error);
      alert('Failed to save placement record');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this record?')) return;
    try {
      await placementService.deletePlacementRecord(id);
      await loadRecords();
    } catch (error) {
      console.error('Error deleting record:', error);
      alert('Failed to delete placement record');
    }
  };

  const handleEdit = (record: PlacementRecord) => {
    setEditingRecord(record);
    setFormData({
      academic_year: record.academic_year,
      total_students: record.total_students,
      placed_students: record.placed_students,
      highest_package: record.highest_package,
      average_package: record.average_package,
      companies_visited: record.companies_visited,
      display_order: record.display_order
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRecord(null);
    setFormData({
      academic_year: '',
      total_students: 0,
      placed_students: 0,
      highest_package: 0,
      average_package: 0,
      companies_visited: 0,
      display_order: 0
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Placement Records Management</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap"
          >
            <i className="ri-add-line mr-2"></i>
            Add Record
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Placed</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Highest</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Average</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Companies</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Order</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {records.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{record.academic_year}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-center">{record.total_students}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-center">{record.placed_students}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-center">₹{record.highest_package}L</td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-center">₹{record.average_package}L</td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-center">{record.companies_visited}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-center">{record.display_order}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(record)}
                        className="text-teal-600 hover:text-teal-900 whitespace-nowrap"
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="text-red-600 hover:text-red-900 whitespace-nowrap"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingRecord ? 'Edit Record' : 'Add New Record'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                <input
                  type="text"
                  value={formData.academic_year}
                  onChange={(e) => setFormData({ ...formData, academic_year: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="e.g., 2023-2024"
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Students</label>
                  <input
                    type="number"
                    value={formData.total_students}
                    onChange={(e) => setFormData({ ...formData, total_students: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Placed Students</label>
                  <input
                    type="number"
                    value={formData.placed_students}
                    onChange={(e) => setFormData({ ...formData, placed_students: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Highest Package (LPA)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.highest_package}
                    onChange={(e) => setFormData({ ...formData, highest_package: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Average Package (LPA)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.average_package}
                    onChange={(e) => setFormData({ ...formData, average_package: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Companies Visited</label>
                  <input
                    type="number"
                    value={formData.companies_visited}
                    onChange={(e) => setFormData({ ...formData, companies_visited: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
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
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap"
                >
                  {editingRecord ? 'Update Record' : 'Add Record'}
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
