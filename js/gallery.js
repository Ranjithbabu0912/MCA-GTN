/**
 * ==========================================================================
 * G.T.N. ARTS COLLEGE (AUTONOMOUS), DINDIGUL
 * DEPARTMENT OF MASTER OF COMPUTER APPLICATIONS (MCA)
 * GALLERY & LIGHTBOX MODULE (gallery.js)
 * ==========================================================================
 * Centralized dynamic gallery repository with filterable categories,
 * fullscreen lightbox, keyboard navigation, and caption rendering.
 */

const mcaGalleryItems = [
  {
    id: "gal-01",
    title: "Advanced MCA Computer Laboratory",
    category: "Department",
    categoryLabel: "Department",
    caption: "High-performance computing laboratory equipped with dual-boot Linux/Windows workstations, high-speed campus LAN, and enterprise development suites.",
    themeColor: "#0B1D3A",
    icon: "fa-desktop"
  },
  {
    id: "gal-02",
    title: "National Technical Symposium Inauguration",
    category: "Events",
    categoryLabel: "Events",
    caption: "Dignitaries, faculty, and student organizers at the ceremonial lighting of the lamp during CYBERNAUT Technical Symposium.",
    themeColor: "#102A54",
    icon: "fa-award"
  },
  {
    id: "gal-03",
    title: "Hands-on Workshop in Cloud Architecture",
    category: "Workshops",
    categoryLabel: "Workshops",
    caption: "MCA postgraduate scholars configuring distributed container networks during an intensive industry-led technical workshop.",
    themeColor: "#18427E",
    icon: "fa-cloud"
  },
  {
    id: "gal-04",
    title: "Technical Seminar on Ethical Artificial Intelligence",
    category: "Seminars",
    categoryLabel: "Seminars",
    caption: "Invited keynote speaker addressing postgraduate scholars on ethical considerations, fairness, and safety in modern machine learning systems.",
    themeColor: "#0A1935",
    icon: "fa-brain"
  },
  {
    id: "gal-05",
    title: "Student Coding Hackathon & Brainstorming",
    category: "Student Activities",
    categoryLabel: "Student Activities",
    caption: "Student teams collaborating during the 12-hour departmental coding sprint solving algorithmic challenges.",
    themeColor: "#0077B6",
    icon: "fa-code"
  },
  {
    id: "gal-06",
    title: "Faculty Academic Mentorship & Planning",
    category: "Faculty Activities",
    categoryLabel: "Faculty Activities",
    caption: "Department faculty members reviewing curriculum updates and postgraduate project mentorship milestones.",
    themeColor: "#1E5BB0",
    icon: "fa-chalkboard-user"
  },
  {
    id: "gal-07",
    title: "G.T.N. Arts College Scenic Campus Greenery",
    category: "Campus",
    categoryLabel: "Campus",
    caption: "The serene and verdant academic campus of G.T.N. Arts College (Autonomous), fostering focused postgraduate studies.",
    themeColor: "#0B2B26",
    icon: "fa-landmark"
  },
  {
    id: "gal-08",
    title: "Inter-Collegiate Trophy Winners Celebration",
    category: "Achievements",
    categoryLabel: "Achievements",
    caption: "MCA scholars holding the overall championship trophy won at state-level computational competitions.",
    themeColor: "#B89528",
    icon: "fa-trophy"
  },
  {
    id: "gal-09",
    title: "MCA Smart Audio-Visual Seminar Hall",
    category: "Department",
    categoryLabel: "Department",
    caption: "Acoustically treated multimedia seminar hall equipped with interactive projection and video conferencing facilities.",
    themeColor: "#071228",
    icon: "fa-display"
  }
];

let activeGalleryCategory = "all";
let currentLightboxIndex = 0;
let currentVisibleGalleryItems = [...mcaGalleryItems];

/**
 * Generate an elegant academic-technology SVG visual card for the gallery item
 */
