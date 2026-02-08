import { motion, useInView } from "framer-motion";
import { Calendar, MapPin, Clock, Ticket, Users, Music, Camera, Star, Sparkles } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getScheduleEvents, ScheduleEvent } from "@/lib/dataStore";

const ScheduleSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [events, setEvents] = useState<ScheduleEvent[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      const adminEvents = await getScheduleEvents();
      // Sort by date and take top 3
      const sorted = adminEvents
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 3);
      setEvents(sorted);
    };
    loadEvents();
  }, []);

  const getEventIcon = (type: string) => {
    switch (type) {
      case "Concert": return Music;
      case "Fan Event": return Users;
      case "TV": return Camera;
      case "Special": return Star;
      default: return Calendar;
    }
  };

  return (
    <section className="pb-24 pt-8 relative overflow-hidden" ref={ref}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            background: isInView
              ? "radial-gradient(circle at 20% 50%, hsl(var(--primary)/0.1) 0%, transparent 50%)"
              : "radial-gradient(circle at 20% 50%, transparent 0%, transparent 50%)"
          }}
          className="absolute inset-0 transition-all duration-1000"
        />
        <motion.div
          animate={{
            background: isInView
              ? "radial-gradient(circle at 80% 50%, hsl(var(--secondary)/0.1) 0%, transparent 50%)"
              : "radial-gradient(circle at 80% 50%, transparent 0%, transparent 50%)"
          }}
          className="absolute inset-0 transition-all duration-1000 delay-300"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-widest">Upcoming</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">Schedule</h2>
          <div className="elegant-divider" />
          <p className="mt-6 text-muted-foreground max-w-lg mx-auto">
            Check out my upcoming performances, events, and appearances
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {events.length > 0 ? (
            <div className="relative">
              {/* Enhanced animated vertical line */}
              <motion.div
                className="absolute left-[12px] md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-purple via-gold to-primary/30 origin-top rounded-full"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: isInView ? 1 : 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                {/* Animated pulse effect on the line */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent"
                  animate={{
                    scaleY: [0, 1, 0],
                    y: ["0%", "100%", "200%"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 1
                  }}
                />
              </motion.div>

              {events.map((event, index) => {
                const EventIcon = getEventIcon(event.type);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative flex flex-col md:flex-row items-start md:items-center mb-12 md:mb-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                  >
                    {/* Enhanced animated timeline dot */}
                    <motion.div
                      className="absolute left-[12px] md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-primary via-purple to-gold border-4 border-background shadow-glow z-10"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 400, damping: 10 }}
                      whileHover={{ scale: 1.5 }}
                    >
                      {event.featured && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 via-purple/30 to-gold/30"
                          animate={{ scale: [1, 1.8, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        />
                      )}
                      {/* Inner dot */}
                      <motion.div
                        className="absolute inset-1 rounded-full bg-gradient-to-br from-primary to-gold"
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>

                    {/* Enhanced content card */}
                    <div className={`ml-8 md:ml-0 md:w-1/2 w-full ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                      <Link to="/schedule">
                        <motion.div
                          whileHover={{
                            scale: 1.03,
                            y: -8,
                            boxShadow: event.featured
                              ? "0 25px 50px -10px hsla(236, 72, 153, 0.4)"
                              : "0 15px 35px -5px hsla(0, 0%, 0%, 0.15)"
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          className={`glass-card p-6 relative overflow-hidden cursor-pointer ${event.featured ? "ring-2 ring-primary/40 shadow-glow" : ""}`}
                        >
                          {/* Enhanced featured event gradient overlay */}
                          {event.featured && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple/10 to-secondary/10"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}

                          {event.featured && (
                            <motion.span
                              className="inline-block px-4 py-2 text-xs font-medium bg-gradient-to-r from-primary/20 via-purple/20 to-secondary/20 text-primary rounded-full mb-4 border border-primary/30"
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <span className="flex items-center gap-1">
                                ✨ Featured Event
                                <motion.div
                                  animate={{ rotate: [0, 360] }}
                                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                >
                                  <Sparkles className="w-3 h-3" />
                                </motion.div>
                              </span>
                            </motion.span>
                          )}

                          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                            <motion.div
                              whileHover={{ rotate: 15, scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Calendar className="w-5 h-5 text-gradient-gold" />
                            </motion.div>
                            <span>{event.date}</span>
                            <span className="mx-2">•</span>
                            <Clock className="w-5 h-5 text-gradient-gold" />
                            <span>{event.time}</span>
                          </div>

                          <h3 className="font-display text-xl font-semibold mb-3">{event.title}</h3>

                          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <MapPin className="w-5 h-5 text-gradient-purple" />
                            </motion.div>
                            <span>{event.location}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <motion.span
                              className="px-4 py-2 text-xs font-medium bg-gradient-to-r from-secondary/20 to-gold/20 rounded-full flex items-center gap-2 border border-secondary/30"
                              whileHover={{ scale: 1.05 }}
                            >
                              <EventIcon className="w-3 h-3" />
                              {event.type}
                            </motion.span>
                            <motion.button
                              className="btn-ghost flex items-center gap-2 text-sm font-medium text-primary"
                              whileHover={{ x: 5 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Ticket className="w-4 h-4" />
                              Details
                            </motion.button>
                          </div>
                        </motion.div>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No upcoming events scheduled at the moment.</p>
            </div>
          )}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link to="/schedule">
            <motion.button
              className="btn-outline-premium"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px hsla(236, 72, 153, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              View Full Schedule
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ScheduleSection;
