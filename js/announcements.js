/**
 * ==========================================================================
 * G.T.N. ARTS COLLEGE (AUTONOMOUS), DINDIGUL
 * DEPARTMENT OF MASTER OF COMPUTER APPLICATIONS (MCA)
 * ANNOUNCEMENTS & TICKER MODULE (announcements.js)
 * ==========================================================================
 * Centralized circulars and notifications for the MCA department.
 */

const mcaAnnouncements = [
  {
    id: "ann-01",
    title: "MCA Admissions 2026-2027: Applications Invited",
    date: "2026-10-05",
    displayDate: "October 05, 2026",
    isImportant: true,
    isLatest: true,
    category: "Admissions",
    description: "Online and in-person applications are open for the 2-Year Master of Computer Applications (MCA) postgraduate degree programme. Candidates with BCA / B.Sc (CS/IT) or equivalent degree with Mathematics at 10+2/Graduation level may apply.",
    linkText: "View Eligibility",
    linkUrl: "programme.html#eligibility"
  },
  {
    id: "ann-02",
    title: "National Technical Symposium CYBERNAUT 2026 — Registration Schedule",
    date: "2026-10-01",
    displayDate: "October 01, 2026",
    isImportant: true,
    isLatest: false,
    category: "Events",
    description: "Registration for CYBERNAUT 2026 has officially commenced. Department student representatives are requested to coordinate internal college teams for paper presentation and coding hackathons.",
    linkText: "View Event Details",
    linkUrl: "events.html"
  },
  {
    id: "ann-03",
    title: "Commencement of Special Elective in Generative AI and Cloud Systems",
    date: "2026-09-18",
    displayDate: "September 18, 2026",
    isImportant: false,
    isLatest: false,
    category: "Academics",
    description: "The department announces the syllabus rollout for advanced elective modules encompassing Transformer Architectures, Prompt Engineering, and Cloud Native deployment strategies.",
    linkText: "View Curriculum",
    linkUrl: "programme.html"
  },
  {
    id: "ann-04",
    title: "Inauguration of Department Student Computer Association",
    date: "2026-08-25",
    displayDate: "August 25, 2026",
    isImportant: false,
    isLatest: false,
    category: "Association",
    description: "The MCA Student Association was formally inaugurated with student office bearers sworn in. The association drives weekly coding clinics, tech seminars, and peer-mentorship sessions.",
    linkText: "View Activities",
    linkUrl: "activities.html"
  },
  {
    id: "ann-05",
    title: "TANCET / NIMCET Academic Guidance Desk for Aspirants",
    date: "2026-08-10",
    displayDate: "August 10, 2026",
    isImportant: false,
    isLatest: false,
    category: "Admissions",
    description: "A free advisory help desk has been instituted in the MCA Department block to assist prospective candidates with Tamil Nadu Common Entrance Test guidance and counseling procedures.",
    linkText: "Contact Department",
    linkUrl: "contact.html"
  }
];

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

document.addEventListener("DOMContentLoaded", () => {
  renderTickerAnnouncements();
  renderAnnouncementsPage();
  renderHomeAnnouncementsWidget();
});
