import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone, Shield, X } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = ({ onClose }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const content = [
    {
      title: "1. Introduction",
      text: "At Visual Vibe, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our services.",
    },
    {
      title: "2. Information We Collect",
      text: "We may collect the following types of information:",
      list: [
        "Personal Information: Name, email address, phone number, business details",
        "Project Information: Content, media files, brand assets, and requirements shared by the client",
        "Technical Data: IP address, browser type, device information (for website usage)",
      ],
    },
    {
      title: "3. How We Use Your Information",
      text: "We use the collected data to:",
      list: [
        "Provide and manage our services (video editing, branding, websites, etc.)",
        "Communicate with you regarding your project",
        "Improve our services and user experience",
        "Process payments and invoices",
        "Send updates, offers, or service-related information (if applicable)",
      ],
    },
    {
      title: "4. Data Sharing",
      text: "We do not sell or rent your personal information. Your data may only be shared:",
      list: [
        "With trusted third-party tools (payment gateways, hosting services, etc.)",
        "When required by law or legal authorities",
      ],
    },
    {
      title: "5. Data Security",
      text: "We take appropriate security measures to protect your data from unauthorized access, loss, or misuse. However, no online system is 100% secure, and we cannot guarantee absolute security.",
    },
    {
      title: "6. Confidentiality of Client Content",
      text: "All files, designs, videos, and brand materials shared with Visual Vibe will be kept confidential. We will not use or share your content without permission, except for portfolio purposes (unless restricted by client).",
    },
    {
      title: "7. Cookies & Tracking",
      text: "If you use our website, we may use cookies to enhance user experience and analyze traffic. You can choose to disable cookies through your browser settings.",
    },
    {
      title: "8. Your Rights",
      text: "You have the right to:",
      list: [
        "Access the information we hold about you",
        "Request corrections or updates",
        "Request deletion of your data (subject to legal obligations)",
      ],
    },
    {
      title: "9. Third-Party Links",
      text: "Our website or services may contain links to third-party platforms. We are not responsible for their privacy practices.",
    },
    {
      title: "10. Policy Updates",
      text: "We may update this Privacy Policy from time to time. Any major changes will be communicated through our website or contact channels.",
    },
    {
      title: "11. Contact Us",
      text: "If you have any questions regarding this Privacy Policy, you can contact us at:",
      list: ["Email: visualvibe.space@gmail.com", "Phone: +91 96019 82190"],
    },
  ];

  return (
    <div className="bg-[#0a0e17] text-white rounded-2xl p-6 md:p-8">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
      >
        <X size={24} />
      </button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Title */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-center">
              Privacy Policy
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-12 text-center">Visual Vibe™</p>

          {/* Content */}
          <div className="space-y-8 mt-6">
            {content.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#111827] rounded-2xl p-6 border border-gray-800"
              >
                <h2 className="text-xl font-bold mb-3 text-blue-500">
                  {item.title}
                </h2>
                {item.text && (
                  <p className="text-gray-300 leading-relaxed">{item.text}</p>
                )}
                {item.list && (
                  <ul className="mt-3 space-y-2">
                    {item.list.map((listItem, listIndex) => (
                      <li
                        key={listIndex}
                        className="text-gray-300 flex items-start gap-2"
                      >
                        <span className="text-blue-500 mt-1">•</span>
                        {listItem}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-[#111827] rounded-2xl p-6 border border-gray-800"
          >
            <h2 className="text-xl font-bold mb-4 text-blue-500">
              Get in Touch
            </h2>
            <div className="space-y-3">
              <a
                href="mailto:visualvibe.space@gmail.com"
                className="flex items-center gap-3 text-gray-300 hover:text-blue-500 transition-colors"
              >
                <Mail className="w-5 h-5" />
                visualvibe.space@gmail.com
              </a>
              <a
                href="tel:+919601982190"
                className="flex items-center gap-3 text-gray-300 hover:text-blue-500 transition-colors"
              >
                <Phone className="w-5 h-5" />
                +91 96019 82190
              </a>
            </div>
          </motion.div>

          {/* Footer */}
          <p className="mt-12 text-center text-gray-500 text-sm pt-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.div>
      </div>
    );
  };

export default PrivacyPolicy;
