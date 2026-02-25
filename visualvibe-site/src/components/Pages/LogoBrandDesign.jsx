import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  PenTool,
  Palette,
  Type,
  Crown,
  BadgeCheck,
  Layout,
} from "lucide-react";
import { Link } from "react-router-dom";
import { logosApi, graphicsApi } from "../../services/api";
import { getImageUrl } from "../../utils/image";

const LogoBrandDesign = () => {
  const [logos, setLogos] = useState([]);
  const [graphics, setGraphics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [logosData, graphicsData] = await Promise.all([
          logosApi.getAll(),
          graphicsApi.getAll(),
        ]);
        setLogos(logosData || []);

        if (graphicsData && typeof graphicsData === "object") {
          const brandingGraphics = (graphicsData["2D"] || []).filter(
            (g) =>
              g.category?.toLowerCase().includes("brand") ||
              g.category?.toLowerCase().includes("logo"),
          );
          setGraphics(brandingGraphics.slice(0, 6));
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const services = [
    {
      title: "Logo Design",
      description:
        "Unique, memorable logos that represent your brand identity.",
      items: [
        "Wordmark Logos",
        "Icon/Symbol Logos",
        "Combination Marks",
        "Mascot Logos",
        "Emblems",
      ],
      color: "from-yellow-500 to-orange-400",
      icon: PenTool,
    },
    {
      title: "Brand Identity",
      description: "Complete visual identity systems for your business.",
      items: [
        "Brand Guidelines",
        "Color Palette",
        "Typography",
        "Business Cards",
        "Letterheads",
      ],
      color: "from-purple-500 to-pink-400",
      icon: Palette,
    },
    {
      title: "Visual Design",
      description: "Consistent visual elements across all touchpoints.",
      items: [
        "Brand Strategy",
        "Visual Identity",
        "Brand Architecture",
        "Rebranding",
        "Brand Audit",
      ],
      color: "from-blue-500 to-cyan-400",
      icon: Layout,
    },
    {
      title: "Brand Assets",
      description: "Ready-to-use assets for all your marketing needs.",
      items: [
        "Social Media Kits",
        "Email Signatures",
        "Presentation Templates",
        " merchandise Designs",
      ],
      color: "from-green-500 to-emerald-400",
      icon: BadgeCheck,
    },
  ];

  const process = [
    {
      step: "01",
      title: "Discovery",
      description: "We learn about your business, values, and target audience.",
    },
    {
      step: "02",
      title: "Research",
      description: "We analyze your industry and competitors.",
    },
    {
      step: "03",
      title: "Design",
      description: "We create multiple logo concepts for you to choose.",
    },
    {
      step: "04",
      title: "Refinement",
      description: "We perfect the chosen design with your feedback.",
    },
    {
      step: "05",
      title: "Delivery",
      description: "We provide all file formats and brand guidelines.",
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
              Logo &{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Brand Design
              </span>
            </h1>
            <p className="text-xl text-gray-400 ">
              Crafting memorable brand identities that make lasting impressions.
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
              Our Branding Services
            </h2>
            <p className="text-gray-400  mx-auto">
              Comprehensive brand solutions to help your business stand out.
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
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
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

      {!loading && logos.length > 0 && (
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
                Our Logo Portfolio
              </h2>
              <p className="text-gray-400  mx-auto">
                Check out some of our recent logo designs.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {logos.slice(0, 8).map((logo, index) => (
                <motion.div
                  key={logo.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative bg-[#0f172a] rounded-2xl p-6 border border-gray-800 hover:border-yellow-500/50 transition-all"
                >
                  <div className="aspect-square flex items-center justify-center mb-4">
                    <img
                      src={getImageUrl(logo.image_url)}
                      alt={logo.title}
                      className="max-w-full max-h-32 object-contain group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <h4 className="text-white font-bold text-center">
                    {logo.title}
                  </h4>
                  <p className="text-gray-400 text-sm text-center">
                    {logo.category}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

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
              A collaborative approach to create your perfect brand.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-6">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-yellow-500/20 mb-3">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
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
              Ready to Build Your Brand?
            </h2>
            <p className="text-gray-400 mb-8 pb-8  mx-auto">
              Let's create a brand that tells your unique story.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-600 text-white font-semibold rounded-full hover:bg-yellow-700 transition-colors"
            >
              <Crown className="w-5 h-5" />
              Start Your Project
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LogoBrandDesign;
