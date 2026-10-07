/**
 * ==========================================================================
 * G.T.N. ARTS COLLEGE (AUTONOMOUS), DINDIGUL
 * DEPARTMENT OF MASTER OF COMPUTER APPLICATIONS (MCA)
 * ACTIVITIES CONTROLLER MODULE (js/activities.js)
 * ==========================================================================
 * Consumes verified activities from js/data/activities.js.
 * Features category filtering, student volunteer highlights, keyword search,
 * and integrated event modal exploration.
 */

let activeActivityFilter = "all";
let activeActivitySearch = "";

/**
 * Safely retrieve activities data
 */
function getActivitiesData() {
  if (typeof window !== "undefined" && window.mcaActivitiesData && Array.isArray(window.mcaActivitiesData)) {
    return window.mcaActivitiesData;
  }
  if (typeof mcaActivitiesData !== "undefined" && Array.isArray(mcaActivitiesData)) {
    return mcaActivitiesData;
  }
  return [];
}

/**
 * Filter activities by category and search
 */
function getFilteredActivities() {
  const all = getActivitiesData();

  return all.filter(item => {
    // Search query
    if (activeActivitySearch.trim() !== "") {
      const q = activeActivitySearch.toLowerCase();
      const titleMatch = item.title && item.title.toLowerCase().includes(q);
      const descMatch = item.description && item.description.toLowerCase().includes(q);
      const volMatch = Array.isArray(item.studentVolunteers) && item.studentVolunteers.some(v => v.toLowerCase().includes(q));
      const tagMatch = Array.isArray(item.tags) && item.tags.some(t => t.toLowerCase().includes(q));
      const catMatch = item.category && item.category.toLowerCase().includes(q);
      if (!titleMatch && !descMatch && !volMatch && !tagMatch && !catMatch) {
        return false;
      }
    }

    // Category filter
    if (activeActivityFilter !== "all") {
      const cat = activeActivityFilter.toLowerCase();
      if (cat === "volunteering") {
        return item.category.toLowerCase().includes("volunteer") || item.category.toLowerCase().includes("student");
      }
      if (cat === "visit") {
        return item.category.toLowerCase().includes("visit") || item.category.toLowerCase().includes("field trip");
      }
      if (cat === "industry") {
        return item.category.toLowerCase().includes("industry") || item.category.toLowerCase().includes("training");
      }
      if (cat === "social") {
        return item.category.toLowerCase().includes("social") || item.category.toLowerCase().includes("national");
      }
      if (cat === "cultural") {
        return item.category.toLowerCase().includes("cultural") || item.category.toLowerCase().includes("innovation");
      }
      return item.category.toLowerCase().includes(cat);
    }

    return true;
  });
}

/**
 * Create Activity Card HTML
 */
function createActivityCardHTML(item) {
  // Volunteers markup
  let volunteersHTML = "";
  if (Array.isArray(item.studentVolunteers) && item.studentVolunteers.length > 0) {
    volunteersHTML = `
      <div class="activity-volunteers-box">
        <div class="activity-volunteers-title">
          <i class="fa-solid fa-users-gear" aria-hidden="true"></i> Participating Student Volunteers / Delegates
        </div>
        <div class="activity-volunteers-list">
          ${item.studentVolunteers.map(v => `<span class="activity-volunteer-tag">${v}</span>`).join('')}
        </div>
      </div>
    `;
  }

  // Highlights markup
  let highlightsHTML = "";
  if (Array.isArray(item.highlights) && item.highlights.length > 0) {
    highlightsHTML = `
      <ul style="list-style: none; padding: 0; margin: 0 0 1.25rem 0; display: flex; flex-direction: column; gap: 0.35rem;">
        ${item.highlights.map(h => `
          <li style="font-size: 0.86rem; color: var(--color-text-muted); display: flex; align-items: flex-start; gap: 0.5rem;">
            <i class="fa-solid fa-check" style="color: var(--color-accent-500); font-size: 0.8rem; margin-top: 0.25rem; flex-shrink: 0;"></i>
            <span>${h}</span>
          </li>
        `).join('')}
      </ul>
    `;
  }

  // Tags chip list
  let tagsHTML = "";
  if (Array.isArray(item.tags) && item.tags.length > 0) {
    tagsHTML = `
      <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.75rem;">
        ${item.tags.map(t => `<span style="background: var(--color-bg-subtle); color: #64748B; font-family: var(--font-mono); font-size: 0.74rem; padding: 0.15rem 0.5rem; border-radius: 999px;">#${t}</span>`).join('')}
      </div>
    `;
  }

  // Schedule & Venue
  const dateText = (item.dateDisplay && item.dateDisplay !== "Information not provided") ? item.dateDisplay : (item.date || "Academic Session");
  const venueText = item.venue && item.venue !== "Information not provided" ? ` • <i class="fa-solid fa-location-dot"></i> ${item.venue}` : '';

  // Connected event trigger button
  const connectedEventBtn = item.eventId ? `
    <button class="btn btn-secondary btn-sm" onclick="triggerConnectedActivityModal('${item.eventId}')" aria-label="View connected event details">
      <i class="fa-solid fa-circle-info"></i> Event Details
    </button>
  ` : '';

  return `
    <article class="activity-card" id="${item.id}">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem; flex-wrap: wrap; gap: 0.4rem;">
        <span class="activity-badge-category">${item.category}</span>
        <span style="font-family: var(--font-mono); font-size: 0.74rem; color: #94A3B8;">${item.type || 'Department Activity'}</span>
      </div>

      <h3 class="activity-title">${item.title}</h3>
      <p class="activity-desc">${item.description}</p>

      ${volunteersHTML}
      ${highlightsHTML}
      ${tagsHTML}

      <div style="margin-top: auto; padding-top: 1.25rem; border-top: 1px solid var(--color-border-subtle); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
        <div style="font-size: 0.8rem; color: #94A3B8; font-family: var(--font-mono);">
          <i class="fa-regular fa-calendar-check"></i> ${dateText}${venueText}
        </div>
        ${connectedEventBtn}
      </div>
    </article>
  `;
}

/**
 * Render Activities on activities.html
 */
function renderActivitiesPage(containerId = "activities-container") {
  const container = document.getElementById(containerId);
  if (!container) return;

  const activities = getFilteredActivities();

  if (activities.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1.5rem; background: #FFFFFF; border-radius: var(--radius-xl); border: 1px dashed #CBD5E1;">
        <i class="fa-solid fa-shapes" style="font-size: 2.5rem; color: #CBD5E1; margin-bottom: 1rem;"></i>
        <h4 style="color: var(--color-primary-900); margin-bottom: 0.5rem;">No activities found matching criteria</h4>
        <p style="color: var(--color-text-muted); font-size: 0.92rem;">Try adjusting search terms or resetting filters.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = activities.map(createActivityCardHTML).join('');
}

/**
 * Trigger master event modal
 */
function triggerConnectedActivityModal(eventId) {
  if (typeof openEventModal === "function") {
    openEventModal(eventId);
  } else {
    window.location.href = `events.html#${eventId}`;
  }
}

/**
 * Setup Activities Filters and Search
 */
function setupActivitiesUI() {
  const searchInput = document.getElementById("activities-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      activeActivitySearch = e.target.value;
      renderActivitiesPage();
    });
  }

  const filterBtns = document.querySelectorAll(".act-filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeActivityFilter = btn.getAttribute("data-category") || "all";
      renderActivitiesPage();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderActivitiesPage();
  setupActivitiesUI();
});
