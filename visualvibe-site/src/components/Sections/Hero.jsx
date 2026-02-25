import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import NeonRibbon from "../UI/NeonRibbon";
import Typewriter from "typewriter-effect";

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  const fadeInUp = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0e17] via-[#0f172a] to-[#111827] pt-24 md:pt-0"
    >
      {/* Animated background shapes - disabled on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {!shouldReduceMotion ? (
          <>
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-blue-900 rounded-full blur-2xl md:blur-3xl opacity-20"
            />
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-20 right-10 w-56 h-56 md:w-96 md:h-96 bg-blue-800 rounded-full blur-2xl md:blur-3xl opacity-20"
            />
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-gradient-to-r from-blue-950 to-transparent rounded-full blur-2xl md:blur-3xl opacity-20"
            />
          </>
        ) : (
          <>
            <div className="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-blue-900 rounded-full blur-2xl md:blur-3xl opacity-20" />
            <div className="absolute bottom-20 right-10 w-56 h-56 md:w-96 md:h-96 bg-blue-800 rounded-full blur-2xl md:blur-3xl opacity-20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-gradient-to-r from-blue-950 to-transparent rounded-full blur-2xl md:blur-3xl opacity-20" />
          </>
        )}
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Neon Light Ribbon Animation */}
      <NeonRibbon />

      {/* Content */}
      <div className="container-custom relative z-10 pt-24 md:pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-blue-950/30 border border-blue-800/30 rounded-full"
          >
            <span className="w-2 h-2 bg-blue-700 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-blue-400">
              Creative Design Studio
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight"
            style={{
              fontFamily: "Montserrat, sans-serif",
              minHeight: "1.2em",
            }}
          >
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("Transform Your ")
                  .typeString('<span class="text-blue-400">Vision</span> ')
                  .typeString("Into ")
                  .typeString('<span class="text-blue-400">Reality</span>')
                  .start();
              }}
              options={{
                delay: 80,
                html: true,
                skipAddStyles: true,
                cursor: "",
              }}
            />
          </motion.h1>

          {/* Subtext */}
          <div className="flex justify-center items-center w-full mb-12">
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-300 text-center max-w-3xl leading-relaxed px-4"
            >
              We craft stunning visual experiences that elevate brands and
              captivate audiences. Your vision, our creative expertise.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              onClick={() => window.location.href = "/contact"}
              className="group flex items-center gap-2 px-8 py-4 bg-blue-800 text-white font-medium rounded-full hover:bg-blue-900"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              onClick={() => scrollToSection("#services")}
              className="group flex items-center gap-2 px-8 py-4 bg-transparent text-white font-medium rounded-full border-2 border-gray-700 hover:border-blue-700"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Play className="w-5 h-5" />
              Our Services
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-12 md:mt-20 mb-8 md:mb-0 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          >
            {[
              { value: "100+", label: "Projects Completed" },
              { value: "50+", label: "Happy Clients" },
              { value: "5+", label: "Years Experience" },
              { value: "20+", label: "Team Members" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - simplified on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        {!shouldReduceMotion ? (
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-400"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-gray-400 to-transparent" />
          </motion.div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-gray-400 to-transparent" />
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Hero;
