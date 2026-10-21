/**
 * ==========================================================================
 * G.T.N. ARTS COLLEGE (AUTONOMOUS), DINDIGUL
 * DEPARTMENT OF MASTER OF COMPUTER APPLICATIONS (MCA)
 * FACULTY PROFILES & CONTACT MODULE (faculty.js)
 * ==========================================================================
 * Implementation matching the modern executive profile layout:
 *  - Left: Prominent rectangular portrait photo with rounded frame
 *  - Right: Role Eyebrow, Large Bold Name, Qualifications, Intro Summary
 *  - 3 Contact rows with soft light-blue icon boxes (Phone, Email, Address)
 *  - Solid Blue "Get In Touch" button with modal contact protocol
 *  - "Biography" section below with academic background, specializations, and courses
 *  - Faculty switcher tabs at top for seamless profile browsing
 */

// Local data removed - live synchronized from MongoDB Atlas API
const facultyMembers = [];

/**
 * Sorts faculty members in strict ascending order (by order field, HOD priority, and ID)
 * @param {Array} list - Array of faculty members
 * @returns {Array} - Sorted array
 */
function sortFacultyList(list) {
  if (!Array.isArray(list)) return [];
  return list.sort((a, b) => {
    const ordA =
      typeof a.order === "number" && a.order > 0
        ? a.order
        : a.role === "HOD"
          ? 1
          : 99;
    const ordB =
      typeof b.order === "number" && b.order > 0
        ? b.order
        : b.role === "HOD"
          ? 1
          : 99;
    if (ordA !== ordB) return ordA - ordB;
    return (a.id || "").localeCompare(b.id || "", undefined, { numeric: true });
  });
}

/**
 * Normalizes image paths to ensure compatibility in all contexts
 * @param {string} path - Image path
 * @returns {string} - Clean path
 */
function normalizeFacultyImagePath(path) {
  if (!path) return "";
  return path.replace(/^\.\.\//, "");
}

/**
 * Renders a single faculty card matching the requested example layout
 * @param {Object} member - Faculty member record
 * @returns {string} - HTML markup
 */
function renderFacultyProfileCard(member) {
  const imageSrc = normalizeFacultyImagePath(member.image);

  return `
    <article class="faculty-profile-card" id="${member.id}" data-faculty-id="${member.id}">
      <div class="faculty-profile-main">
        <!-- Left Column: Portrait Photograph -->
        <div class="faculty-profile-photo-wrap">
          <img src="${imageSrc}" alt="${member.name}" class="faculty-profile-photo" loading="lazy" onerror="this.src='assets/logos/mca-official-logo.png';" />
          <span class="faculty-profile-badge ${member.role === "HOD" ? "hod" : ""}">
            ${member.role === "HOD" ? '<i class="fa-solid fa-crown"></i> Head of Department' : '<i class="fa-solid fa-chalkboard-user"></i> Faculty'}
          </span>
        </div>

        <!-- Right Column: Profile Information & 3 Contact Rows -->
        <div class="faculty-profile-details">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.35rem; flex-wrap: wrap;">
            <div class="faculty-profile-role">${member.roleTitle}</div>
            <!-- <span class="faculty-id-pill" title="Department Faculty ID: ${member.id}">
            <i class="fa-solid fa-id-card"></i> ${member.id} 
            </span>-->
          </div>
          <h2 class="faculty-profile-name">${member.name}</h2>
          <div class="faculty-profile-qual">${member.qualifications}</div>
          <p class="faculty-profile-intro">${member.summary}</p>

          <!-- Contact items matching the example screenshot layout -->
          <div class="faculty-contact-list">
            <!-- Row 1: Contact / Office Hours -->
            <div class="faculty-contact-item">
              <div class="faculty-contact-icon">
                <i class="fa-solid fa-phone-volume" aria-hidden="true"></i>
              </div>
              <div class="faculty-contact-content">
                <span class="faculty-contact-label">Contact / Office Hours :</span>
                <span class="faculty-contact-value">${member.officeHours}</span>
              </div>
            </div>

            <!-- Row 2: Email Address -->
            <div class="faculty-contact-item">
              <div class="faculty-contact-icon">
                <i class="fa-regular fa-envelope" aria-hidden="true"></i>
              </div>
              <div class="faculty-contact-content">
                <span class="faculty-contact-label">Email Address :</span>
                <a href="mailto:${member.email}" class="faculty-contact-value faculty-contact-link">${member.email}</a>
              </div>
            </div>

            <!-- Row 3: Office Address / Location -->
            <div class="faculty-contact-item">
              <div class="faculty-contact-icon">
                <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
              </div>
              <div class="faculty-contact-content">
                <span class="faculty-contact-label">My Address :</span>
                <span class="faculty-contact-value">${member.fullAddress}</span>
              </div>
            </div>
          </div>

          <!-- Blue CTA Button -->
          <div>
            <button type="button" class="faculty-btn-touch" onclick="openFacultyContactModal('${member.id}')">
              Get In Touch
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom Section: Biography matching the example layout -->
      <div class="faculty-biography-section">
        <h3 class="faculty-biography-title">Biography</h3>
        <div class="faculty-biography-text">
          <p>${member.bio}</p>
        </div>

        <!-- Academic Specialization Tags & Courses Handled -->
        <div class="faculty-academic-grid">
          <div class="faculty-academic-block">
            <h4 class="faculty-academic-heading">
              <i class="fa-solid fa-brain" aria-hidden="true"></i> Areas of Specialization
            </h4>
            <div class="faculty-tags-list">
              ${member.specializations.map((spec) => `<span class="faculty-spec-tag">${spec}</span>`).join("")}
            </div>
          </div>

          <div class="faculty-academic-block">
            <h4 class="faculty-academic-heading">
              <i class="fa-solid fa-book-open" aria-hidden="true"></i> Key Courses Handled
            </h4>
            <ul class="faculty-course-list">
              ${member.courses.map((course) => `<li><i class="fa-solid fa-circle-check" aria-hidden="true"></i> <span>${course}</span></li>`).join("")}
            </ul>
          </div>
        </div>
      </div>
    </article>
  `;
}

/**
 * Render Faculty Members into the specified container element
 * @param {string} containerId - DOM ID of the container element
 * @param {boolean} isCompact - Whether to render compact (e.g. for homepage)
 */
function renderFacultyList(containerId, isCompact = false) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Always ensure faculty list is strictly sorted in configured order
  sortFacultyList(facultyMembers);

  // Render navigation switcher tabs + profile cards
  const tabsMarkup = `
    <div class="faculty-filter-tabs" role="tablist" aria-label="Faculty Profile Switcher">
      <button type="button" class="faculty-filter-tab active" data-filter="all" onclick="filterFacultyCards('${containerId}', 'all')">
        <i class="fa-solid fa-users-viewfinder"></i> All Mentors (${facultyMembers.length})
      </button>
      ${facultyMembers
        .map(
          (member) => `
        <button type="button" class="faculty-filter-tab" data-filter="${member.id}" onclick="filterFacultyCards('${containerId}', '${member.id}')">
          <span style="font-family: var(--font-mono, monospace); font-size: 0.72rem; opacity: 0.85; margin-right: 4px;">#${member.order || ""}</span> ${member.name} ${member.role === "HOD" ? "(HOD)" : ""}
        </button>
      `,
        )
        .join("")}
    </div>
  `;

  const cardsMarkup = `
    <div class="faculty-profiles-wrapper">
      ${facultyMembers.map((member) => renderFacultyProfileCard(member)).join("")}
    </div>
  `;

  container.innerHTML = tabsMarkup + cardsMarkup;

  // Ensure contact modal exists in DOM
  ensureFacultyContactModal();
}

