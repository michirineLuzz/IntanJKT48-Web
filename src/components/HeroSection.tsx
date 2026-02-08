import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-900 px-4 pt-20">
      <div className="w-full max-w-6xl">

        {/* Stacked Cards Layout */}
        <div className="relative">

          {/* Background Cards Stack Effect */}
          <div className="absolute top-4 left-4 right-4 h-full bg-pink-100 dark:bg-pink-900/20 rounded-[2.5rem] rotate-[-2deg]" />
          <div className="absolute top-2 left-2 right-2 h-full bg-purple-100 dark:bg-purple-900/20 rounded-[2.5rem] rotate-[1deg]" />

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-br from-pink-50 to-purple-50 dark:from-zinc-800 dark:to-zinc-900 rounded-[2.5rem] shadow-2xl overflow-hidden"
          >

            <div className="grid md:grid-cols-5 min-h-[600px]">

              {/* Photo Section - 2 cols */}
              <div className="md:col-span-2 relative bg-white dark:bg-zinc-950">
                <img
                  src="https://pbs.twimg.com/media/GrSdZbyXoAAaqH1?format=jpg&name=medium"
                  alt="Nur Intan"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Section - 3 cols */}
              <div className="md:col-span-3 p-8 md:p-12 lg:p-16 flex flex-col justify-center">

                <div className="inline-block text-xs font-bold tracking-[0.2em] text-primary uppercase mb-4">
                  JKT48 · 13th Generation
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
                  Nur Intan
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                  Intan permata yang berkilau, temukan cahayaku di hatimu! ✨
                </p>

                {/* Mini Info */}
                <div className="grid grid-cols-3 gap-6 text-sm">
                  <div>
                    <p className="text-2xl font-bold text-foreground">13th</p>
                    <p className="text-muted-foreground">Generation</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">2024</p>
                    <p className="text-muted-foreground">Debut</p>
                  </div>
                </div>

              </div>

            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
