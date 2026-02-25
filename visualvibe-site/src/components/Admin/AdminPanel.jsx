import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AdminDashboard from "./AdminDashboard";
import AdminTeam from "./AdminTeam";
import AdminEnquiries from "./AdminEnquiries";
import AdminPortfolio from "./AdminPortfolio";
import { 
  authApi, 
  adminApi, 
  teamApi, 
  websitesApi, 
  logosApi, 
  flyersApi, 
  graphicsApi, 
  uiuxApi, 
  videosApi, 
  enquiriesApi 
} from "../../services/api";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [dashboardStats, setDashboardStats] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [websites, setWebsites] = useState([]);
  const [logos, setLogos] = useState([]);
  const [flyers, setFlyers] = useState([]);
  const [graphics, setGraphics] = useState([]);
  const [uiux, setUiux] = useState([]);
  const [videos, setVideos] = useState([]);
  const [enquiries, setEnquiries] = useState([]);

  const checkAuth = useCallback(async () => {
    try {
      const response = await authApi.check();
      if (response.authenticated) {
        setIsLoggedIn(true);
        await loadAllData();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadAllData = async () => {
    try {
      const [statsData, teamData, websitesData, logosData, flyersData, graphicsData, uiuxData, videosData, enquiriesData] = await Promise.allSettled([
        adminApi.getStats().catch(() => null),
        teamApi.getAll().catch(() => []),
        websitesApi.getAll().catch(() => []),
        logosApi.getAll().catch(() => []),
        flyersApi.getAll().catch(() => []),
        graphicsApi.getAll().catch(() => []),
        uiuxApi.getAll().catch(() => []),
        videosApi.getAll().catch(() => []),
        enquiriesApi.getAll().catch(() => []),
      ]);

      setDashboardStats(statsData.value);
      
      if (Array.isArray(teamData.value)) {
        setTeamMembers(teamData.value);
      } else if (teamData.value && typeof teamData.value === 'object') {
        const grouped = teamData.value;
        const flatTeam = [];
        Object.values(grouped).forEach(category => {
          if (Array.isArray(category)) {
            flatTeam.push(...category);
          }
        });
        setTeamMembers(flatTeam);
      } else {
        setTeamMembers([]);
      }

      setWebsites(websitesData.value || []);
      setLogos(logosData.value || []);
      setFlyers(flyersData.value || []);
      
      if (Array.isArray(graphicsData.value)) {
        setGraphics(graphicsData.value);
      } else if (graphicsData.value && typeof graphicsData.value === 'object') {
        const grouped = graphicsData.value;
        const flatGraphics = [];
        Object.values(grouped).forEach(type => {
          if (Array.isArray(type)) {
            flatGraphics.push(...type);
          }
        });
        setGraphics(flatGraphics);
      } else {
        setGraphics([]);
      }

      setUiux(uiuxData.value || []);
      setVideos(videosData.value || []);
      setEnquiries(enquiriesData.value || []);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogin = async (username, password) => {
    try {
      await authApi.login(username, password);
      setIsLoggedIn(true);
      await loadAllData();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    setIsLoggedIn(false);
    setTeamMembers([]);
    setWebsites([]);
    setLogos([]);
    setFlyers([]);
    setGraphics([]);
    setUiux([]);
    setVideos([]);
    setEnquiries([]);
    navigate("/");
  };

  const refreshData = async () => {
    await loadAllData();
  };

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <AdminDashboard stats={dashboardStats} enquiries={enquiries} />;
      case "team":
        return <AdminTeam initialData={teamMembers} onRefresh={refreshData} />;
      case "websites":
        return <AdminPortfolio 
          type="websites" 
          title="Website Portfolio" 
          initialItems={websites} 
          onRefresh={refreshData}
          api={websitesApi}
        />;
      case "logos":
        return <AdminPortfolio 
          type="logos" 
          title="Logo Portfolio" 
          initialItems={logos} 
          onRefresh={refreshData}
          api={logosApi}
        />;
      case "flyers":
        return <AdminPortfolio 
          type="flyers" 
          title="Flyers & Posters" 
          initialItems={flyers} 
          onRefresh={refreshData}
          api={flyersApi}
        />;
      case "graphics":
        return <AdminPortfolio 
          type="graphics" 
          title="Graphic Designs" 
          initialItems={graphics} 
          onRefresh={refreshData}
          api={graphicsApi}
        />;
      case "uiux":
        return <AdminPortfolio 
          type="uiux" 
          title="UI/UX Designs" 
          initialItems={uiux} 
          onRefresh={refreshData}
          api={uiuxApi}
        />;
      case "videos":
        return <AdminPortfolio 
          type="videos" 
          title="Portfolio Videos" 
          initialItems={videos} 
          onRefresh={refreshData}
          api={videosApi}
        />;
      case "enquiries":
        return <AdminEnquiries initialData={enquiries} onRefresh={refreshData} />;
      default:
        return <AdminDashboard stats={dashboardStats} enquiries={enquiries} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center p-4">
        <div className="bg-[#1a2234] rounded-2xl p-8 w-full max-w-md border border-gray-800">
          <h1 className="text-2xl font-bold text-white text-center mb-6">Admin Login</h1>
          <LoginForm onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  return (
    <AdminLayout 
      activeSection={activeSection} 
      setActiveSection={setActiveSection}
      onLogout={handleLogout}
    >
      {renderSection()}
    </AdminLayout>
  );
};

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    const result = await onLogin(username, password);
    
    if (!result.success) {
      setError(result.error || "Invalid credentials");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}
      <div>
        <label className="block text-gray-400 text-sm mb-2">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-400 text-sm mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default AdminPanel;
