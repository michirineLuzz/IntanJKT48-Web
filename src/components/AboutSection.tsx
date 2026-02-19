import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Star, Sparkles, Music, Ruler, Bolt, Heart, Award } from "lucide-react";
import {
  getSettings,
  getMilestones,
  getFunFacts,
  getHashtags,
  getStageUnits,
  Milestone,
  FunFact,
  Hashtag,
  StageUnit
} from "@/lib/dataStore";

// Default data (fallbacks)
const defaultMilestones = [
  { id: "1", year: "2024", title: "Joined JKT48", description: "Became part of 13th Generation at 31.10.2024", order_index: 0 },
  { id: "2", year: "2025", title: "Shonichi Show (Ingin Bertemu)", description: "Debut on theater stage at 26.01.2025", order_index: 1 },
  { id: "3", year: "2025", title: "Shonichi Video Call", description: "Her Shonichi video call was on 23.03.2025.", order_index: 2 },
  { id: "4", year: "2025", title: "Shonichi Pajama Drive", description: "Shonichi Pajama Drive was on 03.05.2025.", order_index: 3 },
  { id: "5", year: "2025", title: "Shonichi Off Air Concert", description: "Shonichi Off Air Concert was on 29.06.2025.", order_index: 4 },
  { id: "6", year: "2025", title: "Shonichi Kira-kira Girls", description: "Shonichi Kira-kira Girls was on 21.11.2025.", order_index: 5 },
  { id: "7", year: "2025", title: "Shonichi Backdancer Appearance", description: "Her Shonichi backdancer appearance in JKT48 5th Stage for the Glory days song was on October 19, 2025.", order_index: 6 },
];

const defaultFunFacts = [
  { id: "1", title: "Oldest Gen 13", description: "The oldest member of JKT48's 13th Generation", order_index: 0 },
  { id: "2", title: "Original Ace", description: "Original ace of JKT48's 13th Generation", order_index: 1 },
  { id: "3", title: "Multi-Talented", description: "Before joining JKT48, she was a pencak silat athlete and dancer", order_index: 2 },
  { id: "4", title: "Silat Champion", description: "Representing Sabda Sunda Silat School, won 1st place in Pusaka Sunda Cup Jabodetabek (July 10, 2022)", order_index: 3 },
  { id: "5", title: "Dance Competitor", description: "Participated in DBL Dance Competition 2023 - West Java Series representing SMAN 3 Bogor", order_index: 4 },
  { id: "6", title: "Cover Dancer", description: "Before joining JKT48, she often did JKT48 dance covers with friends on campus", order_index: 5 },
  { id: "7", title: "UI Student", description: "Currently studying Creative Advertising at Universitas Indonesia, class of 2024", order_index: 6 },
  { id: "8", title: "Childhood Star", description: "Appeared in JKT48's YouTube video 'Dance Class for Kids' (Feb 2016) when she was 9 years old", order_index: 7 },
  { id: "9", title: "Persistent Dreamer", description: "After multiple audition attempts (Gen 10, 11, 12, KLP48), she finally passed JKT48's 13th Generation audition in 2024", order_index: 8 },
  { id: "10", title: "Ukulele Player", description: "Intan is skilled at playing the ukulele, so she often covers songs.", order_index: 9 },
];

const defaultHashtags = [
  { id: "1", tag: "#SenINTAN", label: "Every Monday", emoji: "🌅", is_ramadan: false, order_index: 0 },
  { id: "2", tag: "#JumaTAN", label: "Every Friday", emoji: "✨", is_ramadan: false, order_index: 1 },
  { id: "3", tag: "#NighTAN", label: "Before Bed", emoji: "🌙", is_ramadan: false, order_index: 2 },
  { id: "4", tag: "#kataINTAN", label: "Quotes", emoji: "💭", is_ramadan: false, order_index: 3 },
  { id: "5", tag: "#dancINTAN", label: "Dance Cover", emoji: "💃", is_ramadan: false, order_index: 4 },
  { id: "6", tag: "#intanraksi", label: "Video Call", emoji: "📱", is_ramadan: false, order_index: 5 },
  { id: "7", tag: "#sanTAN", label: "Every Sahur", emoji: "🍽️", is_ramadan: true, order_index: 6 },
  { id: "8", tag: "#bukberIN", label: "Every Iftar", emoji: "🌅", is_ramadan: true, order_index: 7 },
];

