/**
 * ==========================================================================
 * G.T.N. ARTS COLLEGE (AUTONOMOUS), DINDIGUL
 * DEPARTMENT OF MASTER OF COMPUTER APPLICATIONS (MCA)
 * ANNOUNCEMENTS & TICKER MODULE (announcements.js)
 * ==========================================================================
 * Centralized circulars and notifications for the MCA department.
 */

// Local data removed - live synchronized from MongoDB Atlas API
const mcaAnnouncements = [];

/**
 * Render marquee ticker items on Header / Hero
 */
function renderTickerAnnouncements() {
  const tickerContainer = document.getElementById("header-ticker-items");
  if (!tickerContainer) return;

  tickerContainer.innerHTML = mcaAnnouncements.map(item => `
    <span class="ticker-item">
      ${item.isImportant ? '<span class="badge badge-gold" style="font-size: 0.65rem; padding: 0.15rem 0.45rem;">IMPORTANT</span>' : ''}
      <span>${item.title} (${item.displayDate})</span>
      <a href="${item.linkUrl}">Learn More &rarr;</a>
    </span>
  `).join('');
}

/**
 * Render Full Announcements List on announcements.html
 */
function renderAnnouncementsPage(containerId = "announcements-list-container") {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = mcaAnnouncements.map(ann => `
    <article class="announcement-card ${ann.isImportant ? 'featured' : ''}" id="${ann.id}">
      <div class="announcement-content">
        <div class="announcement-header">
          <span class="badge ${ann.isImportant ? 'badge-gold' : 'badge-cyan'}">${ann.category}</span>
          ${ann.isImportant ? '<span class="badge" style="background:#FEE2E2; color:#DC2626;"><i class="fa-solid fa-bell"></i> Notice</span>' : ''}
          <span class="announcement-date"><i class="fa-regular fa-calendar-days"></i> ${ann.displayDate}</span>
        </div>
        <h3 class="announcement-title">${ann.title}</h3>
        <p class="announcement-desc">${ann.description}</p>
      </div>
      <div style="flex-shrink: 0; align-self: center;">
        <a href="${ann.linkUrl}" class="btn btn-secondary btn-sm">
          ${ann.linkText} &rarr;
        </a>
      </div>
    </article>
  `).join('');
}

/**
 * Render Home Page Announcement Widget
 */
function renderHomeAnnouncementsWidget(containerId = "home-announcements-widget") {
  const container = document.getElementById(containerId);
  if (!container) return;

  const topThree = mcaAnnouncements.slice(0, 3);
  container.innerHTML = topThree.map(ann => `
    <article class="announcement-card ${ann.isImportant ? 'featured' : ''}" style="margin-bottom: 1rem;">
      <div class="announcement-content">
        <div class="announcement-header">
          <span class="badge ${ann.isImportant ? 'badge-gold' : 'badge-cyan'}">${ann.category}</span>
          <span class="announcement-date">${ann.displayDate}</span>
        </div>
        <h4 style="font-size: 1.05rem; margin-bottom: 0.4rem; color: #0F172A;">${ann.title}</h4>
        <p style="font-size: 0.88rem; color: #64748B; margin: 0;">${ann.description}</p>
      </div>
    </article>
  `).join('');
}

async function syncAnnouncementsFromAPI() {
  if (typeof fetch === 'undefined') return;
  try {
    let res;
    try {
      res = await fetch('/api/announcements');
      if (!res.ok) throw new Error('status ' + res.status);
    } catch (e) {
      // Fallback for python http.server or static hosts
      res = await fetch('http://localhost:5000/api/announcements');
    }
    if (res && res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        mcaAnnouncements.length = 0;
        mcaAnnouncements.push(...data.data);
        renderTickerAnnouncements();
        renderAnnouncementsPage();
        renderHomeAnnouncementsWidget();
      }
    }
  } catch (e) {
    // Graceful fallback to static array
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener("DOMContentLoaded", () => {
    renderTickerAnnouncements();
    renderAnnouncementsPage();
    renderHomeAnnouncementsWidget();
    syncAnnouncementsFromAPI();
  });

  // Real-time synchronization when admin saves changes
  try {
    if (typeof BroadcastChannel !== 'undefined') {
      const ch = new BroadcastChannel('mca_sync_channel');
      ch.onmessage = (e) => {
        if (!e.data || !e.data.entity || e.data.entity === 'announcements') {
          syncAnnouncementsFromAPI();
        }
      };
    }
  } catch (e) {}

  window.addEventListener('storage', (e) => {
    if (e.key === 'mca_live_update_timestamp') {
      syncAnnouncementsFromAPI();
    }
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mcaAnnouncements };
}

