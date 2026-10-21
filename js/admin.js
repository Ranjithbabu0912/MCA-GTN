/**
 * ============================================================================
 * G.T.N. ARTS COLLEGE (AUTONOMOUS), DINDIGUL
 * DEPARTMENT OF MASTER OF COMPUTER APPLICATIONS (MCA)
 * ADMIN MODULE LOGIC (js/admin.js)
 *
 * Full RESTful CRUD management for:
 * - Announcements
 * - Achievements
 * - Gallery
 * - Events
 * - Faculty Details
 * ============================================================================
 */

// Application State
const state = {
  token: localStorage.getItem("mca_admin_token") || "",
  user: null,
  activeTab: "dashboard",
  data: {
    announcements: [],
    achievements: [],
    gallery: [],
    events: [],
    faculty: [],
  },
  deleteTarget: {
    type: "",
    id: "",
    title: "",
  },
};

// Base API URL (relative to root)
const API_BASE = "/api";

// Helper headers
function getAuthHeaders(includeContentType = true) {
  const headers = {};
  if (state.token) {
    headers["Authorization"] = `Bearer ${state.token}`;
  }
  if (includeContentType) {
    headers["Content-Type"] = "application/json";
  }
  return headers;
}

// ============================================================================
// TOAST NOTIFICATIONS
// ============================================================================
function showToast(message, type = "success") {
  const container = document.getElementById("adminToastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `admin-toast ${type}`;

  const iconClass =
    type === "success" ? "fa-circle-check" : "fa-circle-exclamation";
  const iconColor = type === "success" ? "#10B981" : "#EF4444";

  toast.innerHTML = `
    <i class="fa-solid ${iconClass}" style="color: ${iconColor}; font-size: 1.15rem;"></i>
    <span style="flex: 1;">${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(30px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ============================================================================
// INITIALIZATION & AUTHENTICATION
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  initAuth();
  initSidebar();
  initForms();
  initFilters();

  if (state.token) {
    verifySession();
  } else {
    showLoginScreen();
  }
});

function initAuth() {
  const tabPinBtn = document.getElementById("tabPinBtn");
  const tabUserBtn = document.getElementById("tabUserBtn");
  const pinForm = document.getElementById("pinLoginForm");
  const userForm = document.getElementById("userLoginForm");
  const togglePinVis = document.getElementById("togglePinVis");
  const pinInput = document.getElementById("adminPinInput");
  const logoutBtn = document.getElementById("adminLogoutBtn");

  // Toggle Login Tabs
  tabPinBtn?.addEventListener("click", () => {
    tabPinBtn.classList.add("active");
    tabUserBtn.classList.remove("active");
    pinForm.style.display = "block";
    userForm.style.display = "none";
    pinInput?.focus();
  });

  tabUserBtn?.addEventListener("click", () => {
    tabUserBtn.classList.add("active");
    tabPinBtn.classList.remove("active");
    userForm.style.display = "block";
    pinForm.style.display = "none";
    document.getElementById("adminUsernameInput")?.focus();
  });

  // Toggle PIN visibility
  togglePinVis?.addEventListener("click", () => {
    const isPass = pinInput.getAttribute("type") === "password";
    pinInput.setAttribute("type", isPass ? "text" : "password");
    togglePinVis.innerHTML = isPass
      ? '<i class="fa-solid fa-eye-slash"></i>'
      : '<i class="fa-solid fa-eye"></i>';
  });

  // PIN Form Submit
  pinForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const pin = pinInput.value.trim();
    if (!pin) return;

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        handleAuthSuccess(data);
      } else {
        showToast(data.message || "Invalid PIN entered.", "error");
      }
    } catch (err) {
      showToast("Authentication server connection error.", "error");
    }
  });

  // Username / Password Form Submit
  userForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document
      .getElementById("adminUsernameInput")
      ?.value.trim();
    const password = document
      .getElementById("adminPasswordInput")
      ?.value.trim();

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        handleAuthSuccess(data);
      } else {
        showToast(data.message || "Invalid admin credentials.", "error");
      }
    } catch (err) {
      showToast("Authentication server connection error.", "error");
    }
  });

  // Logout
  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("mca_admin_token");
    state.token = "";
    state.user = null;
    showToast("Signed out successfully.");
    showLoginScreen();
  });
}

function handleAuthSuccess(authResponse) {
  state.token = authResponse.token;
  localStorage.setItem("mca_admin_token", authResponse.token);
  state.user = authResponse.user;

  hideLoginScreen();
  showToast("Welcome to MCA Admin Portal!");
  fetchAllData();
}

async function verifySession() {
  try {
    const res = await fetch(`${API_BASE}/auth/verify`, {
      headers: getAuthHeaders(false),
    });
    const data = await res.json();
    if (data.valid) {
      hideLoginScreen();
      fetchAllData();
    } else {
      localStorage.removeItem("mca_admin_token");
      state.token = "";
      showLoginScreen();
    }
  } catch (err) {
    // If backend is unreachable temporarily, keep interface accessible if local token exists
    hideLoginScreen();
    fetchAllData();
  }
}

function showLoginScreen() {
  const screen = document.getElementById("adminLoginScreen");
  if (screen) screen.style.display = "flex";
}

function hideLoginScreen() {
  const screen = document.getElementById("adminLoginScreen");
  if (screen) screen.style.display = "none";
}

// ============================================================================
// SIDEBAR & TABS NAVIGATION
// ============================================================================
function initSidebar() {
  const sidebar = document.getElementById("adminSidebar");
  const toggleBtn = document.getElementById("adminSidebarToggle");
  const navItems = document.querySelectorAll(".admin-nav-item");

  toggleBtn?.addEventListener("click", () => {
    sidebar?.classList.toggle("open");
  });

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      const tab = item.getAttribute("data-tab");
      if (tab) switchTab(tab);
      if (window.innerWidth <= 900) {
        sidebar?.classList.remove("open");
      }
    });
  });
}

function switchTab(tabName) {
  state.activeTab = tabName;

  // Update nav active classes
  document.querySelectorAll(".admin-nav-item").forEach((item) => {
    if (item.getAttribute("data-tab") === tabName) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Update panels
  document.querySelectorAll(".admin-panel").forEach((panel) => {
    panel.classList.remove("active");
  });
  const targetPanel = document.getElementById(`panel-${tabName}`);
  if (targetPanel) targetPanel.classList.add("active");

  // Update page title
  const titleMap = {
    dashboard: "Dashboard Overview",
    announcements: "Manage Announcements",
    achievements: "Manage Student & Department Achievements",
    gallery: "Manage Photo Gallery & Media",
    events: "Manage Department Events & Workshops",
    faculty: "Manage Faculty Profiles & Details",
  };
  const titleEl = document.getElementById("adminPageTitle");
  if (titleEl) titleEl.textContent = titleMap[tabName] || "Admin Portal";
}

// Make switchTab accessible globally for metric cards
window.switchTab = switchTab;

// ============================================================================
// DATA FETCHING (All 5 Modules)
// ============================================================================
async function fetchAllData() {
  await Promise.all([
    fetchAnnouncements(),
    fetchAchievements(),
    fetchGallery(),
    fetchEvents(),
    fetchFaculty(),
  ]);
  updateDashboardMetrics();
}

// 1. Announcements
async function fetchAnnouncements() {
  try {
    const res = await fetch(`${API_BASE}/announcements`);
    const data = await res.json();
    state.data.announcements = data.data || [];
    renderAnnouncements();
  } catch (err) {
    console.error("Error fetching announcements:", err);
  }
}

// 2. Achievements
async function fetchAchievements() {
  try {
    const res = await fetch(`${API_BASE}/achievements`);
    const data = await res.json();
    state.data.achievements = data.data || [];
    renderAchievements();
  } catch (err) {
    console.error("Error fetching achievements:", err);
  }
}

// 3. Gallery
async function fetchGallery() {
  try {
    const res = await fetch(`${API_BASE}/gallery`);
    const data = await res.json();
    state.data.gallery = data.data || [];
    renderGallery();
  } catch (err) {
    console.error("Error fetching gallery:", err);
  }
}

// 4. Events
async function fetchEvents() {
  try {
    const res = await fetch(`${API_BASE}/events`);
    const data = await res.json();
    state.data.events = data.data || [];
    renderEvents();
  } catch (err) {
    console.error("Error fetching events:", err);
  }
}

// 5. Faculty
async function fetchFaculty() {
  try {
    const res = await fetch(`${API_BASE}/faculty`);
    const data = await res.json();
    state.data.faculty = data.data || [];
    renderFaculty();
  } catch (err) {
    console.error("Error fetching faculty:", err);
  }
}

// Update Badges & Dashboard Numbers
function updateDashboardMetrics() {
  const counts = {
    announcements: state.data.announcements.length,
    achievements: state.data.achievements.length,
    gallery: state.data.gallery.length,
    events: state.data.events.length,
    faculty: state.data.faculty.length,
  };

  // Nav badges
  document.getElementById("badgeAnnouncements").textContent =
    counts.announcements;
  document.getElementById("badgeAchievements").textContent =
    counts.achievements;
  document.getElementById("badgeGallery").textContent = counts.gallery;
  document.getElementById("badgeEvents").textContent = counts.events;
  document.getElementById("badgeFaculty").textContent = counts.faculty;

  // Overview metrics
  document.getElementById("statAnnouncements").textContent =
    counts.announcements;
  document.getElementById("statAchievements").textContent = counts.achievements;
  document.getElementById("statGallery").textContent = counts.gallery;
  document.getElementById("statEvents").textContent = counts.events;
  document.getElementById("statFaculty").textContent = counts.faculty;
}

// ============================================================================
// RENDERING FUNCTIONS
// ============================================================================

// 1. Announcements Table
function renderAnnouncements() {
  const tbody = document.getElementById("tbodyAnnouncements");
  if (!tbody) return;

  const searchVal =
    document.getElementById("searchAnnouncements")?.value.toLowerCase() || "";
  const catVal =
    document.getElementById("filterCategoryAnnouncements")?.value || "";

  const filtered = state.data.announcements.filter((item) => {
    const matchSearch =
      (item.title || "").toLowerCase().includes(searchVal) ||
      (item.description || "").toLowerCase().includes(searchVal);
    const matchCat = !catVal || item.category === catVal;
    return matchSearch && matchCat;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #94A3B8; padding: 2rem;">No announcements found matching criteria.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered
    .map(
      (item) => `
    <tr>
      <td>
        <div style="font-weight: 700; color: #0F172A; margin-bottom: 0.2rem;">${escapeHtml(item.title)}</div>
        <div style="font-size: 0.8rem; color: #64748B; max-width: 400px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          ${escapeHtml(item.description)}
        </div>
      </td>
      <td>
        <span style="background: #EFF6FF; color: #1D4ED8; font-weight: 600; padding: 3px 8px; border-radius: 6px; font-size: 0.78rem;">
          ${escapeHtml(item.category || "General")}
        </span>
      </td>
      <td style="font-size: 0.84rem; color: #475569;">
        ${escapeHtml(item.displayDate || item.date || "Recent")}
      </td>
      <td>
        <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
          ${item.isImportant ? '<span style="background: #FEE2E2; color: #DC2626; padding: 2px 6px; border-radius: 4px; font-size: 0.72rem; font-weight: 700;">IMPORTANT</span>' : ""}
          ${item.isLatest ? '<span style="background: #FEF3C7; color: #B45309; padding: 2px 6px; border-radius: 4px; font-size: 0.72rem; font-weight: 700;">LATEST</span>' : ""}
        </div>
      </td>
      <td style="text-align: right;">
        <div class="admin-table-actions" style="justify-content: flex-end;">
          <button type="button" class="admin-action-btn edit" title="Edit" onclick="openEditModal('announcement', '${item.id}')">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button type="button" class="admin-action-btn delete" title="Delete" onclick="openDeleteConfirm('announcement', '${item.id}', '${escapeHtml(item.title)}')">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  `,
    )
    .join("");
}

// 2. Achievements Table
function renderAchievements() {
  const tbody = document.getElementById("tbodyAchievements");
  if (!tbody) return;

  const searchVal =
    document.getElementById("searchAchievements")?.value.toLowerCase() || "";
  const catVal =
    document.getElementById("filterCategoryAchievements")?.value || "";

  const filtered = state.data.achievements.filter((item) => {
    const matchSearch =
      (item.title || "").toLowerCase().includes(searchVal) ||
      (item.studentName || "").toLowerCase().includes(searchVal) ||
      (item.companyOrOrg || "").toLowerCase().includes(searchVal);
    const matchCat = !catVal || item.category === catVal;
    return matchSearch && matchCat;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #94A3B8; padding: 2rem;">No achievements found.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered
    .map(
      (item) => `
    <tr>
      <td>
        <img src="${escapeHtml(item.image || "assets/images/placeholder.jpg")}" alt="Achieve" 
             style="width: 44px; height: 44px; object-fit: cover; border-radius: 8px; border: 1px solid #E2E8F0;"
             onerror="this.src='assets/images/placeholder.jpg'">
      </td>
      <td>
        <div style="font-weight: 700; color: #0F172A;">${escapeHtml(item.title)}</div>
        <div style="font-size: 0.8rem; color: #64748B;">${escapeHtml(item.description || "").substring(0, 50)}...</div>
      </td>
      <td style="font-weight: 600; color: #1E293B;">${escapeHtml(item.studentName || "MCA Team")}</td>
      <td style="color: #64748B; font-size: 0.85rem;">${escapeHtml(item.year || "2025-2026")}</td>
      <td style="font-weight: 600; color: #0284C7;">${escapeHtml(item.companyOrOrg || "N/A")}</td>
      <td>
        <span style="background: #FEF3C7; color: #B45309; padding: 3px 8px; border-radius: 6px; font-weight: 600; font-size: 0.78rem;">
          ${escapeHtml(item.category || "General")}
        </span>
      </td>
      <td style="text-align: right;">
        <div class="admin-table-actions" style="justify-content: flex-end;">
          <button type="button" class="admin-action-btn edit" title="Edit" onclick="openEditModal('achievement', '${item.id}')">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button type="button" class="admin-action-btn delete" title="Delete" onclick="openDeleteConfirm('achievement', '${item.id}', '${escapeHtml(item.title)}')">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  `,
    )
    .join("");
}

// 3. Gallery Table
function renderGallery() {
  const tbody = document.getElementById("tbodyGallery");
  if (!tbody) return;

  const searchVal =
    document.getElementById("searchGallery")?.value.toLowerCase() || "";
  const catVal = document.getElementById("filterCategoryGallery")?.value || "";

  const filtered = state.data.gallery.filter((item) => {
    const matchSearch =
      (item.title || "").toLowerCase().includes(searchVal) ||
      (item.description || "").toLowerCase().includes(searchVal);
    const matchCat = !catVal || item.category === catVal;
    return matchSearch && matchCat;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #94A3B8; padding: 2rem;">No gallery photos found.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered
    .map(
      (item) => `
    <tr>
      <td>
        <img src="${escapeHtml(item.image)}" alt="Thumbnail" 
             style="width: 52px; height: 42px; object-fit: cover; border-radius: 6px; border: 1px solid #E2E8F0;"
             onerror="this.src='assets/logos/mca-official-logo.png'">
      </td>
      <td>
        <div style="font-weight: 700; color: #0F172A;">${escapeHtml(item.title)}</div>
        <div style="font-size: 0.8rem; color: #64748B;">${escapeHtml(item.image)}</div>
      </td>
      <td>
        <span style="background: #ECFDF5; color: #047857; font-weight: 600; padding: 3px 8px; border-radius: 6px; font-size: 0.78rem;">
          ${escapeHtml(item.category || "General")}
        </span>
      </td>
      <td style="color: #64748B; font-size: 0.85rem;">
        ${escapeHtml(item.date || "Campus Archive")}
      </td>
      <td style="text-align: right;">
        <div class="admin-table-actions" style="justify-content: flex-end;">
          <button type="button" class="admin-action-btn edit" title="Edit" onclick="openEditModal('gallery', '${item.id}')">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button type="button" class="admin-action-btn delete" title="Delete" onclick="openDeleteConfirm('gallery', '${item.id}', '${escapeHtml(item.title)}')">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  `,
    )
    .join("");
}

// 4. Events Table
function renderEvents() {
  const tbody = document.getElementById("tbodyEvents");
  if (!tbody) return;

  const searchVal =
    document.getElementById("searchEvents")?.value.toLowerCase() || "";
  const statusVal = document.getElementById("filterStatusEvents")?.value || "";

  const filtered = state.data.events.filter((item) => {
    const matchSearch =
      (item.title || "").toLowerCase().includes(searchVal) ||
      (item.venue || "").toLowerCase().includes(searchVal) ||
      (item.speaker || "").toLowerCase().includes(searchVal);
    const matchStatus = !statusVal || item.status === statusVal;
    return matchSearch && matchStatus;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #94A3B8; padding: 2rem;">No department events found.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered
    .map((item) => {
      let statusStyle = "background: #EFF6FF; color: #2563EB;";
      if (item.status === "Completed")
        statusStyle = "background: #F1F5F9; color: #64748B;";
      if (item.status === "Ongoing")
        statusStyle = "background: #ECFDF5; color: #059669;";

      return `
      <tr>
        <td>
          <div style="font-weight: 700; color: #0F172A;">${escapeHtml(item.title)}</div>
          <div style="font-size: 0.8rem; color: #64748B;">Speaker: ${escapeHtml(item.speaker || "Department Faculty")}</div>
        </td>
        <td style="font-size: 0.85rem; color: #334155;">
          <div><i class="fa-regular fa-calendar" style="margin-right: 4px; color: #94A3B8;"></i> ${escapeHtml(item.date || "TBA")}</div>
          <div style="color: #64748B; font-size: 0.78rem;">${escapeHtml(item.time || "")}</div>
        </td>
        <td style="font-size: 0.85rem; color: #475569;">
          <i class="fa-solid fa-location-dot" style="margin-right: 4px; color: #EF4444;"></i> ${escapeHtml(item.venue || "MCA Block")}
        </td>
        <td>
          <span style="background: #F3E8FF; color: #7C3AED; font-weight: 600; padding: 3px 8px; border-radius: 6px; font-size: 0.78rem;">
            ${escapeHtml(item.category || "General")}
          </span>
        </td>
        <td>
          <span style="${statusStyle} font-weight: 700; padding: 3px 8px; border-radius: 6px; font-size: 0.75rem;">
            ${escapeHtml(item.status || "Upcoming")}
          </span>
        </td>
        <td style="text-align: right;">
          <div class="admin-table-actions" style="justify-content: flex-end;">
            <button type="button" class="admin-action-btn edit" title="Edit" onclick="openEditModal('event', '${item.id}')">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button type="button" class="admin-action-btn delete" title="Delete" onclick="openDeleteConfirm('event', '${item.id}', '${escapeHtml(item.title)}')">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
    })
    .join("");
}

