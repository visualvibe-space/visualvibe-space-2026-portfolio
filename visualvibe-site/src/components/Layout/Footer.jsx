import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Download,
} from "lucide-react";
import Logo from "../../assets/visual vibe logo.svg";
import Brochure from "../../assets/visual vibe brochure.pdf";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Logo Design", href: "/services/logo-brand-design" },
      { name: "Web Development", href: "/services/website-development" },
      { name: "App Development", href: "/services/android-app-development" },
      { name: "UI/UX Design", href: "/services/uiux-design" },
      { name: "Video Editing", href: "/services/video-editing" },
      { name: "Digital Marketing", href: "/services/digital-marketing" },
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Our Team", href: "/team" },
      { name: "Services", href: "#services" },
      { name: "Contact", href: "/contact" },
    ],
    support: [
      { name: "FAQ", href: "#" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Careers", href: "#" },
    ],
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/share/1AEhnoYA92/?mibextid=wwXIfr",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/visualvibe.space?igsh=YjByN2djdWM4bmU2",
      label: "Instagram",
    },
    {
      icon: Twitter,
      href: "https://x.com/spacevisualvibe?s=11",
      label: "Twitter",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/visual-vibe-71a24b393?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      label: "LinkedIn",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href) => {
    if (href === "#") return;
    if (href.startsWith("/")) {
      window.location.href = href;
      return;
    }
    if (href.startsWith("#")) {
      const isHomePage = window.location.pathname === "/";
      if (!isHomePage) {
        window.location.href = "/" + href;
        return;
      }
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <footer className="bg-[#0a0e17] text-white relative overflow-hidden pt-8">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main Footer Content */}
      <div className="container-custom relative z-10 pt-20 pb-10">
        {/* Top Section - CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-3xl p-8 md:p-12 mb-16"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">
                Let's Create Together
              </h3>
              <p className="text-blue-200">
                Ready to bring your vision to life? Reach out to discuss your
                project.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={() => scrollToSection("/contact")}
                className="flex items-center gap-2 px-8 py-4 bg-white text-blue-800 font-bold rounded-full hover:bg-gray-100"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Start a Project
                <ArrowUpRight className="w-5 h-5" />
              </motion.button>
              <motion.a
                href={Brochure}
                download="visualvibe-brochure.pdf"
                className="flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Download className="w-5 h-5" />
                Download Brochure
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 text-center md:text-left">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="inline-block text-3xl font-bold mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
              whileHover={{ scale: 1.05 }}
            >
              Visual Vibe™
            </motion.a>
            <p className="text-gray-400 md:text-left text-center px-8 sm:px-0">
              Your Idea, Our Vision. We craft stunning visual experiences that
              elevate brands and captivate audiences.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mt-6 justify-center md:justify-start">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-800 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-3 mt-6">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <motion.button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-blue-600 transition-colors text-center md:text-left"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-6">Company</h4>
            <ul className="space-y-3 mt-6">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <motion.button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-blue-600 transition-colors text-center md:text-left"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-6">Contact</h4>
            <ul className="space-y-4 mt-6">
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Phone className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+919601982190"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  +91 96019 82190
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:visualvibe.space@gmail.com"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  visualvibe.space@gmail.com
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Instagram className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <a
                  href="https://instagram.com/visualvibe.space"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  @visualvibe.space
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Visual Vibe™. All Rights Reserved.
            </p>

            <div className="flex items-center gap-6">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-blue-600 text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-blue-600 text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-gray-400 hover:text-blue-600 text-sm transition-colors"
              whileHover={{ y: -2 }}
            >
              Back to Top
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↑
              </motion.span>
            </motion.button>
          </div>
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-6xl md:text-8xl font-bold text-blue-900/20 select-none">
            Your Idea, Our Vision™
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
