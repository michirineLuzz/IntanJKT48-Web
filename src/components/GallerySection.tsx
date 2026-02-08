import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Shuffle, ChevronUp } from "lucide-react";

const allImageUrls = [
  "https://pbs.twimg.com/media/G-4HUVgW8AAk4W4?format=jpg&name=medium",
  "https://pbs.twimg.com/media/G-8MJjUWoAAZ9VS?format=jpg&name=medium",
  "https://pbs.twimg.com/media/G-9RAmdXcAA5xgi?format=jpg&name=medium",
  "https://pbs.twimg.com/media/G-MaJAca0AEZgmL?format=jpg&name=medium",
  "https://pbs.twimg.com/media/G-NYAGybcAEyRlw?format=jpg&name=medium",
  "https://pbs.twimg.com/media/G-T1Juxb0AAW0wZ?format=jpg&name=medium",
  "https://pbs.twimg.com/media/G-TSQl9boAAkCsA?format=jpg&name=medium",
  "https://pbs.twimg.com/media/G-YduODacAEk2en?format=jpg&name=medium",
  "https://pbs.twimg.com/media/G-dg1S0akAEkGzW?format=jpg&name=medium",
  "https://pbs.twimg.com/media/G-ijFW_a4AAgmcv?format=jpg&name=medium",
  "https://pbs.twimg.com/media/G-tdKu6bQAImfQ1?format=jpg&name=medium",
  "https://pbs.twimg.com/media/G-wdCnmbcAAB23m?format=jpg&name=medium",
  "https://pbs.twimg.com/media/G1CpiHfaoAARNEn?format=jpg&name=medium",
  "https://pbs.twimg.com/media/G1NgbDIakAA1i5V?format=jpg&name=medium",
  "https://pbs.twimg.com/media/G1comGVa0AEcXFY?format=jpg&name=medium",
  "https://pbs.twimg.com/media/G2TvFmlbsAAL0Vx?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GxMc-mIWkAE2CID?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GxMcnv2W8AAb0OS?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GxgE97rbkAAdHFi?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GxzSnUMbQAAzBAK?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GyErW-AaIAA8vJ3?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GyXdOITa4AIJoAt?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GzAyJoNboAApd98?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GsLiVcNaUAUKtub?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GscDA85aQAEJdP8?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GsnBxdOasAI1lC8?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GsnBxdPa0AAJNEV?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GsnBxdPagAAj9Rs?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GsnBxdUasAAaMAB?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GsrWTmja4AAs2at?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GsrWUXubcAArusq?format=jpg&name=medium",
  "https://pbs.twimg.com/media/Gsu0oWObUAAw9ZH?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GtLSZ4-bwAAaMEk?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GtLVvmYawAAq6pr?format=jpg&name=medium",
  "https://pbs.twimg.com/media/Gtuz89OWkAAClxH?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GtuzKtZXAAA5vaT?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GsK2_r9aUAIKC4a?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GsK2_rvaUAQ6wVT?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GsK2_xWaMAAcDQu?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GsLiVWJaUAYyAmP?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GsLiVWMaUAANupj?format=jpg&name=medium",
  "https://pbs.twimg.com/media/GsLiVWSaUAIN9pU?format=jpg&name=medium",

];

const IMAGES_PER_PAGE = 23;

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [displayedImages, setDisplayedImages] = useState(IMAGES_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [shuffledImages, setShuffledImages] = useState(allImageUrls);

  const shuffleImages = useCallback(() => {
    const shuffled = [...allImageUrls].sort(() => Math.random() - 0.5);
    setShuffledImages(shuffled);
    setDisplayedImages(IMAGES_PER_PAGE);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        if (!isLoading && displayedImages < shuffledImages.length) {
          setIsLoading(true);
          setTimeout(() => {
            setDisplayedImages(prev => Math.min(prev + IMAGES_PER_PAGE, shuffledImages.length));
            setIsLoading(false);
          }, 300);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, displayedImages, shuffledImages.length]);

  const visibleImages = useMemo(() => shuffledImages.slice(0, displayedImages), [shuffledImages, displayedImages]);

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return;
    setSelectedImage(direction === "prev"
      ? (selectedImage === 0 ? visibleImages.length - 1 : selectedImage - 1)
      : (selectedImage === visibleImages.length - 1 ? 0 : selectedImage + 1)
    );
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === "ArrowLeft") navigateImage("prev");
      if (e.key === "ArrowRight") navigateImage("next");
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedImage, visibleImages.length]);

  useEffect(() => {
    document.body.style.overflow = selectedImage !== null ? "hidden" : "";
  }, [selectedImage]);

  return (
    <section className="min-h-screen bg-white dark:bg-zinc-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Animated Header */}
        <div className="text-center mb-16 pt-8">
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mb-8 rounded-full"
          />

          {/* Animated Title */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-bold"
            >
              <span className="bg-gradient-to-r from-black to-black bg-clip-text text-transparent">
                Photo Gallery
              </span>
            </motion.h1>
          </div>

          {/* Subtitle with stagger */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-zinc-500 dark:text-zinc-400 mb-8"
          >
            A collection of{" "}
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
              className="inline-block font-semibold text-pink-500"
            >
              {shuffledImages.length}
            </motion.span>
            {" "}beautiful moments
          </motion.p>

          {/* Animated button */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            onClick={shuffleImages}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full font-medium shadow-lg shadow-pink-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              key={shuffledImages[0]}
            >
              <Shuffle className="w-5 h-5" />
            </motion.span>
            Shuffle Photos
          </motion.button>

          {/* Floating decorations */}
          <div className="relative h-8 mt-8">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-pink-400/50"
                style={{ left: `${20 + i * 15}%` }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Photo Grid - Simple 3 column */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {visibleImages.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="relative group cursor-pointer aspect-[4/5] bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Simple overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* End message */}
        {visibleImages.length >= shuffledImages.length && (
          <p className="text-center text-zinc-400 py-10">
            That's all {shuffledImages.length} photos! 💖
          </p>
        )}
      </div>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 w-12 h-12 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg flex items-center justify-center z-40"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            {/* Counter */}
            <div className="absolute top-4 left-4 text-white/70 text-sm z-10">
              {selectedImage + 1} / {visibleImages.length}
            </div>

            {/* Navigation arrows */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 z-10"
              onClick={(e) => { e.stopPropagation(); navigateImage("prev"); }}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 z-10"
              onClick={(e) => { e.stopPropagation(); navigateImage("next"); }}
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            {/* Image */}
            <motion.img
              key={selectedImage}
              src={visibleImages[selectedImage]}
              alt=""
              className="max-w-[95vw] max-h-[90vh] object-contain"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