// 5. Faculty Table
function renderFaculty() {
  const tbody = document.getElementById("tbodyFaculty");
  if (!tbody) return;

  const searchVal =
    document.getElementById("searchFaculty")?.value.toLowerCase() || "";

  // Sort faculty in strict ascending order: by order field, HOD priority, then by ID
  state.data.faculty.sort((a, b) => {
    const ordA = typeof a.order === 'number' && a.order > 0 ? a.order : (a.role === 'HOD' ? 1 : 99);
    const ordB = typeof b.order === 'number' && b.order > 0 ? b.order : (b.role === 'HOD' ? 1 : 99);
    if (ordA !== ordB) return ordA - ordB;
    return (a.id || '').localeCompare(b.id || '', undefined, { numeric: true });
  });

  const filtered = state.data.faculty.filter((item) => {
    return (
      (item.id || "").toLowerCase().includes(searchVal) ||
      (item.name || "").toLowerCase().includes(searchVal) ||
      (item.designation || "").toLowerCase().includes(searchVal) ||
      (item.specialization || "").toLowerCase().includes(searchVal) ||
      (item.qualification || "").toLowerCase().includes(searchVal)
    );
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #94A3B8; padding: 2rem;">No faculty records found.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered
    .map(
      (item) => `
    <tr>
      <td>
        <span style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background: #F1F5F9; color: #0F172A; font-weight: 700; font-size: 0.82rem; font-family: monospace; border: 1px solid #CBD5E1;">
          ${item.order || 1}
        </span>
      </td>
      <td>
        <span style="font-family: monospace; font-size: 0.8rem; background: #E0F2FE; color: #0369A1; padding: 3px 8px; border-radius: 6px; font-weight: 700; border: 1px solid #BAE6FD;">
          ${escapeHtml(item.id)}
        </span>
      </td>
      <td>
        <img src="${escapeHtml(item.image || "assets/images/Prof 1.png")}" alt="Faculty" 
             style="width: 44px; height: 44px; object-fit: cover; border-radius: 50%; border: 2px solid #E2E8F0;"
             onerror="this.src='assets/logos/mca-official-logo.png'">
      </td>
      <td>
        <div style="font-weight: 700; color: #0F172A;">
          ${escapeHtml(item.name)} ${item.role === 'HOD' ? '<span style="background: #FEF3C7; color: #B45309; font-size: 0.72rem; padding: 2px 6px; border-radius: 4px; font-weight: 700; margin-left: 4px;">HOD</span>' : ''}
        </div>
        <div style="font-size: 0.8rem; color: #0284C7;">${escapeHtml(item.email || "")}</div>
      </td>
      <td style="font-weight: 600; color: #334155;">${escapeHtml(item.designation)}</td>
      <td style="font-size: 0.85rem; color: #64748B;">${escapeHtml(item.qualification)}</td>
      <td style="text-align: right;">
        <div class="admin-table-actions" style="justify-content: flex-end;">
          <button type="button" class="admin-action-btn edit" title="Edit" onclick="openEditModal('faculty', '${item.id}')">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button type="button" class="admin-action-btn delete" title="Delete" onclick="openDeleteConfirm('faculty', '${item.id}', '${escapeHtml(item.name)}')">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  `,
    )
    .join("");
}

// ============================================================================
// FILTER EVENT LISTENERS
// ============================================================================
function initFilters() {
  document
    .getElementById("searchAnnouncements")
    ?.addEventListener("input", renderAnnouncements);
  document
    .getElementById("filterCategoryAnnouncements")
    ?.addEventListener("change", renderAnnouncements);

  document
    .getElementById("searchAchievements")
    ?.addEventListener("input", renderAchievements);
  document
    .getElementById("filterCategoryAchievements")
    ?.addEventListener("change", renderAchievements);

  document
    .getElementById("searchGallery")
    ?.addEventListener("input", renderGallery);
  document
    .getElementById("filterCategoryGallery")
    ?.addEventListener("change", renderGallery);

  document
    .getElementById("searchEvents")
    ?.addEventListener("input", renderEvents);
  document
    .getElementById("filterStatusEvents")
    ?.addEventListener("change", renderEvents);

  document
    .getElementById("searchFaculty")
    ?.addEventListener("input", renderFaculty);
}

// ============================================================================
// MODAL CONTROLS & FORM HANDLERS
// ============================================================================
function openModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.add("active");
}

function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.remove("active");
}
window.closeModal = closeModal;

