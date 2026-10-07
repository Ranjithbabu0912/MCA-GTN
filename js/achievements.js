/**
 * ==========================================================================
 * G.T.N. ARTS COLLEGE (AUTONOMOUS), DINDIGUL
 * DEPARTMENT OF MASTER OF COMPUTER APPLICATIONS (MCA)
 * ACHIEVEMENTS DATA MODULE (achievements.js)
 * ==========================================================================
 * Department achievements across categories. Designed so department
 * coordinators can easily append verified records as students and faculty excel.
 */

const mcaAchievements = [
  {
    id: "ach-01",
    category: "Student Achievements",
    title: "First Prize at State-Level Tech Fest (Web & Algorithm Sprint)",
    recipient: "Postgraduate Student Team, MCA Department",
    date: "Academic Year 2025-2026",
    description: "Secured First Position among 32 collegiate teams in the Algorithmic Problem Solving and Rapid Web Prototyping challenges.",
    type: "Competition"
  },
  {
    id: "ach-02",
    category: "Academic Achievements",
    title: "100% Course Pass & Distinction Honors in First Trimester/Semester",
    recipient: "P.G. Department of MCA Scholars",
    date: "Academic Year 2025-2026",
    description: "Scholars registered meritorious performance across fundamental computing examinations, data structures, and database management lab benchmarks.",
    type: "Academic"
  },
  {
    id: "ach-03",
    category: "Faculty Achievements",
    title: "Faculty Research & Doctoral Mentorship Excellence",
    recipient: "Department Faculty Members",
    date: "Ongoing",
    description: "Faculty active in doctoral research and advanced curriculum design for emerging computational disciplines.",
    type: "Faculty"
  },
  {
    id: "ach-04",
    category: "Certifications",
    title: "Professional Industry Certifications Milestone",
    recipient: "MCA Enrolled Students",
    date: "Academic Year 2025-2026",
    description: "Students actively completing verified certifications in Cloud Fundamentals, Python Data Science, and Database Administration.",
    type: "Certification"
  },
  {
    id: "ach-05",
    category: "Awards",
    title: "Institutional Innovation Recognition",
    recipient: "Department of MCA",
    date: "2025-2026",
    description: "Recognized for high-impact launch of the curriculum incorporating contemporary AI and industry-aligned experiential learning.",
    type: "Award"
  }
];

/**
 * Render Achievements on achievements.html
 */
function renderAchievementsPage(containerId = "achievements-grid-container") {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = mcaAchievements.map(item => `
    <article class="mission-card" id="${item.id}">
      <div class="mission-header">
        <span class="badge badge-gold">${item.category}</span>
        <div class="mission-icon">
          <i class="fa-solid fa-trophy" aria-hidden="true"></i>
        </div>
      </div>
      <h3 class="mission-title">${item.title}</h3>
      <p style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--color-accent-600); margin-bottom: 0.6rem;">
        <strong>Recipient:</strong> ${item.recipient}
      </p>
      <p class="mission-desc">${item.description}</p>
      <div style="margin-top: 1.25rem; font-size: 0.8rem; color: #94A3B8; border-top: 1px solid var(--color-border-subtle); padding-top: 0.75rem;">
        <i class="fa-regular fa-calendar-check"></i> ${item.date}
      </div>
    </article>
  `).join('');
}

/**
 * Render Achievements preview on homepage
 */
function renderHomeAchievementsPreview(containerId = "home-achievements-container") {
  const container = document.getElementById(containerId);
  if (!container) return;

  const topAchievements = mcaAchievements.slice(0, 3);
  container.innerHTML = topAchievements.map(item => `
    <div class="mission-card">
      <div class="mission-header">
        <span class="badge badge-gold">${item.category}</span>
        <div class="mission-icon">
          <i class="fa-solid fa-award" aria-hidden="true"></i>
        </div>
      </div>
      <h4 style="font-size: 1.15rem; color: var(--color-primary-900); margin-bottom: 0.5rem;">${item.title}</h4>
      <p style="font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.6; margin: 0;">${item.description}</p>
    </div>
  `).join('');
}

document.addEventListener("DOMContentLoaded", () => {
  renderAchievementsPage();
  renderHomeAchievementsPreview();
});
