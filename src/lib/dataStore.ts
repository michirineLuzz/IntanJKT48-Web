// Data management using Supabase with localStorage fallback
// This module handles all data operations for the admin panel

import { supabase, isSupabaseConfigured } from './supabase';

// Types
export interface GalleryPhoto {
    id: string;
    url: string;
    added_at: string;
}

export interface ScheduleEvent {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    type: string;
    featured: boolean;
    link?: string;
}

export interface MediaItem {
    id: string;
    title: string;
    type: "video" | "audio" | "article";
    url: string;
    thumbnail?: string;
    description?: string;
    added_at: string;
}

export interface Milestone {
    id: string;
    year: string;
    title: string;
    description: string;
    order_index: number;
}

export interface FunFact {
    id: string;
    title: string;
    description: string;
    order_index: number;
}

export interface Hashtag {
    id: string;
    tag: string;
    label: string;
    emoji: string;
    is_ramadan: boolean;
    order_index: number;
}

export interface StageUnit {
    id: string;
    name: string;
    setlist: string;
    color_from: string;
    color_to: string;
    songs: string[];
    order_index: number;
}

export interface SiteSettings {
    id: string;
    total_shows: number;
}

export interface SiteData {
    gallery: GalleryPhoto[];
    schedule: ScheduleEvent[];
    media: MediaItem[];
    milestones: Milestone[];
    funFacts: FunFact[];
    hashtags: Hashtag[];
    stageUnits: StageUnit[];
    settings: SiteSettings;
}

const STORAGE_KEY = "idol_aura_admin_data";

// Default data
const defaultData: SiteData = {
    gallery: [],
    schedule: [],
    media: [],
    milestones: [],
    funFacts: [],
    hashtags: [],
    stageUnits: [],
    settings: {
        id: "1",
        total_shows: 44,
    },
};

// ============================================
// LOCAL STORAGE FUNCTIONS (Fallback)
// ============================================

const getLocalData = (): SiteData => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return { ...defaultData, ...JSON.parse(stored) };
        }
    } catch (e) {
        console.error("Error reading local data:", e);
    }
    return defaultData;
};

const saveLocalData = (data: SiteData): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error("Error saving local data:", e);
    }
};

// ============================================
// SUPABASE FUNCTIONS
// ============================================

// Gallery
export const getPhotos = async (): Promise<GalleryPhoto[]> => {
    if (!isSupabaseConfigured()) {
        return getLocalData().gallery;
    }
    const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('added_at', { ascending: false });
    if (error) {
        console.error('Error fetching photos:', error);
        return getLocalData().gallery;
    }
    return data || [];
};

export const addPhoto = async (url: string): Promise<GalleryPhoto | null> => {
    const photo: GalleryPhoto = {
        id: Date.now().toString(),
        url,
        added_at: new Date().toISOString(),
    };

    if (!isSupabaseConfigured()) {
        const data = getLocalData();
        data.gallery.push(photo);
        saveLocalData(data);
        return photo;
    }

    const { data, error } = await supabase
        .from('gallery')
        .insert([{ url, added_at: photo.added_at }])
        .select()
        .single();

    if (error) {
        console.error('Error adding photo:', error);
        return null;
    }
    return data;
};

export const removePhoto = async (id: string): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
        const data = getLocalData();
        data.gallery = data.gallery.filter((p) => p.id !== id);
        saveLocalData(data);
        return true;
    }

    const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error removing photo:', error);
        return false;
    }
    return true;
};

// Schedule
export const getScheduleEvents = async (): Promise<ScheduleEvent[]> => {
    if (!isSupabaseConfigured()) {
        return getLocalData().schedule;
    }
    const { data, error } = await supabase
        .from('schedule')
        .select('*')
        .order('date', { ascending: true });
    if (error) {
        console.error('Error fetching schedule:', error);
        return getLocalData().schedule;
    }
    return data || [];
};

