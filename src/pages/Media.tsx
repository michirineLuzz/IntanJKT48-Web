import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Play, Calendar, ExternalLink } from "lucide-react";


// --- Helper Functions to Add Content ---

/**
 * Creates a video entry for the gallery.
 * @param title
 * @param videoUrl
 * @param thumbnail
 * @param date
 * @param duration
 */
const createVideoLink = (
    title: string,
    videoUrl: string,
    thumbnail: string,
    date: string,
    duration?: string
) => ({
    id: `video-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: 'video' as const,
    title,
    videoUrl,
    thumbnail,
    date,
    duration
});

// --- Content Data ---

const videos = [
    createVideoLink(
        "JKT48 13th Generation Profile: Intan",
        "https://www.youtube.com/watch?v=SojGpGHMYEA",
        "https://img.youtube.com/vi/SojGpGHMYEA/hqdefault.jpg",
        "Dec 1, 2024"
    ),
    createVideoLink(
        "Belajar Konseling bersama Intan",
        "https://www.youtube.com/watch?v=nZL7vtku_o4",
        "https://img.youtube.com/vi/nZL7vtku_o4/hqdefault.jpg",
        "Jul 20, 2025"
    ),
    createVideoLink(
        "Temen Ngobrol EP.4: The Undercover Roulette! - Erine JKT48 vs Intan JKT48 | 21 Juli 2025",
        "https://www.youtube.com/watch?v=qzqBcK0tz5c",
        "https://img.youtube.com/vi/qzqBcK0tz5c/hqdefault.jpg",
        "Jul 21, 2025"
    ),
    createVideoLink(
        "TEMEN MAIN EP.1 : NEW YEAR START WITH US!! - Ekin JKT48 vs Intan JKT48 | 13 Januari 2026",
        "https://www.youtube.com/watch?v=OzFBzsiMrN4",
        "https://img.youtube.com/vi/OzFBzsiMrN4/hqdefault.jpg",
        "Jan 13, 2026"
    ),
    createVideoLink(
        "[JAHAT-JAHATAN] SPESIAL DIRGAHAYU RI KE-80!",
        "https://www.youtube.com/watch?v=ek8xyzdx0NI",
        "https://img.youtube.com/vi/ek8xyzdx0NI/hqdefault.jpg",
        "Aug 17, 2025"
    ),
    createVideoLink(
        "TEMEN MAIN EP.4: THE FINAL GAME ON! - Intan JKT48 vs Trisha JKT48 | 30 September 2025",
        "https://www.youtube.com/watch?v=HRA-zTDD4Ek",
        "https://img.youtube.com/vi/HRA-zTDD4Ek/hqdefault.jpg",
        "Sep 30, 2025"
    ),
    createVideoLink(
        "[LAST CONTENT] GRACIA VS ADIK-ADIK",
        "https://www.youtube.com/watch?v=1p-0wQB-5M8",
        "https://img.youtube.com/vi/1p-0wQB-5M8/hqdefault.jpg",
        "Dec 26, 2025"
    ),
    createVideoLink(
        "[SECRET CAM] JKT48 THE FIRST SNOW",
        "https://www.youtube.com/watch?v=FgSr-tSxRiA",
        "https://img.youtube.com/vi/FgSr-tSxRiA/hqdefault.jpg",
        "Dec 30, 2025"
    )
];

// --- Sort videos by date (newest first) ---
const sortedVideos = [...videos].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
});

// --- Components ---

const Media = () => {

    return (
        <Layout>
            {/* Header Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background z-0 pointer-events-none" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-4"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        Media Archive
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        Explore the complete collection of behind the scenes, Watch music videos, live performances, and behind-the-scenes content.
                    </motion.p>
                </div>
            </section>

            {/* Video Gallery Section */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-3xl font-bold flex items-center gap-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            <Play className="w-6 h-6 fill-current" />
                            Latest Videos
                        </h2>
                        {/* Make this functional or remove if not needed */}
                        <div className="hidden md:flex gap-2">
                            {/* Filter buttons could go here */}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedVideos.map((video, index) => (
                            <motion.a
                                key={video.id}
                                href={video.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group block relative rounded-2xl overflow-hidden shadow-lg bg-card border border-border/50 hover:border-primary/50 transition-all duration-300"
                            >
                                {/* Thumbnail Container */}
                                <div className="aspect-video relative overflow-hidden">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                                            <Play className="w-6 h-6 fill-white text-white ml-1" />
                                        </div>
                                    </div>

                                    {/* Valid Duration Badge */}
                                    {video.duration && (
                                        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-mono px-2 py-1 rounded-md">
                                            {video.duration}
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                            {video.title}
                                        </h3>
                                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                                        <Calendar className="w-3 h-3" />
                                        {video.date}
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>


        </Layout>
    );
};

export default Media;
