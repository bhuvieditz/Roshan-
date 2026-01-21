import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import aboutImage from "@/assets/about-image.jpg";

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section id="about" ref={sectionRef} className="section-padding relative">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Image column */}
          <motion.div variants={itemVariants} className="relative order-2 lg:order-1">
            <div className="relative">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative z-10"
              >
                <img
                  src={aboutImage}
                  alt="Roshan working"
                  className="w-full rounded-lg"
                  style={{ filter: "brightness(0.95) contrast(1.05)" }}
                />
                <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10" />
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border border-primary/30 rounded-lg -z-10" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 blur-2xl rounded-full -z-10" />
            </div>

            {/* Experience badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -bottom-6 -right-6 md:right-6 bg-card border border-border p-6 rounded-xl shadow-lg z-20"
            >
              <div className="text-4xl font-display font-bold text-primary">2+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">
                Years Experience
              </div>
            </motion.div>
          </motion.div>

          {/* Content column */}
          <motion.div variants={itemVariants} className="order-1 lg:order-2">
            <motion.span
              variants={itemVariants}
              className="inline-block text-sm uppercase tracking-[0.3em] text-primary mb-4"
            >
              About
            </motion.span>

            <motion.h2 variants={itemVariants} className="heading-lg mb-8">
              Crafting stories that{" "}
              <span className="font-display italic text-primary">connect</span> and convert
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="space-y-6 text-lg text-muted-foreground leading-relaxed"
            >
              <p>
                I'm <span className="text-foreground font-medium">Roshan</span> — someone who stands apart 
                through dedication and passion. When I truly love a task, I work on it wholeheartedly 
                until it's complete. I believe in <span className="text-primary">sincerity</span>, 
                commitment, and staying kind at heart.
              </p>
              <p>
                With a <span className="text-foreground font-medium">Bachelor of Technology in AI & Data Science</span>, 
                I bring both technical insight and creative vision to my work. But my true passion lies 
                in videography and video editing — it's where I come alive.
              </p>
              <p>
                From cozy cafes to rising influencers, I've helped clients stand out in crowded feeds. 
                My toolkit includes <span className="text-primary">DaVinci Resolve</span>, 
                <span className="text-primary"> Premiere Pro</span>, and 
                <span className="text-primary"> Photoshop</span> — mastered through countless hours 
                of crafting visual stories that resonate.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap gap-4"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Influencers
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Personal Brands
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Lifestyle Brands
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Cafes & Restaurants
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
