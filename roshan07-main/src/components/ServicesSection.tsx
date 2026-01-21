import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  TrendingUp,
  Video,
  Film,
  Camera,
  MessageSquare,
  BarChart3,
  Zap,
} from "lucide-react";

import serviceSocialStrategy from "@/assets/service-social-strategy.jpg";
import serviceReelsEditing from "@/assets/service-reels-editing.jpg";
import serviceYoutubeEditing from "@/assets/service-youtube-editing.jpg";
import serviceContentShooting from "@/assets/service-content-shooting.jpg";
import serviceBrandStorytelling from "@/assets/service-brand-storytelling.jpg";
import serviceAnalytics from "@/assets/service-analytics.jpg";
import servicePaidAds from "@/assets/service-paid-ads.jpg";

const services = [
  {
    icon: TrendingUp,
    title: "Social Media Strategy",
    description: "Grow your audience and build a loyal community.",
    image: serviceSocialStrategy,
  },
  {
    icon: Video,
    title: "Reels & TikTok Editing",
    description: "Scroll-stopping short-form content for max reach.",
    image: serviceReelsEditing,
  },
  {
    icon: Film,
    title: "YouTube Editing",
    description: "Cinematic videos with retention-focused storytelling.",
    image: serviceYoutubeEditing,
  },
  {
    icon: Camera,
    title: "Content Shooting",
    description: "Professional shoots aligned with your brand.",
    image: serviceContentShooting,
  },
  {
    icon: MessageSquare,
    title: "Brand Storytelling",
    description: "Narratives that connect emotionally with your audience.",
    image: serviceBrandStorytelling,
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Insights to track growth and optimize content.",
    image: serviceAnalytics,
  },
  {
    icon: Zap,
    title: "Paid Ads Creative",
    description: "High-converting creatives for measurable results.",
    image: servicePaidAds,
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-padding relative bg-secondary/30"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-sm uppercase tracking-[0.3em] text-primary mb-4">
            Services
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-medium leading-tight mb-6">
            Everything you need to{" "}
            <span className="font-display italic text-primary">dominate</span>{" "}
            social
          </h2>
          <p className="text-lg text-muted-foreground">
            From strategy to execution, I offer end-to-end solutions to elevate
            your digital presence and drive real results.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500"
            >
              {/* Image container */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                
                {/* Icon overlay */}
                <motion.div 
                  className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-primary/90 backdrop-blur-sm flex items-center justify-center"
                  animate={{
                    rotate: hoveredIndex === index ? 360 : 0,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <service.icon className="w-6 h-6 text-primary-foreground" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6 relative">
                <h3 className="text-xl font-display font-medium mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {service.description}
                </p>

                {/* Animated underline */}
                <motion.div
                  className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-primary via-primary to-transparent"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{
                    scaleX: hoveredIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>

              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  boxShadow: hoveredIndex === index 
                    ? "inset 0 0 60px rgba(217, 119, 87, 0.15)" 
                    : "inset 0 0 0px rgba(217, 119, 87, 0)",
                }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
