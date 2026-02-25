import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Code, Server, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import websitesData from "../../data/websites.json";
import { websitesApi } from "../../services/api";
import { getImageUrl } from "../../utils/image";
import { ExpandableCardDemo } from "../UI/ExpandableCard";

const WebsiteDevelopment = () => {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const data = await websitesApi.getAll();
        setWebsites(data || []);
      } catch (err) {
        console.error("Error fetching websites:", err);
        setWebsites(websitesData.websites);
      } finally {
        setLoading(false);
      }
    };
    fetchWebsites();
  }, []);

  const technologies = [
    {
      title: "Frontend Development",
      icon: Code,
      items: websitesData.technology.frontend,
      color: "from-blue-500 to-cyan-400",
    },
    {
      title: "Backend Development",
      icon: Server,
      items: websitesData.technology.backend,
      color: "from-purple-500 to-pink-400",
    },
    {
      title: "Tools & Platforms",
      icon: Wrench,
      items: websitesData.technology.tools,
      color: "from-green-500 to-teal-400",
    },
  ];

  const cards = websites.map((site) => ({
    title: site.title,
    description: site.category || "Web Development",
    src: getImageUrl(site.image_url),
    ctaText: "Visit Website",
    ctaLink: site.website_url || "#",
    content: () => (
      <p>
        {site.description ||
          "A stunning website built with modern technologies."}
      </p>
    ),
  }));

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
              Website{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Development
              </span>
            </h1>
            <p className="text-xl text-gray-400 ">
              Crafting stunning, responsive websites that deliver exceptional
              user experiences and drive business growth.
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
              Our Technology Stack
            </h2>
            <p className="text-gray-400  mx-auto">
              We leverage cutting-edge technologies and modern frameworks to
              build robust, scalable, and high-performing websites.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {technologies.map((tech, index) => {
              const IconComponent = tech.icon;
              return (
                <motion.div
                  key={tech.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-[#1a2234] rounded-3xl p-8 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all hover:-translate-y-2"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tech.color} flex items-center justify-center mb-6`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {tech.title}
                  </h3>
                  <ul className="space-y-3">
                    {tech.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-gray-400"
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

      <section className="py-20 bg-gradient-to-b from-[#0f172a] to-[#0a0e17]">
        <div className="container-custom px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Our Website Portfolio
            </h2>
            <p className="text-gray-400 px-4 md:px-8 lg:px-72 mx-auto">
              Explore our collection of custom-built websites that showcase our
              technical expertise and creative design.
            </p>
          </motion.div>

          {loading ? (
            <div className=" mx-auto space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 bg-[#111827] rounded-xl border border-gray-800 flex gap-4"
                >
                  <div className="w-24 h-14 bg-gray-800 animate-pulse rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-800 rounded animate-pulse w-1/3" />
                    <div className="h-3 bg-gray-800 rounded animate-pulse w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ExpandableCardDemo cards={cards} />
          )}
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
              Need a Custom Website?
            </h2>
            <p className="text-gray-400 mb-8 pb-8 mx-auto">
              Let's build something amazing together. Contact us today!
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
            >
              Get Started
              <ExternalLink size={18} />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WebsiteDevelopment;
