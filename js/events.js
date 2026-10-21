/**
 * ==========================================================================
 * G.T.N. ARTS COLLEGE (AUTONOMOUS), DINDIGUL
 * DEPARTMENT OF MASTER OF COMPUTER APPLICATIONS (MCA)
 * EVENTS INTERACTIVE MANAGEMENT CONTROLLER (js/events.js)
 * ==========================================================================
 * Consumes the centralized dataset from js/data/events.js.
 * Supports keyword search, category filtering, year filtering, status filtering,
 * chronological sorting, timeline grouping, and detailed accessible modal view.
 */

// Filter state
let activeSearchQuery = "";
let activeCategoryFilter = "all";
let activeYearFilter = "all";
let activeStatusFilter = "all";
let activeSortOrder = "newest"; // "newest" | "oldest"

/**
 * Safely retrieve events dataset
 */
function getEventsData() {
  if (typeof window !== "undefined" && window.mcaEventsData && Array.isArray(window.mcaEventsData)) {
    return window.mcaEventsData;
  }
  if (typeof mcaEventsData !== "undefined" && Array.isArray(mcaEventsData)) {
    return mcaEventsData;
  }
  return [];
}

/**
 * Filter & sort events
 */
function getFilteredAndSortedEvents() {
  const allEvents = getEventsData();

  // Filter
  const filtered = allEvents.filter(event => {
    // 1. Search Query
    if (activeSearchQuery.trim() !== "") {
      const q = activeSearchQuery.toLowerCase();
      const titleMatch = event.title && event.title.toLowerCase().includes(q);
      const descMatch = event.description && event.description.toLowerCase().includes(q);
      const venueMatch = event.venue && event.venue.toLowerCase().includes(q);
      const orgMatch = event.organizer && event.organizer.toLowerCase().includes(q);
      const tagMatch = Array.isArray(event.tags) && event.tags.some(t => t.toLowerCase().includes(q));
      const studentMatch = Array.isArray(event.students) && event.students.some(s => s.toLowerCase().includes(q));
      const resPersonMatch = event.resourcePerson && (
        (typeof event.resourcePerson === "string" && event.resourcePerson.toLowerCase().includes(q)) ||
        (event.resourcePerson.name && event.resourcePerson.name.toLowerCase().includes(q))
      );
      if (!titleMatch && !descMatch && !venueMatch && !orgMatch && !tagMatch && !studentMatch && !resPersonMatch) {
        return false;
      }
    }

    // 2. Category Filter
    if (activeCategoryFilter !== "all") {
      const cat = activeCategoryFilter.toLowerCase();
      const matchesMainCat = event.category && event.category.toLowerCase().includes(cat);
      const matchesMultiCats = Array.isArray(event.categories) && event.categories.some(c => c.toLowerCase().includes(cat));
      if (!matchesMainCat && !matchesMultiCats) {
        return false;
      }
    }

    // 3. Year Filter ("all", "2026", "2025", "undated")
    if (activeYearFilter !== "all") {
      if (activeYearFilter === "undated") {
        if (event.date || event.year) return false;
      } else {
        const targetYear = parseInt(activeYearFilter, 10);
        const eventYear = event.year || (event.date ? parseInt(event.date.substring(0, 4), 10) : null);
        if (eventYear !== targetYear) return false;
      }
    }

    // 4. Status Filter ("all", "completed", "ongoing", "upcoming")
    if (activeStatusFilter !== "all") {
      if (event.status.toLowerCase() !== activeStatusFilter.toLowerCase()) {
        return false;
      }
    }

    return true;
  });

  // Sort
  return filtered.sort((a, b) => {
    // Date comparison
    const dateA = a.date || (a.year ? `${a.year}-01-01` : null);
    const dateB = b.date || (b.year ? `${b.year}-01-01` : null);

    if (dateA && dateB) {
      return activeSortOrder === "newest" 
        ? dateB.localeCompare(dateA) 
        : dateA.localeCompare(dateB);
    }
    // Items with dates come before items without dates in newest order
    if (dateA && !dateB) return -1;
    if (!dateA && dateB) return 1;
    return a.title.localeCompare(b.title);
  });
}

