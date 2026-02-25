import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "./components/Layout/Navigation";
import Footer from "./components/Layout/Footer";
const TapeSection = lazy(() => import("./components/UI/TapeSection"));

const Hero = lazy(() => import("./components/Sections/Hero"));
const About = lazy(() => import("./components/Sections/About"));
const Services = lazy(() => import("./components/Sections/Services"));
const ToolboxMapSection = lazy(() => import("./components/Sections/ToolboxMapSection"));
const Founders = lazy(() => import("./components/Sections/Founders"));
const Team = lazy(() => import("./components/Sections/Team"));
const Contact = lazy(() => import("./components/Sections/Contact"));
const TermsAndConditions = lazy(() => import("./components/Pages/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("./components/Pages/PrivacyPolicy"));

const WebsiteDevelopment = lazy(() => import("./components/Pages/WebsiteDevelopment"));
const UIUXDesign = lazy(() => import("./components/Pages/UIUXDesign"));
const GraphicDesigns = lazy(() => import("./components/Pages/GraphicDesigns"));
const VideoEditing = lazy(() => import("./components/Pages/VideoEditing"));
const DigitalMarketing = lazy(() => import("./components/Pages/DigitalMarketing"));
const PostersFlyers = lazy(() => import("./components/Pages/PostersFlyers"));
const AndroidApp = lazy(() => import("./components/Pages/AndroidApp"));
const LogoBrandDesign = lazy(() => import("./components/Pages/LogoBrandDesign"));
const AdminPanel = lazy(() => import("./components/Admin/AdminPanel"));

function SectionWrapper({ children }) {
  return children;
}

function PageSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-20 bg-gray-900" />
      <div className="h-[80vh] bg-gray-800" />
      <div className="h-64 bg-gray-800" />
      <div className="h-[60vh] bg-gray-800" />
      <div className="h-[70vh] bg-gray-800" />
      <div className="h-[50vh] bg-gray-800" />
      <div className="h-[60vh] bg-gray-800" />
      <div className="h-96 bg-gray-800" />
      <div className="h-64 bg-gray-900" />
    </div>
  );
}

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isTermsOpen = location.pathname === "/terms";
  const isPrivacyOpen = location.pathname === "/privacy";

  useEffect(() => {
    if (isTermsOpen || isPrivacyOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isTermsOpen, isPrivacyOpen]);

  const closeModal = () => {
    navigate("/");
  };

  return (
    <div className="relative">
      <Navigation />
      <Suspense fallback={<PageSkeleton />}>
        <main>
          <Hero />
          <TapeSection />
          <About />
          <Services />
          <ToolboxMapSection />
          <Founders />
        </main>
      </Suspense>
      <Footer />

      {(isTermsOpen || isPrivacyOpen) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={closeModal}
          />
          <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <SectionWrapper>
              {isTermsOpen && <TermsAndConditions onClose={closeModal} />}
              {isPrivacyOpen && <PrivacyPolicy onClose={closeModal} />}
            </SectionWrapper>
          </div>
        </div>
      )}
    </div>
  );
}

function TeamPage() {
  return (
    <div className="min-h-screen bg-[#0a0e17]">
      <Navigation />
      <Suspense fallback={<PageSkeleton />}>
        <Team />
      </Suspense>
      <Footer />
    </div>
  );
}

function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0e17]">
      <Navigation />
      <Suspense fallback={<PageSkeleton />}>
        <Contact />
      </Suspense>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/terms" element={<HomePage />} />
          <Route path="/privacy" element={<HomePage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services/website-development" element={<WebsiteDevelopment />} />
          <Route path="/services/uiux-design" element={<UIUXDesign />} />
          <Route path="/services/graphic-designs" element={<GraphicDesigns />} />
          <Route path="/services/video-editing" element={<VideoEditing />} />
          <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
          <Route path="/services/posters-flyers" element={<PostersFlyers />} />
          <Route path="/services/android-app-development" element={<AndroidApp />} />
          <Route path="/services/logo-brand-design" element={<LogoBrandDesign />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
