"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function WaveBackground() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);
  const { scrollYProgress } = useScroll();
  
  useEffect(() => {
    setMounted(true);
    setParticles([...Array(25)].map((_, i) => ({
      id: i,
      x: Math.random() * 200 - 100,
      y: Math.random() * -200,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 10,
      left: Math.random() * 100,
      top: Math.random() * 100,
    })));
  }, []);
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.4, 0.2]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020617]">
      {/* Base Primary Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent)]"></div>
      
      {/* Cinematic Video Background with Parallax */}
      <motion.div 
        style={{ y, scale, opacity }}
        className="absolute inset-0 w-full h-full"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/assets/waves.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Energy Sparks Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {mounted && particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0, 1, 0],
              x: [0, p.x],
              y: [0, p.y],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
            className="absolute w-1 h-1 bg-primary rounded-full blur-[2.5px]"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
            }}
          />
        ))}
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.015)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.85)_100%)]"></div>
    </div>
  );
}


