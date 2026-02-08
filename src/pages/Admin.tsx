import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Trash2,
    Save,
    Image,
    Calendar,
    Film,
    Theater,
    Download,
    Upload,
    Check,
    ExternalLink,
    LogOut,
    Award,
    Hash,
    Sparkles,
    Music
} from "lucide-react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import {
    getPhotos,
    addPhoto,
    removePhoto,
    getScheduleEvents,
    addScheduleEvent,
    removeScheduleEvent,
    getMediaItems,
    addMediaItem,
    removeMediaItem,
    getMilestones,
    addMilestone,
    removeMilestone,
    getFunFacts,
    addFunFact,
    removeFunFact,
    getHashtags,
    addHashtag,
    removeHashtag,
    getStageUnits,
    addStageUnit,
    removeStageUnit,
    getSettings,
    updateTotalShows,
    exportData,
    importData,
    GalleryPhoto,
    ScheduleEvent,
    MediaItem,
    Milestone,
    FunFact,
    Hashtag,
    StageUnit,
} from "@/lib/dataStore";

type TabType = "gallery" | "schedule" | "media" | "milestones" | "funfacts" | "hashtags" | "stageunits" | "settings";

const Admin = () => {
    const { user, signIn, signOut, loading: authLoading, isConfigured } = useAuth();

    // Auth states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");
    const [authLoading2, setAuthLoading2] = useState(false);

    // Data states
    const [activeTab, setActiveTab] = useState<TabType>("gallery");
    const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
    const [scheduleEvents, setScheduleEvents] = useState<ScheduleEvent[]>([]);
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [funFacts, setFunFacts] = useState<FunFact[]>([]);
    const [hashtags, setHashtags] = useState<Hashtag[]>([]);
    const [stageUnits, setStageUnits] = useState<StageUnit[]>([]);
    const [totalShows, setTotalShows] = useState(44);
    const [notification, setNotification] = useState<string | null>(null);
    const [dataLoading, setDataLoading] = useState(true);

    // Form states
    const [newPhotoUrl, setNewPhotoUrl] = useState("");
    const [newEvent, setNewEvent] = useState({
        title: "",
        date: "",
        time: "",
        location: "",
        type: "Concert",
        featured: false,
        link: "",
    });
    const [newMedia, setNewMedia] = useState({
        title: "",
        type: "video" as "video" | "audio" | "article",
        url: "",
        thumbnail: "",
        description: "",
    });
    const [newMilestone, setNewMilestone] = useState({
        year: "",
        title: "",
        description: "",
        order_index: 0,
    });
    const [newFunFact, setNewFunFact] = useState({
        title: "",
        description: "",
        order_index: 0,
    });
    const [newHashtag, setNewHashtag] = useState({
        tag: "",
        label: "",
        emoji: "",
        is_ramadan: false,
        order_index: 0,
    });
    const [newStageUnit, setNewStageUnit] = useState({
        name: "",
        setlist: "",
        color_from: "#ec4899",
        color_to: "#a855f7",
        songs: [] as string[],
        order_index: 0,
    });
    const [newSong, setNewSong] = useState("");

    // Load data on mount
    useEffect(() => {
        const loadData = async () => {
            setDataLoading(true);
            try {
                const [photosData, scheduleData, mediaData, milestonesData, funFactsData, hashtagsData, stageUnitsData, settingsData] = await Promise.all([
                    getPhotos(),
                    getScheduleEvents(),
                    getMediaItems(),
                    getMilestones(),
                    getFunFacts(),
                    getHashtags(),
                    getStageUnits(),
                    getSettings(),
                ]);
                setPhotos(photosData);
                setScheduleEvents(scheduleData);
                setMediaItems(mediaData);
                setMilestones(milestonesData);
                setFunFacts(funFactsData);
                setHashtags(hashtagsData);
                setStageUnits(stageUnitsData);
                setTotalShows(settingsData.total_shows);
            } catch (e) {
                console.error("Error loading data:", e);
            }
            setDataLoading(false);
        };
        loadData();
    }, []);

    const showNotification = (message: string) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    // Auth handlers
    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthLoading2(true);
        setAuthError("");
        const { error } = await signIn(email, password);
        if (error) {
            setAuthError(error.message);
        }
        setAuthLoading2(false);
    };

    const handleSignOut = async () => {
        await signOut();
    };

    // Gallery handlers
    const handleAddPhoto = async () => {
        if (!newPhotoUrl.trim()) return;
        const photo = await addPhoto(newPhotoUrl.trim());
        if (photo) {
            setPhotos([photo, ...photos]);
            setNewPhotoUrl("");
            showNotification("Photo added successfully!");
        }
    };

    const handleRemovePhoto = async (id: string) => {
        await removePhoto(id);
        setPhotos(photos.filter((p) => p.id !== id));
        showNotification("Photo removed!");
    };

    // Schedule handlers
    const handleAddEvent = async () => {
        if (!newEvent.title || !newEvent.date) return;
        const event = await addScheduleEvent(newEvent);
        if (event) {
            setScheduleEvents([...scheduleEvents, event]);
            setNewEvent({ title: "", date: "", time: "", location: "", type: "Concert", featured: false, link: "" });
            showNotification("Event added successfully!");
        }
    };

    const handleRemoveEvent = async (id: string) => {
        await removeScheduleEvent(id);
        setScheduleEvents(scheduleEvents.filter((e) => e.id !== id));
        showNotification("Event removed!");
    };

    // Media handlers
    const handleAddMedia = async () => {
        if (!newMedia.title || !newMedia.url) return;
        const item = await addMediaItem(newMedia);
        if (item) {
            setMediaItems([item, ...mediaItems]);
            setNewMedia({ title: "", type: "video", url: "", thumbnail: "", description: "" });
            showNotification("Media added successfully!");
        }
    };

    const handleRemoveMedia = async (id: string) => {
        await removeMediaItem(id);
        setMediaItems(mediaItems.filter((m) => m.id !== id));
        showNotification("Media removed!");
    };

    // Milestone handlers
    const handleAddMilestone = async () => {
        if (!newMilestone.year || !newMilestone.title) return;
        const milestone = await addMilestone(newMilestone);
        if (milestone) {
            setMilestones([...milestones, milestone]);
            setNewMilestone({ year: "", title: "", description: "", order_index: milestones.length });
            showNotification("Milestone added successfully!");
        }
    };

    const handleRemoveMilestone = async (id: string) => {
        await removeMilestone(id);
        setMilestones(milestones.filter((m) => m.id !== id));
        showNotification("Milestone removed!");
    };

    // Fun Facts handlers
    const handleAddFunFact = async () => {
        if (!newFunFact.title) return;
        const fact = await addFunFact(newFunFact);
        if (fact) {
            setFunFacts([...funFacts, fact]);
            setNewFunFact({ title: "", description: "", order_index: funFacts.length });
            showNotification("Fun fact added successfully!");
        }
    };

    const handleRemoveFunFact = async (id: string) => {
        await removeFunFact(id);
        setFunFacts(funFacts.filter((f) => f.id !== id));
        showNotification("Fun fact removed!");
    };

    // Hashtag handlers
    const handleAddHashtag = async () => {
        if (!newHashtag.tag) return;
        const hashtag = await addHashtag(newHashtag);
        if (hashtag) {
            setHashtags([...hashtags, hashtag]);
            setNewHashtag({ tag: "", label: "", emoji: "", is_ramadan: false, order_index: hashtags.length });
            showNotification("Hashtag added successfully!");
        }
    };

    const handleRemoveHashtag = async (id: string) => {
        await removeHashtag(id);
        setHashtags(hashtags.filter((h) => h.id !== id));
        showNotification("Hashtag removed!");
    };

    // Stage Unit handlers
    const handleAddStageUnit = async () => {
        if (!newStageUnit.name) return;
        const unit = await addStageUnit(newStageUnit);
        if (unit) {
            setStageUnits([...stageUnits, unit]);
            setNewStageUnit({ name: "", setlist: "", color_from: "#ec4899", color_to: "#a855f7", songs: [], order_index: stageUnits.length });
            showNotification("Stage unit added successfully!");
        }
    };

    const handleRemoveStageUnit = async (id: string) => {
        await removeStageUnit(id);
        setStageUnits(stageUnits.filter((u) => u.id !== id));
        showNotification("Stage unit removed!");
    };

    const handleAddSong = () => {
        if (!newSong.trim()) return;
        setNewStageUnit({ ...newStageUnit, songs: [...newStageUnit.songs, newSong.trim()] });
        setNewSong("");
    };

    const handleRemoveSong = (index: number) => {
        setNewStageUnit({ ...newStageUnit, songs: newStageUnit.songs.filter((_, i) => i !== index) });
    };

    // Settings handlers
    const handleUpdateTotalShows = async () => {
        await updateTotalShows(totalShows);
        showNotification("Total shows updated!");
    };

    // Export/Import
    const handleExport = () => {
        const data = exportData();
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "idol-aura-data.json";
        a.click();
        URL.revokeObjectURL(url);
        showNotification("Data exported!");
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (event) => {
            const content = event.target?.result as string;
            if (importData(content)) {
                // Reload data
                const [photosData, scheduleData, mediaData, milestonesData, funFactsData, hashtagsData, stageUnitsData, settingsData] = await Promise.all([
                    getPhotos(), getScheduleEvents(), getMediaItems(), getMilestones(), getFunFacts(), getHashtags(), getStageUnits(), getSettings(),
                ]);
                setPhotos(photosData);
                setScheduleEvents(scheduleData);
                setMediaItems(mediaData);
                setMilestones(milestonesData);
                setFunFacts(funFactsData);
                setHashtags(hashtagsData);
                setStageUnits(stageUnitsData);
                setTotalShows(settingsData.total_shows);
                showNotification("Data imported successfully!");
            } else {
                showNotification("Error importing data!");
            }
        };
        reader.readAsText(file);
    };

    const tabs = [
        { id: "gallery", label: "Gallery", icon: Image },
        { id: "schedule", label: "Schedule", icon: Calendar },
        { id: "media", label: "Media", icon: Film },
        { id: "milestones", label: "Milestones", icon: Award },
        { id: "funfacts", label: "Fun Facts", icon: Sparkles },
        { id: "hashtags", label: "Hashtags", icon: Hash },
        { id: "stageunits", label: "Stage Units", icon: Music },
        { id: "settings", label: "Settings", icon: Theater },
    ];

    // Show login if Supabase is configured but user is not logged in
    if (isConfigured && !user && !authLoading) {
        return (
            <Layout>
                <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 w-full max-w-md mx-4"
                    >
                        <h1 className="text-2xl font-bold text-center mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            Admin Login
                        </h1>
                        <p className="text-zinc-500 text-center mb-8">Enter your credentials to access the admin panel</p>

                        <form onSubmit={handleSignIn} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    placeholder="admin@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            {authError && (
                                <p className="text-red-500 text-sm">{authError}</p>
                            )}

                            <button
                                type="submit"
                                disabled={authLoading2}
                                className="w-full py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50"
                            >
                                {authLoading2 ? "Signing in..." : "Sign In"}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </Layout>
        );
    }

    // Show loading
    if (authLoading || dataLoading) {
        return (
            <Layout>
                <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                Admin Panel
                            </h1>
                            <p className="text-zinc-500 dark:text-zinc-400">
                                {isConfigured ? `Logged in as ${user?.email}` : "Using local storage (Supabase not configured)"}
                            </p>
                        </div>
                        {isConfigured && user && (
                            <button
                                onClick={handleSignOut}
                                className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        )}
                    </div>

                    {/* Export/Import */}
                    <div className="flex gap-3 mb-8">
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg text-sm font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            Export Data
                        </button>
                        <label className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm font-medium cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                            <Upload className="w-4 h-4" />
                            Import Data
                            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                        </label>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as TabType)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.id
                                        ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900"
                                        : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">

                        {/* Gallery Tab */}
                        {activeTab === "gallery" && (
                            <div>
                                <h2 className="text-xl font-bold mb-6">Manage Gallery Photos</h2>
                                <div className="flex gap-3 mb-6">
                                    <input
                                        type="text"
                                        value={newPhotoUrl}
                                        onChange={(e) => setNewPhotoUrl(e.target.value)}
                                        placeholder="Enter photo URL..."
                                        className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    />
                                    <button onClick={handleAddPhoto} className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                                        <Plus className="w-4 h-4" /> Add Photo
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {photos.map((photo) => (
                                        <div key={photo.id} className="relative group aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
                                            <img src={photo.url} alt="" className="w-full h-full object-cover" />
                                            <button onClick={() => handleRemovePhoto(photo.id)} className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {photos.length === 0 && <p className="text-center text-zinc-400 py-12">No photos added yet.</p>}
                            </div>
                        )}

                        {/* Schedule Tab */}
                        {activeTab === "schedule" && (
                            <div>
                                <h2 className="text-xl font-bold mb-6">Manage Schedule Events</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                                    <input type="text" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} placeholder="Event Title" className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                                    <input type="text" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} placeholder="Date (Feb 15, 2026)" className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                                    <input type="text" value={newEvent.time} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} placeholder="Time (19:00 WIB)" className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                                    <input type="text" value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} placeholder="Location" className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                                    <select value={newEvent.type} onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })} className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-pink-500">
                                        <option value="Concert">Concert</option>
                                        <option value="Fan Event">Fan Event</option>
                                        <option value="TV">TV</option>
                                        <option value="Special">Special</option>
                                        <option value="Release">Release</option>
                                    </select>
                                    <input type="text" value={newEvent.link} onChange={(e) => setNewEvent({ ...newEvent, link: e.target.value })} placeholder="Link (optional)" className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                                    <label className="flex items-center gap-2 px-4 py-2">
                                        <input type="checkbox" checked={newEvent.featured} onChange={(e) => setNewEvent({ ...newEvent, featured: e.target.checked })} className="w-4 h-4" />
                                        <span>Featured Event</span>
                                    </label>
                                    <button onClick={handleAddEvent} className="flex items-center justify-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                                        <Plus className="w-4 h-4" /> Add Event
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {scheduleEvents.map((event) => (
                                        <div key={event.id} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                                            <div>
                                                <h3 className="font-semibold">{event.title}</h3>
                                                <p className="text-sm text-zinc-500">{event.date} • {event.time} • {event.location}</p>
                                                <span className="inline-block mt-1 px-2 py-0.5 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-xs rounded-full">{event.type}</span>
                                            </div>
                                            <button onClick={() => handleRemoveEvent(event.id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {scheduleEvents.length === 0 && <p className="text-center text-zinc-400 py-12">No events added yet.</p>}
                            </div>
                        )}

                        {/* Media Tab */}
                        {activeTab === "media" && (
                            <div>
                                <h2 className="text-xl font-bold mb-6">Manage Media Items</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                                    <input type="text" value={newMedia.title} onChange={(e) => setNewMedia({ ...newMedia, title: e.target.value })} placeholder="Title" className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                                    <select value={newMedia.type} onChange={(e) => setNewMedia({ ...newMedia, type: e.target.value as "video" | "audio" | "article" })} className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-pink-500">
                                        <option value="video">Video</option>
                                        <option value="audio">Audio</option>
                                        <option value="article">Article</option>
                                    </select>
                                    <input type="text" value={newMedia.url} onChange={(e) => setNewMedia({ ...newMedia, url: e.target.value })} placeholder="URL" className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                                    <input type="text" value={newMedia.thumbnail} onChange={(e) => setNewMedia({ ...newMedia, thumbnail: e.target.value })} placeholder="Thumbnail URL (optional)" className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                                    <input type="text" value={newMedia.description} onChange={(e) => setNewMedia({ ...newMedia, description: e.target.value })} placeholder="Description (optional)" className="md:col-span-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                                    <button onClick={handleAddMedia} className="md:col-span-2 flex items-center justify-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                                        <Plus className="w-4 h-4" /> Add Media
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {mediaItems.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                                            <div className="flex items-center gap-4">
                                                {item.thumbnail && <img src={item.thumbnail} alt="" className="w-16 h-12 object-cover rounded-lg" />}
                                                <div>
                                                    <h3 className="font-semibold">{item.title}</h3>
                                                    <p className="text-sm text-zinc-500">{item.type} • {item.description}</p>
                                                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm text-pink-500 flex items-center gap-1">View <ExternalLink className="w-3 h-3" /></a>
                                                </div>
                                            </div>
                                            <button onClick={() => handleRemoveMedia(item.id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {mediaItems.length === 0 && <p className="text-center text-zinc-400 py-12">No media items added yet.</p>}
                            </div>
                        )}

                        {/* Milestones Tab */}
                        {activeTab === "milestones" && (
                            <div>
                                <h2 className="text-xl font-bold mb-6">Manage Milestones</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                                    <input type="text" value={newMilestone.year} onChange={(e) => setNewMilestone({ ...newMilestone, year: e.target.value })} placeholder="Year (e.g., 2024)" className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                                    <input type="text" value={newMilestone.title} onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })} placeholder="Title (e.g., Shonichi Show)" className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                                    <input type="text" value={newMilestone.description} onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })} placeholder="Description" className="md:col-span-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                                    <button onClick={handleAddMilestone} className="md:col-span-2 flex items-center justify-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                                        <Plus className="w-4 h-4" /> Add Milestone
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {milestones.map((milestone) => (
                                        <div key={milestone.id} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                                            <div>
                                                <span className="text-pink-500 font-bold">{milestone.year}</span>
                                                <h3 className="font-semibold">{milestone.title}</h3>
                                                <p className="text-sm text-zinc-500">{milestone.description}</p>
                                            </div>
                                            <button onClick={() => handleRemoveMilestone(milestone.id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {milestones.length === 0 && <p className="text-center text-zinc-400 py-12">No milestones added yet.</p>}
                            </div>
                        )}

                        {/* Fun Facts Tab */}
                        {activeTab === "funfacts" && (
                            <div>
                                <h2 className="text-xl font-bold mb-6">Manage Fun Facts</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                                    <input type="text" value={newFunFact.title} onChange={(e) => setNewFunFact({ ...newFunFact, title: e.target.value })} placeholder="Title" className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                                    <input type="text" value={newFunFact.description} onChange={(e) => setNewFunFact({ ...newFunFact, description: e.target.value })} placeholder="Description" className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                                    <button onClick={handleAddFunFact} className="md:col-span-2 flex items-center justify-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                                        <Plus className="w-4 h-4" /> Add Fun Fact
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {funFacts.map((fact) => (
                                        <div key={fact.id} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                                            <div>
                                                <h3 className="font-semibold">{fact.title}</h3>
                                                <p className="text-sm text-zinc-500">{fact.description}</p>
                                            </div>
                                            <button onClick={() => handleRemoveFunFact(fact.id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {funFacts.length === 0 && <p className="text-center text-zinc-400 py-12">No fun facts added yet.</p>}
                            </div>
                        )}

                        {/* Hashtags Tab */}
                        {activeTab === "hashtags" && (
                            <div>
                                <h2 className="text-xl font-bold mb-6">Manage Hashtags</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                                    <input type="text" value={newHashtag.tag} onChange={(e) => setNewHashtag({ ...newHashtag, tag: e.target.value })} placeholder="#Hashtag" className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                                    <input type="text" value={newHashtag.label} onChange={(e) => setNewHashtag({ ...newHashtag, label: e.target.value })} placeholder="Label" className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                                    <input type="text" value={newHashtag.emoji} onChange={(e) => setNewHashtag({ ...newHashtag, emoji: e.target.value })} placeholder="Emoji 💝" className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                                    <label className="flex items-center gap-2 px-4 py-2">
                                        <input type="checkbox" checked={newHashtag.is_ramadan} onChange={(e) => setNewHashtag({ ...newHashtag, is_ramadan: e.target.checked })} className="w-4 h-4" />
                                        <span>Ramadan Special</span>
                                    </label>
                                    <button onClick={handleAddHashtag} className="md:col-span-2 flex items-center justify-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                                        <Plus className="w-4 h-4" /> Add Hashtag
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {hashtags.map((hashtag) => (
                                        <div key={hashtag.id} className="flex items-center gap-2 px-4 py-2 bg-zinc-50 dark:bg-zinc-800 rounded-full">
                                            <span>{hashtag.emoji}</span>
                                            <span className="font-medium">{hashtag.tag}</span>
                                            <button onClick={() => handleRemoveHashtag(hashtag.id)} className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition-colors">
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {hashtags.length === 0 && <p className="text-center text-zinc-400 py-12">No hashtags added yet.</p>}
                            </div>
                        )}

                        {/* Stage Units Tab */}
                        {activeTab === "stageunits" && (
                            <div>
                                <h2 className="text-xl font-bold mb-6">Manage Stage Units</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                                    <input type="text" value={newStageUnit.name} onChange={(e) => setNewStageUnit({ ...newStageUnit, name: e.target.value })} placeholder="Unit Name" className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                                    <input type="text" value={newStageUnit.setlist} onChange={(e) => setNewStageUnit({ ...newStageUnit, setlist: e.target.value })} placeholder="Setlist Name" className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                                    <div className="flex gap-2 items-center">
                                        <label className="text-sm">From:</label>
                                        <input type="color" value={newStageUnit.color_from} onChange={(e) => setNewStageUnit({ ...newStageUnit, color_from: e.target.value })} className="w-12 h-8 rounded cursor-pointer" />
                                        <label className="text-sm">To:</label>
                                        <input type="color" value={newStageUnit.color_to} onChange={(e) => setNewStageUnit({ ...newStageUnit, color_to: e.target.value })} className="w-12 h-8 rounded cursor-pointer" />
                                    </div>
                                    <div className="flex gap-2">
                                        <input type="text" value={newSong} onChange={(e) => setNewSong(e.target.value)} placeholder="Add song..." className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                                        <button onClick={handleAddSong} className="px-3 py-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors">
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    {newStageUnit.songs.length > 0 && (
                                        <div className="md:col-span-2 flex flex-wrap gap-2">
                                            {newStageUnit.songs.map((song, i) => (
                                                <span key={i} className="flex items-center gap-1 px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full text-sm">
                                                    {song}
                                                    <button onClick={() => handleRemoveSong(i)} className="hover:text-red-500"><Trash2 className="w-3 h-3" /></button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <button onClick={handleAddStageUnit} className="md:col-span-2 flex items-center justify-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                                        <Plus className="w-4 h-4" /> Add Stage Unit
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {stageUnits.map((unit) => (
                                        <div key={unit.id} className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full" style={{ background: `linear-gradient(to right, ${unit.color_from}, ${unit.color_to})` }} />
                                                    <div>
                                                        <h3 className="font-semibold">{unit.name}</h3>
                                                        <p className="text-sm text-zinc-500">{unit.setlist}</p>
                                                    </div>
                                                </div>
                                                <button onClick={() => handleRemoveStageUnit(unit.id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                            {unit.songs.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {unit.songs.map((song, i) => (
                                                        <span key={i} className="px-2 py-0.5 bg-zinc-200 dark:bg-zinc-700 text-sm rounded">{song}</span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {stageUnits.length === 0 && <p className="text-center text-zinc-400 py-12">No stage units added yet.</p>}
                            </div>
                        )}

                        {/* Settings Tab */}
                        {activeTab === "settings" && (
                            <div>
                                <h2 className="text-xl font-bold mb-6">Site Settings</h2>
                                <div className="max-w-md">
                                    <label className="block text-sm font-medium mb-2">Total Theater Shows</label>
                                    <div className="flex gap-3">
                                        <input
                                            type="number"
                                            value={totalShows}
                                            onChange={(e) => setTotalShows(parseInt(e.target.value) || 0)}
                                            className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        />
                                        <button onClick={handleUpdateTotalShows} className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                                            <Save className="w-4 h-4" /> Save
                                        </button>
                                    </div>
                                    <p className="text-sm text-zinc-500 mt-2">This number appears in the About page under Stage Units section.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Notification */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full shadow-lg flex items-center gap-2"
                    >
                        <Check className="w-4 h-4" />
                        {notification}
                    </motion.div>
                )}
            </AnimatePresence>
        </Layout>
    );
};

export default Admin;
