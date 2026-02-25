import { motion, useReducedMotion } from 'framer-motion';

const NeonRibbon = () => {
  const shouldReduceMotion = useReducedMotion();
  
  if (shouldReduceMotion) return null;
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  if (isMobile) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Subtle blue gradient - professional, not neon */}
          <linearGradient id="ribbonGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="#1e3a5f" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="80%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          
          {/* Soft glow filter */}
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Main ribbon - gentle sweeping arc */}
        <motion.path
          d="M -100 700 
             C 200 680, 400 650, 600 600 
             C 800 550, 1000 500, 1200 450
             C 1350 410, 1450 380, 1550 350"
          fill="none"
          stroke="url(#ribbonGradient1)"
          strokeWidth="5"
          strokeLinecap="round"
          filter="url(#softGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            pathLength: { duration: 2, ease: "easeInOut" },
            opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        
        {/* Secondary ribbon - parallel gentle curve */}
        <motion.path
          d="M -50 600
             C 250 580, 450 550, 650 500
             C 850 450, 1050 400, 1250 350
             C 1400 310, 1500 280, 1600 250"
          fill="none"
          stroke="url(#ribbonGradient1)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#softGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            pathLength: { duration: 2.5, ease: "easeInOut", delay: 0.4 },
            opacity: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
          }}
        />
      </svg>
      
      {/* Subtle ambient glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 60% 40%, rgba(37, 99, 235, 0.02) 0%, transparent 60%)',
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default NeonRibbon;