/**
 * Determine icon and banner theme based on category
 */
function getCategoryVisualConfig(category = "") {
  const cat = category.toLowerCase();
  if (cat.includes("workshop") || cat.includes("training") || cat.includes("bootcamp")) {
    return { bannerClass: "cat-workshop", icon: "fa-solid fa-laptop-code" };
  }
  if (cat.includes("competition") || cat.includes("quiz") || cat.includes("ideathon") || cat.includes("achievement")) {
    return { bannerClass: "cat-competition", icon: "fa-solid fa-trophy" };
  }
  if (cat.includes("visit") || cat.includes("field trip")) {
    return { bannerClass: "cat-visit", icon: "fa-solid fa-industry" };
  }
  if (cat.includes("industry") || cat.includes("mou") || cat.includes("association")) {
    return { bannerClass: "cat-industry", icon: "fa-solid fa-handshake" };
  }
  if (cat.includes("social") || cat.includes("volunteer") || cat.includes("awareness")) {
    return { bannerClass: "cat-social", icon: "fa-solid fa-users" };
  }
  return { bannerClass: "cat-department", icon: "fa-solid fa-building-columns" };
}

/**
 * Format date display safely without exposing nulls
 */
function formatEventDate(event) {
  if (event.dateDisplay && event.dateDisplay !== "Information not provided") {
    return event.dateDisplay;
  }
  if (event.date) {
    const parts = event.date.split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monthIdx = parseInt(parts[1], 10) - 1;
      const day = parts[2];
      return `${monthNames[monthIdx]} ${day}, ${year}`;
    }
    return event.date;
  }
  return "Date: Information not provided";
}

/**
 * Create Event Card HTML
 */
