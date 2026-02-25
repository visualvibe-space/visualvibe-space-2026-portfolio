import { motion } from "framer-motion";
import { 
  Image, 
  Users, 
  Folder, 
  MessageSquare, 
  Eye,
  Check,
  Clock,
  Archive
} from "lucide-react";

const AdminDashboard = ({ stats, enquiries = [] }) => {
  const enquiriesList = Array.isArray(enquiries) ? enquiries : [];
  
  const enquiryStats = [
    { 
      label: "Pending", 
      value: enquiriesList.filter(e => e.status === 'pending').length, 
      icon: Clock, 
      color: "text-yellow-400" 
    },
    { 
      label: "Reviewed", 
      value: enquiriesList.filter(e => e.status === 'reviewed').length, 
      icon: Eye, 
      color: "text-blue-400" 
    },
    { 
      label: "Contacted", 
      value: enquiriesList.filter(e => e.status === 'contacted').length, 
      icon: Check, 
      color: "text-green-400" 
    },
    { 
      label: "Archived", 
      value: enquiriesList.filter(e => e.status === 'archived').length, 
      icon: Archive, 
      color: "text-gray-400" 
    },
  ];

  const recentEnquiries = enquiriesList.slice(0, 5);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome to Visual Vibe Admin Panel</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#1a2234] rounded-2xl p-6 border border-gray-800"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-4">
            <Image className="w-6 h-6 text-white" />
          </div>
          <p className="text-3xl font-bold text-white mb-1">{stats?.slides || 0}</p>
          <p className="text-gray-400 text-sm">Total Slides</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1a2234] rounded-2xl p-6 border border-gray-800"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-white" />
          </div>
          <p className="text-3xl font-bold text-white mb-1">{stats?.team_members || 0}</p>
          <p className="text-gray-400 text-sm">Team Members</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1a2234] rounded-2xl p-6 border border-gray-800"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-400 flex items-center justify-center mb-4">
            <Folder className="w-6 h-6 text-white" />
          </div>
          <p className="text-3xl font-bold text-white mb-1">{(stats?.websites || 0) + (stats?.logos || 0)}</p>
          <p className="text-gray-400 text-sm">Portfolio Items</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#1a2234] rounded-2xl p-6 border border-gray-800"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-400 flex items-center justify-center mb-4">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <p className="text-3xl font-bold text-white mb-1">{stats?.enquiries_total || enquiriesList.length}</p>
          <p className="text-gray-400 text-sm">Total Enquiries</p>
        </motion.div>
      </div>

      {/* Enquiry Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-[#1a2234] rounded-2xl p-6 border border-gray-800 mb-8"
      >
        <h2 className="text-xl font-bold text-white mb-6">Enquiry Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {enquiryStats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                  <IconComponent className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Enquiries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-[#1a2234] rounded-2xl p-6 border border-gray-800"
      >
        <h2 className="text-xl font-bold text-white mb-6">Recent Enquiries</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Service</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentEnquiries.length > 0 ? recentEnquiries.map((enquiry) => (
                <tr key={enquiry.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                  <td className="py-3 px-4 text-white">{enquiry.full_name || "N/A"}</td>
                  <td className="py-3 px-4 text-gray-400">{enquiry.email || "N/A"}</td>
                  <td className="py-3 px-4 text-gray-400">{enquiry.service_type || "N/A"}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      enquiry.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      enquiry.status === 'reviewed' ? 'bg-blue-500/20 text-blue-400' :
                      enquiry.status === 'contacted' ? 'bg-green-500/20 text-green-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {enquiry.status || "pending"}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-400">
                    No enquiries yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
