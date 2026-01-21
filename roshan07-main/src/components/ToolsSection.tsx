import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const tools = [
  { name: "Instagram", icon: "📸" },
  { name: "YouTube", icon: "▶️" },
  { name: "TikTok", icon: "🎵" },
  { name: "Premiere Pro", icon: "🎬" },
  { name: "After Effects", icon: "✨" },
  { name: "CapCut", icon: "✂️" },
  { name: "Photoshop", icon: "🖼️" },
  { name: "Canva", icon: "🎨" },
];

const ToolsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm uppercase tracking-[0.3em] text-primary mb-4">
            Tools & Platforms
          </span>
          <h2 className="heading-md">
            The arsenal behind the{" "}
            <span className="font-display italic text-primary">magic</span>
          </h2>
        </motion.div>

        {/* Tools marquee */}
        <div className="relative">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex gap-6 overflow-hidden"
          >
            <div className="flex gap-6 animate-[shimmer_20s_linear_infinite]">
              {[...tools, ...tools].map((tool, index) => (
                <motion.div
                  key={`${tool.name}-${index}`}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="flex-shrink-0 px-8 py-6 rounded-2xl bg-secondary/50 border border-border/50 hover:border-primary/30 hover:bg-secondary transition-all duration-300 cursor-default"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{tool.icon}</span>
                    <span className="text-lg font-medium whitespace-nowrap">
                      {tool.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