function createEventCardHTML(event) {
  const visual = getCategoryVisualConfig(event.category);
  const formattedDate = formatEventDate(event);
  
  // Parse month and day for date badge if date available
  let dateBadgeHTML = "";
  if (event.date) {
    const parts = event.date.split('-');
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const monthStr = monthNames[parseInt(parts[1], 10) - 1] || "DATE";
    const dayStr = parts[2] || "--";
    dateBadgeHTML = `
      <div class="event-date-badge">
        <span class="event-date-month">${monthStr}</span>
        <span class="event-date-day">${dayStr}</span>
      </div>
    `;
  } else if (event.year) {
    dateBadgeHTML = `
      <div class="event-date-badge">
        <span class="event-date-month">YEAR</span>
        <span class="event-date-day" style="font-size:0.95rem;">${event.year}</span>
      </div>
    `;
  } else {
    dateBadgeHTML = `
      <div class="event-date-badge" style="padding: 0.35rem 0.5rem;">
        <span class="event-date-month" style="font-size:0.65rem;">DATE</span>
        <span class="event-date-day" style="font-size:0.75rem; color:#64748B;">N/A</span>
      </div>
    `;
  }

  // Status badge markup
  let statusBadgeHTML = "";
  if (event.status === "completed") {
    statusBadgeHTML = `<span class="badge badge-status-completed"><i class="fa-solid fa-check" aria-hidden="true"></i> COMPLETED</span>`;
  } else if (event.status === "ongoing") {
    statusBadgeHTML = `<span class="badge badge-status-ongoing"><i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> ONGOING</span>`;
  } else {
    statusBadgeHTML = `<span class="badge badge-status-upcoming"><i class="fa-regular fa-clock" aria-hidden="true"></i> UPCOMING</span>`;
  }

  // Achievement badge if present
  let achievementBadgeHTML = "";
  if (event.achievement) {
    achievementBadgeHTML = `<span class="badge badge-gold" style="font-size: 0.72rem; margin-top: 0.35rem;"><i class="fa-solid fa-award"></i> ${event.achievement}</span>`;
  } else if (event.winners && event.winners.length > 0) {
    achievementBadgeHTML = `<span class="badge badge-gold" style="font-size: 0.72rem; margin-top: 0.35rem;"><i class="fa-solid fa-trophy"></i> Prize Winning</span>`;
  }

  // Metadata items (venue, time, organizer)
  let venueHTML = event.venue ? `
    <div class="event-meta-item">
      <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
      <span>${event.venue}</span>
    </div>
  ` : '';

  let timeHTML = (event.time || event.startTime) ? `
    <div class="event-meta-item">
      <i class="fa-regular fa-clock" aria-hidden="true"></i>
      <span>${event.time || event.startTime}</span>
    </div>
  ` : '';

  let organizerHTML = event.organizer ? `
    <div class="event-meta-item">
      <i class="fa-solid fa-landmark" aria-hidden="true"></i>
      <span style="font-size:0.8rem;">${event.organizer}</span>
    </div>
  ` : '';

  // Short snippet of description
  const shortDesc = event.description.length > 155
    ? event.description.substring(0, 152) + "..."
    : event.description;

  // Footer status indicator (past/completed events NEVER show register/apply buttons)
  let footerStatusLabel = "COMPLETED";
  if (event.status === "ongoing") footerStatusLabel = "ONGOING INITIATIVE";
  else if (event.status === "upcoming") footerStatusLabel = "UPCOMING SCHEDULE";
  else if (event.achievement || (event.winners && event.winners.length > 0)) footerStatusLabel = "ACHIEVEMENT";

  const eventBannerImageHTML = (event.image && event.image !== "assets/images/placeholder.jpg")
    ? `<img src="${event.image}" alt="${event.title}" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.85; z-index: 1;" onerror="this.remove();">`
    : '';

  return `
    <article class="event-card" id="${event.id}">
      <div class="event-card-banner ${visual.bannerClass}" style="position: relative; overflow: hidden;">
        ${eventBannerImageHTML}
        ${dateBadgeHTML}
        <span class="event-cat-badge" style="z-index: 2;">${event.category}</span>
        <div class="event-banner-art" aria-hidden="true" style="z-index: 2;">
          <i class="${visual.icon}"></i>
        </div>
      </div>
      <div class="event-body">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 0.5rem; gap:0.5rem; flex-wrap:wrap;">
          ${statusBadgeHTML}
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-accent-600); font-weight: 600;">
            <i class="fa-regular fa-calendar-days"></i> ${formattedDate}
          </span>
        </div>
        ${achievementBadgeHTML}
        <h3 class="event-title" style="margin-top: 0.4rem;">${event.title}</h3>
        <div class="event-meta">
          ${timeHTML}
          ${venueHTML}
          ${organizerHTML}
        </div>
        <p class="event-description">${shortDesc}</p>
        <div class="event-footer">
          <button class="btn btn-secondary btn-sm" onclick="openEventModal('${event.id}')" aria-label="View details for ${event.title}">
            <i class="fa-solid fa-circle-info" aria-hidden="true"></i> View Details
          </button>
          <span class="badge" style="background:var(--color-bg-subtle); color:var(--color-text-muted); font-size: 0.72rem; font-family: var(--font-mono);">
            ${footerStatusLabel}
          </span>
        </div>
      </div>
    </article>
  `;
}

/**
 * Render Events into main grid container with Year / Undated grouping support
 */
