"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PlanetsCanvas from "@/components/PlanetsCanvas";
import Navbar from "@/components/Navbar";
import PaintSplatterIntro from "@/components/PaintSplatterIntro";

export default function Home() {
  const mouseRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Ink-Mask reveal states
  const [showPreloader, setShowPreloader] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [removeGif, setRemoveGif] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Audio state & controller (Kawai Kitsune)
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/kawaii-kitsune-kevin-macleod-main-version-7984-04-02.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const handleStart = () => {
    setIsActive(true);
    setShowPreloader(false);
  };

  // Play audio on loop after intro reveal completes
  useEffect(() => {
    if (removeGif && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Autoplay audio waiting for user gesture:", err));
    }
  }, [removeGif]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  };

  // 1. Timing the mask removal: wait 3s after isActive becomes true
  useEffect(() => {
    if (isActive && !removeGif) {
      const timer = setTimeout(() => setRemoveGif(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [isActive, removeGif]);

  // 2. Applying/clearing the mask on the DOM node & scroll lock
  useEffect(() => {
    if (removeGif && wrapperRef.current) {
      wrapperRef.current.style.maskImage = "none";
      wrapperRef.current.style.webkitMaskImage = "none";
      document.body.style.position = "static";
      document.body.style.overflow = "auto";
    }
    if (isActive && !removeGif && wrapperRef.current) {
      wrapperRef.current.style.maskImage = "";
      wrapperRef.current.style.webkitMaskImage = "";
      document.body.style.position = "fixed";
      document.body.style.overflow = "hidden";
    }
  }, [removeGif, isActive]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalized from -1 to 1 relative to screen center
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animationFrameId: number;
    const updateParallax = () => {
      const m = mouseRef.current;
      // Lerp for ultra-smooth movement
      m.currentX += (m.targetX - m.currentX) * 0.08;
      m.currentY += (m.targetY - m.currentY) * 0.08;

      setOffset({
        x: m.currentX,
        y: m.currentY,
      });

      animationFrameId = requestAnimationFrame(updateParallax);
    };

    animationFrameId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <PaintSplatterIntro onStart={handleStart} showPreloader={showPreloader} />

      <main
        ref={wrapperRef}
        className={`hero-bg relative w-full h-screen overflow-hidden bg-[#020712] transition-opacity duration-300 ${
          !isActive
            ? "opacity-0 pointer-events-none"
            : !removeGif
            ? "ink-mask opacity-100"
            : "opacity-100"
        }`}
      >
        {/* Navigation Header */}
        <Navbar isPlaying={isPlaying} onToggleAudio={toggleAudio} />

        {/* 1. Deep Space Background - Subtle reverse parallax */}
        <div
          className="absolute -inset-8 transition-transform duration-75 ease-out"
          style={{
            transform: `translate3d(${offset.x * -12}px, ${offset.y * -12}px, 0) scale(1.05)`,
          }}
        >
          <Image
            src="/bg.png"
            alt="Space Background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* 2. Midground Integrated Cloud Layer (Hidden on Mobile, Visible on Desktop) */}
        <div
          className="max-md:hidden absolute inset-0 pointer-events-none mix-blend-multiply select-none z-0 transition-transform duration-75 ease-out"
          style={{
            transform: `translate3d(${offset.x * 22}px, ${offset.y * 22}px, 0)`,
          }}
        >
          {/* Top-Left Cloud Bank */}
          <div className="absolute -top-[20%] left-[20%] w-[70vw] h-[60vh] transform rotate-[165deg] scale-y-[-1]">
            <Image
              src="/cloud.png"
              alt="Top-Left Cloud"
              fill
              priority
              className="object-contain object-top-left"
            />
          </div>

          {/* Mid-Left Cloud Layer */}
          <div className="absolute top-[22%] -left-[15%] w-[65vw] h-[55vh] transform -rotate-[15deg]">
            <Image
              src="/cloud.png"
              alt="Mid-Left Cloud"
              fill
              className="object-contain object-left"
            />
          </div>

          {/* Bottom-Right Main Cloud Bank */}
          <div className="absolute -bottom-[8%] -right-[8%] w-[85vw] h-[70vh] transform -rotate-[12deg] scale-x-[-1]">
            <Image
              src="/cloud.png"
              alt="Bottom-Right Cloud"
              fill
              className="object-contain object-bottom-right"
            />
          </div>

          {/* Bottom-Left Base Cloud */}
          <div className="absolute -bottom-[50%] -left-[10%] w-[60vw] h-[50vh] transform rotate-[25deg]">
            <Image
              src="/cloud.png"
              alt="Bottom-Left Cloud"
              fill
              className="object-contain object-bottom-left"
            />
          </div>
        </div>

        {/* 3. Three.js 3D Textured Planets Canvas */}
        <PlanetsCanvas mouseX={offset.x} mouseY={offset.y} />

        {/* 4. Foreground Floating Transparent Cloud Layer (ABSOLUTELY AT FRONT ABOVE NAVBAR AND TEXT) */}
        <div
          className="max-md:hidden absolute inset-0 pointer-events-none select-none z-[100] transition-transform duration-75 ease-out"
          style={{
            transform: `translate3d(${offset.x * 48}px, ${offset.y * 48}px, 0)`,
          }}
        >
          {/* Bottom-Right Foreground Cloud Overlay */}
          <div className="absolute -bottom-[42%] -right-[45%] w-[85vw] h-[95vh] transform -rotate-[6deg] scale-x-[-1] opacity-95">
            <Image
              src="/cloud-transparent.png"
              alt="Foreground Bottom-Right Cloud"
              fill
              className="object-contain object-bottom-right drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* Top-Left Foreground Cloud Overlay */}
          <div className="absolute -top-[40%] -left-[25%] w-[80vw] h-[70vh] transform rotate-[170deg] opacity-90">
            <Image
              src="/cloud-transparent.png"
              alt="Foreground Top-Left Cloud"
              fill
              className="object-contain object-top-left drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* Prominent Fat Cloud Puff */}
          <div className="absolute top-[65%] -left-[22%] w-[68%] h-[98vh] opacity-95 transform -rotate-[10deg]">
            <Image
              src="/fat-cloud-transparent.png"
              alt="Fat Cloud"
              fill
              className="object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* Bottom-Left Foreground Wispy Accent */}
          <div className="absolute bottom-[60%] left-[68%] w-[80vw] h-[95vh] transform scale-x-[-1] opacity-85">
            <Image
              src="/cloud-transparent.png"
              alt="Foreground Bottom-Left Cloud"
              fill
              className="object-contain object-bottom-left drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
            />
          </div>
        </div>

        {/* 5. Center Hero Title - Transparent INNOVISION PNG Image */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-30 transition-transform duration-75 ease-out px-4"
          style={{
            transform: `translate3d(${offset.x * 35}px, ${offset.y * 35}px, 0)`,
          }}
        >
          <div className="relative -translate-y-12 w-[90vw] max-w-[1200px] h-[45vh] sm:h-[55vh] md:h-[75vh] lg:h-[95vh] flex items-center justify-center">
            <Image
              src="/innovision_transparent.png"
              alt="INNOVISION"
              fill
              priority
              className="object-contain filter drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)] drop-shadow-[0_0_12px_rgba(251,191,36,0.5)]"
            />
          </div>
        </div>
      </main>
    </>
  );
}
