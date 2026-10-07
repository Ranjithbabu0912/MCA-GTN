/**
 * ==========================================================================
 * G.T.N. ARTS COLLEGE (AUTONOMOUS), DINDIGUL
 * DEPARTMENT OF MASTER OF COMPUTER APPLICATIONS (MCA)
 * CENTRALIZED ACHIEVEMENTS DATA REPOSITORY (js/data/achievements.js)
 * ==========================================================================
 * Authoritative dataset containing all verified department, student, and team
 * achievements, trophies, prizes, national recognitions, and annual awards.
 * Directly links with master event records in js/data/events.js.
 */

const mcaAchievementsData = [
  {
    id: "ach-01-tecknowfest-overall-trophy",
    eventId: "evt-04-tecknowfest-25",
    title: "Tecknowfest ’25 – Overall Trophy Champions",
    badge: "OVERALL TROPHY",
    badgeType: "gold", // gold, cyan, emerald, purple, blue
    category: "Intercollegiate Competition",
    type: "trophy",
    awardTitle: "Overall Trophy / Champions",
    recipient: "G.T.N. Arts College – MCA Department & G.T.N. College of Technology",
    students: ["MCA Department Student Contingent"],
    venue: "PSNA College of Engineering and Technology (PSNACET), Dindigul",
    organizer: "PSNACET",
    date: null,
    dateDisplay: "Information not provided",
    year: null,
    status: "completed",
    description: "The MCA Department of G.T.N. Arts College, together with G.T.N. College of Technology, secured the prestigious Overall Trophy at Tecknowfest ’25, an intercollegiate technical meet held at PSNACET. The achievement reflected outstanding creativity, technical competence, teamwork, and faculty mentorship.",
    highlights: [
      "Secured Overall Championship Trophy across competitive technical tracks",
      "Collaborative competitive performance with G.T.N. College of Technology",
      "Demonstrated excellence in multi-track computing and application challenges"
    ],
    featured: true
  },
  {
    id: "ach-02-galaxy-project-war-special-prize",
    eventId: "evt-12-galaxy-26-project-war",
    title: "GALAXY’26 – Special Prize in Project War (AI Domain)",
    badge: "SPECIAL PRIZE",
    badgeType: "gold",
    category: "Technical Competition",
    type: "prize",
    awardTitle: "Special Prize",
    recipient: "Mr. Ranjith Babu S",
    studentClass: "II MCA",
    students: ["Mr. Ranjith Babu S"],
    venue: "Government College of Engineering, Erode",
    organizer: "Association of ECE, Government College of Engineering, Erode",
    date: "2026-02-27",
    dateDisplay: "February 27, 2026",
    year: 2026,
    status: "completed",
    description: "Mr. Ranjith Babu S secured the Special Prize in the Project War competition at GALAXY’26 – The Version of AI, hosted by the Association of ECE at Government College of Engineering, Erode. The achievement demonstrated technical rigor, problem-solving capability, and innovative engineering in Artificial Intelligence.",
    highlights: [
      "Awarded Special Prize in the Project War competitive tier",
      "Showcased real-world AI project architecture and implementation",
      "Commended by state collegiate evaluation jury for innovative design"
    ],
    featured: true
  },
  {
    id: "ach-03-viksit-vibrant-village-dialogue",
    eventId: "evt-22-viksit-vibrant-village",
    title: "Viksit Vibrant Village Programme – Youth Dialogue with Hon’ble Prime Minister",
    badge: "NATIONAL DELEGATION",
    badgeType: "purple",
    category: "National Youth Programme",
    type: "national",
    awardTitle: "National Youth Delegate",
    recipient: "Mr. V. Deepak Kumar",
    studentClass: "MCA",
    students: ["Mr. V. Deepak Kumar"],
    venue: null,
    organizer: "National Youth Secretariat / Viksit Bharat Initiative",
    date: null,
    dateDisplay: "Information not provided",
    year: null,
    status: "completed",
    description: "Mr. V. Deepak Kumar participated in the Viksit Vibrant Village Programme – Youth Dialogue and was part of an interaction with the Hon’ble Prime Minister of India. The programme provided an opportunity for national-level youth engagement and dialogue connected with the national development vision of a Viksit Bharat.",
    highlights: [
      "Direct national-level dialogue participation with the Hon’ble Prime Minister of India",
      "Represented postgraduate youth perspectives on rural development and technology access",
      "Prestigious institutional recognition for civic and leadership engagement"
    ],
    featured: true
  },
  {
    id: "ach-04-gandhigram-intercollegiate-prize",
    eventId: "evt-02-gandhigram-meet",
    title: "Intercollegiate Meet at Gandhigram University – Prize-Winning Performance",
    badge: "PRIZE WINNER",
    badgeType: "cyan",
    category: "Intercollegiate Competition",
    type: "prize",
    awardTitle: "Prize-Winning Performance",
    recipient: "GTN-MCA Student Delegation",
    students: ["GTN-MCA Students"],
    venue: "Gandhigram University, Dindigul",
    organizer: "Gandhigram Rural Institute (Deemed to be University)",
    date: null,
    dateDisplay: "Information not provided",
    year: null,
    status: "completed",
    description: "The Intercollegiate meet at Gandhigram University, Dindigul, provided a platform for GTN-MCA students to demonstrate their talents and achieve a prize-winning performance. The achievement represented a memorable moment for the department and its students.",
    highlights: [
      "Prize-winning podium standing in inter-university competitive events",
      "Excellence demonstrated in technical application and academic contests",
      "Fostered collegiate exchange and regional academic representation"
    ],
    featured: false
  },
  {
    id: "ach-05-national-librarians-day-third-prize",
    eventId: "evt-08-librarians-day-competitions",
    title: "National Librarians Day 2026 – III Prize in Elocution",
    badge: "III PRIZE",
    badgeType: "cyan",
    category: "Collegiate Competition",
    type: "prize",
    awardTitle: "III Prize – Elocution Competition",
    recipient: "Mr. Mohanraj G",
    studentClass: "I MCA",
    students: ["Mr. Mohanraj G (I MCA)"],
    venue: "G.T.N. Arts College Central Library, Dindigul",
    organizer: "G.T.N. Arts College Central Library, Department of Library Science & GTN Readers Club",
    date: null,
    dateDisplay: "Information not provided",
    year: 2026,
    status: "completed",
    description: "Mr. Mohanraj, student of I MCA, secured the III Prize in the Elocution Competition organized for National Librarians Day 2026 on the topic 'Artificial Intelligence and Library'. The presentation highlighted the transformative impact of machine intelligence on bibliographic retrieval, archive cataloging, and digital scholarly access.",
    highlights: [
      "Awarded Third Prize among inter-departmental oratorical participants",
      "Addressed cutting-edge topic: 'Artificial Intelligence and Library'",
      "Demonstrated depth of technical understanding and public speaking poise"
    ],
    featured: false
  },
  {
    id: "ach-06-annual-day-awards-excellence",
    eventId: "evt-13-annual-day-awards",
    title: "Annual Day Awards 2025–2026 – Celebrating MCA Excellence",
    badge: "DEPARTMENT HONORS",
    badgeType: "gold",
    category: "Institutional Awards",
    type: "award",
    awardTitle: "Institutional Merit & Leadership Citations",
    recipient: "MCA Department Student Achievers",
    students: [
      "Jerin A (Best Academic Award)",
      "Christina Shalini D (Outstanding Attendance Award)",
      "Ranjith Babu S (Remarkable Achievements Award)",
      "Deepak Kumar V (Distinguished Class Representative Award)",
      "Mohanraj G (Special Recognition – Student Placement Coordinator)"
    ],
    venue: "Dr. A.P.J. Abdul Kalam Auditorium, G.T.N. Arts College",
    organizer: "G.T.N. Arts College (Autonomous), Dindigul",
    date: null,
    dateDisplay: "Information not provided",
    year: null,
    status: "completed",
    description: "The Annual Day Awards 2025–2026 recognized five outstanding MCA students for academic excellence, attendance, achievements, student leadership, and impactful contributions to student placement activities.",
    awardList: [
      { name: "Jerin A", award: "Best Academic Award", detail: "Highest academic achievement and rigorous coursework performance" },
      { name: "Christina Shalini D", award: "Outstanding Attendance Award", detail: "Exemplary 100% classroom attendance and academic discipline" },
      { name: "Ranjith Babu S", award: "Remarkable Achievements Award", detail: "Consistent distinctions in intercollegiate hackathons and technical competitions" },
      { name: "Deepak Kumar V", award: "Distinguished Class Representative Award", detail: "Exceptional student governance, liaison, and peer leadership" },
      { name: "Mohanraj G", award: "Special Recognition – Student Placement Coordinator", detail: "Dedicated leadership in coordinating training and campus placement facilitation" }
    ],
    highlights: [
      "Best Academic Award: Jerin A",
      "Outstanding Attendance Award: Christina Shalini D",
      "Remarkable Achievements Award: Ranjith Babu S",
      "Distinguished Class Representative Award: Deepak Kumar V",
      "Special Recognition – Student Placement Coordinator: Mohanraj G"
    ],
    featured: true
  },
  {
    id: "ach-07-my-bharat-youth-corps-volunteer",
    eventId: "evt-19-my-bharat-volunteer",
    title: "MY Bharat Youth Volunteer – National Youth Corps (NYC) Scheme",
    badge: "NATIONAL SELECTION",
    badgeType: "purple",
    category: "Youth Leadership & Social Service",
    type: "national",
    awardTitle: "Selected NYC Youth Volunteer",
    recipient: "Mr. Deepak Kumar V",
    studentClass: "II MCA",
    students: ["Mr. Deepak Kumar V"],
    venue: "MY Bharat Kendra, Dindigul",
    organizer: "MY Bharat Kendra, Dindigul / Ministry of Youth Affairs and Sports, Govt. of India",
    date: null,
    dateDisplay: "Information not provided",
    year: null,
    status: "completed",
    description: "Mr. Deepak Kumar was selected as a MY Bharat Youth Volunteer under the prestigious National Youth Corps (NYC) Scheme through MY Bharat Kendra, Dindigul. The selection recognizes leadership potential, enthusiasm, and commitment to social responsibility, youth awareness, and community development.",
    highlights: [
      "Selected as National Youth Corps (NYC) Volunteer under Ministry of Youth Affairs & Sports",
      "Active engagement with MY Bharat Kendra, Dindigul for civic awareness",
      "Exemplifies social responsibility and community youth leadership in computing education"
    ],
    featured: true
  },
  {
    id: "ach-08-future-6-national-innovation-ecoloop",
    eventId: "evt-23-future-6",
    title: "FUTURE 6.0 – National Innovation Competition (Team GTN YUVA)",
    badge: "ONGOING INNOVATION",
    badgeType: "emerald",
    category: "National Innovation Competition",
    type: "innovation",
    awardTitle: "National Innovation Competitor (Ongoing)",
    recipient: "Team GTN YUVA (MCA Department)",
    teamCaptain: "Ranjith Babu S",
    teamMembers: [
      "Ranjith Babu S (Captain)",
      "Karthikeyan M",
      "Amala Wilson J",
      "Jeeva S",
      "Mohanraj G"
    ],
    students: ["Ranjith Babu S", "Karthikeyan M", "Amala Wilson J", "Jeeva S", "Mohanraj G"],
    venue: "National Innovation Platform (Yi - Young Indians)",
    organizer: "Young Indians (Yi) – Team Yuva",
    date: null,
    dateDisplay: "Information not provided",
    year: null,
    status: "ongoing", // Explicitly ongoing per guidelines
    track: "Climate Action",
    challenge: "Waste Management at Source",
    innovation: "Ecoloop – Decentralized Circular Waste-to-Resource Network",
    description: "Team GTN YUVA proudly represented the MCA Department of G.T.N. Arts College in FUTURE 6.0, an esteemed national innovation competition organized by Young Indians (Yi). Competing in the Climate Action track under the challenge 'Waste Management at Source', the team conceptualized 'Ecoloop'—a decentralized circular waste-to-resource management architecture. Currently advancing through scheduled project stages.",
    highlights: [
      "Representing MCA Department in National-level FUTURE 6.0 Innovation Competition",
      "Track: Climate Action | Challenge: Waste Management at Source",
      "Solution Concept: 'Ecoloop' Decentralized Circular Waste-to-Resource Network",
      "Advancing through scheduled project review and prototyping stages"
    ],
    featured: true
  },
  {
    id: "ach-09-ideathon-winner-interdisciplinary",
    eventId: "evt-10-ideathon-26",
    title: "IDEATHON ’26 – First Place Winner (Interdisciplinary Team MBA & MCA)",
    badge: "IDEATHON WINNER",
    badgeType: "gold",
    category: "Technical Competition",
    type: "prize",
    awardTitle: "First Place Winner",
    recipient: "Interdisciplinary Team of MBA & MCA",
    students: ["Interdisciplinary Team of MBA & MCA"],
    venue: "Department of MCA, G.T.N. Arts College (Autonomous), Dindigul",
    organizer: "Department of MCA, G.T.N. Arts College (Autonomous)",
    date: "2026-02-20",
    dateDisplay: "February 20, 2026",
    year: 2026,
    status: "completed",
    description: "The Interdisciplinary Team of MBA & MCA clinched the First Place Winner position at IDEATHON ’26, competing against 12 teams across five departments (Computer Science, IT, Artificial Intelligence, MCA, and MBA). The event challenged participants to build practical technological prototypes across smart transport, intelligent parking, healthcare, and e-governance.",
    highlights: [
      "Won First Place in IDEATHON ’26 out of 12 collegiate teams",
      "Cross-departmental collaboration uniting computing logic with business models",
      "Runner-up honors awarded to Department of AI (1st) and Department of CS (2nd)"
    ],
    featured: false
  },
  {
    id: "ach-10-tamil-idol-auditions-participation",
    eventId: "evt-24-tamil-idol-auditions",
    title: "Tamil Idol Auditions – Performing Arts Talent Showcase",
    badge: "CULTURAL PARTICIPATION",
    badgeType: "blue",
    category: "Performing Arts & Cultural Activity",
    type: "cultural",
    awardTitle: "Audition Participant",
    recipient: "Mr. Sujith Ram",
    studentClass: "II MCA",
    students: ["Mr. Sujith Ram"],
    venue: "GTN Group of Institutions, Dindigul",
    organizer: "GTN Group of Institutions",
    date: null,
    dateDisplay: "Information not provided",
    year: null,
    status: "completed",
    description: "Sujith Ram, student of II MCA, actively participated in the Tamil Idol Auditions held at GTN Group of Institutions, Dindigul. His participation showcased artistic confidence, passion for vocal music, and versatile talent beyond computational academics.",
    highlights: [
      "Represented postgraduate department in regional Tamil Idol auditions",
      "Demonstrated vocal performance and creative stage presence",
      "Exemplifies holistic student development across artistic and academic disciplines"
    ],
    featured: false
  }
];

// Ensure global accessibility in vanilla browser environments and testing
if (typeof window !== "undefined") {
  window.mcaAchievementsData = mcaAchievementsData;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { mcaAchievementsData };
  global.mcaAchievementsData = mcaAchievementsData;
}
