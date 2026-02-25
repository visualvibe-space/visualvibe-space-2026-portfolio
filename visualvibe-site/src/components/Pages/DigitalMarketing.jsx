import { motion } from "framer-motion";
import {
  ArrowLeft,
  TrendingUp,
  Target,
  Users,
  BarChart3,
  Megaphone,
} from "lucide-react";
import { Link } from "react-router-dom";

const DigitalMarketing = () => {
  const services = [
    {
      title: "Search Engine Optimization",
      description:
        "Improve your website's visibility in search results and drive organic traffic.",
      items: [
        "Keyword Research",
        "On-Page SEO",
        "Off-Page SEO",
        "Technical SEO",
        "Local SEO",
        "SEO Audits",
      ],
      color: "from-blue-500 to-cyan-400",
    },
    {
      title: "Social Media Marketing",
      description:
        "Build brand awareness and engage with your audience on social platforms.",
      items: [
        "Facebook Marketing",
        "Instagram Marketing",
        "LinkedIn Marketing",
        "Content Strategy",
        "Community Management",
        "Influencer Marketing",
      ],
      color: "from-pink-500 to-rose-400",
    },
    {
      title: "Pay-Per-Click Advertising",
      description:
        "Drive immediate traffic with targeted paid advertising campaigns.",
      items: [
        "Google Ads",
        "Facebook Ads",
        "Instagram Ads",
        "Retargeting",
        "Campaign Optimization",
        "A/B Testing",
      ],
      color: "from-green-500 to-emerald-400",
    },
    {
      title: "Content Marketing",
      description:
        "Create valuable content to attract and engage your target audience.",
      items: [
        "Blog Writing",
        "Video Content",
        "Infographics",
        "Case Studies",
        "E-books",
        "Content Distribution",
      ],
      color: "from-purple-500 to-violet-400",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Analysis",
      description:
        "We analyze your business, target audience, and competitors.",
    },
    {
      step: "02",
      title: "Strategy",
      description: "We develop a customized digital marketing strategy.",
    },
    {
      step: "03",
      title: "Implementation",
      description: "We execute campaigns across selected platforms.",
    },
    {
      step: "04",
      title: "Optimization",
      description: "We continuously monitor and optimize for better results.",
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
              Digital{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Marketing
              </span>
            </h1>
            <p className="text-xl text-gray-400 ">
              Boost your online presence and reach more customers with our
              data-driven digital marketing strategies.
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
              Our Marketing Services
            </h2>
            <p className="text-gray-400 mx-auto">
              Comprehensive digital marketing solutions tailored to grow your
              business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
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
                    {index === 0 && <Target className="w-8 h-8 text-white" />}
                    {index === 1 && <Users className="w-8 h-8 text-white" />}
                    {index === 2 && (
                      <TrendingUp className="w-8 h-8 text-white" />
                    )}
                    {index === 3 && (
                      <Megaphone className="w-8 h-8 text-white" />
                    )}
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
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
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
            <h2 className="text-4xl font-bold text-white mb-4">Our Process</h2>
            <p className="text-gray-400 mx-auto">
              A systematic approach to deliver measurable results for your
              business.
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
                <div className="text-6xl font-bold text-blue-500/20 mb-4">
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

      <section className="py-20 bg-[#0f172a]">
        <div className="container-custom px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Grow Your Business?
            </h2>
            <p className="text-gray-400 mb-8 mx-auto pb-8">
              Let's discuss your digital marketing needs and create a strategy
              that works for you.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
            >
              Get Started
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DigitalMarketing;
