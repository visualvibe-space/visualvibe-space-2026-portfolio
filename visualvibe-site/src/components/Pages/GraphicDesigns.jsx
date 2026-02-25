import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Square, Box, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { graphicsApi } from "../../services/api";
import { getImageUrl } from "../../utils/image";
import { ExpandableCardDemo } from "../UI/ExpandableCard";

const GraphicDesigns = () => {
  const [graphics, setGraphics] = useState({ "2D": [], "3D": [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGraphics = async () => {
      try {
        const data = await graphicsApi.getAll();
        if (data && typeof data === "object") {
          setGraphics(data);
        }
      } catch (err) {
        console.error("Error fetching graphics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGraphics();
  }, []);

  const services2D = [
    {
      title: "Logo Design",
      items: ["Brand Logos", "Wordmarks", "Icon Symbols", "Mascot Designs"],
    },
    {
      title: "Print Design",
      items: ["Business Cards", "Brochures", "Flyers", "Posters"],
    },
    {
      title: "Social Media",
      items: ["Instagram Posts", "Facebook Covers", "YouTube Thumbnails"],
    },
    {
      title: "Packaging",
      items: ["Product Packaging", "Labels", "Box Designs"],
    },
  ];

  const services3D = [
    {
      title: "3D Modeling",
      items: ["Product Models", "Character Models", "Architectural Viz"],
    },
    {
      title: "3D Animation",
      items: ["Product Animations", "Logo Animations", "Explainer Videos"],
    },
    {
      title: "Rendering",
      items: ["Product Renders", "Interior Renders", "Exterior Renders"],
    },
    {
      title: "Motion Graphics",
      items: ["Title Sequences", "Infographics", "Transitions"],
    },
  ];

  const software2D = [
    "Adobe Photoshop",
    "Adobe Illustrator",
    "CorelDRAW",
    "Figma",
    "Canva",
  ];
  const software3D = ["Blender", "3ds Max", "Maya", "Cinema 4D", "ZBrush"];

  const cards2D = (graphics["2D"] || []).map((item) => ({
    title: item.title,
    description: item.category || "2D Design",
    src: getImageUrl(item.image_url || item.thumbnail_url),
    ctaText: "View",
    ctaLink: item.image_url || "#",
    content: () => (
      <p>
        {item.description ||
          "A stunning 2D design piece showcasing creativity and professionalism."}
      </p>
    ),
  }));

  const cards3D = (graphics["3D"] || []).map((item) => ({
    title: item.title,
    description: item.category || "3D Design",
    src: getImageUrl(item.image_url || item.thumbnail_url),
    ctaText: "View",
    ctaLink: item.image_url || "#",
    content: () => (
      <p>
        {item.description ||
          "A high-quality 3D render demonstrating technical expertise."}
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
              2D & 3D{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Graphic Design
              </span>
            </h1>
            <p className="text-xl text-gray-400 ">
              Creating stunning visual experiences with both 2D and 3D graphics
              for various applications and platforms.
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
              2D Design Services
            </h2>
            <p className="text-gray-400  mx-auto">
              Professional graphic design services for all your visual needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {services2D.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#1a2234] rounded-3xl p-8 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-6">
                  <Square className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <ul className="space-y-3">
                  {service.items.map((item, idx) => (
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
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#1a2234] rounded-3xl p-8 border border-white/10 backdrop-blur-sm"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-teal-400 flex items-center justify-center">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  2D Design Software
                </h3>
                <p className="text-gray-400">
                  Professional tools for 2D graphic design
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {software2D.map((item, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-[#111827] rounded-full text-gray-300 text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {!loading && cards2D.length > 0 && (
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
                Our 2D Works
              </h2>
              <p className="text-gray-400  mx-auto">
                Explore our creative 2D design portfolio.
              </p>
            </motion.div>

            <ExpandableCardDemo cards={cards2D} />
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
            <h2 className="text-4xl font-bold text-white mb-4">
              3D Design Services
            </h2>
            <p className="text-gray-400  mx-auto">
              Professional 3D visualization and modeling services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {services3D.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#1a2234] rounded-3xl p-8 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center mb-6">
                  <Box className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <ul className="space-y-3">
                  {service.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-gray-400"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#1a2234] rounded-3xl p-8 border border-white/10 backdrop-blur-sm"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-400 flex items-center justify-center">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  3D Design Software
                </h3>
                <p className="text-gray-400">
                  Professional tools for 3D modeling and rendering
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {software3D.map((item, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-[#111827] rounded-full text-gray-300 text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {!loading && cards3D.length > 0 && (
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
                Our 3D Works
              </h2>
              <p className="text-gray-400  mx-auto">
                Explore our high-quality 3D visualization and modeling works.
              </p>
            </motion.div>

            <ExpandableCardDemo cards={cards3D} />
          </div>
        </section>
      )}
    </div>
  );
};

export default GraphicDesigns;