// Create New Openers
window.openCreateModal = function (type) {
  if (type === "announcement") {
    document.getElementById("titleModalAnnouncement").textContent =
      "Add Announcement";
    document.getElementById("formAnnouncement").reset();
    document.getElementById("annId").value = "";
    document.getElementById("annDisplayDate").value =
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    openModal("modalAnnouncement");
  } else if (type === "achievement") {
    document.getElementById("titleModalAchievement").textContent =
      "Add Achievement";
    document.getElementById("formAchievement").reset();
    document.getElementById("achId").value = "";
    document.getElementById("achCategory").value = "Technical Competition";
    document.getElementById("achBadgeType").value = "gold";
    document.getElementById("achYear").value = "2025-2026";
    document.getElementById("achDateDisplay").value =
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    document.getElementById("achVenue").value =
      "G.T.N. Arts College (Autonomous), Dindigul";
    document.getElementById("achOrganizer").value =
      "Department of Master of Computer Applications";
    document.getElementById("achImage").value = "assets/images/placeholder.jpg";
    document.getElementById("achFeatured").checked = false;
    document.getElementById("previewAchImage").style.display = "none";
    openModal("modalAchievement");
  } else if (type === "gallery") {
    document.getElementById("titleModalGallery").textContent =
      "Add Gallery Item";
    document.getElementById("formGallery").reset();
    document.getElementById("galId").value = "";
    document.getElementById("galCategory").value = "Events";
    document.getElementById("galDate").value = new Date()
      .toISOString()
      .split("T")[0];
    document.getElementById("galThemeColor").value = "#102A54";
    document.getElementById("galIcon").value = "fa-award";
    document.getElementById("galImage").value = "assets/images/placeholder.jpg";
    document.getElementById("previewGalImage").style.display = "none";
    openModal("modalGallery");
  } else if (type === "event") {
    document.getElementById("titleModalEvent").textContent =
      "Schedule Department Event";
    document.getElementById("formEvent").reset();
    document.getElementById("eveId").value = "";
    document.getElementById("eveCategory").value = "Department Event";
    document.getElementById("eveStatus").value = "Upcoming";
    document.getElementById("eveDateDisplay").value =
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    document.getElementById("eveTime").value = "09:30 AM - 04:30 PM";
    document.getElementById("eveVenue").value =
      "Dr. A.P.J. Abdul Kalam Auditorium, G.T.N. Arts College";
    document.getElementById("eveOrganizer").value =
      "Department of Master of Computer Applications";
    document.getElementById("eveParticipants").value =
      "MCA Postgraduate Scholars, Faculty Members & IT Aspirants";
    document.getElementById("eveImage").value = "assets/images/placeholder.jpg";
    document.getElementById("eveFeatured").checked = false;
    openModal("modalEvent");
  } else if (type === "faculty") {
    document.getElementById("titleModalFaculty").textContent =
      "Add Faculty Member";
    document.getElementById("formFaculty").reset();
    document.getElementById("facId").value = "";

    // Suggest sequential display order and ID
    const nextOrder = state.data.faculty.length + 1;
    const nextId = "faculty-0" + nextOrder;
    document.getElementById("facCustomId").value = nextId;
    document.getElementById("facOrder").value = nextOrder;

    document.getElementById("facRole").value = "Faculty";
    document.getElementById("facRoleTitle").value = "Assistant Professor";
    document.getElementById("facDepartment").value =
      "Department of Master of Computer Applications (MCA)";
    document.getElementById("facOfficeLocation").value =
      "MCA Department Block, Ground Floor (Cabin F-02)";
    document.getElementById("facOfficeHours").value =
      "Monday - Friday | 09:30 AM - 04:30 PM";
    document.getElementById("facEmail").value = "mca@gtnartscollege.ac.in";
    document.getElementById("facPhone").value =
      "+91 (0451) 2431299 / Ext. MCA";
    document.getElementById("facAddress").value =
      "MCA Department Block, Ground Floor, G.T.N. Arts College (Autonomous), Old Karur Road, Dindigul - 624 005, Tamil Nadu, India.";
    document.getElementById("facImage").value = "assets/images/Prof 1.png";
    document.getElementById("previewFacImage").style.display = "none";
    openModal("modalFaculty");
  }
};

