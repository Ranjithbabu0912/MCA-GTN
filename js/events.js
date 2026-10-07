/**
 * ==========================================================================
 * G.T.N. ARTS COLLEGE (AUTONOMOUS), DINDIGUL
 * DEPARTMENT OF MASTER OF COMPUTER APPLICATIONS (MCA)
 * EVENTS DATA & INTERACTIVE MANAGEMENT MODULE (events.js)
 * ==========================================================================
 * Centralized dynamic events repository. Updates made here are automatically
 * reflected across both the Events page and Homepage previews.
 */

const mcaEvents = [
  {
    id: "evt-01",
    title: "National Technical Symposium: CYBERNAUT 2026",
    date: "2026-10-28",
    displayDate: "Oct 28, 2026",
    month: "OCT",
    day: "28",
    time: "09:30 AM - 04:30 PM",
    venue: "Dr. K. Rathinam Auditorium & MCA Smart Lab",
    category: "Symposium",
    status: "Upcoming",
    isFeatured: true,
    description: "Annual Flagship Technical Symposium featuring Paper Presentation, Code Debugging, Web Design, AI Hack Sprint, and Tech Quiz competitions for postgraduate computer application students across universities.",
    details: "The MCA Department cordially invites enthusiastic technocrats to test their skills and present innovative ideas in state-of-the-art computational problems. Cash prizes and merit certificates will be awarded to top performers across all competitive tracks.",
    registrationOpen: true
  },
  {
    id: "evt-02",
    title: "Hands-on Workshop: Generative AI & Large Language Models",
    date: "2026-11-06",
    displayDate: "Nov 06, 2026",
    month: "NOV",
    day: "06",
    time: "10:00 AM - 01:00 PM",
    venue: "MCA Advanced Computer Laboratory",
    category: "Workshop",
    status: "Upcoming",
    isFeatured: false,
    description: "An intensive technical workshop covering the fundamentals of Transformer architectures, Prompt Engineering, RAG frameworks, and building private AI agents using Python and open-source models.",
    details: "Participants will get hands-on experience building practical LLM pipelines on Jupyter environments. Intended for MCA students aiming to understand real-world enterprise AI deployments.",
    registrationOpen: true
  },
  {
    id: "evt-03",
    title: "Industry Expert Lecture: Scalable Cloud Architectures & Microservices",
    date: "2026-11-18",
    displayDate: "Nov 18, 2026",
    month: "NOV",
    day: "18",
    time: "02:00 PM - 04:00 PM",
    venue: "Audio Visual Hall, MCA Department",
    category: "Guest Lecture",
    status: "Upcoming",
    isFeatured: false,
    description: "Interactive session by senior cloud software architects illustrating cloud containerization with Docker and Kubernetes, resilient API gateways, and distributed cloud computing patterns.",
    details: "Focuses on bridging academic learning with contemporary industry practices in enterprise-grade software engineering and cloud infrastructure design.",
    registrationOpen: true
  },
  {
    id: "evt-04",
    title: "Orientation Programme & Tech Induction for MCA Batch 2025-2027",
    date: "2026-08-14",
    displayDate: "Aug 14, 2026",
    month: "AUG",
    day: "14",
    time: "10:00 AM - 12:30 PM",
    venue: "College Seminar Hall",
    category: "Student Activities",
    status: "Past",
    isFeatured: false,
    description: "Welcome orientation ceremony introducing the postgraduate curriculum, advanced lab resources, research mentorship, and professional development ethics of the MCA programme.",
    details: "Addresses by College Management, Principal, and Head of the Department welcoming the postgraduates into academic excellence and technology leadership.",
    registrationOpen: false
  },
  {
    id: "evt-05",
    title: "One-Day Workshop on Full-Stack Modern Web Engineering",
    date: "2026-07-22",
    displayDate: "Jul 22, 2026",
    month: "JUL",
    day: "22",
    time: "09:45 AM - 03:45 PM",
    venue: "MCA Laboratory - 1",
    category: "Workshop",
    status: "Past",
    isFeatured: false,
    description: "Hands-on session on modern responsive architectures, state management patterns, RESTful APIs, and frontend performance optimizations.",
    details: "Students completed a functional project lifecycle from wireframe to interactive web application deployment during the laboratory hours.",
    registrationOpen: false
  },
  {
    id: "evt-06",
    title: "Technical Seminar: Cyber Security Best Practices & Ethical Standards",
    date: "2026-06-15",
    displayDate: "Jun 15, 2026",
    month: "JUN",
    day: "15",
    time: "11:00 AM - 01:00 PM",
    venue: "Department AV Hall",
    category: "Seminar",
    status: "Past",
    isFeatured: false,
    description: "Specialized talk on defensive cyber hygiene, network vulnerability assessments, and the ethical responsibilities of modern software engineers.",
    details: "Special emphasis on ethical computing practices aligning with the core values of the Department of Computer Applications.",
    registrationOpen: false
  }
];

let activeCategoryFilter = "all";
let activeStatusFilter = "all";
let searchQuery = "";

/**
 * Filter and search events based on current criteria
 */
function getFilteredEvents() {
  return mcaEvents.filter(event => {
    const matchesCategory = activeCategoryFilter === "all" || event.category.toLowerCase() === activeCategoryFilter.toLowerCase();
    const matchesStatus = activeStatusFilter === "all" || event.status.toLowerCase() === activeStatusFilter.toLowerCase();
    const matchesSearch = searchQuery === "" || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesStatus && matchesSearch;
  });
}

/**
 * Render Event Card HTML
 */
