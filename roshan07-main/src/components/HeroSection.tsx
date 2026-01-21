import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import heroVideo from "@/assets/hero-video.mp4";

// Background slideshow images - Social Media Manager, Content Creator, Video Editor
const slideshowImages = [
  "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1920&q=80", // Social media management
  "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1920&q=80", // Content creation desk
  "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&q=80", // Video editing setup
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&q=80", // Digital marketing
  "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1920&q=80", // Creative workspace
];

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effect for background - moves slower than scroll
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Auto slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh] flex flex-col items-center justify-start overflow-hidden pt-32 md:pt-40"
    >
      {/* Background slideshow with parallax effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={slideshowImages[currentSlide]}
            alt=""
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.25, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{ y: backgroundY, scale: backgroundScale }}
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Content - Split Layout */}
      <motion.div style={{ opacity }} className="relative z-20 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left side - Text content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Subheadline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-3 text-xs md:text-sm font-body uppercase tracking-[0.2em] text-muted-foreground flex-wrap justify-center lg:justify-start">
                <span className="hidden sm:block w-8 h-px bg-primary" />
                Social Media Manager
                <span className="w-2 h-2 rounded-full bg-primary" />
                Content Creator
                <span className="w-2 h-2 rounded-full bg-primary" />
                Video Editor
                <span className="hidden sm:block w-8 h-px bg-primary" />
              </span>
            </motion.div>

            {/* Main headline - Properly aligned */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="heading-display mb-8"
            >
              <span className="block">I create content that</span>
              <span className="block">
                moves people
                <span className="text-primary">—</span>
                and numbers.
              </span>
            </motion.h1>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
            >
              <a href="#contact" className="btn-primary">
                Book a Call
              </a>
              <a href="#work" className="btn-secondary">
                View Work
              </a>
            </motion.div>
          </div>

          {/* Right side - Small Video with Glowing Pulse */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="w-full max-w-[280px] lg:max-w-[300px] flex-shrink-0"
          >
            <div className="relative rounded-xl overflow-hidden">
              {/* Glowing pulse border */}
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary via-primary/50 to-primary animate-pulse opacity-75 blur-sm" />
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary via-primary/80 to-primary animate-[pulse_2s_ease-in-out_infinite]" />
              
              {/* Video container */}
              <div className="relative rounded-xl overflow-hidden border border-primary/50 shadow-2xl shadow-primary/20">
                <video
                  src={heroVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto object-contain relative z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none z-20" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="scroll-indicator" />
      </motion.div>

    </section>
  );
};

export default HeroSection;
