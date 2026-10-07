/**
 * ==========================================================================
 * G.T.N. ARTS COLLEGE (AUTONOMOUS), DINDIGUL
 * DEPARTMENT OF MASTER OF COMPUTER APPLICATIONS (MCA)
 * FACULTY DATA & RENDERING MODULE (faculty.js)
 * ==========================================================================
 * Centralized faculty dataset. Non-technical administrators and staff can
 * update faculty information directly here without touching HTML files.
 */

const facultyMembers = [
  {
    id: "faculty-01",
    name: "Dr. A. Vanitha Katharine",
    qualifications: "MCA., MBA., M.Phil(CS)., Ph.D.",
    designation: "Professor & Head of the Department",
    role: "HOD",
    initials: "VK",
    department: "Department of MCA",
    officeLocation: "MCA Department Block, Ground Floor",
    contactStatus: "Contact through Department Office",
    academicStatus: "Head of the Department",
    avatarColor: "linear-gradient(135deg, #102A54 0%, #1E5BB0 100%)"
  },
  {
    id: "faculty-02",
    name: "Ms. A. Mujiba Parvin",
    qualifications: "MCA., M.Phil., (Ph.D)",
    designation: "Assistant Professor",
    role: "Faculty",
    initials: "MP",
    department: "Department of MCA",
    officeLocation: "MCA Faculty Room, Ground Floor",
    contactStatus: "Contact through Department Office",
    academicStatus: "Assistant Professor",
    avatarColor: "linear-gradient(135deg, #0B1D3A 0%, #0077B6 100%)"
  },
  {
    id: "faculty-03",
    name: "Ms. A. Praveena",
    qualifications: "MCA",
    designation: "Assistant Professor",
    role: "Faculty",
    initials: "AP",
    department: "Department of MCA",
    officeLocation: "MCA Faculty Room, Ground Floor",
    contactStatus: "Contact through Department Office",
    academicStatus: "Assistant Professor",
    avatarColor: "linear-gradient(135deg, #071228 0%, #0096C7 100%)"
  }
];

/**
 * Render Faculty Members into the specified container element
 * @param {string} containerId - DOM ID of the container element
 * @param {boolean} isCompact - Whether to render a compact view (e.g. for homepage)
 */
function renderFacultyList(containerId, isCompact = false) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = facultyMembers.map(member => `
    <article class="faculty-card" id="${member.id}">
      <div class="faculty-avatar-container" style="background: ${member.avatarColor};">
        <div class="faculty-avatar-circle" aria-label="Portrait avatar for ${member.name}">
          <span class="faculty-initials">${member.initials}</span>
        </div>
        <span class="faculty-badge-role ${member.role === 'HOD' ? 'hod' : ''}">${member.role === 'HOD' ? 'Head of Department' : 'Faculty'}</span>
      </div>
      <div class="faculty-body">
        <h3 class="faculty-name">${member.name}</h3>
        <p class="faculty-qualifications">${member.qualifications}</p>
        <p class="faculty-designation">${member.designation}</p>

        <div class="faculty-meta-box">
          <div class="faculty-meta-row">
            <i class="fa-solid fa-building-columns" aria-hidden="true"></i>
            <span>${member.department}</span>
          </div>
          <div class="faculty-meta-row">
            <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
            <span>${member.officeLocation}</span>
          </div>
          <div class="faculty-meta-row">
            <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
            <span>${member.contactStatus}</span>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}

// Global initialization if container is present on page load
document.addEventListener('DOMContentLoaded', () => {
  renderFacultyList('faculty-grid-container');
  renderFacultyList('home-faculty-grid', true);
});