const defaultStageUnits: StageUnit[] = [
  { id: "1", name: "JKT48 TN3", setlist: "Aitakatta", color_from: "#f43f5e", color_to: "#ec4899", songs: ["Nageki no Figure", "Koi no PLAN", "Senaka Kara Dakishimete"], order_index: 0 },
  { id: "2", name: "JKT48 TN1", setlist: "Pajama Drive", color_from: "#8b5cf6", color_to: "#a855f7", songs: ["Pajama Drive", "Kagami no Naka no Jean Da Arc"], order_index: 1 },
  { id: "3", name: "JKT48 TN SS1", setlist: "Kira Kira Girls", color_from: "#f59e0b", color_to: "#f97316", songs: ["Candy"], order_index: 2 },
];

// Custom Pencak Silat Icon
const PencakSilatIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="5" r="2" />
    <line x1="12" y1="7" x2="12" y2="13" />
    <line x1="12" y1="9" x2="8" y2="7" />
    <line x1="12" y1="9" x2="16" y2="10" />
    <line x1="12" y1="13" x2="9" y2="19" />
    <line x1="12" y1="13" x2="16" y2="16" />
    <line x1="16" y1="16" x2="18" y2="14" />
    <motion.path
      d="M 6 10 Q 4 12 6 14"
      strokeDasharray="2 2"
      animate={{ pathLength: [0, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </svg>
);

// Custom Performing Icon
const PerformingIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="4" y1="20" x2="20" y2="20" strokeWidth="3" />
    <circle cx="12" cy="9" r="2" />
    <line x1="12" y1="11" x2="12" y2="16" />
    <line x1="12" y1="12" x2="9" y2="9" />
    <line x1="12" y1="12" x2="15" y2="9" />
    <line x1="12" y1="16" x2="10" y2="20" />
    <line x1="12" y1="16" x2="14" y2="20" />
    <motion.path
      d="M 12 2 L 8 8"
      strokeDasharray="1 1"
      opacity="0.5"
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.path
      d="M 12 2 L 16 8"
      strokeDasharray="1 1"
      opacity="0.5"
      animate={{ opacity: [0.7, 0.3, 0.7] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
    />
  </svg>
);

const AboutSection = () => {
  const [totalShows, setTotalShows] = useState(44);
  const [milestones, setMilestones] = useState<Milestone[]>(defaultMilestones);
  const [funFacts, setFunFacts] = useState<FunFact[]>(defaultFunFacts);
  const [hashtags, setHashtags] = useState<Hashtag[]>(defaultHashtags);
  const [stageUnits, setStageUnits] = useState<StageUnit[]>(defaultStageUnits);

  // Load all data from admin
  useEffect(() => {
    const loadData = async () => {
      const [settings, adminMilestones, adminFunFacts, adminHashtags, adminStageUnits] = await Promise.all([
        getSettings(),
        getMilestones(),
        getFunFacts(),
        getHashtags(),
        getStageUnits(),
      ]);

      setTotalShows(settings.total_shows);

      // Use admin data if available, otherwise keep defaults
      if (adminMilestones.length > 0) setMilestones(adminMilestones);
      if (adminFunFacts.length > 0) setFunFacts(adminFunFacts);

      // Merge hashtags: keep defaults + add/override with Supabase data
      if (adminHashtags.length > 0) {
        const mergedHashtags = [...defaultHashtags];
        adminHashtags.forEach((adminTag) => {
          const existingIndex = mergedHashtags.findIndex(h => h.tag === adminTag.tag);
          if (existingIndex >= 0) {
            // Override default with Supabase version
            mergedHashtags[existingIndex] = adminTag;
          } else {
            // New hashtag from admin, append it
            mergedHashtags.push(adminTag);
          }
        });
        // Sort by order_index
        mergedHashtags.sort((a, b) => a.order_index - b.order_index);
        setHashtags(mergedHashtags);
      }

      if (adminStageUnits.length > 0) setStageUnits(adminStageUnits);
    };
    loadData();
  }, []);

  const stats = [
    { icon: Star, label: "Generation", value: "13th", color: "from-amber-400 to-amber-600" },
    { icon: Calendar, label: "Birthday", value: "Feb 24", color: "from-rose-400 to-rose-600" },
    { icon: MapPin, label: "From", value: "Bogor, Indonesia", color: "from-blue-400 to-blue-600" },
    { icon: Bolt, label: "Horoscope", value: "Pisces", color: "from-pink-400 to-pink-600" },
    { icon: Ruler, label: "Height", value: "157 cm", color: "from-indigo-400 to-indigo-600" },
    { icon: Heart, label: "Blood Type", value: "B", color: "from-red-400 to-red-600" },
  ];

  const hobbies = [
    { icon: Music, label: "Singing" },
    { icon: PencakSilatIcon, label: "Pencak Silat" },
    { icon: PerformingIcon, label: "Performing" },
    { icon: Sparkles, label: "Dancing" },
  ];

  // Filter hashtags
  const regularHashtags = hashtags.filter(h => !h.is_ramadan);
  const ramadanHashtags = hashtags.filter(h => h.is_ramadan);

  return (
    <section className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold text-primary uppercase tracking-widest">Get to Know</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-6">About Me</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full" />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">

          {/* Left: Photo & Quote */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Photo Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4] bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20">
              <img
                src="https://pbs.twimg.com/media/GzAydepboAIcxdS?format=jpg&name=medium"
                alt="Nur Intan"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h2 className="text-3xl font-bold mb-1">Nur Intan</h2>
                  <p className="text-sm opacity-90">JKT48 • 13th Generation</p>
                </div>
              </div>
            </div>

            {/* Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/10 dark:to-purple-900/10 rounded-2xl p-8 border border-pink-200/50 dark:border-pink-800/50 cursor-pointer"
            >
              <blockquote className="text-lg md:text-xl font-medium italic leading-relaxed">
                "✨ Intan permata yang berkilau, temukan cahayaku di hatimu! Setiap hari adalah kesempatan untuk berbagi senyuman dan kebahagiaan. 💕"
              </blockquote>
            </motion.div>
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >

            {/* Bio */}
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-primary" />
                Biography
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Halo! Aku Nur Intan, member JKT48 generasi ke-13. Sejak kecil, aku selalu bermimpi untuk bisa tampil di atas panggung dan membawa kebahagiaan kepada banyak orang melalui musik dan performa.
                </p>
                <p>
                  Perjalananku di JKT48 dimulai dengan audisi yang penuh tantangan, namun aku tidak pernah menyerah. Setiap hari aku berusaha untuk terus berkembang, baik dalam bernyanyi, menari, maupun berinteraksi dengan fans yang selalu mendukungku.
                </p>
                <p>
                  Terima kasih untuk semua dukungan kalian! Mari kita ciptakan kenangan indah bersama! 🌟 (Bukan perkataan asli ya woi!)
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5, type: "spring" as const }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className={`w - 12 h - 12 rounded - xl bg - gradient - to - br ${stat.color} flex items - center justify - center mb - 3`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Hobbies */}
            <div>
              <h3 className="text-xl font-bold mb-4">Hobbies & Interests</h3>
              <div className="grid grid-cols-2 gap-3">
                {hobbies.map((hobby, index) => (
                  <motion.div
                    key={hobby.label}
                    initial={{ opacity: 0, x: -20, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, type: "spring" as const }}
                    whileHover={{ scale: 1.08, x: 5 }}
                    className="flex items-center gap-3 bg-primary/5 dark:bg-primary/10 rounded-xl px-4 py-3 border border-primary/20 hover:bg-primary/10 transition-colors cursor-pointer"
                  >
                    <motion.div whileHover={{ rotate: 15 }}>
                      <hobby.icon className="w-5 h-5 text-primary" />
                    </motion.div>
                    <span className="font-medium">{hobby.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Journey Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <span className="text-sm font-bold text-primary uppercase tracking-widest">My</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Journey Career</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full mt-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * index, type: "spring" as const, stiffness: 100 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-white to-pink-50 dark:from-zinc-900 dark:to-pink-900/10 rounded-2xl p-6 shadow-lg border border-border hover:shadow-2xl transition-all cursor-pointer"
              >
                <motion.div
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center text-white font-bold text-lg mb-4 shadow-lg"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  {milestone.year}
                </motion.div>
                <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                <p className="text-muted-foreground">{milestone.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <span className="text-sm font-bold text-primary uppercase tracking-widest">Did You Know?</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Fun Facts</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full mt-4" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {funFacts.map((fact, index) => (
              <motion.div
                key={fact.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * index, type: "spring" as const, stiffness: 100 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="bg-gradient-to-br from-white to-pink-50 dark:from-zinc-900 dark:to-pink-900/10 rounded-2xl p-6 shadow-lg border border-pink-200/50 dark:border-pink-800/30 hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {index + 1}
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{fact.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{fact.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hashtags Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <span className="text-sm font-bold text-primary uppercase tracking-widest">Connect With Me</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Official Hashtags</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full mt-4" />
          </div>

          {/* Regular Hashtags */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {regularHashtags.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, type: "spring" as const }}
                whileHover={{ y: -8, scale: 1.08 }}
                className="bg-gradient-to-br from-white to-pink-50 dark:from-zinc-900 dark:to-pink-900/10 rounded-2xl p-5 shadow-lg border border-pink-200/50 dark:border-pink-800/30 text-center hover:shadow-xl transition-all cursor-pointer"
              >
                <motion.span
                  className="text-2xl mb-2 block"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  {item.emoji}
                </motion.span>
                <p className="text-primary font-bold text-lg">{item.tag}</p>
                <p className="text-muted-foreground text-xs mt-1">{item.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Ramadan Special Hashtags */}
          {ramadanHashtags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-900/20 dark:via-teal-900/20 dark:to-cyan-900/20 rounded-3xl p-6 md:p-8 border border-emerald-200/50 dark:border-emerald-800/30"
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-2xl">🌙</span>
                <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">Ramadan Special</h3>
                <span className="text-2xl">✨</span>
              </div>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {ramadanHashtags.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -3, scale: 1.03 }}
                    className="bg-white/80 dark:bg-zinc-900/80 rounded-xl p-4 text-center shadow-md border border-emerald-200/50 dark:border-emerald-800/30"
                  >
                    <span className="text-xl mb-1 block">{item.emoji}</span>
                    <p className="text-emerald-600 dark:text-emerald-400 font-bold">{item.tag}</p>
                    <p className="text-muted-foreground text-xs mt-1">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Stage Units Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <span className="text-sm font-bold text-primary uppercase tracking-widest">Theater Performance</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Stage Units</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full mt-4" />

            {/* Total Show Counter */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring" as const }}
              whileHover={{ scale: 1.05 }}
              className="mt-8 inline-flex items-center gap-3 bg-gradient-to-r from-primary to-pink-500 text-white px-8 py-4 rounded-2xl shadow-lg cursor-pointer"
            >
              <span className="text-4xl md:text-5xl font-bold">{totalShows}</span>
              <div className="text-left">
                <p className="text-sm opacity-90">Total</p>
                <p className="font-semibold">Theater Shows</p>
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {stageUnits.map((unit, index) => (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, type: "spring" as const, stiffness: 100 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-white to-pink-50 dark:from-zinc-900 dark:to-pink-900/10 rounded-2xl overflow-hidden shadow-lg border border-pink-200/50 dark:border-pink-800/30 hover:shadow-xl transition-all cursor-pointer"
              >
                <div
                  className="p-4"
                  style={{ background: `linear-gradient(to right, ${unit.color_from}, ${unit.color_to})` }}
                >
                  <h3 className="text-white font-bold text-lg">{unit.name}</h3>
                  <p className="text-white/80 text-sm">{unit.setlist}</p>
                </div>
                <div className="p-5 space-y-3">
                  {unit.songs.map((song, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                        <Music className="w-4 h-4 text-pink-500" />
                      </div>
                      <span className="text-sm font-medium">{song}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;
