const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-accent flex items-center justify-center">
              <span className="font-heading font-bold text-accent text-sm">E</span>
            </div>
            <span className="font-heading font-semibold text-foreground text-sm tracking-wide">
              ENGINEER
            </span>
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} All rights reserved. Designed with precision.
          </p>

          {/* Back to Top */}
          <a
            href="#home"
            className="text-muted-foreground text-sm hover:text-foreground transition-colors tracking-widest uppercase"
          >
            Back to Top
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
