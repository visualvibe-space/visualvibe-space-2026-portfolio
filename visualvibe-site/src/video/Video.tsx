import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";

const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');
  `}</style>
);

const services = [
  { title: "Digital Marketing", gradient: "from-pink-500 to-rose-400", icon: "M22 12h-4l-3 9L9 3l-3 9H2" },
  { title: "Website Development", gradient: "from-blue-500 to-cyan-400", icon: "M16 18l6-6-6-6M8 6l-6 6 6 6" },
  { title: "Video Editing", gradient: "from-purple-500 to-pink-400", icon: "M23 7l-7 5 7 5V7zM1 5h15v14H1z" },
  { title: "UI/UX Design", gradient: "from-violet-500 to-indigo-400", icon: "M3 3h18v18H3zM3 9h18M9 21V9" },
  { title: "Posters & Flyers", gradient: "from-orange-500 to-red-400", icon: "M3 3h18v18H3zM8.5 8.5l3 3M21 15l-5-5-11 11" },
  { title: "2D & 3D Design", gradient: "from-cyan-500 to-teal-400", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
  { title: "Android Apps", gradient: "from-green-500 to-emerald-400", icon: "M5 2h14v20H5zM12 18v2" },
  { title: "Logo & Brand", gradient: "from-yellow-500 to-orange-400", icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
];

const stats = [
  { value: "100+", label: "Projects" },
  { value: "50+", label: "Clients" },
  { value: "5+", label: "Years" },
  { value: "20+", label: "Team" },
];

const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);
const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
const easeOutBack = (t: number) => { const c1 = 1.70158; const c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };

const FloatingParticles = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {[...Array(20)].map((_, i) => {
        const x = (i * 137.5) % 1920;
        const y = interpolate(frame, [0 + i * 20, 600 + i * 20], [0, 1080], { extrapolateLeft: "wrap", extrapolateRight: "wrap" });
        const size = 2 + (i % 4);
        const opacity = 0.2 + (i % 5) * 0.1;
        return <div key={i} style={{ position: "absolute", left: x, top: y, width: size, height: size, borderRadius: "50%", background: "#60a5fa", opacity }} />;
      })}
    </div>
  );
};

const NeonBorder = ({ delay }: { delay: number }) => {
  const frame = useCurrentFrame();
  const progress = clamp(easeOutExpo(Math.max(0, (frame - delay) / 30)), 0, 1);
  const scaleX = interpolate(progress, [0, 1], [0, 1]);
  const scaleY = interpolate(progress, [0, 0.5, 1], [0, 1.2, 1]);
  
  return (
    <div style={{ 
      position: "absolute", 
      top: "50%", 
      left: "50%", 
      transform: `translate(-50%, -50%) scale(${scaleX}, ${scaleY})`,
      width: 400, 
      height: 400,
      borderRadius: "50%",
      border: "2px solid rgba(96, 165, 250, 0.5)",
      boxShadow: `0 0 ${30 * progress}px rgba(96, 165, 250, ${0.3 * progress}), inset 0 0 ${30 * progress}px rgba(96, 165, 250, ${0.1 * progress})`,
      opacity: progress,
    }} />
  );
};

const Background = () => {
  const frame = useCurrentFrame();
  const orb1Y = interpolate(frame, [0, 600], [0, -80], { extrapolateClamp: true });
  const orb2Y = interpolate(frame, [0, 600], [0, 50], { extrapolateClamp: true });
  const orb1X = interpolate(frame, [0, 300, 600], [0, 30, 0], { extrapolateClamp: true });
  const orb2X = interpolate(frame, [0, 300, 600], [0, -20, 0], { extrapolateClamp: true });
  
  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #0a0e17 0%, #0f172a 50%, #111827 100%)" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div style={{ position: "absolute", top: 80, left: 80 + orb1X, width: 300, height: 300, borderRadius: "50%", background: "linear-gradient(135deg, #1e3a8a, #3b82f6)", filter: "blur(120px)", opacity: 0.25, transform: `translateY(${orb1Y}px)` }} />
      <div style={{ position: "absolute", bottom: 60, right: 60 + orb2X, width: 400, height: 400, borderRadius: "50%", background: "linear-gradient(135deg, #1e40af, #06b6d4)", filter: "blur(140px)", opacity: 0.2, transform: `translateY(${orb2Y}px)` }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)", transform: "translate(-50%, -50%)" }} />
      <FloatingParticles />
    </AbsoluteFill>
  );
};

const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => {
  const frame = useCurrentFrame();
  const delay = 100 + index * 20;
  const cardProgress = clamp(easeOutBack(Math.max(0, (frame - delay) / 25)) / 1.2, 0, 1);
  
  const colors: Record<string, { from: string, to: string }> = {
    "from-pink-500 to-rose-400": { from: "#ec4899", to: "#f43f5e" },
    "from-blue-500 to-cyan-400": { from: "#3b82f6", to: "#22d3ee" },
    "from-purple-500 to-pink-400": { from: "#a855f7", to: "#f472b6" },
    "from-violet-500 to-indigo-400": { from: "#8b5cf6", to: "#6366f1" },
    "from-orange-500 to-red-400": { from: "#f97316", to: "#f87171" },
    "from-cyan-500 to-teal-400": { from: "#06b6d4", to: "#2dd4bf" },
    "from-green-500 to-emerald-400": { from: "#22c55e", to: "#34d399" },
    "from-yellow-500 to-orange-400": { from: "#eab308", to: "#fb923c" },
  };
  
  const { from, to } = colors[service.gradient] || colors["from-blue-500 to-cyan-400"];
  
  return (
    <div style={{ 
      opacity: cardProgress, 
      transform: `translateY(${60 - 60 * cardProgress}px) scale(${0.8 + 0.2 * cardProgress})`,
      background: "linear-gradient(145deg, #1f2937 0%, #111827 100%)", 
      borderRadius: 24, 
      padding: 28,
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: cardProgress > 0 ? `0 ${20 * cardProgress}px ${40 * cardProgress}px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05) inset` : "none",
    }}>
      <div style={{ 
        width: 64, 
        height: 64, 
        borderRadius: 18, 
        background: `linear-gradient(135deg, ${from}, ${to})`,
        marginBottom: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 8px 32px ${from}40`,
      }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
          <path d={service.icon} />
        </svg>
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 600, color: "white", marginBottom: 6 }}>{service.title}</h3>
    </div>
  );
};

