
"use client";

import Link from "next/link";

export default function Footer() {
  const stars = [
    { left: "8%", top: "18%", size: 2 },
    { left: "15%", top: "72%", size: 1.5 },
    { left: "22%", top: "35%", size: 1.5 },
    { left: "29%", top: "82%", size: 2 },
    { left: "36%", top: "20%", size: 1.5 },
    { left: "43%", top: "65%", size: 2 },
    { left: "51%", top: "30%", size: 1.5 },
    { left: "58%", top: "78%", size: 1.5 },
    { left: "65%", top: "15%", size: 2 },
    { left: "72%", top: "55%", size: 1.5 },
    { left: "79%", top: "28%", size: 2 },
    { left: "86%", top: "73%", size: 1.5 },
    { left: "92%", top: "42%", size: 2 },
    { left: "5%", top: "48%", size: 1.5 },
    { left: "18%", top: "15%", size: 2 },
    { left: "32%", top: "48%", size: 1.5 },
    { left: "47%", top: "12%", size: 1.5 },
    { left: "62%", top: "45%", size: 2 },
    { left: "76%", top: "80%", size: 1.5 },
    { left: "89%", top: "18%", size: 1.5 },
    { left: "12%", top: "88%", size: 1.5 },
    { left: "25%", top: "62%", size: 1.5 },
    { left: "40%", top: "90%", size: 2 },
    { left: "55%", top: "58%", size: 1.5 },
    { left: "69%", top: "88%", size: 1.5 },
    { left: "83%", top: "62%", size: 2 },
    { left: "96%", top: "85%", size: 1.5 },
    { left: "3%", top: "30%", size: 1.5 },
    { left: "27%", top: "10%", size: 1.5 },
    { left: "74%", top: "10%", size: 2 },
    { left: "94%", top: "58%", size: 1.5 },
    { left: "10%", top: "58%", size: 2 },
    { left: "34%", top: "32%", size: 1.5 },
    { left: "57%", top: "18%", size: 1.5 },
    { left: "81%", top: "45%", size: 1.5 },
    { left: "45%", top: "82%", size: 1.5 },
    { left: "68%", top: "68%", size: 2 },
    { left: "87%", top: "35%", size: 1.5 },
    { left: "20%", top: "45%", size: 1.5 },
    { left: "53%", top: "92%", size: 1.5 },
    { left: "2%", top: "90%", size: 1.5 },
    { left: "97%", top: "12%", size: 1.5 },
    { left: "31%", top: "70%", size: 1.5 },
    { left: "63%", top: "88%", size: 1.5 },
    { left: "78%", top: "72%", size: 1.5 },
    { left: "16%", top: "30%", size: 1.5 },
    { left: "91%", top: "28%", size: 1.5 },
    { left: "39%", top: "10%", size: 1.5 },
    { left: "59%", top: "72%", size: 1.5 },
    { left: "70%", top: "35%", size: 1.5 },
    { left: "24%", top: "92%", size: 1.5 },
    { left: "84%", top: "90%", size: 1.5 },
    { left: "48%", top: "42%", size: 1.5 },
    { left: "7%", top: "78%", size: 1.5 },
    { left: "90%", top: "78%", size: 1.5 },
  ];

  const largeStars = [
    { left: "12%", top: "25%" },
    { left: "32%", top: "18%" },
    { left: "67%", top: "25%" },
    { left: "82%", top: "50%" },
    { left: "46%", top: "72%" },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#050b18] text-white">

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(251,191,36,0.07), transparent 45%)",
        }}
      />

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star, index) => (
          <span
            key={index}
            className="absolute rounded-full bg-white/60 animate-pulse"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${(index % 7) * 300}ms`,
              animationDuration: `${2 + (index % 4)}s`,
            }}
          />
        ))}

        {largeStars.map((star, index) => (
          <span
            key={`large-${index}`}
            className="absolute h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse"
            style={{
              left: star.left,
              top: star.top,
              animationDelay: `${index * 500}ms`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      {/* Constellation lines */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none opacity-30"
        viewBox="0 0 1200 500"
        preserveAspectRatio="none"
      >
        <path
          d="M80 120 L180 180 L260 110 L360 160 L450 90"
          fill="none"
          stroke="white"
          strokeWidth="1"
        />

        <path
          d="M720 100 L800 170 L900 120 L1010 190 L1120 130"
          fill="none"
          stroke="white"
          strokeWidth="1"
        />

        <path
          d="M160 350 L250 300 L350 370 L450 320 L540 390"
          fill="none"
          stroke="white"
          strokeWidth="1"
        />

        <path
          d="M690 360 L780 300 L870 350 L970 290 L1080 340"
          fill="none"
          stroke="white"
          strokeWidth="1"
        />

        <path
          d="M80 120 L180 180 L260 110 L360 160 L450 90"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="20 280"
          opacity="0.8"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-600"
            dur="6s"
            repeatCount="indefinite"
          />
        </path>

        <path
          d="M720 100 L800 170 L900 120 L1010 190 L1120 130"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="20 280"
          opacity="0.8"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-600"
            dur="7s"
            repeatCount="indefinite"
          />
        </path>
      </svg>

      {/* Orbital lines */}
      <div className="absolute left-1/2 top-16 h-32 w-[85%] -translate-x-1/2 rounded-[50%] border border-white/[0.06] pointer-events-none" />

      <div className="absolute left-1/2 top-20 h-32 w-[78%] -translate-x-1/2 rounded-[50%] border border-white/[0.04] pointer-events-none" />

      {/* Main content */}
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* Brand */}
        <div className="flex flex-col items-center text-center pt-20 pb-14">

          <div className="mb-5">
            <img
              src="/innovision_transparent.png"
              alt="Innovision"
              className="h-20 w-auto object-contain sm:h-24"
            />
          </div>

          <h2 className="font-serif text-xl tracking-[0.2em] text-white/90 sm:text-2xl">
            THE CELESTIAL ODYSSEY
          </h2>

          <p className="mt-3 text-xs uppercase tracking-[0.35em] text-white/40">
            NIT Rourkela
          </p>

        </div>

        {/* Three columns */}
        <div className="grid grid-cols-1 gap-8 border-t border-white/10 md:grid-cols-3 md:gap-10 lg:gap-12">

          {/* ================= EXPLORE ================= */}
          <section className="py-12 text-center md:border-r md:border-white/10">

            <div className="mb-7 flex items-center justify-center gap-4">

              <span className="h-px w-8 bg-white/25" />

              <h2 className="font-serif text-xs uppercase tracking-[0.3em] text-white/75">
                Explore
              </h2>

              <span className="h-px w-8 bg-white/25" />

            </div>

            <nav className="flex flex-col items-center gap-3.5">

              <Link
                href="/"
                className="text-sm text-white/55 transition-colors duration-300 hover:text-white"
              >
                Home
              </Link>

              <Link
                href="/#about"
                className="text-sm text-white/55 transition-colors duration-300 hover:text-white"
              >
                About
              </Link>

              <Link
                href="/events"
                className="text-sm text-white/55 transition-colors duration-300 hover:text-white"
              >
                Events
              </Link>

              <Link
                href="/#gallery"
                className="text-sm text-white/55 transition-colors duration-300 hover:text-white"
              >
                Gallery
              </Link>

              <Link
                href="/#Merch"
                className="text-sm text-white/55 transition-colors duration-300 hover:text-white"
              >
                Merch
              </Link>

              <Link
                href="/register"
                className="text-sm text-white/55 transition-colors duration-300 hover:text-white"
              >
                Register
              </Link>

            </nav>
          </section>

          {/* ================= ABOUT ================= */}
          <section className="py-12 text-center md:px-4">

            <div className="mb-7 flex items-center justify-center gap-4">

              <span className="h-px w-8 bg-white/25" />

              <h2 className="font-serif text-xs uppercase tracking-[0.3em] text-white/75">
                About Innovision
              </h2>

              <span className="h-px w-8 bg-white/25" />

            </div>

            <p className="mx-auto max-w-md text-sm leading-7 text-white/50">
              Innovision is NIT Rourkela&apos;s annual techno-management
              fest, bringing together technology, creativity, innovation
              and exploration.
            </p>

          </section>

          {/* ================= CONNECT ================= */}
          <section className="py-12 text-center md:border-l md:border-white/10">

            <div className="mb-7 flex items-center justify-center gap-4">

              <span className="h-px w-8 bg-white/25" />

              <h2 className="font-serif text-xs uppercase tracking-[0.3em] text-white/75">
                Connect
              </h2>

              <span className="h-px w-8 bg-white/25" />

            </div>

            <div className="flex flex-col items-center gap-3.5">

              <Link
                href="#"
                className="text-sm text-white/55 transition-colors duration-300 hover:text-white"
              >
                Instagram
              </Link>

              <Link
                href="#"
                className="text-sm text-white/55 transition-colors duration-300 hover:text-white"
              >
                LinkedIn
              </Link>

              <Link
                href="#"
                className="text-sm text-white/55 transition-colors duration-300 hover:text-white"
              >
                YouTube
              </Link>

              <Link
                href="mailto:contact@innovision.nitrkl.ac.in"
                className="text-sm text-white/55 transition-colors duration-300 hover:text-white"
              >
                Contact Us
              </Link>

            </div>

          </section>

        </div>

        {/* Bottom links */}
        <div className="flex flex-col gap-5 border-t border-white/10 py-7 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-5 text-[11px] text-white/35">

            <Link
              href="/terms-and-conditions"
              className="transition-colors hover:text-white/70"
            >
              Terms & Conditions
            </Link>

            <span className="h-3 w-px bg-white/15" />

            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-white/70"
            >
              Privacy Policy
            </Link>

          </div>

          <p className="text-[11px] text-white/30">
            © {new Date().getFullYear()} Innovision, NIT Rourkela
          </p>

        </div>

        {/* Final line */}
        <div className="flex justify-center border-t border-white/5 py-5">

          <p className="text-[10px] uppercase tracking-[0.3em] text-white/20">
            Designed & Built with curiosity
          </p>

        </div>

      </div>
    </footer>
  );
}

