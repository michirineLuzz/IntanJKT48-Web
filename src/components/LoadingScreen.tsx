import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Music, Heart, Star, Flower } from "lucide-react";

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center section-gradient"
        >
          <div className="text-center">
            {/* Enhanced animated logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative mb-8"
            >
              {/* Outer ring with enhanced gradient */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-40 h-40 rounded-full border-2 border-primary/30 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple/10 to-secondary/10" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple/20 to-secondary/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
                {/* Orbiting elements */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${i * 45}deg) translateY(-70px)`,
                    }}
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.15
                    }}
                  >
                    <div className={`w-full h-full rounded-full ${
                      i % 3 === 0 ? 'bg-primary' : 
                      i % 3 === 1 ? 'bg-purple' : 'bg-secondary'
                    }`} />
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Inner ring with enhanced particles */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border-2 border-gold/40 relative"
              >
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${i * 30}deg) translateY(-30px)`,
                    }}
                    animate={{ 
                      opacity: [0.3, 1, 0.3],
                      scale: [1, 1.5, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </motion.div>
              
              {/* Center icon with enhanced glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative"
                >
                  <motion.div
                    className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-primary/30 via-purple/30 to-secondary/30 rounded-full blur-xl"
                    animate={{ scale: [1, 1.8, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.span 
                    className="text-6xl relative block"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    🌸
                  </motion.span>
                  {/* Floating sparkles around the flower */}
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4 text-primary" />
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-2 -left-2"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Star className="w-3 h-3 text-secondary" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced loading text with animated underline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.h2 
                className="font-display text-4xl font-bold text-gradient-rainbow mb-4"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Sakura Miyawaki
              </motion.h2>
              <div className="relative">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex items-center justify-center gap-1"
                >
                  <span className="text-sm text-muted-foreground">Preparing magical moments</span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                    className="text-primary"
                  >
                    ✨
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    className="text-purple"
                  >
                    💫
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                    className="text-secondary"
                  >
                    ⭐
                  </motion.span>
                </motion.div>
                
                {/* Enhanced animated underline */}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple to-secondary origin-left rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              
              {/* Additional loading message */}
              <motion.p
                className="text-xs text-muted-foreground mt-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                Spreading joy through music and performance...
              </motion.p>
            </motion.div>
          </div>

          {/* Enhanced floating decorations */}
          <motion.div
            animate={{
              y: [-30, 30, -30],
              rotate: [0, 15, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 text-4xl opacity-40"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-10 h-10 text-gradient-rainbow" />
            </motion.div>
          </motion.div>
          
          <motion.div
            animate={{
              y: [30, -30, 30],
              rotate: [0, -15, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4 text-4xl opacity-40"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-10 h-10 text-gradient-pink" />
            </motion.div>
          </motion.div>
          
          <motion.div
            animate={{
              y: [-25, 25, -25],
              rotate: [0, 10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="absolute top-1/3 right-1/3 text-3xl opacity-30"
          >
            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Music className="w-8 h-8 text-gradient-gold" />
            </motion.div>
          </motion.div>

          {/* Additional floating elements */}
          <motion.div
            animate={{
              y: [-20, 20, -20],
              rotate: [0, -10, 0]
            }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-1/2 left-1/3 text-3xl opacity-30"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-8 h-8 text-gradient-purple" />
            </motion.div>
          </motion.div>
          
          {/* Enhanced floating particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: i % 3 === 0 ? 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))' :
                           i % 3 === 1 ? 'linear-gradient(135deg, hsl(var(--purple)), hsl(var(--primary)))' :
                           'linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--gold)))',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -120, 0],
                x: [0, Math.random() * 120 - 60, 0],
                opacity: [0, 1, 0],
                scale: [1, 1.5, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
