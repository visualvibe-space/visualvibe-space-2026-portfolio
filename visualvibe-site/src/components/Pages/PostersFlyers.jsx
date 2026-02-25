import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Palette,
  Printer,
  Scissors,
  Image as ImageIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { flyersApi, graphicsApi } from "../../services/api";
import { getImageUrl } from "../../utils/image";
import { ExpandableCardDemo } from "../UI/ExpandableCard";

const PostersFlyers = () => {
  const [flyers, setFlyers] = useState([]);
  const [graphics, setGraphics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [flyersData, graphicsData] = await Promise.all([
          flyersApi.getAll(),
          graphicsApi.getAll(),
        ]);
        setFlyers(flyersData || []);

        if (graphicsData && typeof graphicsData === "object") {
          const allGraphics = [
            ...(graphicsData["2D"] || []),
            ...(graphicsData["3D"] || []),
          ];
          setGraphics(allGraphics.slice(0, 6));
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
      title: "Event Posters",
      description: "Eye-catching posters for concerts, events, and gatherings.",
      items: [
        "Concert Posters",
        "Event Announcements",
        "Party Flyers",
        "Club Night Posters",
      ],
      color: "from-pink-500 to-rose-400",
      icon: Palette,
    },
    {
      title: "Business Flyers",
      description: "Professional flyers for business promotions and marketing.",
      items: [
        "Product Launches",
        "Service Promotions",
        "Discount Offers",
        "Grand Openings",
      ],
      color: "from-blue-500 to-cyan-400",
      icon: Printer,
    },
    {
      title: "Social Media Graphics",
      description: "Engaging visuals for your social media presence.",
      items: [
        "Instagram Posts",
        "Facebook Covers",
        "Story Templates",
        "Banner Designs",
      ],
      color: "from-purple-500 to-violet-400",
      icon: ImageIcon,
    },
    {
      title: "Custom Designs",
      description: "Unique designs tailored to your specific needs.",
      items: [
        "Restaurant Menus",
        "Price Lists",
        "Invitation Cards",
        "Brochures",
      ],
      color: "from-green-500 to-emerald-400",
      icon: Scissors,
    },
  ];

  const allItems = [...flyers, ...graphics].slice(0, 9);

  const cards = allItems.map((item) => ({
    title: item.title,
    description: item.category || "Flyer & Poster Design",
    src: getImageUrl(item.image_url || item.thumbnail_url),
    ctaText: "View",
    ctaLink: getImageUrl(item.image_url || item.thumbnail_url),
    content: () => (
      <p>
        {item.description ||
          "A professional flyer/poster design showcasing creativity and attention to detail."}
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
              Posters &{" "}
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                Flyers
              </span>
            </h1>
            <p className="text-xl text-gray-400 ">
              Stunning print designs that grab attention and communicate your
              message effectively.
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
              Our Design Services
            </h2>
            <p className="text-gray-400  mx-auto">
              Professional poster and flyer designs for every occasion.
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
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
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

      {!loading && cards.length > 0 && (
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
                Our Recent Work
              </h2>
              <p className="text-gray-400  mx-auto">
                Check out some of our latest poster and flyer designs.
              </p>
            </motion.div>

            <ExpandableCardDemo cards={cards} />
          </div>
        </section>
      )}

      <section className="py-20 bg-[#0f172a]">
        <div className="container-custom px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Need a Custom Design?
            </h2>
            <p className="text-gray-400 mb-8 pb-8 mx-auto">
              Let's create something unique for your brand. Contact us today!
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-pink-600 text-white font-semibold rounded-full hover:bg-pink-700 transition-colors"
            >
              Get Started
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PostersFlyers;