const LogoAnimation = () => {
  const frame = useCurrentFrame();
  
  const visualOpacity = clamp(easeOutExpo(frame / 20), 0, 1);
  const vibeOpacity = clamp(easeOutExpo(Math.max(0, (frame - 15) / 20)), 0, 1);
  const visualScale = clamp(easeOutBack(frame / 25) / 1.2, 0, 1);
  const vibeScale = clamp(easeOutBack(Math.max(0, (frame - 15) / 25)) / 1.2, 0, 1);
  
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginBottom: 32 }}>
      <span style={{ 
        fontSize: 90, 
        fontWeight: 900, 
        color: "white", 
        letterSpacing: "-0.03em",
        fontFamily: "Montserrat, sans-serif",
        opacity: visualOpacity,
        transform: `scale(${visualScale})`,
        textShadow: "0 0 60px rgba(96, 165, 250, 0.5)",
      }}>
        Visual
      </span>
      <span style={{ 
        fontSize: 90, 
        fontWeight: 900, 
        background: "linear-gradient(135deg, #60a5fa, #06b6d4)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        letterSpacing: "-0.03em",
        fontFamily: "Montserrat, sans-serif",
        opacity: vibeOpacity,
        transform: `scale(${vibeScale})`,
        filter: "drop-shadow(0 0 30px rgba(96, 165, 250, 0.5))",
      }}>
        Vibe
      </span>
    </div>
  );
};

