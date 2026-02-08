# Admin Panel Documentation

## Overview

The Admin Panel is a comprehensive content management system for the Idol Aura website. It supports both **local storage** (for development/simple deployments) and **Supabase** (for production with authentication).

---

## Table of Contents

1. [Features](#features)
2. [Accessing the Admin Panel](#accessing-the-admin-panel)
3. [Authentication](#authentication)
4. [Content Management](#content-management)
5. [Supabase Setup](#supabase-setup)
6. [Database Schema](#database-schema)
7. [Troubleshooting](#troubleshooting)

---

## Features

### Content Management Tabs

| Tab | Description |
|-----|-------------|
| **Gallery** | Manage photo URLs for the gallery page |
| **Schedule** | Manage upcoming events and shows |
| **Media** | Manage videos, audio, and articles |
| **Milestones** | Manage career milestones (About page) |
| **Fun Facts** | Manage fun facts (About page) |
| **Hashtags** | Manage social media hashtags (About page) |
| **Stage Units** | Manage stage unit information (About page) |
| **Settings** | Configure site-wide settings like total shows |

### Additional Features

- ✅ **Export Data** - Download all data as JSON backup
- ✅ **Import Data** - Restore data from JSON file
- ✅ **Authentication** - Secure login with Supabase Auth
- ✅ **Responsive Design** - Works on mobile and desktop
- ✅ **Real-time Notifications** - Feedback for all actions

---

## Accessing the Admin Panel

### URL
```
http://yourwebsite.com/admin
```

> **Note:** The admin panel is intentionally not linked in the navigation menu for security.

---

## Authentication

### Without Supabase (Local Storage Mode)
- No login required
- Data stored in browser's localStorage
- Suitable for development and personal use

### With Supabase (Production Mode)
- Login required with email/password
- Data stored in Supabase database
- Supports multiple users and devices

---

## Content Management

### 1. Gallery Photos

**Adding Photos:**
1. Navigate to the **Gallery** tab
2. Paste the image URL
3. Click **Add Photo**

**Supported URLs:**
- Direct image URLs (`.jpg`, `.png`, `.webp`)
- Twitter/X media URLs
- Any publicly accessible image URL

**Example:**
```
https://pbs.twimg.com/media/XXXXX?format=jpg&name=medium
```

---

### 2. Schedule Events

**Fields:**
| Field | Description | Required |
|-------|-------------|----------|
| Title | Event name | ✅ |
| Date | Event date (e.g., "Feb 15, 2026") | ✅ |
| Time | Event time (e.g., "19:00 WIB") | ❌ |
| Location | Venue or location | ❌ |
| Type | Concert, Fan Event, TV, Special, Release | ✅ |
| Link | URL for more info | ❌ |
| Featured | Highlight as featured event | ❌ |

---

### 3. Media Items

**Types:**
- **Video** - YouTube, TikTok, or video URLs
- **Audio** - Spotify, SoundCloud, or audio URLs
- **Article** - Blog posts, news articles

**Fields:**
| Field | Description | Required |
|-------|-------------|----------|
| Title | Media title | ✅ |
| Type | video, audio, or article | ✅ |
| URL | Link to media | ✅ |
| Thumbnail | Preview image URL | ❌ |
| Description | Brief description | ❌ |

---

### 4. Milestones

**Fields:**
| Field | Description | Required |
|-------|-------------|----------|
| Year | Year of milestone (e.g., "2024") | ✅ |
| Title | Milestone title | ✅ |
| Description | Details about the milestone | ❌ |

---

### 5. Fun Facts

**Fields:**
| Field | Description | Required |
|-------|-------------|----------|
| Title | Fact title or question | ✅ |
| Description | The fun fact answer | ❌ |

---

### 6. Hashtags

**Fields:**
| Field | Description | Required |
|-------|-------------|----------|
| Tag | The hashtag (e.g., "#IntanJKT48") | ✅ |
| Label | Display label | ❌ |
| Emoji | Associated emoji | ❌ |
| Is Ramadan | Special Ramadan tag | ❌ |

---

### 7. Stage Units

**Fields:**
| Field | Description | Required |
|-------|-------------|----------|
| Name | Unit name | ✅ |
| Setlist | Setlist name | ❌ |
| Colors | Gradient colors (from/to) | ❌ |
| Songs | List of songs | ❌ |

---

### 8. Settings

**Available Settings:**
- **Total Theater Shows** - Number displayed on the About page

---

## Supabase Setup

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your **Project URL** and **Anon Key**

### Step 2: Configure Environment Variables

Create `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 3: Create Database Tables

Run this SQL in Supabase SQL Editor:

```sql
-- Gallery table
CREATE TABLE gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  added_at TIMESTAMPTZ DEFAULT NOW()
);

-- Schedule table
CREATE TABLE schedule (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT,
  location TEXT,
  type TEXT DEFAULT 'Concert',
  featured BOOLEAN DEFAULT FALSE,
  link TEXT
);

-- Media table
CREATE TABLE media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('video', 'audio', 'article')),
  url TEXT NOT NULL,
  thumbnail TEXT,
  description TEXT,
  added_at TIMESTAMPTZ DEFAULT NOW()
);

-- Milestones table
CREATE TABLE milestones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0
);

-- Fun Facts table
CREATE TABLE fun_facts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0
);

-- Hashtags table
CREATE TABLE hashtags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tag TEXT NOT NULL,
  label TEXT,
  emoji TEXT,
  is_ramadan BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0
);

-- Stage Units table
CREATE TABLE stage_units (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  setlist TEXT,
  color_from TEXT DEFAULT '#ec4899',
  color_to TEXT DEFAULT '#a855f7',
  songs TEXT[] DEFAULT '{}',
  order_index INTEGER DEFAULT 0
);

-- Settings table
CREATE TABLE settings (
  id TEXT PRIMARY KEY DEFAULT '1',
  total_shows INTEGER DEFAULT 44
);

-- Insert default settings
INSERT INTO settings (id, total_shows) VALUES ('1', 44);
```

### Step 4: Enable Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE fun_facts ENABLE ROW LEVEL SECURITY;
ALTER TABLE hashtags ENABLE ROW LEVEL SECURITY;
ALTER TABLE stage_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (full access)
CREATE POLICY "Authenticated users can read gallery" ON gallery FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert gallery" ON gallery FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can delete gallery" ON gallery FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can read schedule" ON schedule FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert schedule" ON schedule FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can delete schedule" ON schedule FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can read media" ON media FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert media" ON media FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can delete media" ON media FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can read milestones" ON milestones FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert milestones" ON milestones FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can delete milestones" ON milestones FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can read fun_facts" ON fun_facts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert fun_facts" ON fun_facts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can delete fun_facts" ON fun_facts FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can read hashtags" ON hashtags FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert hashtags" ON hashtags FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can delete hashtags" ON hashtags FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can read stage_units" ON stage_units FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert stage_units" ON stage_units FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can delete stage_units" ON stage_units FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can manage settings" ON settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Public read access for website display (optional)
CREATE POLICY "Public can read gallery" ON gallery FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read schedule" ON schedule FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read media" ON media FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read milestones" ON milestones FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read fun_facts" ON fun_facts FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read hashtags" ON hashtags FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read stage_units" ON stage_units FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read settings" ON settings FOR SELECT TO anon USING (true);
```

### Step 5: Create Admin User

1. Go to Supabase Dashboard > Authentication > Users
2. Click "Add user"
3. Enter email and password
4. Use these credentials to log in to the admin panel

---

## Database Schema

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   gallery   │     │  schedule   │     │    media    │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ id (UUID)   │     │ id (UUID)   │     │ id (UUID)   │
│ url         │     │ title       │     │ title       │
│ added_at    │     │ date        │     │ type        │
└─────────────┘     │ time        │     │ url         │
                    │ location    │     │ thumbnail   │
                    │ type        │     │ description │
                    │ featured    │     │ added_at    │
                    │ link        │     └─────────────┘
                    └─────────────┘

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ milestones  │     │  fun_facts  │     │  hashtags   │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ id (UUID)   │     │ id (UUID)   │     │ id (UUID)   │
│ year        │     │ title       │     │ tag         │
│ title       │     │ description │     │ label       │
│ description │     │ order_index │     │ emoji       │
│ order_index │     └─────────────┘     │ is_ramadan  │
└─────────────┘                         │ order_index │
                                        └─────────────┘

┌─────────────┐     ┌─────────────┐
│ stage_units │     │  settings   │
├─────────────┤     ├─────────────┤
│ id (UUID)   │     │ id (TEXT)   │
│ name        │     │ total_shows │
│ setlist     │     └─────────────┘
│ color_from  │
│ color_to    │
│ songs[]     │
│ order_index │
└─────────────┘
```

---

## File Structure

```
src/
├── contexts/
│   └── AuthContext.tsx      # Authentication context
├── lib/
│   ├── supabase.ts         # Supabase client config
│   └── dataStore.ts        # Data operations
├── pages/
│   └── Admin.tsx           # Admin panel component
└── App.tsx                 # App with AuthProvider
```

---

## Troubleshooting

### Login not working
- Verify Supabase credentials in `.env.local`
- Check if user exists in Supabase Auth
- Ensure email is confirmed (check Supabase settings)

### Data not saving
- Check browser console for errors
- Verify RLS policies allow authenticated access
- Ensure Supabase is properly configured

### Data not showing on website
- Public read policies must be enabled
- Components must be updated to fetch from dataStore

### "Supabase not configured" message
- This is normal for local development
- Data will use localStorage instead
- Add Supabase credentials to enable cloud storage

---

## Security Notes

1. **Admin URL is hidden** - Not linked in navigation
2. **Authentication required** - When Supabase is configured
3. **RLS policies** - Restrict write access to authenticated users
4. **Public read access** - Website can display content without login

---

## Future Improvements

- [ ] Role-based access control
- [ ] Image upload to Supabase Storage
- [ ] Rich text editor
- [ ] Bulk operations
- [ ] Activity logging
- [ ] Preview mode

---

## Contact

For issues or feature requests, contact the developer.
