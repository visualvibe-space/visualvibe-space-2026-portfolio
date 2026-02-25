import { useState } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Image, 
  Users, 
  Folder, 
  MessageSquare, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Video
} from "lucide-react";

const AdminLayout = ({ children, activeSection, setActiveSection, onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "team", label: "Team Members", icon: Users },
    { id: "websites", label: "Website Portfolio", icon: Folder },
    { id: "logos", label: "Logo Portfolio", icon: Folder },
    { id: "flyers", label: "Flyers & Posters", icon: Image },
    { id: "graphics", label: "Graphic Designs", icon: Image },
    { id: "uiux", label: "UI/UX Designs", icon: Folder },
    { id: "videos", label: "Portfolio Videos", icon: Video },
    { id: "enquiries", label: "Enquiries", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e17] flex">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 280 }}
        className="hidden md:flex flex-col bg-[#111827] border-r border-gray-800 fixed h-full z-40"
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <h1 className={`font-bold text-white whitespace-nowrap ${collapsed ? 'text-xl' : 'text-2xl'}`}>
            {collapsed ? "VV" : "Visual Vibes"}
          </h1>
          <p className={`text-gray-400 whitespace-nowrap ${collapsed ? 'text-xs' : 'text-sm'}`}>
            {collapsed ? "Admin" : "Admin Panel"}
          </p>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-6 py-3 transition-all ${
                  activeSection === item.id
                    ? "bg-blue-600 text-white border-l-4 border-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <IconComponent size={20} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-4 border-t border-gray-800 text-gray-400 hover:text-white transition-colors flex items-center justify-center"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="p-4 border-t border-gray-800 text-red-400 hover:text-red-300 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </motion.aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            className="absolute left-0 top-0 bottom-0 w-[280px] bg-[#111827] border-r border-gray-800"
          >
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <div>
                <h1 className="font-bold text-white text-2xl">Visual Vibes</h1>
                <p className="text-gray-400 text-sm">Admin Panel</p>
              </div>
              <button onClick={() => setMobileOpen(false)} className="text-gray-400">
                <X size={24} />
              </button>
            </div>
            <nav className="py-4">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-6 py-3 transition-all ${
                      activeSection === item.id
                        ? "bg-blue-600 text-white"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <IconComponent size={20} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
            <button
              onClick={onLogout}
              className="absolute bottom-0 w-full p-4 border-t border-gray-800 text-red-400 hover:text-red-300 transition-colors flex items-center gap-2"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </motion.aside>
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 ${collapsed ? 'md:ml-20' : 'md:ml-[280px]'}`}>
        {/* Mobile Header */}
        <header className="md:hidden bg-[#111827] border-b border-gray-800 p-4 flex items-center justify-between">
          <h1 className="font-bold text-white">Admin Panel</h1>
          <button onClick={() => setMobileOpen(true)} className="text-white">
            <Menu size={24} />
          </button>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