function renderEvents(containerId = "events-grid-container") {
  const container = document.getElementById(containerId);
  if (!container) return;

  const events = getFilteredAndSortedEvents();

  if (events.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1.5rem; background: #FFFFFF; border-radius: var(--radius-xl); border: 1px dashed #CBD5E1; box-shadow: var(--shadow-sm);">
        <i class="fa-solid fa-calendar-xmark" style="font-size: 3rem; color: #94A3B8; margin-bottom: 1rem;"></i>
        <h3 style="color: var(--color-primary-900); margin-bottom: 0.5rem; font-size: 1.35rem;">No Events Match Your Filters</h3>
        <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 1.5rem; max-width: 500px; margin-left: auto; margin-right: auto;">
          Try adjusting your search keywords, clearing status filters, or selecting "All Categories" or "All Years".
        </p>
        <button class="btn btn-secondary btn-sm" onclick="resetEventFilters()">
          <i class="fa-solid fa-rotate-left"></i> Reset All Filters
        </button>
      </div>
    `;
    return;
  }

  // If specific filters are active or search query is present, render flat sorted grid
  const isFilteredView = activeSearchQuery.trim() !== "" || 
                         activeCategoryFilter !== "all" || 
                         activeYearFilter !== "all" || 
                         activeStatusFilter !== "all";

  if (isFilteredView) {
    container.innerHTML = events.map(createEventCardHTML).join('');
    return;
  }

  // When browsing all records in default view: group into 2026, 2025, and Date Not Available
  const events2026 = events.filter(e => e.year === 2026 || (e.date && e.date.startsWith("2026")));
  const events2025 = events.filter(e => e.year === 2025 || (e.date && e.date.startsWith("2025")));
  const undatedEvents = events.filter(e => !e.date && !e.year);

  let html = "";

  if (events2026.length > 0) {
    html += `
      <div style="grid-column: 1 / -1;" class="timeline-section-heading">
        <div class="timeline-year-label">
          <i class="fa-solid fa-calendar-day" style="color: var(--color-primary-600);"></i>
          Academic Year 2026 Events & Programmes
        </div>
        <span class="timeline-count-badge">${events2026.length} Records</span>
      </div>
      ${events2026.map(createEventCardHTML).join('')}
    `;
  }

  if (events2025.length > 0) {
    html += `
      <div style="grid-column: 1 / -1;" class="timeline-section-heading">
        <div class="timeline-year-label">
          <i class="fa-solid fa-calendar-day" style="color: var(--color-accent-600);"></i>
          Academic Year 2025 Events & Programmes
        </div>
        <span class="timeline-count-badge">${events2025.length} Records</span>
      </div>
      ${events2025.map(createEventCardHTML).join('')}
    `;
  }

  if (undatedEvents.length > 0) {
    html += `
      <div style="grid-column: 1 / -1;" class="timeline-section-heading">
        <div class="timeline-year-label" style="color: #475569;">
          <i class="fa-solid fa-circle-question" style="color: #94A3B8;"></i>
          Department Records & Achievements (Date Not Available)
        </div>
        <span class="timeline-count-badge" style="background:#E2E8F0; color:#475569;">${undatedEvents.length} Records</span>
      </div>
      ${undatedEvents.map(createEventCardHTML).join('')}
    `;
  }

  container.innerHTML = html;
}

/**
 * Render homepage preview with authentic latest events
 */
function renderHomeEventsPreview(containerId = "home-events-grid") {
  const container = document.getElementById(containerId);
  if (!container) return;

  const allEvents = getEventsData();
  
  // Select 3 premier showcase events across categories
  // 1. Association Inauguration & MoU (Oct 2026)
  // 2. FUTURE 6.0 Ecoloop (Ongoing innovation)
  // 3. IoT Bootcamp (Feb 2026)
  const previewIds = [
    "evt-26-mou-mahix-infotech",
    "evt-23-future-6",
    "evt-09-iot-bootcamp"
  ];

  let previewEvents = allEvents.filter(e => previewIds.includes(e.id));
  if (previewEvents.length < 3) {
    previewEvents = allEvents.slice(0, 3);
  }

  container.innerHTML = previewEvents.map(createEventCardHTML).join('');
}

/**
 * Open Accessible Event Modal with comprehensive detail fields
 */
function openEventModal(eventId) {
  const allEvents = getEventsData();
  const event = allEvents.find(e => e.id === eventId);
  if (!event) return;

  const modalOverlay = document.getElementById("event-detail-modal");
  if (!modalOverlay) return;

  // Header
  const titleEl = document.getElementById("modal-event-title");
  const catEl = document.getElementById("modal-event-category");
  if (titleEl) titleEl.textContent = event.title;
  if (catEl) {
    catEl.textContent = event.category;
    catEl.className = "badge badge-cyan";
  }

  // Body container
  const modalBody = modalOverlay.querySelector(".modal-body");
  if (!modalBody) return;

  const formattedDate = formatEventDate(event);

  // Status Badge
  let statusBadgeHTML = "";
  if (event.status === "completed") {
    statusBadgeHTML = `<span class="badge badge-status-completed"><i class="fa-solid fa-check"></i> COMPLETED</span>`;
  } else if (event.status === "ongoing") {
    statusBadgeHTML = `<span class="badge badge-status-ongoing"><i class="fa-solid fa-spinner fa-spin"></i> ONGOING</span>`;
  } else {
    statusBadgeHTML = `<span class="badge badge-status-upcoming"><i class="fa-regular fa-clock"></i> UPCOMING</span>`;
  }

  // Meta Grid items (omit empty/null fields)
  let metaItemsHTML = "";
  metaItemsHTML += `
    <div class="modal-meta-item">
      <i class="fa-regular fa-calendar-days"></i>
      <div><strong>Date:</strong> <div>${formattedDate}</div></div>
    </div>
  `;

  if (event.time || event.startTime) {
    metaItemsHTML += `
      <div class="modal-meta-item">
        <i class="fa-regular fa-clock"></i>
        <div><strong>Time:</strong> <div>${event.time || event.startTime}</div></div>
      </div>
    `;
  }

  if (event.venue) {
    metaItemsHTML += `
      <div class="modal-meta-item">
        <i class="fa-solid fa-location-dot"></i>
        <div><strong>Venue:</strong> <div>${event.venue}</div></div>
      </div>
    `;
  }

  if (event.organizer) {
    metaItemsHTML += `
      <div class="modal-meta-item">
        <i class="fa-solid fa-building-columns"></i>
        <div><strong>Organizer:</strong> <div>${event.organizer}</div></div>
      </div>
    `;
  }

  // Resource Person / Chief Guests
  if (event.resourcePerson) {
    const rpText = typeof event.resourcePerson === "string" 
      ? event.resourcePerson 
      : `${event.resourcePerson.name || ''} ${event.resourcePerson.designation ? '— ' + event.resourcePerson.designation : ''} ${event.resourcePerson.organization || event.resourcePerson.institution ? '(' + (event.resourcePerson.organization || event.resourcePerson.institution) + ')' : ''}`;
    metaItemsHTML += `
      <div class="modal-meta-item" style="grid-column: 1 / -1;">
        <i class="fa-solid fa-user-tie"></i>
        <div><strong>Resource Person:</strong> <div>${rpText}</div></div>
      </div>
    `;
  }

  if (event.chiefGuests && event.chiefGuests.length > 0) {
    const guestsList = event.chiefGuests.map(g => `${g.name} (${g.title})`).join("; ");
    metaItemsHTML += `
      <div class="modal-meta-item" style="grid-column: 1 / -1;">
        <i class="fa-solid fa-users-viewfinder"></i>
        <div><strong>Chief Guests:</strong> <div>${guestsList}</div></div>
      </div>
    `;
  }

  if (event.chiefGuest) {
    metaItemsHTML += `
      <div class="modal-meta-item" style="grid-column: 1 / -1;">
        <i class="fa-solid fa-user-tie"></i>
        <div><strong>Chief Guest:</strong> <div>${event.chiefGuest.name} — ${event.chiefGuest.designation || ''} (${event.chiefGuest.organization || ''})</div></div>
      </div>
    `;
  }

  if (event.participants) {
    metaItemsHTML += `
      <div class="modal-meta-item">
        <i class="fa-solid fa-users"></i>
        <div><strong>Participants:</strong> <div>${event.participants}</div></div>
      </div>
    `;
  }

  if (event.industryPartner) {
    metaItemsHTML += `
      <div class="modal-meta-item">
        <i class="fa-solid fa-handshake"></i>
        <div><strong>Industry Partner:</strong> <div>${event.industryPartner}</div></div>
      </div>
    `;
  }

  if (event.partners && event.partners.length > 0) {
    metaItemsHTML += `
      <div class="modal-meta-item" style="grid-column: 1 / -1;">
        <i class="fa-solid fa-handshake"></i>
        <div><strong>Collaborating Partners:</strong> <div>${event.partners.join(', ')}</div></div>
      </div>
    `;
  }

  // Objective section
  let objectiveHTML = "";
  if (event.objective) {
    objectiveHTML = `
      <div style="background: #F8FAFC; border-left: 3px solid var(--color-accent-500); padding: 0.85rem 1.15rem; border-radius: 0 8px 8px 0; margin-bottom: 1.25rem;">
        <strong style="color: var(--color-primary-900); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em;">Objective:</strong>
        <p style="margin: 0.35rem 0 0 0; font-size: 0.92rem; color: var(--color-text-main);">${event.objective}</p>
      </div>
    `;
  }

  // Highlights section
  let highlightsHTML = "";
  if (Array.isArray(event.highlights) && event.highlights.length > 0) {
    highlightsHTML = `
      <h4 class="modal-section-title"><i class="fa-solid fa-star" style="color:var(--color-gold-600);"></i> Key Highlights & Outcomes</h4>
      <ul class="modal-highlights-list">
        ${event.highlights.map(h => `<li><i class="fa-solid fa-circle-check"></i> <span>${h}</span></li>`).join('')}
      </ul>
    `;
  }

  // Accolades / Winners / Achievements section
  let awardsHTML = "";
  if (event.achievement) {
    awardsHTML += `
      <div class="modal-accolade-box">
        <div style="display: flex; align-items: center; gap: 0.6rem; color: #92400E; font-weight: 700; margin-bottom: 0.35rem;">
          <i class="fa-solid fa-trophy" style="font-size: 1.25rem;"></i>
          <span>${event.achievementType ? event.achievementType.toUpperCase() : 'ACHIEVEMENT HONORS'}</span>
        </div>
        <p style="margin: 0; font-size: 0.92rem; color: #78350F;">${event.achievement}</p>
      </div>
    `;
  }

  if (Array.isArray(event.winners) && event.winners.length > 0) {
    awardsHTML += `
      <div class="modal-accolade-box">
        <div style="display: flex; align-items: center; gap: 0.6rem; color: #92400E; font-weight: 700; margin-bottom: 0.5rem;">
          <i class="fa-solid fa-medal" style="font-size: 1.25rem;"></i>
          <span>COMPETITION RESULTS & WINNERS</span>
        </div>
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.35rem;">
          ${event.winners.map(w => `
            <li style="font-size: 0.9rem; color: #78350F;">
              <strong>${w.title}:</strong> ${w.recipient || w.team || w.name || ''}
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }

  if (Array.isArray(event.awards) && event.awards.length > 0) {
    awardsHTML += `
      <div class="modal-accolade-box">
        <div style="display: flex; align-items: center; gap: 0.6rem; color: #92400E; font-weight: 700; margin-bottom: 0.5rem;">
          <i class="fa-solid fa-award" style="font-size: 1.25rem;"></i>
          <span>ANNUAL DAY CITATIONS</span>
        </div>
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.35rem;">
          ${event.awards.map(a => `
            <li style="font-size: 0.9rem; color: #78350F;">
              <strong>${a.category}:</strong> ${a.recipient}
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }

  // Student Volunteers / Delegates
  let studentsHTML = "";
  if (Array.isArray(event.studentVolunteers) && event.studentVolunteers.length > 0) {
    studentsHTML = `
      <h4 class="modal-section-title"><i class="fa-solid fa-user-group" style="color:var(--color-accent-600);"></i> Student Volunteers</h4>
      <div class="activity-volunteers-list" style="margin-bottom: 1.25rem;">
        ${event.studentVolunteers.map(s => `<span class="activity-volunteer-tag">${s}</span>`).join('')}
      </div>
    `;
  } else if (Array.isArray(event.students) && event.students.length > 0) {
    studentsHTML = `
      <h4 class="modal-section-title"><i class="fa-solid fa-user-graduate" style="color:var(--color-accent-600);"></i> Student Representatives & Participants</h4>
      <div class="activity-volunteers-list" style="margin-bottom: 1.25rem;">
        ${event.students.map(s => `<span class="activity-volunteer-tag">${s}</span>`).join('')}
      </div>
    `;
  }

  // Innovation / Track details (e.g. FUTURE 6.0)
  let innovationHTML = "";
  if (event.track || event.innovation) {
    innovationHTML = `
      <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.25rem;">
        <div style="color: #065F46; font-weight: 700; margin-bottom: 0.4rem; font-size: 0.92rem;">
          <i class="fa-solid fa-lightbulb"></i> INNOVATION PROTOTYPE DETAILS
        </div>
        ${event.track ? `<div style="font-size:0.88rem; color:#064E3B;"><strong>Track:</strong> ${event.track}</div>` : ''}
        ${event.challenge ? `<div style="font-size:0.88rem; color:#064E3B;"><strong>Challenge:</strong> ${event.challenge}</div>` : ''}
        ${event.innovation ? `<div style="font-size:0.88rem; color:#064E3B;"><strong>Concept:</strong> ${event.innovation}</div>` : ''}
      </div>
    `;
  }

  // Tags chip list
  let tagsHTML = "";
  if (Array.isArray(event.tags) && event.tags.length > 0) {
    tagsHTML = `
      <div class="modal-tags-list">
        ${event.tags.map(t => `<span class="modal-tag-chip">#${t}</span>`).join('')}
      </div>
    `;
  }

  // Registration URL reference (if present, shown as info note, never active registration button for completed events)
  let regNoticeHTML = "";
  if (event.registrationUrl) {
    regNoticeHTML = `
      <div style="margin-top: 1.25rem; padding: 0.75rem 1rem; background: var(--color-bg-subtle); border-radius: 6px; font-size: 0.82rem; color: var(--color-text-muted);">
        <i class="fa-solid fa-link"></i> <strong>Archived Registration Reference:</strong> 
        <span style="font-family: var(--font-mono); word-break: break-all;">${event.registrationUrl}</span> 
        <em>(Concluded event — registration archived)</em>
      </div>
    `;
  }

  // Inject content
  modalBody.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1.25rem; gap:1rem; flex-wrap:wrap;">
      ${statusBadgeHTML}
      <span style="font-family:var(--font-mono); font-size:0.82rem; color:var(--color-accent-600); font-weight:600;">
        ${event.category}
      </span>
    </div>

    <div class="modal-meta-grid">
      ${metaItemsHTML}
    </div>

    ${objectiveHTML}
    ${innovationHTML}

    <h4 class="modal-section-title"><i class="fa-solid fa-file-lines" style="color:var(--color-primary-600);"></i> Programme Overview</h4>
    <p style="line-height: 1.7; color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 1.25rem;">
      ${event.description}
    </p>

    ${highlightsHTML}
    ${awardsHTML}
    ${studentsHTML}
    ${regNoticeHTML}
    ${tagsHTML}
  `;

  // Update modal footer
  const modalFooter = modalOverlay.querySelector(".modal-footer");
  if (modalFooter) {
    modalFooter.innerHTML = `
      <button class="btn btn-secondary btn-sm" onclick="closeEventModal()">
        <i class="fa-solid fa-xmark"></i> Close
      </button>
      <span class="badge" style="background:#F1F5F9; color:#475569; font-family:var(--font-mono); font-size:0.75rem; padding:0.4rem 0.85rem;">
        ${event.status.toUpperCase()} EVENT
      </span>
    `;
  }

  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

/**
 * Close Event Modal
 */
function closeEventModal() {
  const modalOverlay = document.getElementById("event-detail-modal");
  if (modalOverlay) {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

/**
 * Reset all event filters
 */
function resetEventFilters() {
  activeSearchQuery = "";
  activeCategoryFilter = "all";
  activeYearFilter = "all";
  activeStatusFilter = "all";
  activeSortOrder = "newest";

  const searchInput = document.getElementById("events-search-input");
  if (searchInput) searchInput.value = "";

  const sortSelect = document.getElementById("events-sort-select");
  if (sortSelect) sortSelect.value = "newest";

  document.querySelectorAll(".event-cat-filter-btn").forEach(btn => {
    if (btn.getAttribute("data-category") === "all") btn.classList.add("active");
    else btn.classList.remove("active");
  });

  document.querySelectorAll(".event-year-filter-btn").forEach(btn => {
    if (btn.getAttribute("data-year") === "all") btn.classList.add("active");
    else btn.classList.remove("active");
  });

  document.querySelectorAll(".event-status-filter-btn").forEach(btn => {
    if (btn.getAttribute("data-status") === "all") btn.classList.add("active");
    else btn.classList.remove("active");
  });

  renderEvents();
}

/**
 * Setup Event UI event listeners
 */
function setupEventsUI() {
  // Search Input
  const searchInput = document.getElementById("events-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      activeSearchQuery = e.target.value;
      renderEvents();
    });
  }

  // Category Filter Buttons
  const catButtons = document.querySelectorAll(".event-cat-filter-btn");
  catButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      catButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategoryFilter = btn.getAttribute("data-category") || "all";
      renderEvents();
    });
  });

  // Year Filter Buttons
  const yearButtons = document.querySelectorAll(".event-year-filter-btn");
  yearButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      yearButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeYearFilter = btn.getAttribute("data-year") || "all";
      renderEvents();
    });
  });

  // Status Filter Buttons
  const statusButtons = document.querySelectorAll(".event-status-filter-btn");
  statusButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      statusButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeStatusFilter = btn.getAttribute("data-status") || "all";
      renderEvents();
    });
  });

  // Sort Dropdown
  const sortSelect = document.getElementById("events-sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      activeSortOrder = e.target.value;
      renderEvents();
    });
  }

  // Close modal on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeEventModal();
  });

  // Close modal on backdrop click
  const modalOverlay = document.getElementById("event-detail-modal");
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeEventModal();
    });
  }
}

async function syncEventsFromAPI() {
  if (typeof fetch === 'undefined') return;
  try {
    let res;
    try {
      res = await fetch('/api/events');
      if (!res.ok) throw new Error('status ' + res.status);
    } catch (e) {
      if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
        res = await fetch('http://localhost:5000/api/events');
      } else {
        throw e;
      }
    }
    if (res && res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        if (typeof window !== 'undefined') {
          window.mcaEventsData = data.data;
        }
        renderEvents();
        renderHomeEventsPreview();
      }
    }
  } catch (e) {
    // Graceful fallback to static array
  }
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  renderEvents();
  renderHomeEventsPreview();
  setupEventsUI();
  syncEventsFromAPI();
});

// Real-time synchronization when admin saves changes
if (typeof window !== "undefined") {
  try {
    if (typeof BroadcastChannel !== "undefined") {
      const ch = new BroadcastChannel("mca_sync_channel");
      ch.onmessage = (e) => {
        if (!e.data || !e.data.entity || e.data.entity === "events") {
          syncEventsFromAPI();
        }
      };
    }
  } catch (e) {}

  window.addEventListener("storage", (e) => {
    if (e.key === "mca_live_update_timestamp") {
      syncEventsFromAPI();
    }
  });
}

