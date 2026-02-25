import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Check, Sparkles } from 'lucide-react';
import teamImage from '../../assets/pexels-photo-5325103.jpeg';

const About = () => {
  const [sectionRef, isVisible] = useScrollAnimation(0.1);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const features = [
    'Creative Excellence',
    'Technical Expertise', 
    'Client-Focused Approach',
    'Innovation Driven'
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="section-padding bg-[#0a0e17] relative overflow-hidden"
    >
      {/* Background Elements - disabled on mobile */}
      {!isMobile && (
        <div className="absolute top-0 left-0 w-full h-full">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 50, repeat: Infinity, ease: "linear" },
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] border border-gray-800 rounded-full opacity-30"
          />
          <motion.div
            animate={{ 
              rotate: -360 
            }}
            transition={{ 
              duration: 60, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] border border-gray-800 rounded-full opacity-20"
          />
        </div>
      )}

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-blue-600 bg-blue-950 rounded-full"
            >
              <Sparkles className="w-4 h-4" />
              About Us
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Your Idea, Our Vision
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg text-blue-600 font-medium mb-6"
            >
              Bringing creative concepts to life through exceptional design and technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-4 text-gray-300 mb-8"
            >
              <p className="leading-relaxed">
                Visual Vibe is a premier creative agency specializing in visual design and digital solutions. We combine artistic vision with technical expertise to deliver exceptional results for our clients.
              </p>
              <p className="leading-relaxed">
                Our team of passionate designers and developers work collaboratively to transform your ideas into visually stunning realities that resonate with your audience and elevate your brand.
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={teamImage}
                alt="Creative Team"
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent" />
            </div>

            {/* Floating stats card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="absolute -bottom-8 -left-8 bg-[#111827] p-6 rounded-2xl shadow-xl border border-gray-800 cursor-pointer"
            >
              <div className="text-4xl font-bold text-white mb-1">5+</div>
              <div className="text-sm text-gray-400">Years of Excellence</div>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ y: 3 }}
              whileTap={{ scale: 0.98 }}
              className="absolute -top-4 -right-4 bg-blue-800 text-white p-4 rounded-2xl shadow-xl cursor-pointer"
            >
              <div className="text-3xl font-bold mb-1">100%</div>
              <div className="text-xs opacity-90">Client Satisfaction</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
