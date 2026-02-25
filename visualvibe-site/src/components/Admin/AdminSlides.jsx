import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye, EyeOff, X, Upload } from "lucide-react";
import { slidesApi, uploadApi } from "../../services/api";
import { getImageUrl } from "../../utils/image";

const AdminSlides = ({ initialData = [], onRefresh }) => {
  const [slides, setSlides] = useState(Array.isArray(initialData) ? initialData : []);
  const [showModal, setShowModal] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    display_order: 0,
    is_active: true,
    image_url: "",
  });
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    setSlides(Array.isArray(initialData) ? initialData : []);
  }, [initialData]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await uploadApi.uploadImage(file, 'slides');
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
      if (editingSlide) {
        await slidesApi.update(editingSlide.id, formData);
      } else {
        await slidesApi.create(formData);
      }
      setShowModal(false);
      setEditingSlide(null);
      setFormData({ title: "", subtitle: "", description: "", display_order: 0, is_active: true, image_url: "" });
      setPreviewImage(null);
      if (onRefresh) await onRefresh();
      const data = await slidesApi.getAll();
      setSlides(Array.isArray(data) ? data : []);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (slide) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title || "",
      subtitle: slide.subtitle || "",
      description: slide.description || "",
      display_order: slide.display_order || 0,
      is_active: Boolean(slide.is_active),
      image_url: slide.image_url || "",
    });
    setPreviewImage(getImageUrl(slide.image_url));
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this slide?")) {
      try {
        await slidesApi.delete(id);
        setSlides(slides.filter(s => s.id !== id));
        if (onRefresh) await onRefresh();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const toggleActive = async (id, currentStatus) => {
    try {
      await slidesApi.update(id, { is_active: !currentStatus });
      setSlides(slides.map(s => s.id === id ? { ...s, is_active: !currentStatus } : s));
      if (onRefresh) await onRefresh();
    } catch (error) {
      alert(error.message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSlide(null);
    setFormData({ title: "", subtitle: "", description: "", display_order: 0, is_active: true, image_url: "" });
    setPreviewImage(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Carousel Slides</h1>
          <p className="text-gray-400">Manage homepage carousel slides</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Slide
        </button>
      </div>

      {/* Slides Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-[#1a2234] rounded-2xl overflow-hidden border border-gray-800 ${!slide.is_active ? 'opacity-60' : ''}`}
          >
            <div className="aspect-video bg-[#0f172a]">
              <img 
                src={getImageUrl(slide.image_url)} 
                alt={slide.title}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://placehold.co/600x400/252a38/ffffff?text=No+Image"; }}
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-white">{slide.title}</h3>
                <button
                  onClick={() => toggleActive(slide.id, slide.is_active)}
                  className={`p-1.5 rounded-lg ${slide.is_active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}
                >
                  {slide.is_active ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
              <p className="text-gray-400 text-sm mb-2">{slide.subtitle}</p>
              <p className="text-gray-500 text-xs mb-4">Order: {slide.display_order}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(slide)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(slide.id)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {slides.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No slides found. Add your first slide!</p>
        </div>
      )}

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
                {editingSlide ? "Edit Slide" : "Add New Slide"}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Slide Image</label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-4">
                  {previewImage ? (
                    <div className="relative">
                      <img src={previewImage} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => { setPreviewImage(null); setFormData({ ...formData, image_url: "" }); }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div 
                      className="flex flex-col items-center justify-center h-40 cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {uploading ? (
                        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-gray-500 mb-2" />
                          <p className="text-gray-500 text-sm">Click to upload image</p>
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
                <label className="block text-gray-400 text-sm mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 h-24"
                />
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
                  {loading ? "Saving..." : (editingSlide ? "Update" : "Add")} Slide
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminSlides;
