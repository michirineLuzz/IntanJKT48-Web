import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Play, Calendar, ExternalLink, Music, FileText } from "lucide-react";
import { getMediaItems, MediaItem } from "@/lib/dataStore";

// --- Default Videos (hardcoded) ---
const defaultVideos = [
    {
        id: "video-1",
        type: "video" as const,
        title: "JKT48 13th Generation Profile: Intan",
        url: "https://www.youtube.com/watch?v=SojGpGHMYEA",
        thumbnail: "https://img.youtube.com/vi/SojGpGHMYEA/hqdefault.jpg",
        description: "Dec 1, 2024",
    },
    {
        id: "video-2",
        type: "video" as const,
        title: "Belajar Konseling bersama Intan",
        url: "https://www.youtube.com/watch?v=nZL7vtku_o4",
        thumbnail: "https://img.youtube.com/vi/nZL7vtku_o4/hqdefault.jpg",
        description: "Jul 20, 2025",
    },
    {
        id: "video-3",
        type: "video" as const,
        title: "Temen Ngobrol EP.4: The Undercover Roulette! - Erine JKT48 vs Intan JKT48",
        url: "https://www.youtube.com/watch?v=qzqBcK0tz5c",
        thumbnail: "https://img.youtube.com/vi/qzqBcK0tz5c/hqdefault.jpg",
        description: "Jul 21, 2025",
    },
    {
        id: "video-4",
        type: "video" as const,
        title: "TEMEN MAIN EP.1: NEW YEAR START WITH US!! - Ekin JKT48 vs Intan JKT48",
        url: "https://www.youtube.com/watch?v=OzFBzsiMrN4",
        thumbnail: "https://img.youtube.com/vi/OzFBzsiMrN4/hqdefault.jpg",
        description: "Jan 13, 2026",
    },
    {
        id: "video-5",
        type: "video" as const,
        title: "[JAHAT-JAHATAN] SPESIAL DIRGAHAYU RI KE-80!",
        url: "https://www.youtube.com/watch?v=ek8xyzdx0NI",
        thumbnail: "https://img.youtube.com/vi/ek8xyzdx0NI/hqdefault.jpg",
        description: "Aug 17, 2025",
    },
    {
        id: "video-6",
        type: "video" as const,
        title: "TEMEN MAIN EP.4: THE FINAL GAME ON! - Intan JKT48 vs Trisha JKT48",
        url: "https://www.youtube.com/watch?v=HRA-zTDD4Ek",
        thumbnail: "https://img.youtube.com/vi/HRA-zTDD4Ek/hqdefault.jpg",
        description: "Sep 30, 2025",
    },
    {
        id: "video-7",
        type: "video" as const,
        title: "[LAST CONTENT] GRACIA VS ADIK-ADIK",
        url: "https://www.youtube.com/watch?v=1p-0wQB-5M8",
        thumbnail: "https://img.youtube.com/vi/1p-0wQB-5M8/hqdefault.jpg",
        description: "Dec 26, 2025",
    },
    {
        id: "video-8",
        type: "video" as const,
        title: "[SECRET CAM] JKT48 THE FIRST SNOW",
        url: "https://www.youtube.com/watch?v=FgSr-tSxRiA",
        thumbnail: "https://img.youtube.com/vi/FgSr-tSxRiA/hqdefault.jpg",
        description: "Dec 30, 2025",
    },
];

const Media = () => {
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [activeFilter, setActiveFilter] = useState<"all" | "video" | "audio" | "article">("all");

    // Load media from admin on mount
    useEffect(() => {
        const loadMedia = async () => {
            const adminMedia = await getMediaItems();
            // Combine admin media with default videos
            const defaultAsMediaItems: MediaItem[] = defaultVideos.map(v => ({
                id: v.id,
                title: v.title,
                type: v.type,
                url: v.url,
                thumbnail: v.thumbnail,
                description: v.description,
                added_at: new Date().toISOString(),
            }));
            const combined = [...adminMedia, ...defaultAsMediaItems];
            setMediaItems(combined);
        };
        loadMedia();
    }, []);

    const filteredMedia = activeFilter === "all"
        ? mediaItems
        : mediaItems.filter(m => m.type === activeFilter);

    const getIcon = (type: string) => {
        switch (type) {
            case "video": return Play;
            case "audio": return Music;
            case "article": return FileText;
            default: return Play;
        }
    };

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

            {/* Filter Buttons */}
            <section className="py-8 bg-background">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center gap-2 flex-wrap">
                        {["all", "video", "audio", "article"].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter as typeof activeFilter)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === filter
                                        ? "bg-primary text-white"
                                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                    }`}
                            >
                                {filter.charAt(0).toUpperCase() + filter.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Media Gallery Section */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-3xl font-bold flex items-center gap-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            <Play className="w-6 h-6 fill-current" />
                            {activeFilter === "all" ? "All Media" : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}s`}
                        </h2>
                        <span className="text-muted-foreground text-sm">{filteredMedia.length} items</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredMedia.map((item, index) => {
                            const Icon = getIcon(item.type);
                            return (
                                <motion.a
                                    key={item.id}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group block relative rounded-2xl overflow-hidden shadow-lg bg-card border border-border/50 hover:border-primary/50 transition-all duration-300"
                                >
                                    {/* Thumbnail Container */}
                                    <div className="aspect-video relative overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                                        {item.thumbnail ? (
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Icon className="w-12 h-12 text-zinc-400" />
                                            </div>
                                        )}

                                        {/* Play Button Overlay */}
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                                                <Icon className="w-6 h-6 fill-white text-white ml-1" />
                                            </div>
                                        </div>

                                        {/* Type Badge */}
                                        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-md uppercase">
                                            {item.type}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                                {item.title}
                                            </h3>
                                            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                                        </div>
                                        {item.description && (
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Calendar className="w-3 h-3" />
                                                {item.description}
                                            </div>
                                        )}
                                    </div>
                                </motion.a>
                            );
                        })}
                    </div>

                    {filteredMedia.length === 0 && (
                        <div className="text-center py-20 text-muted-foreground">
                            No {activeFilter === "all" ? "media" : activeFilter + "s"} found.
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default Media;
