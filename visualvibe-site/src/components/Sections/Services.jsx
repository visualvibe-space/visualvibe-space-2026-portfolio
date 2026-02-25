import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import servicesData from "../../data/services.json";
import { servicesApi } from "../../services/api";
import { BentoGrid, BentoGridItem } from "../UI/BentoGrid";
import {
  Film,
  Hexagon,
  Code,
  Image,
  Box,
  Smartphone,
  Layout,
  Megaphone,
  ArrowRight,
} from "lucide-react";

const iconMap = {
  Film,
  Hexagon,
  Code,
  Image,
  Box,
  Smartphone,
  Layout,
  Megaphone,
};

const serviceLinks = {
  "Digital Marketing": "/services/digital-marketing",
  "Website Development": "/services/website-development",
  "Video Editing & Motion Graphics": "/services/video-editing",
  "UI/UX Design": "/services/uiux-design",
  "Posters & Flyers Designing": "/services/posters-flyers",
  "2D & 3D Graphic Design": "/services/graphic-designs",
  "Android App Development": "/services/android-app-development",
  "Logo & Brand Design": "/services/logo-brand-design",
};

const categoryColors = {
  "Digital Marketing": "from-pink-500 to-rose-400",
  "Website Development": "from-blue-500 to-cyan-400",
  "Video Editing & Motion Graphics": "from-purple-500 to-pink-400",
  "UI/UX Design": "from-violet-500 to-indigo-400",
  "Posters & Flyers Designing": "from-orange-500 to-red-400",
  "2D & 3D Graphic Design": "from-cyan-500 to-teal-400",
  "Android App Development": "from-green-500 to-emerald-400",
  "Logo & Brand Design": "from-yellow-500 to-orange-400",
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesApi.getAll();
        if (data && Array.isArray(data) && data.length > 0) {
          setServices(data);
        } else {
          setServices(servicesData.allServices);
        }
      } catch (err) {
        setServices(servicesData.allServices);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <section id="services" className="py-16 lg:py-24 bg-[#0a0e17]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-blue-400 bg-blue-950/30 rounded-full border border-blue-900/30">
              What We Do
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our Digital Workspace
            </h2>
          </div>
          <BentoGrid>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <BentoGridItem key={i}>
                <div className="bg-[#111827] rounded-3xl p-6 md:p-8 animate-pulse h-48" />
              </BentoGridItem>
            ))}
          </BentoGrid>
        </div>
      </section>
    );
  }

  const servicesWithLinks = services.map((service) => ({
    ...service,
    link: serviceLinks[service.title] || "#contact",
    gradient: categoryColors[service.title] || "from-blue-500 to-cyan-400",
    icon: iconMap[service.icon] || Layout,
  }));

  return (
    <section id="services" className="py-16 lg:py-24 bg-[#0a0e17]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-blue-400 bg-blue-950/30 rounded-full border border-blue-900/30">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our Digital Workspace
          </h2>
          <p className="text-gray-400 mx-auto">
            Comprehensive creative solutions tailored to your unique needs and
            goals.
          </p>
        </motion.div>

        <BentoGrid>
          {servicesWithLinks.map((service, i) => {
            const IconComponent = service.icon;
            const isWide = i === 3 || i == 0;

            return (
              <BentoGridItem
                key={service.id || i}
                className={isWide ? "md:col-span-2" : ""}
              >
                <a href={service.link} className="block h-full p-6 md:p-8">
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4`}
                  >
                    <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-white font-medium group-hover:gap-3 transition-all">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </a>
              </BentoGridItem>
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
};

export default Services;
