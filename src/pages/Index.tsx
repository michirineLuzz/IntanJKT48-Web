import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import ScheduleSection from "@/components/ScheduleSection";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />

      <motion.div
        className={`transition-opacity duration-700 ${isLoading ? "opacity-0" : "opacity-100"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        <Navigation />
        <motion.main
          initial={{ y: 20 }}
          animate={{ y: isLoading ? 20 : 0 }}
          transition={{ duration: 0.7, ease: "easeInOut", delay: isLoading ? 0 : 0.2 }}
        >
          <HeroSection />
          <AboutSection />
          <GallerySection />
          <ScheduleSection />
        </motion.main>
        <Footer />
      </motion.div>
    </>
  );
};

export default Index;
