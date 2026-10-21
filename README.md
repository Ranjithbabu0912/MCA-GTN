# G.T.N. Arts College (Autonomous), Dindigul
## Department of Master of Computer Applications (MCA) — Official Website

> **Tagline:** EMPOWERING MINDS | INSPIRING INNOVATION | SHAPING FUTURES  
> **Status:** Fully responsive static website (HTML5, CSS3, Vanilla JavaScript)  
> **Accreditation:** Re-accredited with 'A' Grade by NAAC | Affiliated to Madurai Kamaraj University  

---

## 🏛️ Project Overview

This repository hosts the official digital showcase of the **Department of Master of Computer Applications (MCA)** at **G.T.N. Arts College (Autonomous), Dindigul**. Commencing in 2025, the MCA programme bridges core computing theory with applied emerging technologies (AI, Machine Learning, Cyber Security, Cloud Computing, and Software Engineering).

The website is engineered as a **100% static, serverless-ready** frontend with zero backend dependencies, no database requirements, and zero runtime vulnerabilities.

---

## 📁 Project Directory Structure

```text
MCA/
├── index.html              # Homepage with hero particle network, editorial about, vision/mission, & widgets
├── about.html              # Detailed departmental profile, vision, tripartite mission, & infrastructure
├── programme.html          # MCA Curriculum, 10 Core Areas, Learning Approach, 10 Key Emphases, & Eligibility
├── faculty.html            # Faculty directory with official titles, designations, & office guidelines
├── activities.html         # Co-curricular showcase: workshops, seminars, symposiums, & industrial visits
├── events.html             # Dynamic event catalog, category filters, keyword search, & event modal
├── gallery.html            # Media gallery with category filter and full accessible lightbox modal
├── achievements.html       # Meritorious milestones, competitions, certifications, & official disclosure
├── announcements.html      # Circular archive with important notice badges & advisory information
├── contact.html            # Department address, office desk info, map details, & validated contact form
├── 404.html                # Custom accessible error page
├── robots.txt              # Search engine crawler instructions
├── sitemap.xml             # XML sitemap for SEO discovery
│
├── css/
│   ├── style.css           # Core design system tokens, typography, cards, buttons, & layout
│   ├── animations.css      # Keyframe animations, particle canvas styling, & reduced-motion queries
│   └── responsive.css      # Adaptive breakpoints for 1920px down to 320px
│
├── js/
│   ├── main.js             # Navigation controller, sticky header, active states, & form validation
│   ├── animations.js       # Lightweight interactive canvas particles & IntersectionObserver counters
│   ├── faculty.js          # Centralized faculty records & dynamic renderers
│   ├── events.js           # Centralized event catalog, filter pills, live search, & modal handlers
│   ├── gallery.js          # Centralized gallery metadata, SVG vector generators, & lightbox
│   ├── announcements.js    # News ticker feed & circular archive records
│   └── achievements.js     # Student & faculty milestone records
│
└── assets/
    ├── logos/
    │   ├── mca-logo.svg            # Department crest emblem (vector SVG)
    │   └── gtn-college-crest.svg   # Institutional college crest seal (vector SVG)
    └── images/
        └── department-building.svg # Academic department campus architecture illustration
```

---

## 🚀 Running the Website Locally

Since the project is built purely with standard HTML5, CSS3, and Vanilla JavaScript, it can be viewed directly in any modern browser without needing build tools or package managers.

### Option 1: Direct File Opening
Double-click `index.html` to open it in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.

### Option 2: Python Built-in Static Server
```bash
# In the project root directory:
python -m http.server 8080
```
Open `http://localhost:8080` in your web browser.

### Option 3: VS Code Live Server
Right-click on `index.html` inside VS Code and select **"Open with Live Server"**.

---

## 🛠️ Content Management & Admin Module (CRUD)

The website includes a full **Admin Module** powered by a **MERN Stack** (MongoDB/Mongoose + Express.js + Node.js) with real-time UI controls to perform Create, Read, Update, and Delete (CRUD) operations without writing code.

### 🔐 Accessing the Admin Portal
- **URL:** `http://localhost:5000/admin.html` (or click "Admin Portal" in the site footer)
- **Security Access:**
  - **Quick PIN:** `admin123`
  - **Username / Password:** `admin` / `admin123`

### ⚡ Supported CRUD Modules
1. **Announcements:** Post circulars, mark as Important/Latest, set custom links, edit dates, and delete notices.
2. **Achievements:** Manage student accolades, academic trophies, hackathon wins, and company placement highlights.
3. **Gallery & Media:** Upload event photos via Multer to `/assets/uploads/`, manage captions, dates, and categories.
4. **Events & Workshops:** Schedule symposiums, workshops, guest lectures, set venues, speakers, and registration links.
5. **Faculty Details:** Update profile photos, academic qualifications, research specializations, and bios.

### 🌐 REST API Endpoints
All admin routes are protected by JWT Bearer tokens or security PIN headers:
- `POST /api/auth/login` — Authentication & JWT generation
- `/api/announcements` — `GET`, `POST`, `PUT /:id`, `DELETE /:id`
- `/api/achievements` — `GET`, `POST`, `PUT /:id`, `DELETE /:id`
- `/api/gallery` — `GET`, `POST`, `PUT /:id`, `DELETE /:id`
- `/api/events` — `GET`, `POST`, `PUT /:id`, `DELETE /:id`
- `/api/faculty` — `GET`, `POST`, `PUT /:id`, `DELETE /:id`
- `POST /api/upload` — Multipart image upload (JPEG, PNG, WebP, SVG)

### 💾 Cloud Database Architecture
The backend connects directly to **MongoDB Atlas Cloud Database** (`MONGODB_URI` in `.env`). All CRUD operations for Announcements, Achievements, Gallery, Events, and Faculty profiles are synchronized in real-time with zero local data dependency.

---

## 🎨 Visual Identity & Design Standards

- **Primary Colors:** Deep Navy (`#071228`, `#0B1D3A`), Royal Blue (`#102A54`, `#18427E`)
- **Accent Colors:** Digital Tech Blue (`#0077B6`), Soft Cyan (`#00B4D8`, `#38BDF8`)
- **Academic Gold:** NAAC / Crest Accent (`#D4AF37`)
- **Typography:** Google Fonts: `Plus Jakarta Sans` (Body), `Outfit` (Headings), `JetBrains Mono` (Badges & Code)
- **Accessibility:** WCAG AA compliant contrast ratios, visible keyboard focus indicators, accessible modals (`aria-modal`, keyboard `Escape`, and `Tab`), and `@media (prefers-reduced-motion: reduce)` support.

---

## 📜 Official Content Guidelines

As per institutional directives:
- Faculty profiles reflect verified titles: Dr. A. Vanitha Katharine (Professor & HOD), Ms. A. Mujiba Parvin (Assistant Professor), and Ms. A. Praveena (Assistant Professor).
- No unofficial personal contact numbers or emails are fabricated.
- Admissions adhere to the Directorate of Collegiate Education and Madurai Kamaraj University autonomous guidelines.

---

&copy; 2026 Department of Master of Computer Applications, G.T.N. Arts College (Autonomous), Dindigul. All Rights Reserved.