export const addScheduleEvent = async (event: Omit<ScheduleEvent, "id">): Promise<ScheduleEvent | null> => {
    if (!isSupabaseConfigured()) {
        const data = getLocalData();
        const newEvent = { ...event, id: Date.now().toString() };
        data.schedule.push(newEvent);
        saveLocalData(data);
        return newEvent;
    }

    const { data, error } = await supabase
        .from('schedule')
        .insert([event])
        .select()
        .single();

    if (error) {
        console.error('Error adding event:', error);
        return null;
    }
    return data;
};

export const removeScheduleEvent = async (id: string): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
        const data = getLocalData();
        data.schedule = data.schedule.filter((e) => e.id !== id);
        saveLocalData(data);
        return true;
    }

    const { error } = await supabase
        .from('schedule')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error removing event:', error);
        return false;
    }
    return true;
};

// Media
export const getMediaItems = async (): Promise<MediaItem[]> => {
    if (!isSupabaseConfigured()) {
        return getLocalData().media;
    }
    const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('added_at', { ascending: false });
    if (error) {
        console.error('Error fetching media:', error);
        return getLocalData().media;
    }
    return data || [];
};

export const addMediaItem = async (item: Omit<MediaItem, "id" | "added_at">): Promise<MediaItem | null> => {
    if (!isSupabaseConfigured()) {
        const data = getLocalData();
        const newItem = { ...item, id: Date.now().toString(), added_at: new Date().toISOString() };
        data.media.push(newItem);
        saveLocalData(data);
        return newItem;
    }

    const { data, error } = await supabase
        .from('media')
        .insert([{ ...item, added_at: new Date().toISOString() }])
        .select()
        .single();

    if (error) {
        console.error('Error adding media:', error);
        return null;
    }
    return data;
};

export const removeMediaItem = async (id: string): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
        const data = getLocalData();
        data.media = data.media.filter((m) => m.id !== id);
        saveLocalData(data);
        return true;
    }

    const { error } = await supabase
        .from('media')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error removing media:', error);
        return false;
    }
    return true;
};

// Milestones
export const getMilestones = async (): Promise<Milestone[]> => {
    if (!isSupabaseConfigured()) {
        return getLocalData().milestones;
    }
    const { data, error } = await supabase
        .from('milestones')
        .select('*')
        .order('order_index', { ascending: true });
    if (error) {
        console.error('Error fetching milestones:', error);
        return getLocalData().milestones;
    }
    return data || [];
};

export const addMilestone = async (milestone: Omit<Milestone, "id">): Promise<Milestone | null> => {
    if (!isSupabaseConfigured()) {
        const data = getLocalData();
        const newMilestone = { ...milestone, id: Date.now().toString() };
        data.milestones.push(newMilestone);
        saveLocalData(data);
        return newMilestone;
    }

    const { data, error } = await supabase
        .from('milestones')
        .insert([milestone])
        .select()
        .single();

    if (error) {
        console.error('Error adding milestone:', error);
        return null;
    }
    return data;
};

export const removeMilestone = async (id: string): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
        const data = getLocalData();
        data.milestones = data.milestones.filter((m) => m.id !== id);
        saveLocalData(data);
        return true;
    }

    const { error } = await supabase
        .from('milestones')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error removing milestone:', error);
        return false;
    }
    return true;
};

// Fun Facts
export const getFunFacts = async (): Promise<FunFact[]> => {
    if (!isSupabaseConfigured()) {
        return getLocalData().funFacts;
    }
    const { data, error } = await supabase
        .from('fun_facts')
        .select('*')
        .order('order_index', { ascending: true });
    if (error) {
        console.error('Error fetching fun facts:', error);
        return getLocalData().funFacts;
    }
    return data || [];
};

export const addFunFact = async (fact: Omit<FunFact, "id">): Promise<FunFact | null> => {
    if (!isSupabaseConfigured()) {
        const data = getLocalData();
        const newFact = { ...fact, id: Date.now().toString() };
        data.funFacts.push(newFact);
        saveLocalData(data);
        return newFact;
    }

    const { data, error } = await supabase
        .from('fun_facts')
        .insert([fact])
        .select()
        .single();

    if (error) {
        console.error('Error adding fun fact:', error);
        return null;
    }
    return data;
};

