"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [particles, setParticles] = useState<{ duration: number; delay: number; left: number; top: number }[]>([]);

  useEffect(() => {
    setParticles(
      [...Array(15)].map(() => ({
        duration: 3 + Math.random() * 3,
        delay: Math.random() * 5,
        left: Math.random() * 100,
        top: Math.random() * 100,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020617] overflow-hidden">
      {/* Background Deep Glow */}
      <div className="absolute w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>

      <div className="relative flex flex-col items-center">
        {/* Expanding Ripple Rings (from prompt) */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.3,
              ease: "easeOut",
            }}
            className="absolute w-64 h-64 border border-primary/20 rounded-full"
          />
        ))}

        {/* Gear Container */}
        <div className="relative">
          {/* Breathing Glow Pulse (from prompt) */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-[-40px] bg-primary/30 rounded-full blur-2xl"
          ></motion.div>

          {/* Rotating Gear Image (8s duration from prompt) */}
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="relative w-32 h-32 md:w-40 md:h-40"
          >
            <Image
              src="/assets/preloader.png"
              alt="District Preloader"
              fill
              sizes="(max-width: 768px) 128px, 160px"
              className="object-contain"
              priority
            />
          </motion.div>
        </div>

        {/* Text and Tagline */}
        <div className="mt-16 text-center space-y-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h2 className="text-4xl font-black text-white uppercase tracking-[0.3em] font-display">
              Rotaract
            </h2>
            <p className="text-primary font-bold tracking-[0.4em] text-sm uppercase opacity-80 mt-2">
              District 3192
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 1, duration: 3, repeat: Infinity }}
            className="text-[10px] text-primary font-bold uppercase tracking-[0.5em] pt-4"
          >
            Create Lasting Impact
          </motion.div>
        </div>
      </div>

      {/* Floating Particles — mounted only on client to avoid hydration mismatch */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              y: [0, -100],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
            className="absolute w-1 h-1 bg-primary rounded-full blur-[1px]"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
            }}
          ></motion.div>
        ))}
      </div>
    </div>
  );
}

