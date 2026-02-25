import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Palette,
  Users,
  Wand2,
  Wrench,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import { uiuxApi } from "../../services/api";
import { getImageUrl } from "../../utils/image";
import { ExpandableCardDemo } from "../UI/ExpandableCard";

const UIUXDesign = () => {
  const [uiuxDesigns, setUiuxDesigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUiux = async () => {
      try {
        const data = await uiuxApi.getAll();
        setUiuxDesigns(data || []);
      } catch (err) {
        console.error("Error fetching UI/UX designs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUiux();
  }, []);

  const services = [
    {
      title: "User Interface Design",
      icon: Palette,
      items: [
        "Web App Design",
        "Mobile App Design",
        "Dashboard Design",
        "Landing Pages",
        "Design Systems",
      ],
      color: "from-pink-500 to-rose-400",
    },
    {
      title: "User Experience Design",
      icon: Users,
      items: [
        "User Research",
        "User Personas",
        "User Flows",
        "Information Architecture",
        "Usability Testing",
      ],
      color: "from-blue-500 to-indigo-400",
    },
    {
      title: "Prototyping",
      icon: Wand2,
      items: [
        "Interactive Prototypes",
        "Wireframing",
        "High-fidelity Mockups",
        "Animations",
        "User Testing",
      ],
      color: "from-purple-500 to-violet-400",
    },
  ];

  const tools = [
    "Figma",
    "Adobe XD",
    "Sketch",
    "InVision",
    "Zeplin",
    "Marvel",
    "Balsamiq",
  ];
  const deliverables = [
    "UI Style Guides",
    "Component Libraries",
    "Design Specifications",
    "Interactive Prototypes",
    "User Research Reports",
    "Usability Reports",
  ];

  const processSteps = [
    { number: 1, title: "Research", description: "User research & analysis" },
    {
      number: 2,
      title: "Wireframe",
      description: "Structure & layout planning",
    },
    { number: 3, title: "Design", description: "Visual design & prototyping" },
    { number: 4, title: "Test", description: "Usability testing & iteration" },
  ];

  const cards = uiuxDesigns.map((design) => ({
    title: design.title,
    description: design.category || "UI/UX Design",
    src: getImageUrl(design.image_url),
    ctaText: "View",
    ctaLink: design.prototype_url || design.image_url || "#",
    content: () => (
      <p>
        {design.description ||
          "A stunning UI/UX design focused on user experience and visual appeal."}
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
              UI/UX{" "}
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                Design
              </span>
            </h1>
            <p className="text-xl text-gray-400 ">
              Creating intuitive, beautiful, and user-centered designs that
              enhance user experience and drive engagement.
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
              UI/UX Design Services
            </h2>
            <p className="text-gray-400  mx-auto">
              Comprehensive design solutions that focus on both aesthetics and
              functionality.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
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
                  <h3 className="text-xl font-bold text-white mb-4">
                    {service.title}
                  </h3>
                  <ul className="space-y-3">
                    {service.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-gray-400"
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

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#1a2234] rounded-3xl p-8 border border-white/10 backdrop-blur-sm"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-6">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Design Tools & Software
              </h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-[#111827] rounded-full text-gray-300 text-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-[#1a2234] rounded-3xl p-8 border border-white/10 backdrop-blur-sm"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-400 flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Design Deliverables
              </h3>
              <div className="flex flex-wrap gap-2">
                {deliverables.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-[#111827] rounded-full text-gray-300 text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
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
              Our Design Process
            </h2>
            <p className="text-gray-400  mx-auto">
              A structured approach to ensure the best user experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#1a2234] rounded-3xl p-6 border border-white/10 backdrop-blur-sm text-center hover:border-white/20 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xl font-bold text-white mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {!loading && cards.length > 0 && (
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
                Our UI/UX Designs
              </h2>
              <p className="text-gray-400  mx-auto">
                Explore our modern UI/UX prototypes crafted for seamless user
                experiences and clean visual design.
              </p>
            </motion.div>

            <ExpandableCardDemo cards={cards} />
          </div>
        </section>
      )}
    </div>
  );
};

export default UIUXDesign;
