import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ExternalLink, Sparkles } from "lucide-react";

// --- Helper Function to Add Events ---
const createEvent = (
    title: string,
    date: string,
    time: string,
    location: string,
    type: "Concert" | "Fan Event" | "TV" | "Special" | "Release",
    featured: boolean = false,
    link?: string
) => ({
    id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title,
    date,
    time,
    location,
    type,
    featured,
    link
});

// --- Event Data ---
const events = [
    createEvent(
        "Video call with Intan",
        "Feb 8, 2026",
        "12:45 WIB",
        "Online",
        "Fan Event",
        true,
        "https://jkt48.com/twentyseventhsinglepb?lang=id"
    ),
    createEvent(
        "JKT48 Theater Show",
        "Feb 15, 2026",
        "19:00 WIB",
        "JKT48 Theater, fX Sudirman",
        "Concert",
        true,
        "https://jkt48.com"
    )
];

// --- Sort events by date ---
const sortedEvents = [...events].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
});

// --- Type Colors ---
const getTypeStyle = (type: string) => {
    switch (type) {
        case "Concert":
            return "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30";
        case "Fan Event":
            return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30";
        case "TV":
            return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30";
        case "Special":
            return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30";
        case "Release":
            return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30";
        default:
            return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/30";
    }
};

const Schedule = () => {
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
                        Schedule
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        Upcoming performances, events, and appearances. Don't miss any moment!
                    </motion.p>
                </div>
            </section>

            {/* Events List */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="space-y-6">
                        {sortedEvents.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`group relative bg-card border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/30 ${event.featured ? "border-primary/50 shadow-lg" : "border-border/50"
                                    }`}
                            >
                                <div className="flex flex-col md:flex-row">
                                    {/* Date Block */}
                                    <div className={`flex-shrink-0 p-6 md:p-8 flex flex-col items-center justify-center md:w-40 ${event.featured
                                        ? "bg-gradient-to-br from-primary/20 to-primary/5"
                                        : "bg-muted/30"
                                        }`}>
                                        <span className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                            {event.date.split(" ")[1]?.replace(",", "")}
                                        </span>
                                        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                            {event.date.split(" ")[0]} {event.date.split(" ")[2]}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-grow p-6 md:p-8">
                                        <div className="flex flex-wrap items-center gap-3 mb-3">
                                            <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${getTypeStyle(event.type)}`}>
                                                {event.type}
                                            </span>
                                        </div>

                                        <h3
                                            className="text-xl md:text-2xl font-bold mb-4 group-hover:text-primary transition-colors"
                                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                        >
                                            {event.title}
                                        </h3>

                                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                <span>{event.time}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                <span>{event.location}</span>
                                            </div>
                                        </div>

                                        {event.link && (
                                            <a
                                                href={event.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-primary hover:underline"
                                            >
                                                More Info
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Empty State (if needed) */}
                    {sortedEvents.length === 0 && (
                        <div className="text-center py-20">
                            <Calendar className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                            <p className="text-muted-foreground">No upcoming events scheduled.</p>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default Schedule;