// Edit Existing Openers
window.openEditModal = function (type, id) {
  if (type === "announcement") {
    const item = state.data.announcements.find((i) => i.id === id);
    if (!item) return;
    document.getElementById("titleModalAnnouncement").textContent =
      "Edit Announcement";
    document.getElementById("annId").value = item.id;
    document.getElementById("annTitle").value = item.title || "";
    document.getElementById("annCategory").value = item.category || "General";
    document.getElementById("annDisplayDate").value =
      item.displayDate || item.date || "";
    document.getElementById("annDescription").value = item.description || "";
    document.getElementById("annLinkText").value = item.linkText || "";
    document.getElementById("annLinkUrl").value = item.linkUrl || "";
    document.getElementById("annIsImportant").checked = !!item.isImportant;
    document.getElementById("annIsLatest").checked = !!item.isLatest;
    openModal("modalAnnouncement");
  } else if (type === "achievement") {
    const item = state.data.achievements.find((i) => i.id === id);
    if (!item) return;
    document.getElementById("titleModalAchievement").textContent =
      "Edit Achievement";
    document.getElementById("achId").value = item.id;
    document.getElementById("achTitle").value = item.title || "";
    document.getElementById("achAwardTitle").value =
      item.awardTitle || item.title || "";
    document.getElementById("achCategory").value =
      item.category || "Technical Competition";
    document.getElementById("achRecipient").value =
      item.recipient || item.studentName || "";
    document.getElementById("achStudentClass").value = item.studentClass || "";
    document.getElementById("achYear").value = item.year || "";
    document.getElementById("achDateDisplay").value =
      item.dateDisplay || item.date || "";
    document.getElementById("achBadge").value = item.badge || "";
    document.getElementById("achBadgeType").value = item.badgeType || "gold";
    document.getElementById("achVenue").value = item.venue || "";
    document.getElementById("achOrganizer").value =
      item.organizer || item.companyOrOrg || "";

    let hlText = "";
    if (Array.isArray(item.highlights)) {
      hlText = item.highlights.join("\n");
    } else if (item.highlights) {
      hlText = String(item.highlights);
    }
    document.getElementById("achHighlights").value = hlText;
    document.getElementById("achDescription").value = item.description || "";
    document.getElementById("achImage").value = item.image || "";
    document.getElementById("achFeatured").checked = !!item.featured;

    const preview = document.getElementById("previewAchImage");
    if (item.image) {
      preview.querySelector("img").src = item.image;
      preview.style.display = "block";
    } else {
      preview.style.display = "none";
    }
    openModal("modalAchievement");
  } else if (type === "gallery") {
    const item = state.data.gallery.find((i) => i.id === id);
    if (!item) return;
    document.getElementById("titleModalGallery").textContent =
      "Edit Gallery Item";
    document.getElementById("galId").value = item.id;
    document.getElementById("galTitle").value = item.title || "";
    document.getElementById("galCategory").value = item.category || "Events";
    document.getElementById("galDate").value = item.date || "";
    document.getElementById("galThemeColor").value =
      item.themeColor || "#102A54";
    document.getElementById("galIcon").value = item.icon || "fa-award";
    document.getElementById("galImage").value = item.image || "";
    document.getElementById("galDescription").value =
      item.description || item.caption || "";

    const preview = document.getElementById("previewGalImage");
    if (item.image) {
      preview.querySelector("img").src = item.image;
      preview.style.display = "block";
    } else {
      preview.style.display = "none";
    }
    openModal("modalGallery");
  } else if (type === "event") {
    const item = state.data.events.find((i) => i.id === id);
    if (!item) return;
    document.getElementById("titleModalEvent").textContent =
      "Edit Department Event";
    document.getElementById("eveId").value = item.id;
    document.getElementById("eveTitle").value = item.title || "";
    document.getElementById("eveCategory").value =
      item.category ||
      (Array.isArray(item.categories) && item.categories[0]) ||
      "Department Event";
    document.getElementById("eveStatus").value = item.status || "Upcoming";
    document.getElementById("eveDateDisplay").value =
      item.dateDisplay || item.date || "";
    document.getElementById("eveTime").value =
      item.time ||
      (item.startTime && item.endTime
        ? `${item.startTime} - ${item.endTime}`
        : item.startTime || "");
    document.getElementById("eveVenue").value = item.venue || "";
    document.getElementById("eveOrganizer").value = item.organizer || "";
    document.getElementById("eveSpeaker").value =
      item.speaker ||
      (item.resourcePerson &&
        (item.resourcePerson.name || item.resourcePerson.topic)) ||
      "";

    let cgText = "";
    if (Array.isArray(item.chiefGuests)) {
      cgText = item.chiefGuests
        .map((g) =>
          typeof g === "object"
            ? `${g.name || ""}${g.title ? " (" + g.title + ")" : ""}`
            : g,
        )
        .filter(Boolean)
        .join(", ");
    } else if (item.chiefGuests) {
      cgText = String(item.chiefGuests);
    }
    document.getElementById("eveChiefGuests").value = cgText;

    document.getElementById("eveParticipants").value = item.participants || "";
    document.getElementById("eveObjective").value = item.objective || "";

    let hlText = "";
    if (Array.isArray(item.highlights)) {
      hlText = item.highlights.join("\n");
    } else if (item.highlights) {
      hlText = String(item.highlights);
    }
    document.getElementById("eveHighlights").value = hlText;
    document.getElementById("eveDescription").value = item.description || "";
    document.getElementById("eveRegLink").value = item.registrationLink || "";
    document.getElementById("eveImage").value = item.image || "";
    document.getElementById("eveFeatured").checked = !!item.featured;
    openModal("modalEvent");
  } else if (type === "faculty") {
    const item = state.data.faculty.find((i) => i.id === id);
    if (!item) return;
    document.getElementById("titleModalFaculty").textContent =
      "Edit Faculty Member";
    document.getElementById("facId").value = item.id;
    document.getElementById("facCustomId").value = item.id;
    document.getElementById("facOrder").value = item.order || 1;
    document.getElementById("facName").value = item.name || "";
    document.getElementById("facRole").value = item.role || "Faculty";
    document.getElementById("facRoleTitle").value =
      item.roleTitle || item.designation || "";
    document.getElementById("facDesignation").value = item.designation || "";
    document.getElementById("facQualification").value =
      item.qualification || item.qualifications || "";
    document.getElementById("facExperience").value = item.experience || "";
    document.getElementById("facInitials").value = item.initials || "";
    document.getElementById("facDepartment").value =
      item.department ||
      "Department of Master of Computer Applications (MCA)";
    document.getElementById("facOfficeLocation").value =
      item.officeLocation || "";
    document.getElementById("facOfficeHours").value = item.officeHours || "";
    document.getElementById("facEmail").value = item.email || "";
    document.getElementById("facPhone").value = item.phone || "";
    document.getElementById("facAddress").value =
      item.fullAddress || item.address || "";

    let specText = "";
    if (Array.isArray(item.specializations)) {
      specText = item.specializations.join(", ");
    } else if (item.specialization) {
      specText = item.specialization;
    }
    document.getElementById("facSpecialization").value = specText;

    let coursesText = "";
    if (Array.isArray(item.courses)) {
      coursesText = item.courses.join(", ");
    } else if (item.courses) {
      coursesText = String(item.courses);
    }
    document.getElementById("facCourses").value = coursesText;

    document.getElementById("facImage").value = item.image || "";
    document.getElementById("facSummary").value = item.summary || "";
    document.getElementById("facBio").value = item.bio || "";

    const preview = document.getElementById("previewFacImage");
    if (item.image) {
      preview.querySelector("img").src = item.image;
      preview.style.display = "block";
    } else {
      preview.style.display = "none";
    }
    openModal("modalFaculty");
  }
};

