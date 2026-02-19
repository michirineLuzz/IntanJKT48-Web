import HeroSection from "@/components/HeroSection";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Camera, Calendar, Music } from "lucide-react";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 15
        }
    }
};

const Home = () => {
    return (
        <Layout>
            <HeroSection />

            {/* Bento Grid */}
            <section className="relative py-20 overflow-hidden">
                {/* Minimal Modern Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-50/60 via-purple-50/40 via-50% to-blue-50/50 dark:from-pink-950/20 dark:via-purple-950/15 dark:to-blue-950/20" />
                <div className="absolute inset-0 bg-gradient-to-tl from-amber-50/30 via-transparent to-transparent dark:from-amber-950/10" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >

                        {/* Main Card - Gallery */}
                        <motion.div variants={cardVariants} className="col-span-2 row-span-2">
                            <Link to="/gallery" className="block h-full">
                                <motion.div
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="bg-gradient-to-br from-pink-300 to-pink-500 dark:from-pink-600 dark:to-pink-800 rounded-[2rem] text-white min-h-[350px] shadow-xl shadow-pink-200/50 dark:shadow-pink-900/30 h-full hover:shadow-2xl hover:shadow-pink-300/60 transition-shadow duration-300"
                                >
                                    <div className="p-8 h-full flex flex-col justify-between relative overflow-hidden">
                                        <div>
                                            <motion.div
                                                className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-4"
                                                whileHover={{ rotate: 10, scale: 1.1 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <Camera className="w-7 h-7" />
                                            </motion.div>
                                            <h3 className="text-3xl font-bold mb-2 text-black">Photo Gallery</h3>
                                            <p className="opacity-90">See my latest photos! ✨</p>
                                        </div>

                                        <motion.span
                                            className="inline-flex items-center gap-2 bg-white/20 px-5 py-3 rounded-full font-medium w-fit"
                                            whileHover={{ x: 5 }}
                                        >
                                            View Photos <ArrowRight className="w-4 h-4" />
                                        </motion.span>
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>

                        {/* About Card */}
                        <motion.div variants={cardVariants} className="col-span-2 md:col-span-1">
                            <Link to="/about" className="block h-full">
                                <motion.div
                                    whileHover={{ scale: 1.03, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="bg-gradient-to-br from-purple-300 to-purple-500 dark:from-purple-600 dark:to-purple-800 rounded-[2rem] text-white shadow-xl shadow-purple-200/50 dark:shadow-purple-900/30 h-full hover:shadow-2xl hover:shadow-purple-300/60 transition-shadow duration-300"
                                >
                                    <div className="p-6 h-full flex flex-col justify-between relative overflow-hidden min-h-[180px]">
                                        <div>
                                            <motion.div
                                                className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4"
                                                whileHover={{ rotate: 15, scale: 1.1 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <Star className="w-6 h-6" />
                                            </motion.div>
                                            <h3 className="text-xl font-bold mb-1">About Me</h3>
                                            <p className="text-sm opacity-90">Get to know me! 🌟</p>
                                        </div>

                                        <motion.span
                                            className="inline-flex items-center gap-1 text-sm font-medium mt-4"
                                            whileHover={{ x: 5 }}
                                        >
                                            Read More <ArrowRight className="w-4 h-4" />
                                        </motion.span>
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>

                        {/* Schedule Card */}
                        <motion.div variants={cardVariants} className="col-span-2 md:col-span-1">
                            <Link to="/schedule" className="block h-full">
                                <motion.div
                                    whileHover={{ scale: 1.03, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="bg-gradient-to-br from-blue-300 to-blue-500 dark:from-blue-600 dark:to-blue-800 rounded-[2rem] text-white shadow-xl shadow-blue-200/50 dark:shadow-blue-900/30 h-full hover:shadow-2xl hover:shadow-blue-300/60 transition-shadow duration-300"
                                >
                                    <div className="p-6 h-full flex flex-col justify-between relative overflow-hidden min-h-[180px]">
                                        <div>
                                            <motion.div
                                                className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4"
                                                whileHover={{ rotate: -10, scale: 1.1 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <Calendar className="w-6 h-6" />
                                            </motion.div>
                                            <h3 className="text-xl font-bold mb-1">Schedule</h3>
                                            <p className="text-sm opacity-90">Don't miss any events! 🗓️</p>
                                        </div>

                                        <motion.span
                                            className="inline-flex items-center gap-1 text-sm font-medium mt-4"
                                            whileHover={{ x: 5 }}
                                        >
                                            View All <ArrowRight className="w-4 h-4" />
                                        </motion.span>
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>

                        {/* Stats Card - Gen */}
                        <motion.div
                            variants={cardVariants}
                            whileHover={{ scale: 1.05, y: -5, rotate: 2 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="bg-gradient-to-br from-amber-200 to-amber-400 dark:from-amber-500 dark:to-amber-700 rounded-[2rem] p-5 text-amber-900 dark:text-white flex flex-col items-center justify-center text-center aspect-square shadow-xl shadow-amber-100/50 dark:shadow-amber-900/30 cursor-pointer hover:shadow-2xl hover:shadow-amber-200/60 transition-shadow duration-300"
                        >
                            <motion.p
                                className="text-3xl font-bold"
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                            >
                                13th
                            </motion.p>
                            <p className="text-xs opacity-80">Generation</p>
                        </motion.div>

                        {/* Stats Card - Supporters */}
                        <motion.div
                            variants={cardVariants}
                            whileHover={{ scale: 1.05, y: -5, rotate: -2 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="bg-gradient-to-br from-rose-200 to-rose-400 dark:from-rose-500 dark:to-rose-700 rounded-[2rem] p-5 text-rose-900 dark:text-white flex flex-col items-center justify-center text-center aspect-square shadow-xl shadow-rose-100/50 dark:shadow-rose-900/30 cursor-pointer hover:shadow-2xl hover:shadow-rose-200/60 transition-shadow duration-300"
                        >
                            <motion.p
                                className="text-3xl font-bold"
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                            >
                                100K+
                            </motion.p>
                            <p className="text-xs opacity-80">Supporters</p>
                        </motion.div>

                        {/* Music Card */}
                        <motion.div variants={cardVariants} className="col-span-2">
                            <Link to="/media" className="block">
                                <motion.div
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="bg-gradient-to-br from-teal-300 to-teal-500 dark:from-teal-600 dark:to-teal-800 rounded-[2rem] text-white shadow-xl shadow-teal-200/50 dark:shadow-teal-900/30 hover:shadow-2xl hover:shadow-teal-300/60 transition-shadow duration-300"
                                >
                                    <div className="p-6 flex items-center gap-5 relative overflow-hidden">
                                        <motion.div
                                            className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0"
                                            whileHover={{ rotate: 15, scale: 1.1 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <Music className="w-7 h-7" />
                                        </motion.div>

                                        <div className="flex-grow">
                                            <h3 className="text-xl font-bold">Music & Media 🎵</h3>
                                            <p className="text-sm opacity-90">Check out latest music and media!</p>
                                        </div>

                                        <motion.span
                                            className="hidden md:inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium"
                                            whileHover={{ x: 5 }}
                                        >
                                            Look it up! <ArrowRight className="w-4 h-4" />
                                        </motion.span>
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>


        </Layout>
    );
};

export default Home;
