/**
 * ==========================================================================
 * G.T.N. ARTS COLLEGE (AUTONOMOUS), DINDIGUL
 * DEPARTMENT OF MASTER OF COMPUTER APPLICATIONS (MCA)
 * ACHIEVEMENTS CONTROLLER & DYNAMIC VIEW MODULE (js/achievements.js)
 * ==========================================================================
 * Consumes verified data from js/data/achievements.js.
 * Renders visually distinct achievement cards with distinct styling,
 * icon crests, recipient highlights, and modal integrations.
 */

let activeAchievementFilter = "all";

/**
 * Safely retrieve achievements data
 */
function getAchievementsData() {
  if (typeof window !== "undefined" && window.mcaAchievementsData && Array.isArray(window.mcaAchievementsData)) {
    return window.mcaAchievementsData;
  }
  if (typeof mcaAchievementsData !== "undefined" && Array.isArray(mcaAchievementsData)) {
    return mcaAchievementsData;
  }
  return [];
}

/**
 * Map achievement item to distinct visual styles
 */
function getAchievementCardClass(item) {
  if (item.type === "trophy") return "achievement-card trophy-winner";
  if (item.type === "national") return "achievement-card national-honor";
  if (item.status === "ongoing") return "achievement-card ongoing-honor";
  return "achievement-card";
}

/**
 * Create Distinct Achievement Card HTML
 */
