import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { teamApi } from "../../services/api";
import { getImageUrl } from "../../utils/image";
import { ChevronDown, Linkedin, Twitter, Mail } from "lucide-react";

const Team = () => {
  const [expandedDepts, setExpandedDepts] = useState([
    "Leadership",
    "Design",
    "Development",
  ]);
  const [teamData, setTeamData] = useState({});
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await teamApi.getAll();
        setTeamData(data || {});
        const firstDept = Object.keys(data || {}).find(
          (key) => data[key]?.length > 0,
        );
        if (firstDept) {
          setExpandedDepts([firstDept]);
        }
      } catch (err) {
        console.error("Error fetching team:", err);
      } finally {
        setLoading(false);
        setTimeout(() => setImagesLoaded(true), 100);
      }
    };
    fetchTeam();
  }, []);

  const toggleDept = (deptId) => {
    setExpandedDepts((prev) =>
      prev.includes(deptId)
        ? prev.filter((id) => id !== deptId)
        : [...prev, deptId],
    );
  };

  const departments = Object.entries(teamData)
    .map(([name, members]) => ({
      id: name,
      name,
      members: members || [],
    }))
    .filter((dept) => dept.members?.length > 0)
    .sort((a, b) => {
      const priorityDepts = ["Founders & CEO", "Leadership", "Founders"];

      const aPriority = priorityDepts.findIndex((d) =>
        a.name.toLowerCase().includes(d.toLowerCase()),
      );
      const bPriority = priorityDepts.findIndex((d) =>
        b.name.toLowerCase().includes(d.toLowerCase()),
      );

      if (aPriority !== -1 && bPriority !== -1) {
        return aPriority - bPriority;
      }
      if (aPriority !== -1) return -1;
      if (bPriority !== -1) return 1;

      return 0;
    })
    .map((dept) => ({
      ...dept,
      members: [...dept.members].sort((a, b) => {
        const aTitle = a.designation?.toLowerCase() || "";
        const bTitle = b.designation?.toLowerCase() || "";
        const priorityTitles = ["founder", "ceo", "head of operations", "head"];

        const aPriority = priorityTitles.findIndex((t) => aTitle.includes(t));
        const bPriority = priorityTitles.findIndex((t) => bTitle.includes(t));

        if (aPriority !== -1 && bPriority !== -1) {
          return aPriority - bPriority;
        }
        if (aPriority !== -1) return -1;
        if (bPriority !== -1) return 1;

        return 0;
      }),
    }));

  if (loading) {
    return (
      <section id="team" className="section-padding bg-[#0a0e17]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-blue-600 bg-blue-950 rounded-full">
              Our Team
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl w-full text-center font-bold text-white mb-6">
              Meet The Experts
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-[#0f172a] rounded-2xl p-6 border border-gray-800"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-gray-800 animate-pulse mb-4" />
                <div className="h-4 bg-gray-800 rounded animate-pulse mb-2 w-3/4 mx-auto" />
                <div className="h-3 bg-gray-800 rounded animate-pulse w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="team"
      className="section-padding bg-[#0a0e17] relative overflow-hidden"
    >
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
            className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-blue-600 bg-blue-950 rounded-full"
          >
            Our Team
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl w-full text-center font-bold text-white mb-6">
            Meet The Experts
          </h2>
          <p className="text-lg text-gray-300 w-full md:px-36 text-center ">
            "Driven by passion and precision, our team delivers excellence every
            month."
          </p>
        </motion.div>

        {departments.length === 0 ? (
          <div className="text-center text-gray-400">
            No team members found.
          </div>
        ) : (
          <div className="space-y-6">
            {departments.map((dept, deptIndex) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: deptIndex * 0.1, duration: 0.6 }}
                className="bg-[#0f172a] rounded-2xl overflow-hidden shadow-lg border border-gray-800"
              >
                <motion.button
                  onClick={() => toggleDept(dept.id)}
                  className="w-full flex items-center justify-between p-6 hover:bg-[#111827] transition-colors"
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-900/50 rounded-xl flex items-center justify-center">
                      <span className="text-blue-600 font-bold">
                        {dept.name.charAt(0)}
                      </span>
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-white">
                        {dept.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {dept.members.length} members
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{
                      rotate: expandedDepts.includes(dept.id) ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {expandedDepts.includes(dept.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.1 },
                          },
                        }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 pt-0"
                      >
                        {dept.members.map((member) => (
                          <motion.div
                            key={member.id}
                            variants={{
                              hidden: { opacity: 0, y: 30, scale: 0.95 },
                              visible: {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                transition: {
                                  duration: 0.5,
                                  ease: [0.22, 1, 0.36, 1],
                                },
                              },
                            }}
                            whileHover={{ y: -5 }}
                            className="group relative bg-[#111827] rounded-2xl p-6 hover:bg-[#1e293b] hover:shadow-lg transition-all duration-300 border border-gray-800"
                          >
                            <div className="relative mb-4">
                              <motion.div
                                whileHover={{ scale: 1.03 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 17,
                                }}
                                className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-blue-700 to-blue-800 shadow-lg"
                              >
                                {imagesLoaded ? (
                                  <img
                                    src={getImageUrl(member.image_url)}
                                    alt={member.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    loading="lazy"
                                    decoding="async"
                                    onError={(e) => {
                                      e.target.src =
                                        "https://placehold.co/200x200/1e293b/ffffff?text=No+Image";
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gray-700 animate-pulse" />
                                )}
                              </motion.div>
                              <div className="absolute bottom-0 right-1/2 translate-x-8 w-4 h-4 bg-blue-700 border-2 border-[#111827] rounded-full" />
                            </div>

                            <div className="text-center">
                              <h4 className="text-lg font-bold text-white mb-1 group-hover:text-blue-600 transition-colors">
                                {member.name}
                              </h4>
                              <p className="text-sm text-gray-400 mb-4">
                                {member.designation}
                              </p>

                              <div className="flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="w-8 h-8 bg-[#0f172a] rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-[#111827] transition-all"
                                >
                                  <Linkedin className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="w-8 h-8 bg-[#0f172a] rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-[#111827] transition-all"
                                >
                                  <Twitter className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="w-8 h-8 bg-[#0f172a] rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-[#111827] transition-all"
                                >
                                  <Mail className="w-4 h-4" />
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;
