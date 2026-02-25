import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const logoText = "Visual Vibe";
  const tagline = "Your Idea, Our Vision";

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 600);
          }, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const taglineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0e17]"
        >
          {/* Background gradient - more muted */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e17] via-[#0f172a] to-[#0a0e17]" />
          
          {/* Animated background shapes - darker blue, less shiny */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.08, 0.12, 0.08],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900 rounded-full blur-[120px]"
            />
            <motion.div
              animate={{
                scale: [1.15, 1, 1.15],
                opacity: [0.06, 0.1, 0.06],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-950 rounded-full blur-[100px]"
            />
          </div>

          {/* Logo container */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo text */}
            <div className="flex overflow-hidden">
              {logoText.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-5xl md:text-7xl font-bold text-white tracking-tight"
                  style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    display: 'inline-block',
                    textShadow: '0 0 30px rgba(30, 64, 175, 0.2)'
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </div>

            {/* Tagline */}
            <motion.p
              variants={taglineVariants}
              initial="hidden"
              animate="visible"
              className="mt-4 text-lg md:text-xl text-gray-500 tracking-widest uppercase"
            >
              {tagline}
            </motion.p>

            {/* Progress bar */}
            <div className="mt-12 w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-800 to-blue-700"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>

            {/* Progress percentage */}
            <motion.p
              className="mt-3 text-sm text-gray-600 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {progress}%
            </motion.p>
          </div>

          {/* Corner accents - muted */}
          <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-blue-800/20" />
          <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-blue-800/20" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