// Real-time synchronization broadcaster for connected public website tabs
function broadcastLiveWebsiteUpdate(entity) {
  try {
    localStorage.setItem("mca_live_update_timestamp", Date.now().toString());
  } catch (e) {}
  try {
    if (typeof BroadcastChannel !== "undefined") {
      const ch = new BroadcastChannel("mca_sync_channel");
      ch.postMessage({ type: "DATA_UPDATED", entity, timestamp: Date.now() });
      ch.close();
    }
  } catch (e) {}
}

// ============================================================================
// FORM SUBMISSIONS (CREATE & UPDATE API CALLS)
// ============================================================================
function initForms() {
  // 1. Announcement Form
  document
    .getElementById("formAnnouncement")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = document.getElementById("annId").value;
      const payload = {
        title: document.getElementById("annTitle").value.trim(),
        category: document.getElementById("annCategory").value,
        displayDate: document.getElementById("annDisplayDate").value.trim(),
        description: document.getElementById("annDescription").value.trim(),
        linkText: document.getElementById("annLinkText").value.trim(),
        linkUrl: document.getElementById("annLinkUrl").value.trim(),
        isImportant: document.getElementById("annIsImportant").checked,
        isLatest: document.getElementById("annIsLatest").checked,
      };

      try {
        const url = id
          ? `${API_BASE}/announcements/${id}`
          : `${API_BASE}/announcements`;
        const method = id ? "PUT" : "POST";
        const res = await fetch(url, {
          method,
          headers: getAuthHeaders(),
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          showToast(id ? "Announcement updated in MongoDB!" : "Announcement created in MongoDB!");
          closeModal("modalAnnouncement");
          broadcastLiveWebsiteUpdate("announcements");
          await fetchAnnouncements();
          updateDashboardMetrics();
        } else {
          showToast(data.message || "Error saving announcement.", "error");
        }
      } catch (err) {
        showToast("Network error saving announcement.", "error");
      }
    });

  // 2. Achievement Form
  document
    .getElementById("formAchievement")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = document.getElementById("achId").value;
      const titleVal = document.getElementById("achTitle").value.trim();
      const awardTitleVal =
        document.getElementById("achAwardTitle").value.trim() || titleVal;
      const recipientVal = document.getElementById("achRecipient").value.trim();
      const dateDisplayVal = document.getElementById("achDateDisplay").value.trim();
      const organizerVal = document.getElementById("achOrganizer").value.trim();

      const payload = {
        title: titleVal,
        awardTitle: awardTitleVal,
        category: document.getElementById("achCategory").value,
        recipient: recipientVal,
        studentName: recipientVal,
        studentClass: document.getElementById("achStudentClass").value.trim(),
        students: [recipientVal],
        year: document.getElementById("achYear").value.trim() || "2025-2026",
        dateDisplay: dateDisplayVal,
        date: dateDisplayVal,
        badge: document.getElementById("achBadge").value.trim() || "ACHIEVEMENT",
        badgeType: document.getElementById("achBadgeType").value || "gold",
        venue:
          document.getElementById("achVenue").value.trim() ||
          "G.T.N. Arts College",
        organizer: organizerVal || "Department of MCA",
        companyOrOrg: organizerVal || "Department of MCA",
        highlights: document
          .getElementById("achHighlights")
          .value.split("\n")
          .map((h) => h.trim())
          .filter(Boolean),
        description: document.getElementById("achDescription").value.trim(),
        image:
          document.getElementById("achImage").value.trim() ||
          "assets/images/placeholder.jpg",
        featured: document.getElementById("achFeatured").checked,
      };

      try {
        const url = id
          ? `${API_BASE}/achievements/${id}`
          : `${API_BASE}/achievements`;
        const method = id ? "PUT" : "POST";
        const res = await fetch(url, {
          method,
          headers: getAuthHeaders(),
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          showToast(id ? "Achievement updated in MongoDB!" : "Achievement saved to MongoDB!");
          closeModal("modalAchievement");
          broadcastLiveWebsiteUpdate("achievements");
          await fetchAchievements();
          updateDashboardMetrics();
        } else {
          showToast(data.message || "Error saving achievement.", "error");
        }
      } catch (err) {
        showToast("Network error saving achievement.", "error");
      }
    });

  // 3. Gallery Form
  document
    .getElementById("formGallery")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = document.getElementById("galId").value;
      const titleVal = document.getElementById("galTitle").value.trim();
      const catVal = document.getElementById("galCategory").value;
      const descVal = document.getElementById("galDescription").value.trim();

      const payload = {
        title: titleVal,
        caption: descVal || titleVal,
        description: descVal,
        category: catVal,
        categoryLabel: catVal,
        date: document.getElementById("galDate").value.trim() || "Recent",
        themeColor: document.getElementById("galThemeColor").value || "#102A54",
        icon: document.getElementById("galIcon").value || "fa-award",
        image:
          document.getElementById("galImage").value.trim() ||
          "assets/images/placeholder.jpg",
      };

      try {
        const url = id ? `${API_BASE}/gallery/${id}` : `${API_BASE}/gallery`;
        const method = id ? "PUT" : "POST";
        const res = await fetch(url, {
          method,
          headers: getAuthHeaders(),
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          showToast(id ? "Gallery item updated in MongoDB!" : "Gallery item saved to MongoDB!");
          closeModal("modalGallery");
          broadcastLiveWebsiteUpdate("gallery");
          await fetchGallery();
          updateDashboardMetrics();
        } else {
          showToast(data.message || "Error saving gallery item.", "error");
        }
      } catch (err) {
        showToast("Network error saving gallery item.", "error");
      }
    });

  // 4. Event Form
  document
    .getElementById("formEvent")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = document.getElementById("eveId").value;
      const catVal = document.getElementById("eveCategory").value;
      const dateDispVal = document.getElementById("eveDateDisplay").value.trim();
      const timeVal = document.getElementById("eveTime").value.trim();
      const speakerVal = document.getElementById("eveSpeaker").value.trim();
      const guestsVal = document.getElementById("eveChiefGuests").value.trim();
      const highlightsArr = document
        .getElementById("eveHighlights")
        .value.split("\n")
        .map((h) => h.trim())
        .filter(Boolean);

      const payload = {
        title: document.getElementById("eveTitle").value.trim(),
        category: catVal,
        categories: [catVal],
        status: document.getElementById("eveStatus").value || "Upcoming",
        dateDisplay: dateDispVal,
        date: dateDispVal,
        time: timeVal,
        startTime: timeVal || "09:30 AM",
        venue: document.getElementById("eveVenue").value.trim(),
        organizer: document.getElementById("eveOrganizer").value.trim(),
        speaker: speakerVal,
        resourcePerson: speakerVal
          ? { name: speakerVal, title: "Resource Person" }
          : null,
        chiefGuests: guestsVal
          ? guestsVal
              .split(",")
              .map((g) => ({ name: g.trim(), title: "Chief Guest" }))
              .filter((g) => g.name)
          : [],
        participants: document.getElementById("eveParticipants").value.trim(),
        objective: document.getElementById("eveObjective").value.trim(),
        highlights: highlightsArr,
        description: document.getElementById("eveDescription").value.trim(),
        registrationLink: document.getElementById("eveRegLink").value.trim(),
        image:
          document.getElementById("eveImage").value.trim() ||
          "assets/images/placeholder.jpg",
        featured: document.getElementById("eveFeatured").checked,
      };

      try {
        const url = id ? `${API_BASE}/events/${id}` : `${API_BASE}/events`;
        const method = id ? "PUT" : "POST";
        const res = await fetch(url, {
          method,
          headers: getAuthHeaders(),
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          showToast(id ? "Event updated in MongoDB!" : "New event saved to MongoDB!");
          closeModal("modalEvent");
          broadcastLiveWebsiteUpdate("events");
          await fetchEvents();
          updateDashboardMetrics();
        } else {
          showToast(data.message || "Error saving event.", "error");
        }
      } catch (err) {
        showToast("Network error saving event.", "error");
      }
    });

  // 5. Faculty Form
  document
    .getElementById("formFaculty")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const originalId = document.getElementById("facId").value;
      const customId = document.getElementById("facCustomId").value.trim();
      const orderVal = Number(document.getElementById("facOrder").value) || 1;
      const nameVal = document.getElementById("facName").value.trim();
      const qualVal = document.getElementById("facQualification").value.trim();
      const desigVal = document.getElementById("facDesignation").value.trim();
      const specVal = document.getElementById("facSpecialization").value.trim();
      const coursesVal = document.getElementById("facCourses").value.trim();
      const bioVal = document.getElementById("facBio").value.trim();
      const summaryVal =
        document.getElementById("facSummary").value.trim() ||
        bioVal.substring(0, 160);

      const initialsVal =
        document.getElementById("facInitials").value.trim() ||
        nameVal
          .split(" ")
          .map((w) => w[0])
          .filter(Boolean)
          .join("")
          .substring(0, 3)
          .toUpperCase();

      const payload = {
        id: customId || originalId,
        order: orderVal,
        name: nameVal,
        role: document.getElementById("facRole").value || "Faculty",
        roleTitle:
          document.getElementById("facRoleTitle").value.trim() || desigVal,
        designation: desigVal,
        qualifications: qualVal,
        qualification: qualVal,
        experience: document.getElementById("facExperience").value.trim(),
        initials: initialsVal,
        department:
          document.getElementById("facDepartment").value.trim() ||
          "Department of Master of Computer Applications (MCA)",
        officeLocation: document.getElementById("facOfficeLocation").value.trim(),
        officeHours: document.getElementById("facOfficeHours").value.trim(),
        email: document.getElementById("facEmail").value.trim(),
        phone: document.getElementById("facPhone").value.trim(),
        fullAddress: document.getElementById("facAddress").value.trim(),
        address: document.getElementById("facAddress").value.trim(),
        specializations: specVal
          ? specVal.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        specialization: specVal,
        courses: coursesVal
          ? coursesVal.split(",").map((c) => c.trim()).filter(Boolean)
          : [],
        image:
          document.getElementById("facImage").value.trim() ||
          "assets/images/Prof 1.png",
        summary: summaryVal,
        bio: bioVal,
      };

      try {
        const url = originalId ? `${API_BASE}/faculty/${originalId}` : `${API_BASE}/faculty`;
        const method = originalId ? "PUT" : "POST";
        const res = await fetch(url, {
          method,
          headers: getAuthHeaders(),
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          showToast(originalId ? "Faculty profile updated in MongoDB!" : "Faculty profile saved to MongoDB!");
          closeModal("modalFaculty");
          broadcastLiveWebsiteUpdate("faculty");
          await fetchFaculty();
          updateDashboardMetrics();
        } else {
          showToast(data.message || "Error saving faculty record.", "error");
        }
      } catch (err) {
        showToast("Network error saving faculty record.", "error");
      }
    });

  // 6. Delete Confirmation Handler
  document
    .getElementById("btnConfirmDelete")
    ?.addEventListener("click", async () => {
      const { type, id } = state.deleteTarget;
      if (!type || !id) return;

      try {
        const endpointMap = {
          announcement: "announcements",
          achievement: "achievements",
          gallery: "gallery",
          event: "events",
          faculty: "faculty",
        };
        const endpoint = endpointMap[type];
        const res = await fetch(`${API_BASE}/${endpoint}/${id}`, {
          method: "DELETE",
          headers: getAuthHeaders(),
        });
        const data = await res.json();
        if (data.success) {
          showToast(
            `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully from MongoDB.`,
          );
          closeModal("modalDeleteConfirm");
          broadcastLiveWebsiteUpdate(endpoint);

          // Refetch relevant dataset
          if (type === "announcement") await fetchAnnouncements();
          if (type === "achievement") await fetchAchievements();
          if (type === "gallery") await fetchGallery();
          if (type === "event") await fetchEvents();
          if (type === "faculty") await fetchFaculty();

          updateDashboardMetrics();
        } else {
          showToast(data.message || "Error deleting record.", "error");
        }
      } catch (err) {
        showToast("Network error deleting record.", "error");
      }
    });
}

