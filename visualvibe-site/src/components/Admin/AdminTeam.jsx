import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, X, Upload } from "lucide-react";
import { teamApi, uploadApi } from "../../services/api";
import { getImageUrl } from "../../utils/image";

const AdminTeam = ({ initialData = [], onRefresh }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    category: "",
    display_order: 0,
    is_active: true,
    image_url: "",
  });
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    setTeamMembers(Array.isArray(initialData) ? initialData : []);
  }, [initialData]);

  const categories = ["Founders & CEO", "Research and Development", "Developers", "Graphics Team", "Marketing Team"];

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await uploadApi.uploadImage(file, 'team');
      setFormData({ ...formData, image_url: result.path || result.url || result.image_url });
      setPreviewImage(URL.createObjectURL(file));
    } catch (error) {
      alert('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingMember) {
        await teamApi.update(editingMember.id, formData);
      } else {
        await teamApi.create(formData);
      }
      setShowModal(false);
      setEditingMember(null);
      setFormData({ name: "", designation: "", category: "", display_order: 0, is_active: true, image_url: "" });
      setPreviewImage(null);
      if (onRefresh) await onRefresh();
      const data = await teamApi.getAll();
      let flatMembers = [];
      if (Array.isArray(data)) {
        flatMembers = data;
      } else if (data && typeof data === 'object') {
        Object.values(data).forEach(category => {
          if (Array.isArray(category)) {
            flatMembers.push(...category);
          }
        });
      }
      setTeamMembers(flatMembers);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name || "",
      designation: member.designation || "",
      category: member.category || "",
      display_order: member.display_order || 0,
      is_active: Boolean(member.is_active),
      image_url: member.image_url || "",
    });
    setPreviewImage(getImageUrl(member.image_url));
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      try {
        await teamApi.delete(id);
        setTeamMembers(teamMembers.filter(m => m.id !== id));
        if (onRefresh) await onRefresh();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const groupedMembers = teamMembers.reduce((acc, member) => {
    const cat = member.category || "Uncategorized";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(member);
    return acc;
  }, {});

  const closeModal = () => {
    setShowModal(false);
    setEditingMember(null);
    setFormData({ name: "", designation: "", category: "", display_order: 0, is_active: true, image_url: "" });
    setPreviewImage(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Team Members</h1>
          <p className="text-gray-400">Manage your team members</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Member
        </button>
      </div>

      {Object.keys(groupedMembers).length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No team members found. Add your first one!</p>
        </div>
      )}

      {Object.entries(groupedMembers).map(([category, members]) => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">{category}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1a2234] rounded-2xl overflow-hidden border border-gray-800"
              >
                <div className="aspect-square bg-[#0f172a]">
                  <img 
                    src={getImageUrl(member.image_url)} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = "https://placehold.co/400x400/252a38/ffffff?text=No+Image"; }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-blue-400 text-sm mb-4">{member.designation}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(member)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1a2234] rounded-2xl p-6 w-full max-w-lg border border-gray-800 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">
                {editingMember ? "Edit Member" : "Add New Member"}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Photo</label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-4">
                  {previewImage ? (
                    <div className="relative">
                      <img src={previewImage} alt="Preview" className="w-32 h-32 object-cover rounded-full mx-auto" />
                      <button
                        type="button"
                        onClick={() => { setPreviewImage(null); setFormData({ ...formData, image_url: "" }); }}
                        className="absolute top-0 right-1/2 translate-x-8 p-1 bg-red-500 text-white rounded-full"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div 
                      className="flex flex-col items-center justify-center h-32 cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {uploading ? (
                        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-gray-500 mb-2" />
                          <p className="text-gray-500 text-sm">Click to upload photo</p>
                        </>
                      )}
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Designation</label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Display Order</label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="is_active" className="text-gray-400 text-sm">Active</label>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || uploading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? "Saving..." : (editingMember ? "Update" : "Add")} Member
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminTeam;