function createEventCardHTML(event) {
  return `
    <article class="event-card" id="${event.id}">
      <div class="event-card-banner">
        <div class="event-date-badge">
          <span class="event-date-month">${event.month}</span>
          <span class="event-date-day">${event.day}</span>
        </div>
        <span class="event-cat-badge">${event.category}</span>
        <div style="color: #48CAE4; opacity: 0.15; font-size: 7rem; position: absolute; right: -10px; bottom: -25px;">
          <i class="fa-solid fa-calendar-days" aria-hidden="true"></i>
        </div>
      </div>
      <div class="event-body">
        <h3 class="event-title">${event.title}</h3>
        <div class="event-meta">
          <div class="event-meta-item">
            <i class="fa-regular fa-clock" aria-hidden="true"></i>
            <span>${event.time}</span>
          </div>
          <div class="event-meta-item">
            <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
            <span>${event.venue}</span>
          </div>
          <div class="event-meta-item">
            <i class="fa-solid fa-tag" aria-hidden="true"></i>
            <span>Status: <strong>${event.status}</strong></span>
          </div>
        </div>
        <p class="event-description">${event.description}</p>
        <div class="event-footer">
          <button class="btn btn-secondary btn-sm" onclick="openEventModal('${event.id}')" aria-label="View details for ${event.title}">
            <i class="fa-solid fa-circle-info" aria-hidden="true"></i> View Details
          </button>
          ${event.registrationOpen ? `
            <button class="btn btn-primary btn-sm" onclick="openEventRegisterNotice('${event.id}')" aria-label="Register for ${event.title}">
              <i class="fa-solid fa-pen-to-square" aria-hidden="true"></i> Register
            </button>
          ` : `
            <span class="badge" style="background:#E2E8F0; color:#64748B;">Completed</span>
          `}
        </div>
      </div>
    </article>
  `;
}

/**
 * Render Events into grid container
 */
function renderEvents(containerId = "events-grid-container") {
  const container = document.getElementById(containerId);
  if (!container) return;

  const filtered = getFilteredEvents();

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background: #FFFFFF; border-radius: 12px; border: 1px dashed #CBD5E1;">
        <i class="fa-solid fa-calendar-xmark" style="font-size: 2.5rem; color: #94A3B8; margin-bottom: 1rem;"></i>
        <h4 style="color: #0F172A; margin-bottom: 0.5rem;">No events match your criteria</h4>
        <p style="color: #64748B; font-size: 0.95rem; margin-bottom: 1.5rem;">Try adjusting your category filter or search keywords.</p>
        <button class="btn btn-secondary btn-sm" onclick="resetEventFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(createEventCardHTML).join('');
}

/**
 * Render upcoming events on Homepage preview
 */
function renderHomeEventsPreview(containerId = "home-events-grid") {
  const container = document.getElementById(containerId);
  if (!container) return;

  const upcoming = mcaEvents.filter(e => e.status === "Upcoming").slice(0, 3);
  container.innerHTML = upcoming.map(createEventCardHTML).join('');
}

/**
 * Setup Event Page UI listeners (Filters, Search, Sorting)
 */
function setupEventsUI() {
  const searchInput = document.getElementById("events-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      renderEvents();
    });
  }

  const categoryButtons = document.querySelectorAll(".event-cat-filter-btn");
  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategoryFilter = btn.getAttribute("data-category") || "all";
      renderEvents();
    });
  });

  const statusButtons = document.querySelectorAll(".event-status-filter-btn");
  statusButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      statusButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeStatusFilter = btn.getAttribute("data-status") || "all";
      renderEvents();
    });
  });
}

function resetEventFilters() {
  activeCategoryFilter = "all";
  activeStatusFilter = "all";
  searchQuery = "";
  const searchInput = document.getElementById("events-search-input");
  if (searchInput) searchInput.value = "";
  
  document.querySelectorAll(".event-cat-filter-btn").forEach(b => {
    if (b.getAttribute("data-category") === "all") b.classList.add("active");
    else b.classList.remove("active");
  });

  renderEvents();
}

/**
 * Event Detail Modal trigger
 */
function openEventModal(eventId) {
  const event = mcaEvents.find(e => e.id === eventId);
  if (!event) return;

  const modalOverlay = document.getElementById("event-detail-modal");
  if (!modalOverlay) return;

  document.getElementById("modal-event-title").textContent = event.title;
  document.getElementById("modal-event-category").textContent = event.category;
  document.getElementById("modal-event-date").textContent = event.displayDate;
  document.getElementById("modal-event-time").textContent = event.time;
  document.getElementById("modal-event-venue").textContent = event.venue;
  document.getElementById("modal-event-desc").textContent = event.details || event.description;

  const registerBtn = document.getElementById("modal-event-reg-btn");
  if (registerBtn) {
    if (event.registrationOpen) {
      registerBtn.style.display = "inline-flex";
      registerBtn.onclick = () => openEventRegisterNotice(event.id);
    } else {
      registerBtn.style.display = "none";
    }
  }

  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeEventModal() {
  const modalOverlay = document.getElementById("event-detail-modal");
  if (modalOverlay) {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function openEventRegisterNotice(eventId) {
  const event = mcaEvents.find(e => e.id === eventId);
  if (!event) return;

  alert(`Registration for "${event.title}":\nPlease connect with the MCA Department Student Coordinator or Faculty in charge at the department office to submit your registration form.`);
}

document.addEventListener("DOMContentLoaded", () => {
  renderEvents();
  renderHomeEventsPreview();
  setupEventsUI();
});
