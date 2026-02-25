import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  X,
  ExternalLink,
  Upload,
} from "lucide-react";
import { getImageUrl } from "../../utils/image";
import { uploadApi } from "../../services/api";

const AdminPortfolio = ({ type, title, initialItems = [], onRefresh, api }) => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    website_url: "",
    display_order: 0,
    is_active: true,
    image_url: "",
    video_url: "",
  });
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);

  useEffect(() => {
    setItems(Array.isArray(initialItems) ? initialItems : []);
  }, [initialItems]);

  const categories =
    type === "websites"
      ? ["E-Commerce", "Corporate", "Portfolio", "Blog", "Landing Page"]
      : type === "logos"
        ? [
            "Technology",
            "Food & Beverage",
            "Finance",
            "Healthcare",
            "Education",
          ]
        : type === "flyers"
          ? ["Events", "Marketing", "Product Launch", "Sale", "Restaurant"]
          : type === "graphics"
            ? ["Branding", "Print", "Digital", "Product", "Architecture"]
            : type === "uiux"
              ? [
                  "Mobile App",
                  "Web App",
                  "Dashboard",
                  "E-Commerce",
                  "Landing Page",
                ]
              : type === "videos"
                ? [
                    "Corporate",
                    "Commercial",
                    "Social Media",
                    "Event",
                    "Tutorial",
                  ]
                : ["General"];

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await uploadApi.uploadImage(file, type);
      setFormData({
        ...formData,
        image_url: result.path || result.url || result.image_url,
      });
      setPreviewImage(URL.createObjectURL(file));
    } catch (error) {
      alert("Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleVideoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await uploadApi.uploadImage(file, "videos");
      setFormData({
        ...formData,
        video_url: result.path || result.url || result.video_url,
      });
      setPreviewVideo(URL.createObjectURL(file));
    } catch (error) {
      alert("Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!api) {
      alert("API not configured");
      return;
    }
    setLoading(true);
    try {
      if (editingItem) {
        await api.update(editingItem.id, formData);
      } else {
        await api.create(formData);
      }
      setShowModal(false);
      setEditingItem(null);
      setFormData({
        title: "",
        description: "",
        category: "",
        website_url: "",
        display_order: 0,
        is_active: true,
        image_url: "",
      });
      setPreviewImage(null);
      if (onRefresh) await onRefresh();
      const data = await api.getAll();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      description: item.description || "",
      category: item.category || "",
      website_url: item.website_url || item.url || "",
      display_order: item.display_order || 0,
      is_active: Boolean(item.is_active),
      image_url: item.image_url || item.thumbnail_file || "",
      video_url: item.video_url || item.video_file || "",
    });
    setPreviewImage(getImageUrl(item.image_url));
    if (item.video_url) {
      setPreviewVideo(getImageUrl(item.video_file));
    } else {
      setPreviewVideo(null);
    }
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!api) {
      alert("API not configured");
      return;
    }
    if (confirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`)) {
      try {
        await api.delete(id);
        setItems(items.filter((i) => i.id !== id));
        if (onRefresh) await onRefresh();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const toggleActive = async (id, currentStatus) => {
    if (!api) return;
    try {
      await api.update(id, { is_active: !currentStatus });
      setItems(
        items.map((i) =>
          i.id === id ? { ...i, is_active: !currentStatus } : i,
        ),
      );
      if (onRefresh) await onRefresh();
    } catch (error) {
      alert(error.message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      website_url: "",
      display_order: 0,
      is_active: true,
      image_url: "",
      video_url: "",
    });
    setPreviewImage(null);
    setPreviewVideo(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
          <p className="text-gray-400">Manage your {type} portfolio</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add {type.slice(0, -1)}
        </button>
      </div>

      {/* Items Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-[#1a2234] rounded-2xl overflow-hidden border border-gray-800 ${!item.is_active ? "opacity-60" : ""}`}
          >
            <div className="aspect-video bg-[#0f172a]">
              <img
                src={getImageUrl(
                  item.thumbnail_file || item.image_url || item.thumbnail_url,
                )}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/600x400/252a38/ffffff?text=No+Image";
                }}
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-white truncate flex-1">
                  {item.title}
                </h3>
                <button
                  onClick={() => toggleActive(item.id, item.is_active)}
                  className={`p-1.5 rounded-lg ${item.is_active ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}
                >
                  {item.is_active ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
              </div>
              <p className="text-gray-400 text-sm mb-1">
                {item.category || "Uncategorized"}
              </p>
              <p className="text-gray-500 text-xs mb-4">
                Order: {item.display_order}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                  <Edit size={14} />
                  Edit
                </button>
                {(item.website_url || item.url) && (
                  <a
                    href={item.website_url || item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 px-2 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex items-center justify-center gap-1 px-2 py-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No {type} found. Add your first one!</p>
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
                {editingItem ? "Edit" : "Add New"} {type.slice(0, -1)}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Image
                </label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-4">
                  {previewImage ? (
                    <div className="relative">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage(null);
                          setFormData({ ...formData, image_url: "" });
                        }}
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
                          <p className="text-gray-500 text-sm">
                            Click to upload image
                          </p>
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
                <label className="block text-gray-400 text-sm mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 h-24"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              {(type === "websites" || type === "uiux") && (
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    {type === "websites" ? "Website URL" : "Prototype URL"}
                  </label>
                  <input
                    type="url"
                    value={formData.website_url}
                    onChange={(e) =>
                      setFormData({ ...formData, website_url: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="https://..."
                  />
                </div>
              )}
              {type === "videos" && (
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Video File (MP4)
                  </label>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-4">
                    {previewVideo ? (
                      <div className="relative">
                        <video
                          src={previewVideo}
                          className="w-full h-40 object-cover rounded-lg"
                          controls
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewVideo(null);
                            setFormData({ ...formData, video_url: "" });
                          }}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div
                        className="flex flex-col items-center justify-center h-24 cursor-pointer"
                        onClick={() => videoInputRef.current?.click()}
                      >
                        {uploading ? (
                          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-gray-500 mb-2" />
                            <p className="text-gray-500 text-sm">
                              Click to upload video
                            </p>
                          </>
                        )}
                      </div>
                    )}
                    <input
                      ref={videoInputRef}
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="hidden"
                    />
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        display_order: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) =>
                      setFormData({ ...formData, is_active: e.target.checked })
                    }
                    className="w-4 h-4"
                  />
                  <label htmlFor="is_active" className="text-gray-400 text-sm">
                    Active
                  </label>
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
                  {loading ? "Saving..." : editingItem ? "Update" : "Add"}{" "}
                  {type.slice(0, -1)}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminPortfolio;
