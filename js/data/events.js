/**
 * ==========================================================================
 * G.T.N. ARTS COLLEGE (AUTONOMOUS), DINDIGUL
 * DEPARTMENT OF MASTER OF COMPUTER APPLICATIONS (MCA)
 * EVENTS DATA STORE (js/data/events.js)
 * Live Data Provider: MongoDB Atlas
 * ==========================================================================
 */

// Local data removed - live synchronized from MongoDB Atlas API
const mcaEventsData = [];

if (typeof window !== "undefined") {
  window.mcaEventsData = mcaEventsData;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { mcaEventsData };
}
