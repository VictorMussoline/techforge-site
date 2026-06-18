import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  xOffset1: number;
  xOffset2: number;
}

export function Embers() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate 40 random glowing embers
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // start X percentage
      size: Math.random() * 4 + 2, // 2px to 6px size
      duration: Math.random() * 15 + 10, // 10s to 25s float to top
      delay: Math.random() * 10, // stagger starts
      opacity: Math.random() * 0.6 + 0.2, // Random max opacity
      xOffset1: (Math.random() - 0.5) * 15, // Sway left/right
      xOffset2: (Math.random() - 0.5) * 30, // Sway further
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden mix-blend-screen">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-brand-red"
          style={{
            left: `${p.x}vw`,
            bottom: '-5vh',
            width: p.size,
            height: p.size,
            boxShadow: `0 0 ${p.size * 3}px ${p.size / 2}px rgba(220, 38, 38, 0.9)`,
          }}
          animate={{
            y: ['0vh', '-120vh'],
            x: ['0vw', `${p.xOffset1}vw`, `${p.xOffset2}vw`],
            opacity: [0, p.opacity, p.opacity, 0],
            scale: [0, 1, 1.2, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