/**
 * Filter faculty cards shown in container
 * @param {string} containerId - Container DOM ID
 * @param {string} filterId - 'all' or specific faculty member id
 */
function filterFacultyCards(containerId, filterId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Update tab buttons
  const tabs = container.querySelectorAll(".faculty-filter-tab");
  tabs.forEach((tab) => {
    if (tab.getAttribute("data-filter") === filterId) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  // Update cards display with smooth fade
  const cards = container.querySelectorAll(".faculty-profile-card");
  cards.forEach((card) => {
    if (
      filterId === "all" ||
      card.getAttribute("data-faculty-id") === filterId
    ) {
      card.style.display = "block";
      card.style.animation = "fadeInUp 0.4s ease forwards";
    } else {
      card.style.display = "none";
    }
  });
}

/**
 * Ensure the "Get In Touch" Contact Modal is present in the DOM
 */
function ensureFacultyContactModal() {
  if (typeof document === "undefined") return null;
  let modal = document.getElementById("faculty-contact-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "faculty-contact-modal";
    modal.className = "faculty-modal-overlay";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
      <div class="faculty-modal-backdrop" onclick="closeFacultyContactModal()" aria-hidden="true"></div>
      <div class="faculty-modal-dialog faculty-contact-dialog" role="document">
        <button type="button" class="faculty-modal-close" onclick="closeFacultyContactModal()" aria-label="Close dialog">&times;</button>
        <div id="faculty-contact-modal-body" class="faculty-modal-body"></div>
      </div>
    `;
    document.body.appendChild(modal);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeFacultyContactModal();
    });
  }
  return modal;
}

/**
 * Open Contact Modal for specific faculty member
 * @param {string} facultyId - Member ID
 */
function openFacultyContactModal(facultyId) {
  const member = facultyMembers.find((m) => m.id === facultyId);
  if (!member) return;

  const modal = ensureFacultyContactModal();
  const body = document.getElementById("faculty-contact-modal-body");
  if (!modal || !body) return;

  const imageSrc = normalizeFacultyImagePath(member.image);

  body.innerHTML = `
    <div class="faculty-contact-modal-header" style="background: ${member.avatarColor};">
      <div class="faculty-contact-modal-avatar">
        <img src="${imageSrc}" alt="${member.name}" />
      </div>
      <h3 class="faculty-contact-modal-title">Get In Touch</h3>
      <p class="faculty-contact-modal-sub">${member.name} — ${member.designation}</p>
    </div>

    <div class="faculty-contact-modal-content">
      <p style="font-size: 0.92rem; color: #475569; line-height: 1.6; margin-bottom: 1.5rem;">
        You can coordinate academic consultations, postgraduate research guidance, or departmental inquiries through the official channels below:
      </p>

      <div class="faculty-contact-list" style="margin-bottom: 1.5rem;">
        <div class="faculty-contact-item">
          <div class="faculty-contact-icon"><i class="fa-solid fa-phone-volume"></i></div>
          <div class="faculty-contact-content">
            <span class="faculty-contact-label">Department Office Phone :</span>
            <span class="faculty-contact-value">${member.phone}</span>
          </div>
        </div>

        <div class="faculty-contact-item">
          <div class="faculty-contact-icon"><i class="fa-regular fa-envelope"></i></div>
          <div class="faculty-contact-content">
            <span class="faculty-contact-label">Direct Department Email :</span>
            <a href="mailto:${member.email}" class="faculty-contact-value faculty-contact-link">${member.email}</a>
          </div>
        </div>

        <div class="faculty-contact-item">
          <div class="faculty-contact-icon"><i class="fa-solid fa-clock"></i></div>
          <div class="faculty-contact-content">
            <span class="faculty-contact-label">Consultation Hours :</span>
            <span class="faculty-contact-value">${member.officeHours}</span>
          </div>
        </div>

        <div class="faculty-contact-item">
          <div class="faculty-contact-icon"><i class="fa-solid fa-location-dot"></i></div>
          <div class="faculty-contact-content">
            <span class="faculty-contact-label">Office Location :</span>
            <span class="faculty-contact-value">${member.officeLocation}</span>
          </div>
        </div>
      </div>

      <div style="background: #F8FAFC; border-radius: 10px; padding: 1rem; border: 1px solid #E2E8F0; margin-bottom: 1.5rem;">
        <div style="font-size: 0.82rem; color: #64748B; line-height: 1.5;">
          <i class="fa-solid fa-shield-halved" style="color: #0284C7; margin-right: 0.4rem;"></i>
          <strong>Official Protocol:</strong> In-person student consultations should be scheduled during official office hours at the MCA Department Block.
        </div>
      </div>

      <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
        <button type="button" class="btn btn-secondary" onclick="closeFacultyContactModal()">Close</button>
        <a href="mailto:${member.email}?subject=Academic%20Inquiry%20-%20${encodeURIComponent(member.name)}" class="btn btn-primary" style="background: #3B82F6; border-color: #3B82F6;">
          <i class="fa-solid fa-paper-plane" style="margin-right: 0.4rem;"></i> Send Email
        </a>
      </div>
    </div>
  `;

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

/**
 * Close Contact Modal
 */
function closeFacultyContactModal() {
  const modal = document.getElementById("faculty-contact-modal");
  if (modal) {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  }
  document.body.style.overflow = "";
}

async function syncFacultyFromAPI() {
  if (typeof fetch === "undefined") return;
  try {
    let res;
    try {
      res = await fetch("/api/faculty");
      if (!res.ok) throw new Error("status " + res.status);
    } catch (e) {
      // Fallback for python http.server or static hosts
      res = await fetch("http://localhost:5000/api/faculty");
    }
    if (res && res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        facultyMembers.length = 0;
        facultyMembers.push(...data.data);
        sortFacultyList(facultyMembers);
        renderFacultyList("faculty-grid-container");
        renderFacultyList("home-faculty-grid", true);
      }
    }
  } catch (e) {
    // Graceful fallback to static array
  }
}

// Global initialization if container is present on page load
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    renderFacultyList("faculty-grid-container");
    renderFacultyList("home-faculty-grid", true);
    syncFacultyFromAPI();
  });

  // Real-time synchronization when admin saves changes
  try {
    if (typeof BroadcastChannel !== "undefined") {
      const ch = new BroadcastChannel("mca_sync_channel");
      ch.onmessage = (e) => {
        if (!e.data || !e.data.entity || e.data.entity === "faculty") {
          syncFacultyFromAPI();
        }
      };
    }
  } catch (e) {}

  window.addEventListener("storage", (e) => {
    if (e.key === "mca_live_update_timestamp") {
      syncFacultyFromAPI();
    }
  });
}

// CommonJS export for test runner / node audit environments
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    facultyMembers,
    renderFacultyList,
    renderFacultyProfileCard,
    filterFacultyCards,
    openFacultyContactModal,
    closeFacultyContactModal,
  };
}
