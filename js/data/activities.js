/**
 * ==========================================================================
 * G.T.N. ARTS COLLEGE (AUTONOMOUS), DINDIGUL
 * DEPARTMENT OF MASTER OF COMPUTER APPLICATIONS (MCA)
 * CENTRALIZED ACTIVITIES DATA REPOSITORY (js/data/activities.js)
 * ==========================================================================
 * Structured activities taxonomy and curated collections covering:
 * - Workshops & Hands-on Technical Training
 * - Industrial Visits & Experiential Learning
 * - Student Volunteering & Leadership
 * - Innovation, Hackathons & Technical Meets
 * - Industry Collaborations & Professional Exposure
 * - Cultural & Holistic Development
 */

const mcaActivitiesData = [
  {
    id: "act-01-office-automation-volunteers",
    eventId: "evt-25-office-automation",
    title: "Hands-on Training on Office Automation – Technical Peer Mentorship",
    category: "Student Volunteering",
    type: "Volunteering & Mentorship",
    organizer: "Department of Mathematics, G.T.N. Arts College (Autonomous), Dindigul",
    venue: "Computer Laboratory, G.T.N. Arts College (Autonomous), Dindigul",
    date: null,
    dateDisplay: "Information not provided",
    year: null,
    status: "completed",
    studentVolunteers: [
      "Ranjith Babu S (II MCA)",
      "Deepak Kumar V (II MCA)",
      "Amala Wilson J (II MCA)",
      "Jerin A (II MCA)",
      "Keerthana Rani S (II MCA)"
    ],
    description: "The training introduced learners to practical digital tools and office automation technologies. The programme focused on improving productivity, organizing information and supporting academic and professional work. The II MCA student volunteers contributed technical support, teamwork, participant guidance and knowledge sharing.",
    highlights: [
      "5 II MCA Student Volunteers facilitated hands-on technical guidance",
      "Hands-on exercises in spreadsheets, automated formulas, and collaborative suites",
      "Peer-driven knowledge transfer fostering inter-departmental synergy"
    ],
    tags: ["Office Automation", "Student Volunteers", "Digital Skills", "Technical Support", "Peer Learning"]
  },
  {
    id: "act-02-yip-volunteer-recognition",
    eventId: "evt-18-yip-2026-volunteers",
    title: "Young Indian Parliament (YIP) 2026 – Student Volunteer Delegation",
    category: "Student Volunteering",
    type: "Volunteering & Leadership",
    organizer: "Young Indian Parliament (YIP) 2026 with Tyler",
    venue: "Information not provided",
    date: null,
    dateDisplay: "Information not provided",
    year: null,
    status: "completed",
    studentVolunteers: [
      "S. Ranjith (II MCA)",
      "M. Karthikeyan (II MCA)",
      "G. Mohanraj (II MCA)",
      "S. Jeeva (II MCA)",
      "J. Amala Wilson (II MCA)"
    ],
    description: "Five II MCA students served as Student Volunteers at Young Indian Parliament (YIP) 2026 with Tyler. Their dedication, event-management skills, teamwork and leadership were recognized and appreciated by the organizing team.",
    highlights: [
      "Recognized for event coordination, parliamentary sessions liaison, and logistical execution",
      "Demonstrated exemplary leadership, teamwork, and crisis management",
      "Official institutional appreciation from the YIP organizing committee"
    ],
    tags: ["Young Indian Parliament", "YIP 2026", "Student Volunteers", "Leadership", "Event Management"]
  },
  {
    id: "act-03-my-bharat-volunteer",
    eventId: "evt-19-my-bharat-volunteer",
    title: "MY Bharat Youth Volunteer – National Youth Corps (NYC) Scheme",
    category: "Social Responsibility",
    type: "National Youth Service",
    organizer: "MY Bharat Kendra, Dindigul / Ministry of Youth Affairs and Sports, Govt. of India",
    venue: "MY Bharat Kendra, Dindigul",
    date: null,
    dateDisplay: "Information not provided",
    year: null,
    status: "completed",
    studentVolunteers: ["Mr. Deepak Kumar V (II MCA)"],
    description: "Mr. Deepak Kumar was selected as a MY Bharat Youth Volunteer under the National Youth Corps (NYC) Scheme through MY Bharat Kendra, Dindigul. The engagement recognizes leadership potential, enthusiasm and commitment to social responsibility, youth awareness and community development.",
    highlights: [
      "Selection under Central Government National Youth Corps Scheme",
      "Community sensitization and social welfare initiatives across Dindigul district",
      "Integration of postgraduate education with national civic development"
    ],
    tags: ["MY Bharat", "National Youth Corps", "Social Responsibility", "Youth Leadership"]
  },
  {
    id: "act-04-viksit-vibrant-village",
    eventId: "evt-22-viksit-vibrant-village",
    title: "Viksit Vibrant Village Programme – Youth Dialogue Interaction",
    category: "National Engagement",
    type: "National Youth Dialogue",
    organizer: "Viksit Bharat National Youth Initiative",
    venue: "Information not provided",
    date: null,
    dateDisplay: "Information not provided",
    year: null,
    status: "completed",
    studentVolunteers: ["Mr. V. Deepak Kumar (MCA)"],
    description: "Mr. V. Deepak Kumar participated in the Viksit Vibrant Village Programme – Youth Dialogue and was part of an interaction with the Hon’ble Prime Minister of India. The programme provided young participants with an opportunity for national-level youth engagement and dialogue connected with the vision of a Viksit Bharat.",
    highlights: [
      "Interactive dialogue with the Hon’ble Prime Minister of India",
      "Deliberation on rural innovation, border village transformation, and technology equity",
      "Highest echelon of collegiate student dialogue representation"
    ],
    tags: ["Viksit Bharat", "Prime Minister Dialogue", "Youth Engagement", "Rural Development"]
  },
  {
    id: "act-05-future-6-innovation",
    eventId: "evt-23-future-6",
    title: "FUTURE 6.0 – Ecoloop Circular Waste-to-Resource Innovation",
    category: "Student Innovation",
    type: "National Innovation Challenge",
    organizer: "Young Indians (Yi) – Team Yuva",
    venue: "Young Indians Innovation Network",
    date: null,
    dateDisplay: "Information not provided",
    year: 2026,
    status: "ongoing", // Explicitly ongoing per guidelines
    studentVolunteers: [
      "Ranjith Babu S (Captain - II MCA)",
      "Karthikeyan M (II MCA)",
      "Amala Wilson J (II MCA)",
      "Jeeva S (II MCA)",
      "Mohanraj G (II MCA)"
    ],
    description: "Team GTN YUVA represented the MCA Department in FUTURE 6.0 and selected the Climate Action track, addressing the challenge of Waste Management at Source through the Ecoloop concept. Ecoloop is designed as a decentralized circular waste-to-resource network.",
    highlights: [
      "Track: Climate Action | Focus: Waste Management at Source",
      "Architected 'Ecoloop' circular economy and resource distribution concept",
      "Ongoing project evolution across national milestone rounds"
    ],
    tags: ["FUTURE 6.0", "Young Indians", "Climate Action", "Ecoloop", "Innovation", "Ongoing"]
  },
  {
    id: "act-06-bnazrum-agro-visit",
    eventId: "evt-17a-bnazrum-agro-visit",
    title: "Industrial Visit – Bnazrum Agro Exports Pvt. Ltd.",
    category: "Industrial Visit",
    type: "Industry Immersion",
    organizer: "Department of MCA, G.T.N. Arts College (Autonomous)",
    venue: "Bnazrum Agro Exports Pvt. Ltd., Sirumalai Road, Dindigul",
    date: "2026-07-01",
    dateDisplay: "July 01, 2026",
    year: 2026,
    status: "completed",
    studentVolunteers: [],
    description: "Students gained exposure to agro-processing and export operations and observed the processing of gherkins for international markets and how agricultural products are prepared to meet global export standards.",
    highlights: [
      "Observed automated processing line and sorting for gherkins exports",
      "Studied global quality compliance protocols and supply chain tracking",
      "Connected agro-industrial workflows with information systems and inventory tracking"
    ],
    tags: ["Industrial Visit", "Agro Industry", "Export Operations", "Quality Standards", "Field Learning"]
  },
  {
    id: "act-07-kalaignar-library-visit",
    eventId: "evt-17b-centenary-library-visit",
    title: "Educational Visit – Kalaignar Centenary Library",
    category: "Educational Visit",
    type: "Academic & Digital Library Immersion",
    organizer: "Department of MCA, G.T.N. Arts College (Autonomous)",
    venue: "Kalaignar Centenary Library, Madurai",
    date: "2026-07-02",
    dateDisplay: "July 02, 2026",
    year: 2026,
    status: "completed",
    studentVolunteers: [],
    description: "Students visited the Kalaignar Centenary Library and gained an enriching learning experience in a major knowledge environment, encouraging reading, curiosity, self-learning and broader academic exposure.",
    highlights: [
      "Explored eight-floor landmark digital and physical archival facility",
      "Examined integrated automated library information and cataloging systems",
      "Reinforced self-learning habits and scientific research methodology"
    ],
    tags: ["Educational Visit", "Kalaignar Centenary Library", "Digital Knowledge", "Research", "Madurai"]
  },
  {
    id: "act-08-indo-israel-farm-visit",
    eventId: "evt-05-indo-israel-farm",
    title: "Field Trip – Indo-Israel Farm Centre of Excellence for Vegetables",
    category: "Field Trip",
    type: "Agricultural IoT & Smart Farming",
    organizer: "Department of MCA & Horticulture Department, Government of Tamil Nadu",
    venue: "Indo–Israel Centre/Farm Centre of Excellence for Vegetables, Dindigul",
    date: "2025-12-18",
    dateDisplay: "December 18, 2025",
    year: 2025,
    status: "completed",
    studentVolunteers: [],
    description: "Students gained hands-on exposure to smart farming, IoT-powered agriculture, sensor-driven irrigation, climate monitoring, data analytics and sustainable agricultural practices. The visit connected classroom theory with real-world agricultural technology applications and practical IoT learning.",
    highlights: [
      "Observed automated poly-houses and sensor-actuated drip irrigation arrays",
      "Studied soil-moisture and ambient microclimate data acquisition telemetry",
      "Interlinked computing curricula with Agritech and sustainable precision farming"
    ],
    tags: ["Field Trip", "Smart Farming", "IoT", "Indo-Israel Project", "Precision Agriculture"]
  },
  {
    id: "act-09-ibm-skillsbuild-training",
    eventId: "evt-20-ibm-skillsbuild",
    title: "IBM SkillsBuild: AI & Employability Training Program",
    category: "Training Programme",
    type: "Industry Certification Bootcamp",
    organizer: "Departments of MCA & MBA, Placement Cell, G.T.N. Arts College (Autonomous), Dindigul",
    venue: "G.T.N. Arts College (Valedictory: N.S. Hall)",
    date: "2026-07-20",
    dateDisplay: "July 20–24, 2026 (Valedictory: July 24, 2026)",
    year: 2026,
    status: "completed",
    partners: ["Magic Bus India Foundation", "IBM SkillsBuild", "State Street", "HCL Foundation"],
    studentVolunteers: [],
    description: "The programme equipped MCA and MBA students with AI knowledge, practical mini-project experience, digital certification and employability skills. It concluded with a valedictory function celebrating student learning and achievements.",
    highlights: [
      "AI Fundamentals and guided student mini-project implementations",
      "IBM Digital Credentials and employability interview preparation",
      "Valedictory function conducted on July 24, 2026 at N.S. Hall"
    ],
    tags: ["IBM SkillsBuild", "AI Training", "Employability", "Certification", "Industry Collaboration"]
  },
  {
    id: "act-10-digital-marketing-training",
    eventId: "evt-16-digital-marketing",
    title: "Digital Marketing: Beyond the Classroom – Skills, Strategies & Career Opportunities",
    category: "Hands-on Training",
    type: "Industry Practical Masterclass",
    organizer: "Department of MCA, G.T.N. Arts College, Dindigul",
    venue: "MCA Seminar Hall, G.T.N. Arts College, Dindigul",
    date: "2026-07-09",
    dateDisplay: "July 09, 2026",
    year: 2026,
    status: "completed",
    resourcePerson: "Mr. I. Santhosh Kumar (Founder & Performance Marketing Strategist, LeGenZ)",
    studentVolunteers: [],
    description: "The programme provided practical exposure to digital marketing strategies, industry tools, performance marketing and career opportunities. The interactive session encouraged participation, collaboration, questioning and real-world application.",
    highlights: [
      "Hands-on insights into Search Engine Marketing and social audience targeting",
      "Performance metrics, ROI conversion funnels, and data analytics tools",
      "Career roadmaps for technical marketing and growth engineering"
    ],
    tags: ["Digital Marketing", "Performance Marketing", "LeGenZ", "Career Opportunities", "Hands-on"]
  },
  {
    id: "act-11-road-safety-seminar",
    eventId: "evt-21-road-safety-seminar",
    title: "Seminar on Road Safety & Tyre Safety – Awareness for Safer Roads",
    category: "Social Responsibility",
    type: "Civic & Safety Awareness",
    organizer: "Departments of MCA & MBA, G.T.N. Arts College (Autonomous), Dindigul",
    venue: "G.T.N. Arts College Campus Auditorium",
    date: "2026-07-22",
    dateDisplay: "July 22, 2026",
    year: 2026,
    status: "completed",
    partners: ["ITTAC", "Vishwa Yuvak Kendra", "Vaigai Trust", "JK Tyre & Industries Ltd."],
    studentVolunteers: [],
    description: "Organized in association with ITTAC, Vishwa Yuvak Kendra, and Vaigai Trust with representatives from JK Tyre & Industries Ltd. Focus areas included responsible road usage, safe driving, tyre maintenance, technical awareness, and accident prevention.",
    highlights: [
      "Addresses by Thiru. R. Ayyanar MLA and institutional management",
      "Technical tyre tread analysis and blowout prevention by JK Tyre engineers",
      "Keynote message: BE AWARE • DRIVE SAFE • CHECK TYRES • FOLLOW RULES • SAVE LIVES"
    ],
    tags: ["Road Safety", "Tyre Safety", "ITTAC", "JK Tyre", "Social Awareness"]
  },
  {
    id: "act-12-mou-mahix-infotech",
    eventId: "evt-26-mou-mahix-infotech",
    title: "Association Inauguration & MoU Signing with Mahix InfoTech",
    category: "Industry Interaction",
    type: "MoU & Association Launch",
    organizer: "Department of MCA, G.T.N. Arts College (Autonomous)",
    venue: "NS Hall, G.T.N. Arts College, Dindigul",
    date: "2026-10-07",
    dateDisplay: "October 07, 2026",
    year: 2026,
    status: "completed",
    industryPartner: "Mahix InfoTech",
    chiefGuest: "Mr. V. Vellaidurai (Senior Product Management Specialist, Honeywell Technology Solutions Lab)",
    studentVolunteers: [],
    description: "The Association Inauguration and MoU Signing Ceremony marked the beginning of an industry–academia collaboration between the Department of MCA and Mahix InfoTech, intended to connect students with real-world industry experience and professional development opportunities.",
    highlights: [
      "Formal inauguration of the MCA Student Technical Association",
      "Bilateral MoU signing with Mahix InfoTech for industry knowledge exchange",
      "Keynote address by Mr. V. Vellaidurai from Honeywell Technology Solutions Lab"
    ],
    tags: ["MoU Signing", "Mahix InfoTech", "Honeywell", "Association Launch", "Industry Collaboration"]
  },
  {
    id: "act-13-umaginetn-participation",
    eventId: "evt-06-umaginetn-2026",
    title: "UMAGINeTN 2026 – State Innovation & Technology Summit Participation",
    category: "Industry Interaction",
    type: "State Technology Summit",
    organizer: "Government of Tamil Nadu / Trade Centre Chennai",
    venue: "Trade Centre, Chennai",
    date: null,
    dateDisplay: "Information not provided",
    year: null,
    status: "completed",
    studentVolunteers: [],
    description: "MCA students actively participated in UMAGINeTN 2026 at Trade Centre, Chennai, gaining exposure to innovation, technology and industry-driven ideas. The experience broadened their perspectives, boosted confidence and contributed to their academic development.",
    highlights: [
      "Postgraduate student delegation visited Chennai Trade Centre for UMAGINeTN 2026",
      "Interacted with emerging tech startups, IT delegates, and policy makers",
      "Gained exposure to enterprise software paradigms and statewide tech roadmaps"
    ],
    tags: ["UMAGINeTN", "Trade Centre Chennai", "Industry Summit", "Student Exposure"]
  },
  {
    id: "act-14-tamil-idol-auditions",
    eventId: "evt-24-tamil-idol-auditions",
    title: "Tamil Idol Auditions – Student Performing Arts Showcase",
    category: "Cultural Activity",
    type: "Cultural & Performing Arts",
    organizer: "GTN Group of Institutions",
    venue: "GTN Group of Institutions, Dindigul",
    date: null,
    dateDisplay: "Information not provided",
    year: null,
    status: "completed",
    studentVolunteers: ["Sujith Ram (II MCA)"],
    description: "Sujith Ram, a II MCA student, participated in the Tamil Idol Auditions held at GTN Group of Institutions, Dindigul. His participation showcased confidence, passion for music and talent beyond academics.",
    highlights: [
      "Vocal audition performance by Sujith Ram (II MCA)",
      "Highlighted versatility and confidence in extracurricular artistic avenues",
      "Department encouragement of balanced artistic and computational expression"
    ],
    tags: ["Tamil Idol", "Cultural Activity", "Music", "Student Participation", "Performing Arts"]
  }
];

// Ensure global accessibility in vanilla browser environments and testing
if (typeof window !== "undefined") {
  window.mcaActivitiesData = mcaActivitiesData;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { mcaActivitiesData };
  global.mcaActivitiesData = mcaActivitiesData;
}
