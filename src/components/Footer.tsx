import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube, Music2 } from "lucide-react";

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "https://x.com/N_IntanJKT48" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/intan.jkt48/" },
  { icon: Youtube, label: "IDN Live", href: "https://www.idn.app/jkt48_intan" },
  { icon: Music2, label: "TikTok", href: "https://www.tiktok.com/@jkt48.intan" },
];

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Schedule", href: "/schedule" },
  { label: "Media", href: "/media" },
];

const Footer = () => {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5"
          >
            <Link to="/" className="inline-block mb-4">
              <h2
                className="text-2xl font-bold text-zinc-900 dark:text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Nur Intan
              </h2>
            </Link>

            <p
              className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-sm"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              JKT48 13th Generation Member
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-3"
          >
            <h3
              className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Navigation
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links - Right Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4"
          >
            <h3
              className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Social Media
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-6 py-6">
          <p
            className="text-xs text-zinc-400 text-center"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            © 2026 Made with ❤️ by Rizzz
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
