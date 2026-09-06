"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";

const EventGlobe = dynamic(() => import("./EventGlobe"), { ssr: false });

const EVENTS = [
  {
    id: "earth",
    title: "EARTH",
    subtitle: "PLANET",
    description:
      "Learn more about this facinating miracle that we call our home, Planet Earth. Course enrollment starts today. Early Bird tickets typically last a week, don't miss out!",
    textureUrl: "/planets/earth.jpg",
    prevLabel: "VENUS",
    nextLabel: "MARS",
  },
  {
    id: "mars",
    title: "MARS",
    subtitle: "PLANET",
    description:
      "Mars is the fourth planet from the Sun. Known as the Red Planet, it has captivated humanity for centuries. Course enrollment starts today. Early Bird tickets typically last a week!",
    textureUrl: "/planets/mars.jpg",
    prevLabel: "EARTH",
    nextLabel: "VENUS",
  },
  {
    id: "venus",
    title: "VENUS",
    subtitle: "PLANET",
    description:
      "Venus is the hottest planet in our solar system. It has a thick atmosphere full of greenhouse gases and clouds of sulfuric acid. Course enrollment starts today!",
    textureUrl: "/planets/venus.jpg",
    prevLabel: "MARS",
    nextLabel: "EARTH",
  },
];

const textures = EVENTS.map(e => e.textureUrl);

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 200 : -200,
    opacity: 0,
  }),
};

const sideTextVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 20 : -20,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    y: direction < 0 ? 20 : -20,
    opacity: 0,
  }),
};

export default function EventCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const currentEvent = EVENTS[currentIndex];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    let newIndex = currentIndex + newDirection;
    if (newIndex < 0) newIndex = EVENTS.length - 1;
    if (newIndex >= EVENTS.length) newIndex = 0;
    setCurrentIndex(newIndex);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (isScrolling) return;
    
    if (e.deltaY > 50) {
      setIsScrolling(true);
      paginate(1);
      setTimeout(() => setIsScrolling(false), 1000);
    } else if (e.deltaY < -50) {
      setIsScrolling(true);
      paginate(-1);
      setTimeout(() => setIsScrolling(false), 1000);
    }
  };

  return (
    <div 
      className="relative h-screen w-full overflow-hidden text-white flex flex-col selection:bg-white/30 bg-[#050914]"
      onWheel={handleWheel}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      
      {/* ===== 3D PLANET CAROUSEL (Background Layer) ===== */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        <EventGlobe textures={textures} currentIndex={currentIndex} className="w-full h-full pointer-events-auto" />
      </div>

      {/* ===== NAVBAR ===== */}
      <Navbar />

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-grow flex flex-col items-center justify-start pt-[8vh] md:pt-[10vh] relative z-20 px-4 pointer-events-none">
        
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col items-center text-center max-w-3xl pointer-events-auto"
          >
            {/* Subtitle */}
            <h2 className="text-sm md:text-lg uppercase tracking-[0.4em] text-gray-400 mb-3">
              {currentEvent.subtitle}
            </h2>

            {/* Title */}
            <h1 className="text-7xl md:text-[9rem] leading-none tracking-[0.1em] mb-5 drop-shadow-xl" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              {currentEvent.title}
            </h1>

            {/* Teal accent line */}
            <div className="w-12 h-[2px] bg-cyan-400 mb-6" />

            {/* Description */}
            <p className="text-sm md:text-base text-gray-300 max-w-xl mx-auto leading-relaxed mb-8 drop-shadow-md">
              {currentEvent.description}
            </p>
            
            {/* CTA Button */}
            <button className="border border-gray-400 text-white px-10 py-3 rounded-full font-bold text-sm tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm">
              GET STARTED
            </button>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ===== SIDE NAV & FOOTER ===== */}
      
      {/* Prev Navigation Text (left) */}
      <div className="absolute left-6 md:left-24 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.button 
            key={currentIndex}
            custom={direction}
            variants={sideTextVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={() => paginate(-1)}
            className="group cursor-pointer pointer-events-auto"
          >
            <span className="text-xs md:text-sm tracking-[0.4em] uppercase text-gray-400 group-hover:text-white transition-colors">
              {currentEvent.prevLabel}
            </span>
          </motion.button>
        </AnimatePresence>
      </div>

      {/* Next Navigation Text (right) */}
      <div className="absolute right-6 md:right-24 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.button 
            key={currentIndex}
            custom={direction}
            variants={sideTextVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={() => paginate(1)}
            className="group cursor-pointer pointer-events-auto"
          >
            <span className="text-xs md:text-sm tracking-[0.4em] uppercase text-gray-400 group-hover:text-white transition-colors">
              {currentEvent.nextLabel}
            </span>
          </motion.button>
        </AnimatePresence>
      </div>

      {/* Down Arrow */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 animate-bounce pointer-events-none">
        <ChevronDown className="w-6 h-6 text-gray-400" />
      </div>
    </div>
  );
}
