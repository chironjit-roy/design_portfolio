import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useHeroContent, useSiteSettings } from "@/hooks/useSanityData";
import heroImage from "@/assets/hero-cad-render.png";

const Home = () => {
  const { data: heroContent } = useHeroContent();
  const { data: settings } = useSiteSettings();

  return (
    <>
      <Helmet>
        <title>{settings?.name || "CAD Engineer"} | Portfolio</title>
        <meta
          name="description"
          content={heroContent?.subtitle || "Engineering precision through CAD mastery."}
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
                <span className="section-number">{heroContent?.tagline || "01 — INTRODUCTION"}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight"
              >
                {heroContent?.title?.split(" ")[0] || "CAD"}
                <br />
                <span className="text-gradient">{heroContent?.title?.split(" ").slice(1).join(" ") || "Engineer"}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl md:text-2xl text-muted-foreground font-light max-w-lg"
              >
                {heroContent?.subtitle || "Engineering precision through CAD mastery."}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex gap-4 pt-4"
              >
                <Link
                  to="/designs"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-heading font-semibold text-sm tracking-wide uppercase transition-all duration-400 hover:bg-accent/90"
                >
                  {heroContent?.ctaPrimary?.text || "View Work"}
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-heading font-semibold text-sm tracking-wide uppercase transition-all duration-400 hover:border-accent hover:text-accent"
                >
                  {heroContent?.ctaSecondary?.text || "Contact"}
                </Link>
              </motion.div>
            </div>

            {/* Right Content - Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Image Frame */}
                <div className="relative overflow-hidden border border-border">
                  <img
                    src={heroImage}
                    alt="3D CAD Engineering Render"
                    className="w-full h-auto object-cover"
                  />
                  {/* Overlay accent */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent" />
                </div>

                {/* Corner Markers */}
                <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-accent" />
                <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-accent" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-accent" />
                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-accent" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs tracking-widest uppercase">Explore</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* Quick Links Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="section-number">02 — EXPLORE</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-4">
              What Would You Like to See?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Skills", description: "Technical expertise & tools", link: "/skills" },
              { title: "Designs", description: "CAD projects & portfolio", link: "/designs" },
              { title: "Certifications", description: "Professional credentials", link: "/certifications" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.link}
                  className="block p-8 bg-card border border-border hover:border-accent transition-all duration-400 group card-lift"
                >
                  <h3 className="text-xl font-heading font-semibold mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <ArrowRight className="text-accent opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
