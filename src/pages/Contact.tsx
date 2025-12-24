import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Send, CheckCircle } from "lucide-react";
import { useSiteSettings, usePageContent } from "@/hooks/useSanityData";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import EmptyState from "@/components/EmptyState";

const Contact = () => {
  const { data: settings, isLoading } = useSiteSettings();
  const { data: pageContent } = usePageContent("contact");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", subject: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, url: settings?.socialLinks?.linkedin },
    { name: "GitHub", icon: Github, url: settings?.socialLinks?.github },
    { name: "Twitter", icon: Twitter, url: settings?.socialLinks?.twitter },
  ].filter((link) => link.url);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!settings) {
    return (
      <>
        <PageSEO
          fallbackTitle="Contact"
          fallbackDescription="Get in touch"
        />
        <main className="pt-24 pb-16">
          <EmptyState
            title="No Contact Info"
            message="Add site settings in Sanity CMS to display contact information."
          />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <PageSEO
        seo={pageContent?.seo}
        fallbackTitle={pageContent?.title || "Contact"}
        fallbackDescription={pageContent?.description || "Get in touch"}
        siteName={settings.name}
      />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="section-number">{pageContent?.subtitle || "GET IN TOUCH"}</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mt-4">
              {pageContent?.title ? (
                <>
                  {pageContent.title.split(" ")[0]}{" "}
                  <span className="text-gradient">{pageContent.title.split(" ").slice(1).join(" ")}</span>
                </>
              ) : (
                <>
                  Let's <span className="text-gradient">Collaborate</span>
                </>
              )}
            </h1>
            {pageContent?.description && (
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                {pageContent.description}
              </p>
            )}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-heading font-semibold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  {settings.email && (
                    <a
                      href={`mailto:${settings.email}`}
                      className="flex items-center gap-4 p-4 bg-card border border-border hover:border-accent transition-colors group"
                    >
                      <div className="p-3 bg-accent/10 text-accent rounded">
                        <Mail size={20} />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Email</div>
                        <div className="font-medium group-hover:text-accent transition-colors">
                          {settings.email}
                        </div>
                      </div>
                    </a>
                  )}

                  {settings.phone && (
                    <a
                      href={`tel:${settings.phone}`}
                      className="flex items-center gap-4 p-4 bg-card border border-border hover:border-accent transition-colors group"
                    >
                      <div className="p-3 bg-accent/10 text-accent rounded">
                        <Phone size={20} />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Phone</div>
                        <div className="font-medium group-hover:text-accent transition-colors">
                          {settings.phone}
                        </div>
                      </div>
                    </a>
                  )}

                  {settings.location && (
                    <div className="flex items-center gap-4 p-4 bg-card border border-border">
                      <div className="p-3 bg-accent/10 text-accent rounded">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Location</div>
                        <div className="font-medium">{settings.location}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Links */}
              {socialLinks.length > 0 && (
                <div>
                  <h3 className="text-lg font-heading font-semibold mb-4">Connect With Me</h3>
                  <div className="flex gap-4">
                    {socialLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-card border border-border hover:border-accent hover:text-accent transition-all"
                        aria-label={link.name}
                      >
                        <link.icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-card border border-border p-8">
                <h2 className="text-2xl font-heading font-semibold mb-6">Send a Message</h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <CheckCircle className="text-green-500 mb-4" size={48} />
                    <h3 className="text-xl font-heading font-semibold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. I'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-background border border-border focus:border-accent focus:outline-none transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-background border border-border focus:border-accent focus:outline-none transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border focus:border-accent focus:outline-none transition-colors"
                        placeholder="Project inquiry"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-background border border-border focus:border-accent focus:outline-none transition-colors resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-heading font-semibold text-sm tracking-wide uppercase transition-all duration-400 hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Contact;
