import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { teamApi } from "../../services/api";
import { getImageUrl } from "../../utils/image";
import { ArrowRight, Sparkles } from "lucide-react";

const FounderCard = ({ member, index }) => {
  const isEven = index % 2 === 0;

  const descriptions = {
    "Divyansh Nanavati":
      "Passionate full stack web developer and visionary leader driving innovation and excellence. Committed to transforming ideas into stunning, high-performance digital realities that resonate with audiences and elevate brands through creativity, strategy, and strong leadership.",

    "Bhavik Agarwal":
      "Dynamic leader with a strong expertise in digital marketing, video editing, and graphic design. Combines creative vision with strategic thinking to drive impactful campaigns, craft engaging visual content, and build powerful brand experiences while leading teams towards innovation and consistent growth.",

    "Khushbu Joshi":
      "Creative and visionary leader with a strong passion for graphic design and visual storytelling. Combines leadership skills with a keen eye for design to guide teams, build impactful brand identities, and deliver innovative digital solutions that engage audiences and strengthen brand presence.",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
    >
      {/* Image Side */}
      <div className={`relative ${isEven ? "lg:order-1" : "lg:order-2"}`}>
        <div className="relative rounded-3xl overflow-hidden border border-gray-800 group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-transparent to-transparent z-10" />

          {member.image_url ? (
            <img
              src={getImageUrl(member.image_url)}
              alt={member.name}
              className="w-full h-[400px] lg:h-[500px] object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/600x600/1e293b/ffffff?text=No+Image";
              }}
            />
          ) : (
            <div className="w-full h-[400px] lg:h-[500px] bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
              <span className="text-8xl font-bold text-white/20">
                {member.name?.charAt(0) || "?"}
              </span>
            </div>
          )}

          <div className="absolute top-4 left-4 z-20">
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-800">
              <Sparkles className="w-3 h-3 text-yellow-400" />
              <span className="text-xs font-medium text-white">Founder</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Side */}
      <div className={`${isEven ? "lg:order-2" : "lg:order-1"}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {member.name}
          </h3>
          <p className="text-blue-500 font-medium text-lg mb-6">
            {member.designation}
          </p>

          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            {member.description || descriptions[member.name]}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Founders = () => {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFounders = async () => {
      try {
        const data = await teamApi.getAll();

        let foundersList = [];

        if (data && typeof data === "object") {
          const possibleKeys = [
            "Founders & CEO",
            "Founders",
            "Leadership",
            "CEO",
            "Founders & Directors",
            "Directors",
          ];

          for (const key of possibleKeys) {
            if (data[key] && Array.isArray(data[key]) && data[key].length > 0) {
              foundersList = data[key];
              break;
            }
          }

          if (foundersList.length === 0) {
            const allMembers = Object.values(data).flat();
            foundersList = allMembers.slice(0, 4);
          }
        }

        setFounders(foundersList);
      } catch (err) {
        console.error("Error fetching founders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFounders();
  }, []);

  if (loading) {
    return (
      <section id="founders" className="section-padding bg-[#0a0e17]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-sm font-medium text-blue-600 bg-blue-950 rounded-full">
              <Sparkles className="w-4 h-4" />
              Leadership
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl w-full text-center font-bold text-white mb-6">
              Meet Our Founders
            </h2>
          </div>
          <div className="space-y-24">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
              >
                <div className="h-[400px] lg:h-[500px] bg-gray-800 animate-pulse rounded-3xl" />
                <div className="space-y-4">
                  <div className="h-8 bg-gray-800 rounded animate-pulse w-3/4" />
                  <div className="h-5 bg-gray-800 rounded animate-pulse w-1/2" />
                  <div className="h-4 bg-gray-800 rounded animate-pulse w-full" />
                  <div className="h-4 bg-gray-800 rounded animate-pulse w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (founders.length === 0) {
    return null;
  }

  return (
    <section
      id="founders"
      className="section-padding bg-[#0a0e17] relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-sm font-medium text-blue-600 bg-blue-950 rounded-full"
          >
            <Sparkles className="w-4 h-4" />
            Leadership
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl w-full text-center font-bold text-white mb-6">
            Meet Our Founders
          </h2>
          <p className="text-lg text-gray-300 w-full md:px-36 text-center">
            The visionaries behind Visual Vibes, driving innovation and
            excellence.
          </p>
        </motion.div>

        <div className="space-y-24">
          {founders.slice(0, 4).map((member, index) => (
            <FounderCard
              key={member.id || index}
              member={member}
              index={index}
            />
          ))}
        </div>

        {founders.length > 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-16"
          >
            <Link
              to="/team"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              <span>View Full Team</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Founders;
