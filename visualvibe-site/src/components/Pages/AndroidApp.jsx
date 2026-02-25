import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Smartphone,
  Tablet,
  Watch,
  Play,
  AppWindow,
  Cloud,
  Lock,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const AndroidApp = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      title: "Native Android Apps",
      description:
        "High-performance apps built specifically for Android devices using Kotlin and Java.",
      items: [
        "Custom App Development",
        "UI/UX Design",
        "API Integration",
        "Performance Optimization",
      ],
      color: "from-green-500 to-emerald-400",
      icon: Smartphone,
    },
    {
      title: "Cross-Platform Apps",
      description:
        "Reach both Android and iOS users with a single codebase using Flutter or React Native.",
      items: [
        "Flutter Development",
        "React Native",
        "Shared Codebase",
        "Consistent UI/UX",
      ],
      color: "from-blue-500 to-cyan-400",
      icon: AppWindow,
    },
    {
      title: "Enterprise Apps",
      description:
        "Scalable business solutions for internal processes and customer engagement.",
      items: [
        "Business Apps",
        "ERP Solutions",
        "CRM Integration",
        "Inventory Management",
      ],
      color: "from-purple-500 to-violet-400",
      icon: Tablet,
    },
    {
      title: "App Maintenance",
      description:
        "Ongoing support and updates to keep your app running smoothly.",
      items: [
        "Bug Fixes",
        "Security Updates",
        "Feature Updates",
        "Performance Monitoring",
      ],
      color: "from-orange-500 to-red-400",
      icon: Zap,
    },
  ];

  const features = [
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Apps that work perfectly on any device size",
    },
    {
      icon: Cloud,
      title: "Cloud Integration",
      description: "Seamless sync and backup with cloud services",
    },
    {
      icon: Lock,
      title: "Secure Apps",
      description: "Enterprise-grade security for your data",
    },
    {
      icon: Zap,
      title: "Fast Performance",
      description: "Optimized code for smooth user experience",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Discovery",
      description: "We understand your requirements and target audience.",
    },
    {
      step: "02",
      title: "Design",
      description: "We create wireframes and UI/UX designs.",
    },
    {
      step: "03",
      title: "Development",
      description: "We build your app with regular updates.",
    },
    {
      step: "04",
      title: "Launch",
      description: "We deploy to Play Store and provide support.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e17]">
      <section className="relative min-h-[60vh] flex items-center justify-center pt-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon fill='white' points='0,1000 1000,0 1000,1000'/%3E%3C/svg%3E")`,
            backgroundSize: "cover",
          }}
        />

        <div className="container-custom relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white mb-8 hover:bg-white/20 transition-all"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Android{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                App Development
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Building powerful, user-friendly mobile applications that engage
              users and drive business growth.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#0f172a]">
        <div className="container-custom px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Our App Services
            </h2>
            <p className="text-gray-400  mx-auto">
              Comprehensive mobile solutions for your business needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-[#1a2234] rounded-3xl p-8 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all hover:-translate-y-2"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-gray-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-400 mx-auto">
              We deliver exceptional mobile experiences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-[#0f172a] rounded-2xl p-6 text-center border border-gray-800 hover:border-green-500/50 transition-all"
                >
                  <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-7 h-7 text-green-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0f172a]">
        <div className="container-custom px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Process</h2>
            <p className="text-gray-400  mx-auto">
              From idea to launch, we guide you through every step.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-6xl font-bold text-green-500/20 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Have an App Idea?
            </h2>
            <p className="text-gray-400 mb-8 pb-8 mx-auto">
              Let's turn your idea into a successful mobile application.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors"
            >
              <Play className="w-5 h-5" />
              Start Your Project
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AndroidApp;