const Scene1 = () => {
  const frame = useCurrentFrame();
  const progress = clamp(easeOutExpo(frame / 25), 0, 1);
  const taglineProgress = clamp(easeOutExpo(Math.max(0, (frame - 25) / 20)), 0, 1);
  
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <NeonBorder delay={0} />
      <div style={{ opacity: progress, transform: `translateY(${40 - 40 * progress}px)`, textAlign: "center", zIndex: 10 }}>
        <div style={{ 
          display: "inline-flex", 
          alignItems: "center", 
          gap: 10, 
          padding: "10px 20px", 
          background: "rgba(30, 58, 138, 0.4)", 
          border: "1px solid rgba(96, 165, 250, 0.3)", 
          borderRadius: 30,
          marginBottom: 40,
          boxShadow: "0 0 30px rgba(96, 165, 250, 0.2)",
        }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#60a5fa", boxShadow: "0 0 10px #60a5fa" }} />
          <span style={{ color: "#93c5fd", fontSize: 16, fontWeight: 500, letterSpacing: "0.05em" }}>CREATIVE DESIGN STUDIO</span>
        </div>
        
        <LogoAnimation />
        
        <div style={{ opacity: taglineProgress, transform: `translateY(${30 - 30 * taglineProgress}px)` }}>
          <p style={{ fontSize: 26, color: "#9ca3af", maxWidth: 700, lineHeight: 1.7, fontWeight: 400 }}>
            We craft stunning visual experiences that <span style={{ color: "#60a5fa" }}>elevate brands</span> and captivate audiences worldwide.
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene2 = () => {
  const frame = useCurrentFrame();
  const titleProgress = clamp(easeOutExpo(Math.max(0, (frame - 60) / 20)), 0, 1);
  const gridProgress = clamp(easeOutExpo(Math.max(0, (frame - 80) / 50)), 0, 1);
  
  return (
    <AbsoluteFill style={{ padding: 60 }}>
      <div style={{ opacity: titleProgress, transform: `translateY(${40 - 40 * titleProgress}px)`, textAlign: "center", marginBottom: 50 }}>
        <h2 style={{ fontSize: 52, fontWeight: 700, color: "white", fontFamily: "Montserrat, sans-serif", marginBottom: 12 }}>
          Our <span style={{ color: "#60a5fa" }}>Services</span>
        </h2>
        <p style={{ fontSize: 20, color: "#9ca3af" }}>End-to-end creative solutions for modern brands</p>
      </div>
      
      <div style={{ 
        opacity: gridProgress, 
        transform: `scale(${0.85 + 0.15 * gridProgress})`,
        display: "grid", 
        gridTemplateColumns: "repeat(4, 1fr)", 
        gap: 20,
        maxWidth: 1200,
        margin: "0 auto",
      }}>
        {services.map((service, i) => (
          <ServiceCard key={i} service={service} index={i} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const StatCounter = ({ value, label, index }: { value: string, label: string, index: number }) => {
  const frame = useCurrentFrame();
  const delay = 280 + index * 15;
  const progress = clamp(easeOutBack(Math.max(0, (frame - delay) / 25)) / 1.2, 0, 1);
  
  return (
    <div style={{ 
      opacity: progress, 
      transform: `translateY(${50 - 50 * progress}px) scale(${0.7 + 0.3 * progress})`,
      textAlign: "center",
      padding: "20px 30px",
      background: "rgba(31, 41, 55, 0.5)",
      borderRadius: 20,
      border: "1px solid rgba(96, 165, 250, 0.15)",
    }}>
      <div style={{ fontSize: 52, fontWeight: 800, color: "white", fontFamily: "Montserrat, sans-serif", marginBottom: 8 }}>{value}</div>
      <div style={{ fontSize: 14, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
    </div>
  );
};

const Scene3 = () => {
  const frame = useCurrentFrame();
  const progress = clamp(easeOutExpo(Math.max(0, (frame - 260) / 25)), 0, 1);
  const glowOpacity = clamp(easeOutExpo(Math.max(0, (frame - 260) / 40)), 0, 1);
  
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ 
        position: "absolute", 
        width: 500, 
        height: 500, 
        borderRadius: "50%", 
        background: "radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, transparent 70%)",
        opacity: glowOpacity,
      }} />
      <div style={{ opacity: progress, transform: `translateY(${40 - 40 * progress}px)`, textAlign: "center", zIndex: 10 }}>
        <h2 style={{ 
          fontSize: 64, 
          fontWeight: 800, 
          color: "white", 
          marginBottom: 50,
          fontFamily: "Montserrat, sans-serif",
          lineHeight: 1.2,
        }}>
          Transform Your <span style={{ color: "#60a5fa" }}>Vision</span><br />
          Into <span style={{ color: "#60a5fa" }}>Reality</span>
        </h2>
        
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 50 }}>
          {stats.map((stat, i) => (
            <StatCounter key={i} value={stat.value} label={stat.label} index={i} />
          ))}
        </div>
        
        <button style={{ 
          padding: "22px 56px", 
          fontSize: 18, 
          fontWeight: 600, 
          background: "linear-gradient(135deg, #1e40af, #3b82f6)", 
          color: "white", 
          border: "none", 
          borderRadius: 50,
          cursor: "pointer",
          boxShadow: "0 10px 40px rgba(59, 130, 246, 0.4)",
          letterSpacing: "0.02em",
        }}>
          Start Your Project →
        </button>
      </div>
    </AbsoluteFill>
  );
};

const Scene4 = () => {
  const frame = useCurrentFrame();
  const progress = clamp(easeOutExpo(Math.max(0, (frame - 420) / 25)), 0, 1);
  const scale = 0.9 + 0.1 * progress;
  
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ opacity: progress, transform: `scale(${scale})`, textAlign: "center" }}>
        <div style={{ 
          fontSize: 72, 
          fontWeight: 900, 
          color: "white", 
          marginBottom: 20,
          fontFamily: "Montserrat, sans-serif",
          letterSpacing: "-0.02em",
        }}>
          Let's Build Something <span style={{ color: "#60a5fa" }}>Epic</span>
        </div>
        <p style={{ fontSize: 24, color: "#9ca3af", marginBottom: 50, fontWeight: 400 }}>
          Your vision. Our expertise. Infinite possibilities.
        </p>
        
        <div style={{ display: "flex", gap: 20, justifyContent: "center", marginBottom: 40 }}>
          <button style={{ 
            padding: "20px 50px", 
            fontSize: 18, 
            fontWeight: 600, 
            background: "linear-gradient(135deg, #1e40af, #3b82f6)", 
            color: "white", 
            border: "none", 
            borderRadius: 50,
            cursor: "pointer",
            boxShadow: "0 8px 30px rgba(59, 130, 246, 0.35)",
          }}>
            Get Started
          </button>
          <button style={{ 
            padding: "20px 50px", 
            fontSize: 18, 
            fontWeight: 600, 
            background: "transparent", 
            color: "white", 
            border: "2px solid rgba(255,255,255,0.2)", 
            borderRadius: 50,
            cursor: "pointer",
          }}>
            View Work
          </button>
        </div>
        
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          gap: 12,
          padding: "16px 32px",
          background: "rgba(31, 41, 55, 0.5)",
          borderRadius: 50,
          border: "1px solid rgba(96, 165, 250, 0.2)",
        }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#60a5fa", boxShadow: "0 0 15px #60a5fa" }} />
          <span style={{ fontSize: 18, color: "#93c5fd", fontWeight: 500 }}>visualvibe.space</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Video = () => {
  const frame = useCurrentFrame();
  
  const scene1Visible = frame < 70;
  const scene2Visible = frame >= 70 && frame < 260;
  const scene3Visible = frame >= 260 && frame < 420;
  const scene4Visible = frame >= 420;
  
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <FontLoader />
      <Background />
      {scene1Visible && <Scene1 />}
      {scene2Visible && <Scene2 />}
      {scene3Visible && <Scene3 />}
      {scene4Visible && <Scene4 />}
    </div>
  );
};
