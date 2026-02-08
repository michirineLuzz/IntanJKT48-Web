import { ReactNode, useEffect, useState } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Scroll to top on page load/reload
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Show/hide scroll-to-top button
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Navigation />
            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="flex-grow pt-24"
            >
                {children}
            </motion.main>
            <Footer />

            {/* Scroll to Top Button */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="fixed bottom-6 right-6 w-12 h-12 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg flex items-center justify-center z-40 transition-colors"
                        aria-label="Scroll to top"
                    >
                        <ChevronUp className="w-5 h-5" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Layout;

