import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      {/* Accent Glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="section-number">01 — INTRODUCTION</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight"
            >
              CAD
              <br />
              <span className="text-gradient">Engineer</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-muted-foreground font-light max-w-lg"
            >
              Engineering precision through CAD mastery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex gap-4 pt-4"
            >
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-heading font-semibold text-sm tracking-wide uppercase transition-all duration-400 hover:bg-accent/90"
              >
                View Work
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-heading font-semibold text-sm tracking-wide uppercase transition-all duration-400 hover:border-accent hover:text-accent"
              >
                Contact
              </a>
            </motion.div>
          </div>

          {/* Right Content - Engineering Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Outer Ring */}
              <div className="absolute inset-0 border border-border rounded-full animate-spin" style={{ animationDuration: '30s' }} />
              
              {/* Middle Ring */}
              <div className="absolute inset-8 border border-accent/30 rounded-full animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
              
              {/* Inner Ring */}
              <div className="absolute inset-16 border border-border rounded-full animate-spin" style={{ animationDuration: '15s' }} />

              {/* Center Element */}
              <div className="absolute inset-24 bg-card border border-border flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-heading font-bold text-accent">CAD</div>
                  <div className="text-sm text-muted-foreground tracking-widest mt-2">PRECISION</div>
                </div>
              </div>

              {/* Corner Markers */}
              <div className="absolute top-0 left-1/2 w-px h-8 bg-accent/50" />
              <div className="absolute bottom-0 left-1/2 w-px h-8 bg-accent/50" />
              <div className="absolute left-0 top-1/2 w-8 h-px bg-accent/50" />
              <div className="absolute right-0 top-1/2 w-8 h-px bg-accent/50" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#skills"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default HeroSection;
