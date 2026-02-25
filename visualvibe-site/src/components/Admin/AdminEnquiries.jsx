import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Trash2, Search, Download, X } from "lucide-react";
import { enquiriesApi } from "../../services/api";

const AdminEnquiries = ({ initialData = [], onRefresh }) => {
  const [enquiries, setEnquiries] = useState(initialData);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const statusOptions = ["pending", "reviewed", "contacted", "archived"];

  const handleStatusChange = async (id, newStatus) => {
    setLoading(true);
    try {
      await enquiriesApi.update(id, { status: newStatus });
      setEnquiries(enquiries.map(e => e.id === id ? { ...e, status: newStatus } : e));
      if (onRefresh) await onRefresh();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this enquiry?")) {
      try {
        await enquiriesApi.delete(id);
        setEnquiries(enquiries.filter(e => e.id !== id));
        if (onRefresh) await onRefresh();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesStatus = filterStatus === "all" || enquiry.status === filterStatus;
    const matchesSearch = searchTerm === "" || 
      (enquiry.full_name && enquiry.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (enquiry.email && enquiry.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (enquiry.service_type && enquiry.service_type.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const statusColors = {
    pending: "bg-yellow-500/20 text-yellow-400",
    reviewed: "bg-blue-500/20 text-blue-400",
    contacted: "bg-green-500/20 text-green-400",
    archived: "bg-gray-500/20 text-gray-400",
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Enquiries</h1>
          <p className="text-gray-400">Manage client enquiries and follow-ups</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Download size={20} />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search enquiries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1a2234] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-[#1a2234] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Status</option>
          {statusOptions.map(status => (
            <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Enquiries Table */}
      <div className="bg-[#1a2234] rounded-2xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 bg-[#0f172a]">
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Name</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Email</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Phone</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Service</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Status</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Date</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEnquiries.map((enquiry) => (
                <motion.tr
                  key={enquiry.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-800/50 hover:bg-gray-800/30"
                >
                  <td className="py-4 px-6 text-white font-medium">{enquiry.full_name || "N/A"}</td>
                  <td className="py-4 px-6 text-gray-400">{enquiry.email || "N/A"}</td>
                  <td className="py-4 px-6 text-gray-400">{enquiry.phone || "N/A"}</td>
                  <td className="py-4 px-6 text-gray-400">{enquiry.service_type || "N/A"}</td>
                  <td className="py-4 px-6">
                    <select
                      value={enquiry.status || "pending"}
                      onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                      disabled={loading}
                      className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${statusColors[enquiry.status] || statusColors.pending}`}
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status} className="bg-[#1a2234]">
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-4 px-6 text-gray-500 text-sm">
                    {enquiry.created_at ? new Date(enquiry.created_at).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedEnquiry(enquiry)}
                        className="p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(enquiry.id)}
                        className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredEnquiries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No enquiries found.</p>
        </div>
      )}

      {/* Enquiry Detail Modal */}
      <AnimatePresence>
        {selectedEnquiry && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#1a2234] rounded-2xl p-6 w-full max-w-2xl border border-gray-800 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedEnquiry.full_name || "Enquiry"}</h2>
                  <p className="text-gray-400 text-sm">Enquiry #{selectedEnquiry.id}</p>
                </div>
                <button onClick={() => setSelectedEnquiry(null)} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-500 text-sm">Email</label>
                    <p className="text-white">{selectedEnquiry.email || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-gray-500 text-sm">Phone</label>
                    <p className="text-white">{selectedEnquiry.phone || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-gray-500 text-sm">Company</label>
                    <p className="text-white">{selectedEnquiry.company || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-gray-500 text-sm">Location</label>
                    <p className="text-white">{selectedEnquiry.location || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-gray-500 text-sm">Service Type</label>
                    <p className="text-white">{selectedEnquiry.service_type || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-gray-500 text-sm">Budget Range</label>
                    <p className="text-white">{selectedEnquiry.budget_range || "N/A"}</p>
                  </div>
                </div>
                {selectedEnquiry.project_description && (
                  <div>
                    <label className="text-gray-500 text-sm">Project Description</label>
                    <p className="text-white mt-1">{selectedEnquiry.project_description}</p>
                  </div>
                )}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                  <label className="text-gray-500 text-sm">Status:</label>
                  <select
                    value={selectedEnquiry.status || "pending"}
                    onChange={(e) => {
                      handleStatusChange(selectedEnquiry.id, e.target.value);
                      setSelectedEnquiry({ ...selectedEnquiry, status: e.target.value });
                    }}
                    className={`px-3 py-1 rounded-full text-sm font-medium border-0 cursor-pointer ${statusColors[selectedEnquiry.status] || statusColors.pending}`}
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status} className="bg-[#1a2234]">
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminEnquiries;