function createAchievementCardHTML(item) {
  const cardClass = getAchievementCardClass(item);
  const badgeColor = item.badgeType || "gold";

  // Determine icon
  let iconClass = "fa-solid fa-trophy";
  if (item.type === "national") iconClass = "fa-solid fa-flag";
  else if (item.type === "innovation") iconClass = "fa-solid fa-lightbulb";
  else if (item.type === "cultural") iconClass = "fa-solid fa-music";
  else if (item.type === "award") iconClass = "fa-solid fa-award";
  else if (item.badge && item.badge.includes("PRIZE")) iconClass = "fa-solid fa-medal";

  // Recipient label
  let recipientLabel = item.recipient;
  if (item.studentClass) {
    recipientLabel += ` (${item.studentClass})`;
  }

  // Highlights markup
  let highlightsHTML = "";
  if (Array.isArray(item.highlights) && item.highlights.length > 0) {
    highlightsHTML = `
      <ul class="achievement-highlights-list">
        ${item.highlights.map(h => `<li><i class="fa-solid fa-circle-check"></i> <span>${h}</span></li>`).join('')}
      </ul>
    `;
  }

  // Multi-recipient award list (e.g. Annual Day Awards)
  let awardListHTML = "";
  if (Array.isArray(item.awardList) && item.awardList.length > 0) {
    awardListHTML = `
      <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 0.85rem 1rem; margin-bottom: 1.25rem;">
        <div style="font-size: 0.78rem; font-weight: 700; color: #475569; text-transform: uppercase; margin-bottom: 0.5rem; letter-spacing: 0.05em;">
          Award Categories & Honorees:
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.4rem;">
          ${item.awardList.map(a => `
            <div style="font-size: 0.86rem; color: var(--color-primary-900); display: flex; align-items: flex-start; gap: 0.45rem;">
              <i class="fa-solid fa-medal" style="color: var(--color-gold-600); font-size: 0.75rem; margin-top: 0.25rem;"></i>
              <div><strong>${a.award}:</strong> <span style="color: var(--color-accent-600); font-weight: 600;">${a.name}</span></div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Team members markup (e.g. FUTURE 6.0)
  let teamMembersHTML = "";
  if (Array.isArray(item.teamMembers) && item.teamMembers.length > 0) {
    teamMembersHTML = `
      <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; padding: 0.75rem 1rem; margin-bottom: 1.25rem;">
        <div style="font-size: 0.78rem; font-weight: 700; color: #065F46; text-transform: uppercase; margin-bottom: 0.4rem; letter-spacing: 0.05em;">
          <i class="fa-solid fa-users"></i> Team GTN YUVA Delegation:
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
          ${item.teamMembers.map(m => `<span style="background:#FFFFFF; border:1px solid #86EFAC; padding:0.15rem 0.5rem; border-radius:999px; font-size:0.78rem; color:#064E3B;">${m}</span>`).join('')}
        </div>
      </div>
    `;
  }

  // Status & Date info
  const dateStr = (item.dateDisplay && item.dateDisplay !== "Information not provided") ? item.dateDisplay : (item.date || "Academic Session 2025–2026");
  const venueStr = item.venue ? ` • <i class="fa-solid fa-location-dot"></i> ${item.venue}` : '';

  // Connected event trigger button
  const connectedEventBtn = item.eventId ? `
    <button class="btn btn-secondary btn-sm" onclick="triggerConnectedEventModal('${item.eventId}')" aria-label="View connected event details">
      <i class="fa-solid fa-circle-info"></i> Event Details
    </button>
  ` : '';

  return `
    <article class="${cardClass}" id="${item.id}">
      <div class="achievement-topbar">
        <div class="achievement-icon-wrap ${badgeColor}">
          <i class="${iconClass}" aria-hidden="true"></i>
        </div>
        <span class="achievement-badge-pill ${badgeColor}">
          <i class="fa-solid fa-star"></i> ${item.badge}
        </span>
      </div>

      <h3 class="achievement-title">${item.title}</h3>

      <div class="achievement-recipient-box">
        <strong>Honoree / Recipient:</strong> ${recipientLabel}
      </div>

      <p class="achievement-desc">${item.description}</p>

      ${awardListHTML}
      ${teamMembersHTML}
      ${highlightsHTML}

      <div style="margin-top: auto; padding-top: 1.25rem; border-top: 1px solid var(--color-border-subtle); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
        <div style="font-size: 0.8rem; color: #94A3B8; font-family: var(--font-mono);">
          <i class="fa-regular fa-calendar-check"></i> ${dateStr}${venueStr}
        </div>
        ${connectedEventBtn}
      </div>
    </article>
  `;
}

/**
 * Filter achievements by category
 */
function getFilteredAchievements() {
  const all = getAchievementsData();
  if (activeAchievementFilter === "all") return all;

  return all.filter(item => {
    if (activeAchievementFilter === "competition") {
      return item.type === "trophy" || item.type === "prize" || (item.category && item.category.toLowerCase().includes("competition"));
    }
    if (activeAchievementFilter === "national") {
      return item.type === "national" || (item.category && item.category.toLowerCase().includes("national"));
    }
    if (activeAchievementFilter === "institutional") {
      return item.type === "award" || (item.category && item.category.toLowerCase().includes("institutional"));
    }
    if (activeAchievementFilter === "innovation") {
      return item.type === "innovation" || item.type === "cultural" || item.status === "ongoing";
    }
    return true;
  });
}

/**
 * Render Achievements on achievements.html
 */
function renderAchievementsPage(containerId = "achievements-grid-container") {
  const container = document.getElementById(containerId);
  if (!container) return;

  const items = getFilteredAchievements();

  if (items.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: #FFFFFF; border-radius: var(--radius-xl); border: 1px dashed #CBD5E1;">
        <i class="fa-solid fa-trophy" style="font-size: 2.5rem; color: #CBD5E1; margin-bottom: 1rem;"></i>
        <h4 style="color: var(--color-primary-900);">No achievements in this category</h4>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(createAchievementCardHTML).join('');
}

/**
 * Render Achievements preview on homepage
 */
function renderHomeAchievementsPreview(containerId = "home-achievements-container") {
  const container = document.getElementById(containerId);
  if (!container) return;

  const all = getAchievementsData();
  // Choose top 3 featured achievements
  const featured = all.filter(a => a.featured).slice(0, 3);
  const itemsToRender = featured.length >= 3 ? featured : all.slice(0, 3);

  container.innerHTML = itemsToRender.map(item => `
    <div class="mission-card" style="padding: 1.5rem; border-left: 4px solid var(--color-gold-500);">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem;">
        <span class="achievement-badge-pill ${item.badgeType || 'gold'}" style="font-size: 0.72rem; padding: 0.2rem 0.65rem;">
          ${item.badge}
        </span>
        <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #94A3B8;">${item.category}</span>
      </div>
      <h4 style="font-size: 1.05rem; color: var(--color-primary-900); margin-bottom: 0.4rem; line-height: 1.4;">${item.title}</h4>
      <p style="font-size: 0.85rem; color: var(--color-accent-600); font-weight: 600; margin-bottom: 0.4rem;">
        Recipient: ${item.recipient}
      </p>
      <p style="font-size: 0.88rem; color: var(--color-text-muted); line-height: 1.55; margin: 0;">
        ${item.description.length > 135 ? item.description.substring(0, 132) + '...' : item.description}
      </p>
    </div>
  `).join('');
}

/**
 * Trigger connected master event modal
 */
function triggerConnectedEventModal(eventId) {
  if (typeof openEventModal === "function") {
    openEventModal(eventId);
  } else {
    window.location.href = `events.html#${eventId}`;
  }
}

/**
 * Setup Achievements Filter buttons
 */
function setupAchievementsUI() {
  const filterBtns = document.querySelectorAll(".ach-filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeAchievementFilter = btn.getAttribute("data-category") || "all";
      renderAchievementsPage();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderAchievementsPage();
  renderHomeAchievementsPreview();
  setupAchievementsUI();
});