// Open Delete Confirmation
window.openDeleteConfirm = function (type, id, title) {
  state.deleteTarget = { type, id, title };
  const titleEl = document.getElementById("deleteConfirmTitle");
  const msgEl = document.getElementById("deleteConfirmMsg");
  if (titleEl)
    titleEl.textContent = `Delete ${type.charAt(0).toUpperCase() + type.slice(1)}?`;
  if (msgEl)
    msgEl.textContent = `Are you sure you want to delete "${title}"? This action cannot be reversed.`;
  openModal("modalDeleteConfirm");
};

// ============================================================================
// FILE UPLOAD INTEGRATION (Multer)
// ============================================================================
window.handleFileUpload = async function (
  input,
  targetInputId,
  previewContainerId,
) {
  const file = input.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  showToast("Uploading image file...", "success");

  try {
    const res = await fetch(`${API_BASE}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (data.success && data.filePath) {
      const targetInput = document.getElementById(targetInputId);
      if (targetInput) {
        targetInput.value = data.filePath;
      }

      if (previewContainerId) {
        const preview = document.getElementById(previewContainerId);
        if (preview) {
          const img = preview.querySelector("img");
          if (img) img.src = data.filePath;
          preview.style.display = "block";
        }
      }

      showToast("Image uploaded successfully!");
    } else {
      showToast(data.message || "Upload failed.", "error");
    }
  } catch (err) {
    showToast("Failed to upload image file.", "error");
  }
};