function generateGalleryVisualSVG(item) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%" class="gallery-card-svg" role="img" aria-label="${item.title}">
      <defs>
        <linearGradient id="grad-${item.id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${item.themeColor}" />
          <stop offset="60%" stop-color="#071228" />
          <stop offset="100%" stop-color="#020817" />
        </linearGradient>
        <pattern id="grid-${item.id}" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 180, 216, 0.08)" stroke-width="1"/>
        </pattern>
        <radialGradient id="glow-${item.id}" cx="70%" cy="30%" r="60%">
          <stop offset="0%" stop-color="rgba(0, 180, 216, 0.25)" />
          <stop offset="100%" stop-color="rgba(0, 180, 216, 0)" />
        </radialGradient>
      </defs>
      
      <!-- Background & Patterns -->
      <rect width="800" height="600" fill="url(#grad-${item.id})" />
      <rect width="800" height="600" fill="url(#grid-${item.id})" />
      <circle cx="600" cy="200" r="300" fill="url(#glow-${item.id})" />
      
      <!-- Decorative Digital Graphic Nodes -->
      <g stroke="rgba(56, 189, 248, 0.25)" stroke-width="1.5">
        <line x1="120" y1="180" x2="280" y2="280" />
        <line x1="280" y1="280" x2="480" y2="220" />
        <line x1="480" y1="220" x2="680" y2="340" />
        <line x1="280" y1="280" x2="350" y2="440" />
      </g>
      <circle cx="120" cy="180" r="6" fill="#38BDF8" />
      <circle cx="280" cy="280" r="8" fill="#00E5FF" />
      <circle cx="480" cy="220" r="6" fill="#38BDF8" />
      <circle cx="680" cy="340" r="9" fill="#00E5FF" />
      <circle cx="350" cy="440" r="7" fill="#38BDF8" />

      <!-- Department Emblem Watermark -->
      <text x="50" y="80" font-family="'Outfit', sans-serif" font-size="20" font-weight="800" fill="#CBD5E1" letter-spacing="3">G.T.N. ARTS COLLEGE</text>
      <text x="50" y="110" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" fill="#38BDF8" letter-spacing="2">DEPT OF COMPUTER APPLICATIONS</text>

      <!-- Center Title and Category Indicator -->
      <rect x="50" y="440" width="130" height="30" rx="15" fill="rgba(0, 180, 216, 0.2)" stroke="rgba(0, 180, 216, 0.4)" stroke-width="1"/>
      <text x="115" y="460" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#E0F7FA" text-anchor="middle">${item.categoryLabel.toUpperCase()}</text>
      
      <text x="50" y="520" font-family="'Outfit', sans-serif" font-size="28" font-weight="700" fill="#FFFFFF">${item.title}</text>
    </svg>
  `;
}

/**
 * Render Gallery cards into container
 */
function renderGallery(containerId = "gallery-grid-container") {
  const container = document.getElementById(containerId);
  if (!container) return;

  currentVisibleGalleryItems = mcaGalleryItems.filter(item => {
    return activeGalleryCategory === "all" || item.category.toLowerCase() === activeGalleryCategory.toLowerCase();
  });

  if (currentVisibleGalleryItems.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background: #FFFFFF; border-radius: 12px; border: 1px dashed #CBD5E1;">
        <i class="fa-solid fa-images" style="font-size: 2.5rem; color: #94A3B8; margin-bottom: 1rem;"></i>
        <h4 style="color: #0F172A; margin-bottom: 0.5rem;">No items in this gallery section</h4>
        <p style="color: #64748B; font-size: 0.95rem;">Select another category or view all gallery items.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = currentVisibleGalleryItems.map((item, index) => `
    <article class="gallery-card" onclick="openLightbox(${index})" tabindex="0" role="button" aria-label="View ${item.title} in lightbox" onkeydown="if(event.key==='Enter'||event.key===' ')openLightbox(${index})">
      ${generateGalleryVisualSVG(item)}
      <div class="gallery-overlay">
        <span class="gallery-category-tag">${item.categoryLabel}</span>
        <h3 class="gallery-caption">${item.title}</h3>
      </div>
    </article>
  `).join('');
}

/**
 * Render preview of gallery on home page
 */
function renderHomeGalleryPreview(containerId = "home-gallery-grid") {
  const container = document.getElementById(containerId);
  if (!container) return;

  const previewItems = mcaGalleryItems.slice(0, 6);
  container.innerHTML = previewItems.map((item, index) => `
    <article class="gallery-card" onclick="openHomePreviewLightbox(${index})" tabindex="0" role="button" aria-label="View ${item.title}">
      ${generateGalleryVisualSVG(item)}
      <div class="gallery-overlay">
        <span class="gallery-category-tag">${item.categoryLabel}</span>
        <h4 class="gallery-caption">${item.title}</h4>
      </div>
    </article>
  `).join('');
}

/**
 * Lightbox Controls
 */
function openLightbox(index) {
  currentLightboxIndex = index;
  updateLightboxContent();

  const lightbox = document.getElementById("gallery-lightbox-modal");
  if (lightbox) {
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function openHomePreviewLightbox(index) {
  currentVisibleGalleryItems = mcaGalleryItems.slice(0, 6);
  openLightbox(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("gallery-lightbox-modal");
  if (lightbox) {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function navigateLightbox(direction) {
  if (currentVisibleGalleryItems.length === 0) return;
  currentLightboxIndex = (currentLightboxIndex + direction + currentVisibleGalleryItems.length) % currentVisibleGalleryItems.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const item = currentVisibleGalleryItems[currentLightboxIndex];
  if (!item) return;

  const imgContainer = document.getElementById("lightbox-image-target");
  const captionEl = document.getElementById("lightbox-caption-target");
  const counterEl = document.getElementById("lightbox-counter-target");
  const catEl = document.getElementById("lightbox-cat-target");

  if (imgContainer) {
    imgContainer.innerHTML = generateGalleryVisualSVG(item);
  }
  if (captionEl) {
    captionEl.textContent = `${item.title} — ${item.caption}`;
  }
  if (counterEl) {
    counterEl.textContent = `${currentLightboxIndex + 1} of ${currentVisibleGalleryItems.length}`;
  }
  if (catEl) {
    catEl.textContent = item.categoryLabel;
  }
}

/**
 * Setup Category Filter Buttons & Keyboard Listeners
 */
function setupGalleryUI() {
  const filterBtns = document.querySelectorAll(".gallery-filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeGalleryCategory = btn.getAttribute("data-category") || "all";
      renderGallery();
    });
  });

  // Keyboard navigation for lightbox
  window.addEventListener("keydown", (e) => {
    const lightbox = document.getElementById("gallery-lightbox-modal");
    if (!lightbox || !lightbox.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      navigateLightbox(-1);
    } else if (e.key === "ArrowRight") {
      navigateLightbox(1);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderGallery();
  renderHomeGalleryPreview();
  setupGalleryUI();
});
