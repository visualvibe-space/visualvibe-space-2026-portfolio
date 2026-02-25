import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import {
  Send,
  CheckCircle,
  Loader2,
  Phone,
  Mail,
  Instagram,
  MessageSquare,
  User,
  Briefcase,
  Calendar,
  DollarSign,
  Clock,
  HelpCircle,
} from "lucide-react";

const Contact = () => {
  const [sectionRef, isVisible] = useScrollAnimation(0.1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    serviceType: "",
    projectType: "",
    description: "",
    budgetRange: "",
    preferredContact: "email",
    bestTime: "",
    source: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        serviceType: "",
        projectType: "",
        description: "",
        budgetRange: "",
        preferredContact: "email",
        bestTime: "",
        source: "",
      });
    }, 3000);
  };

  const inputClasses =
    "w-full px-4 py-3 bg-[#111827] border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all text-white placeholder-gray-500";
  const labelClasses = "block text-sm font-medium text-gray-300 mb-2";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding bg-[#0a0e17] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-blue-900/10 to-transparent" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-blue-600 bg-blue-950 rounded-full"
          >
            Get In Touch
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Start Your Project
          </h2>
          <p className="text-lg text-gray-300 w-full text-center mx-auto">
            Have a project in mind? Let's discuss how we can bring your vision
            to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Contact Information
              </h3>
              <p className="text-gray-300 mb-8">
                Fill out the form and our team will get back to you within 24
                hours.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+91 96019 82190",
                  link: "tel:+919601982190",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "visualvibe.space@gmail.com",
                  link: "mailto:visualvibe.space@gmail.com",
                },
                {
                  icon: Instagram,
                  label: "Follow Us",
                  value: "@visualvibe.space",
                  link: "https://instagram.com/visualvibe.space",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 bg-[#0f172a] rounded-xl hover:bg-[#111827] transition-colors cursor-pointer group border border-gray-800"
                >
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 w-full"
                  >
                    <div className="w-12 h-12 bg-[#111827] rounded-xl shadow-sm flex items-center justify-center group-hover:bg-blue-800 transition-colors">
                      <item.icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{item.label}</p>
                      <p className="font-medium text-white">{item.value}</p>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Process steps */}
            <div className="pt-8 border-t border-gray-800">
              <h4 className="font-bold text-white mb-4">Our Process</h4>
              <div className="space-y-3 mt-3">
                {[
                  { step: 1, text: "Fill Form" },
                  { step: 2, text: "We Review" },
                  { step: 3, text: "Get Quote" },
                  { step: 4, text: "Start Project" },
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-900/50 text-blue-600 flex items-center justify-center text-sm font-bold">
                      {item.step}
                    </div>
                    <span className="text-gray-300">{item.text}</span>
                    {index < 3 && (
                      <div className="flex-1 h-px bg-gray-800 mx-2" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-[#0f172a] rounded-3xl shadow-xl p-8 md:p-10 border border-gray-800">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-20 h-20 text-blue-700 mb-6" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-300">
                    We've received your enquiry and will get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    className="space-y-6"
                  >
                    {/* Personal Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div variants={itemVariants}>
                        <label className={labelClasses}>
                          <User className="w-4 h-4 inline mr-2" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className={inputClasses}
                          placeholder="John Doe"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label className={labelClasses}>
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={inputClasses}
                          placeholder="john@example.com"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label className={labelClasses}>
                          <Phone className="w-4 h-4 inline mr-2" />
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className={inputClasses}
                          placeholder="+91 98765 43210"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label className={labelClasses}>
                          <Briefcase className="w-4 h-4 inline mr-2" />
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          className={inputClasses}
                          placeholder="Your Company"
                        />
                      </motion.div>
                    </div>

                    {/* Project Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div variants={itemVariants}>
                        <label className={labelClasses}>Service Type *</label>
                        <select
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleChange}
                          required
                          className={inputClasses}
                        >
                          <option value="">Select a service</option>
                          <option value="logo">Logo Design</option>
                          <option value="website">Website Development</option>
                          <option value="app">App Development</option>
                          <option value="uiux">UI/UX Design</option>
                          <option value="video">Video Editing</option>
                          <option value="marketing">Digital Marketing</option>
                          <option value="other">Other</option>
                        </select>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label className={labelClasses}>Project Type *</label>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          required
                          className={inputClasses}
                        >
                          <option value="">Select project type</option>
                          <option value="new">New Project</option>
                          <option value="redesign">Redesign</option>
                        </select>
                      </motion.div>
                    </div>

                    <motion.div variants={itemVariants}>
                      <label className={labelClasses}>
                        <MessageSquare className="w-4 h-4 inline mr-2" />
                        Project Description *
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        className={inputClasses}
                        placeholder="Tell us about your project requirements..."
                      />
                    </motion.div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <motion.div variants={itemVariants}>
                        <label className={labelClasses}>
                          <DollarSign className="w-4 h-4 inline mr-2" />
                          Budget Range
                        </label>
                        <select
                          name="budgetRange"
                          value={formData.budgetRange}
                          onChange={handleChange}
                          className={inputClasses}
                        >
                          <option value="">Select budget</option>
                          <option value="under10k">Under ₹10K</option>
                          <option value="10k-25k">₹10K – ₹25K</option>
                          <option value="25k-50k">₹25K – ₹50K</option>
                          <option value="50k+">₹50K+</option>
                        </select>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label className={labelClasses}>
                          Preferred Contact *
                        </label>
                        <select
                          name="preferredContact"
                          value={formData.preferredContact}
                          onChange={handleChange}
                          required
                          className={inputClasses}
                        >
                          <option value="email">Email</option>
                          <option value="phone">Phone</option>
                          <option value="whatsapp">WhatsApp</option>
                        </select>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label className={labelClasses}>
                          <Clock className="w-4 h-4 inline mr-2" />
                          Best Time to Contact
                        </label>
                        <input
                          type="time"
                          name="bestTime"
                          value={formData.bestTime}
                          onChange={handleChange}
                          className={inputClasses}
                        />
                      </motion.div>
                    </div>

                    <motion.div variants={itemVariants}>
                      <label className={labelClasses}>
                        <HelpCircle className="w-4 h-4 inline mr-2" />
                        How did you hear about us?
                      </label>
                      <select
                        name="source"
                        value={formData.source}
                        onChange={handleChange}
                        className={inputClasses}
                      >
                        <option value="">Select an option</option>
                        <option value="instagram">Instagram</option>
                        <option value="google">Google</option>
                        <option value="reference">Reference</option>
                        <option value="other">Other</option>
                      </select>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-blue-800 text-white font-medium rounded-xl hover:bg-blue-900 disabled:opacity-70 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Submit Enquiry
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
