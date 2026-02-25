import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { Link } from "react-router-dom";

const TermsAndConditions = ({ onClose }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = [
    {
      title: "1. Introduction",
      text: "These Terms and Conditions govern the use of this Client Form and the services provided by Visual Vibe™. By engaging with our services, you agree to comply with these terms.",
    },
    {
      title: "2. Client Information",
      text: "Clients must provide accurate and complete details required for the project. Visual Vibe™ is not responsible for delays or issues caused by incorrect or incomplete information.",
    },
    {
      title: "3. Scope of Services",
      text: "Visual Vibe™ offers the following services:",
      list: [
        "Video Editing & Motion Graphics",
        "Logo & Brand Design",
        "Website Development",
        "Posters & Flyers Designing",
        "2D & 3D Graphic Design",
        "Android App Development",
        "Custom Merchandise Printing",
        "UI/UX Design",
        "Digital Marketing",
      ],
      note: "Each project scope will be defined before the start. Any additional requests outside the agreed scope will be treated as a separate service.",
    },
    {
      title: "4. Pricing & Fees",
      text: "All pricing will be discussed and finalized before project initiation. Costs may vary depending on complexity, revisions, timelines, and additional requirements.",
    },
    {
      title: "5. Payment Terms",
      list: [
        "A 30% advance payment is mandatory to start the project.",
        "The advance payment is non-refundable.",
        "Remaining payment must be completed before final delivery.",
        "Delay in payment may result in project pause or delayed delivery.",
      ],
    },
    {
      title: "6. Revisions Policy",
      text: "A limited number of revisions will be included as per project agreement. Extra revisions or major changes after approval may incur additional charges.",
    },
    {
      title: "7. Project Timelines",
      text: "Project timelines will be shared in advance. Delays caused by the client (late responses, missing content, etc.) may affect delivery timelines.",
    },
    {
      title: "8. Confidentiality",
      text: "All client data, files, and project details will remain confidential. We do not share client information without permission unless required by law.",
    },
    {
      title: "9. Intellectual Property",
      text: "Final deliverables will be transferred to the client after full payment. Visual Vibe™ reserves the right to showcase completed work in portfolio or marketing unless otherwise agreed.",
    },
    {
      title: "10. Project Cancellation",
      text: "If the client cancels the project, the advance payment will not be refunded. Work completed beyond the advance amount will be billed accordingly.",
    },
    {
      title: "11. Liability",
      text: "Visual Vibe™ is not liable for any direct or indirect damages arising from the use of our services. Total liability is limited to the amount paid for the specific service.",
    },
    {
      title: "12. Amendments",
      text: "We reserve the right to update these Terms & Conditions at any time. Clients will be informed of significant changes.",
    },
    {
      title: "13. Governing Law",
      text: "These Terms and Conditions are governed by the laws of India.",
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

          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Terms & Conditions
          </h1>
          <p className="text-xl text-gray-300 mb-12 text-center">
            Visual Vibe™
          </p>

          <div className="space-y-8">
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
                {item.note && (
                  <p className="mt-3 text-gray-400 text-sm italic">
                    {item.note}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          <p className="mt-12 text-center text-gray-500 text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.div>
    </div>
  );
};
export default TermsAndConditions;