export const removeFunFact = async (id: string): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
        const data = getLocalData();
        data.funFacts = data.funFacts.filter((f) => f.id !== id);
        saveLocalData(data);
        return true;
    }

    const { error } = await supabase
        .from('fun_facts')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error removing fun fact:', error);
        return false;
    }
    return true;
};

// Hashtags
export const getHashtags = async (): Promise<Hashtag[]> => {
    if (!isSupabaseConfigured()) {
        return getLocalData().hashtags;
    }
    const { data, error } = await supabase
        .from('hashtags')
        .select('*')
        .order('order_index', { ascending: true });
    if (error) {
        console.error('Error fetching hashtags:', error);
        return getLocalData().hashtags;
    }
    return data || [];
};

export const addHashtag = async (hashtag: Omit<Hashtag, "id">): Promise<Hashtag | null> => {
    if (!isSupabaseConfigured()) {
        const data = getLocalData();
        const newHashtag = { ...hashtag, id: Date.now().toString() };
        data.hashtags.push(newHashtag);
        saveLocalData(data);
        return newHashtag;
    }

    const { data, error } = await supabase
        .from('hashtags')
        .insert([hashtag])
        .select()
        .single();

    if (error) {
        console.error('Error adding hashtag:', error);
        return null;
    }
    return data;
};

export const removeHashtag = async (id: string): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
        const data = getLocalData();
        data.hashtags = data.hashtags.filter((h) => h.id !== id);
        saveLocalData(data);
        return true;
    }

    const { error } = await supabase
        .from('hashtags')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error removing hashtag:', error);
        return false;
    }
    return true;
};

// Stage Units
export const getStageUnits = async (): Promise<StageUnit[]> => {
    if (!isSupabaseConfigured()) {
        return getLocalData().stageUnits;
    }
    const { data, error } = await supabase
        .from('stage_units')
        .select('*')
        .order('order_index', { ascending: true });
    if (error) {
        console.error('Error fetching stage units:', error);
        return getLocalData().stageUnits;
    }
    return data || [];
};

export const addStageUnit = async (unit: Omit<StageUnit, "id">): Promise<StageUnit | null> => {
    if (!isSupabaseConfigured()) {
        const data = getLocalData();
        const newUnit = { ...unit, id: Date.now().toString() };
        data.stageUnits.push(newUnit);
        saveLocalData(data);
        return newUnit;
    }

    const { data, error } = await supabase
        .from('stage_units')
        .insert([unit])
        .select()
        .single();

    if (error) {
        console.error('Error adding stage unit:', error);
        return null;
    }
    return data;
};

export const removeStageUnit = async (id: string): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
        const data = getLocalData();
        data.stageUnits = data.stageUnits.filter((u) => u.id !== id);
        saveLocalData(data);
        return true;
    }

    const { error } = await supabase
        .from('stage_units')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error removing stage unit:', error);
        return false;
    }
    return true;
};

// Settings
export const getSettings = async (): Promise<SiteSettings> => {
    if (!isSupabaseConfigured()) {
        return getLocalData().settings;
    }
    const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single();
    if (error) {
        console.error('Error fetching settings:', error);
        return getLocalData().settings;
    }
    return data || defaultData.settings;
};

export const updateTotalShows = async (count: number): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
        const data = getLocalData();
        data.settings.total_shows = count;
        saveLocalData(data);
        return true;
    }

    const { error } = await supabase
        .from('settings')
        .upsert([{ id: '1', total_shows: count }]);

    if (error) {
        console.error('Error updating total shows:', error);
        return false;
    }
    return true;
};

// Export/Import (for localStorage fallback)
export const exportData = (): string => {
    return JSON.stringify(getLocalData(), null, 2);
};

export const importData = (jsonString: string): boolean => {
    try {
        const data = JSON.parse(jsonString) as SiteData;
        saveLocalData(data);
        return true;
    } catch (e) {
        console.error("Error importing data:", e);
        return false;
    }
};

export const clearAllData = (): void => {
    localStorage.removeItem(STORAGE_KEY);
};
