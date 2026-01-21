import { motion, useInView, animate } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Play, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";

const portfolioVideos = [
  {
    id: 1,
    title: "Dynamic Reel Edit",
    category: "Short-form Content",
    url: "https://youtube.com/shorts/GvuaPC2I7Kk",
    embedId: "GvuaPC2I7Kk",
    isShort: true,
  },
  {
    id: 2,
    title: "Creative Transition Edit",
    category: "Short-form Content",
    url: "https://youtube.com/shorts/oih-a-BFqA8",
    embedId: "oih-a-BFqA8",
    isShort: true,
  },
  {
    id: 3,
    title: "Cinematic Short",
    category: "Short-form Content",
    url: "https://youtube.com/shorts/2GLb7-Bpsg0",
    embedId: "2GLb7-Bpsg0",
    isShort: true,
  },
  {
    id: 4,
    title: "Engaging Story Edit",
    category: "Short-form Content",
    url: "https://youtube.com/shorts/QZkQ4Nn6Djc",
    embedId: "QZkQ4Nn6Djc",
    isShort: true,
  },
  {
    id: 5,
    title: "Long-form YouTube Edit",
    category: "YouTube Editing",
    url: "https://youtu.be/2OXjHoBVou4",
    embedId: "2OXjHoBVou4",
    isShort: false,
  },
  {
    id: 6,
    title: "Viral Moment Edit",
    category: "Short-form Content",
    url: "https://youtube.com/shorts/M_YsXFXpqRk",
    embedId: "M_YsXFXpqRk",
    isShort: true,
  },
  {
    id: 7,
    title: "Story-driven Edit",
    category: "Short-form Content",
    url: "https://youtube.com/shorts/_Kqw6zbtkfY",
    embedId: "_Kqw6zbtkfY",
    isShort: true,
  },
];

const WorkSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedVideo, setSelectedVideo] = useState<typeof portfolioVideos[0] | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate videos for seamless loop
  const duplicatedVideos = [...portfolioVideos, ...portfolioVideos];

  // Auto-scroll infinite loop effect
  useEffect(() => {
    if (!carouselRef.current || isPaused) return;

    const carousel = carouselRef.current;
    let animationId: number;
    const scrollSpeed = 1; // pixels per frame

    const autoScroll = () => {
      if (carousel && !isPaused) {
        carousel.scrollLeft += scrollSpeed;
        
        // Seamless loop: when reaching halfway (original set ends), reset to start
        const halfWidth = carousel.scrollWidth / 2;
        if (carousel.scrollLeft >= halfWidth) {
          carousel.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      const newScrollLeft = carouselRef.current.scrollLeft + (direction === "right" ? scrollAmount : -scrollAmount);
      carouselRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    }
  };

  const getThumbnailUrl = (embedId: string) => {
    return `https://img.youtube.com/vi/${embedId}/maxresdefault.jpg`;
  };

  return (
    <section id="work" ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <span className="inline-block text-sm uppercase tracking-[0.3em] text-primary mb-4">
              Portfolio
            </span>
            <h2 className="heading-lg">
              Selected{" "}
              <span className="font-display italic text-primary">work</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md mt-4 md:mt-0">
            A curated selection of my video editing and content creation work.
          </p>
        </motion.div>

        {/* Video Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative"
        >
          {/* Navigation buttons */}
          <button
            onClick={() => scrollCarousel("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-primary/20 hover:border-primary/30 transition-all -translate-x-1/2 hidden md:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollCarousel("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-primary/20 hover:border-primary/30 transition-all translate-x-1/2 hidden md:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel container - Auto-moving slide */}
          <div
            ref={carouselRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {duplicatedVideos.map((video, index) => (
              <motion.div
                key={`${video.id}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1 * (index % portfolioVideos.length), duration: 0.5 }}
                onMouseEnter={() => setHoveredId(video.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedVideo(video)}
                className={`relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer snap-center group ${
                  video.isShort ? "w-[200px] md:w-[240px] aspect-[9/16]" : "w-[300px] md:w-[360px] aspect-video"
                }`}
              >
                {/* Thumbnail */}
                <img
                  src={getThumbnailUrl(video.embedId)}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={hoveredId === video.id ? { scale: 1.1 } : { scale: 1 }}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/30 group-hover:bg-primary/40 transition-all"
                  >
                    <Play className="w-6 h-6 md:w-8 md:h-8 text-primary fill-primary ml-1" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-xs uppercase tracking-wider text-primary mb-1 block">
                    {video.category}
                  </span>
                  <h3 className="text-sm md:text-base font-display font-medium">
                    {video.title}
                  </h3>
                </div>

                {/* Hover border */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-primary/50 transition-colors" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* View more CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <a 
            href="https://www.instagram.com/roshtic_edits" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            View More on Instagram
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedVideo(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative bg-card rounded-2xl overflow-hidden border border-border shadow-2xl ${
              selectedVideo.isShort ? "max-w-sm w-full" : "max-w-4xl w-full"
            }`}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className={selectedVideo.isShort ? "aspect-[9/16]" : "aspect-video"}>
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.embedId}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="p-4 md:p-6">
              <span className="text-sm text-primary uppercase tracking-wider">{selectedVideo.category}</span>
              <h3 className="text-xl md:text-2xl font-display font-medium mt-1">
                {selectedVideo.title}
              </h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default WorkSection;
